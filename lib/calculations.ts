import { useSelector } from "react-redux";

type Project = {
    area: string;
    gluePrice: string;
    glueWeight: string;
    services: string[];
    tarif: string;
    tileCostForMeterSq: string;
    tileHeight: string;
    tileWidth: string;
};

type Service = {
    id: string;
    name: string;
    price: number;
    type: string;
};

type Calculations = {
    tileArea: number;
    totalTileCount: number;
    tilesPerSquareMeter: number;
    areaWithPercentage: number;
    workPrice: number;
    additionalPrice: number;
    glueTotalAmount:number;
    totalWorkPrice:number;
    totalPrice:number;
    totalTilePrice:number;
    glueTotalPrice:number;
};

export default function useCalculateProjectDetails(project: Project): Calculations {
    const tarifDetails = useSelector((state: any) =>
        state.services.services.find((service: Service) => service.id === project.tarif)
    );
    const price = tarifDetails?.price || 0;

    const allAdditionalServices = useSelector((state: any) => state.additionalServices.additionalServices);
    const flatServices = project.services.flat();
    const selectedServices = allAdditionalServices.filter((service: Service) =>
        flatServices.includes(service.id)
    );

    const ZAPAS_PLYTKY = 0.07;
    const KG_OF_GLUE_PER_mSQ = 4

    const area = parseFloat(project.area) || 0;
    const tileHeight = parseFloat(project.tileHeight) || 0;
    const tileWidth = parseFloat(project.tileWidth) || 0;
    const gluePrice = parseFloat(project.gluePrice) || 0;
    const glueWeight = parseFloat(project.glueWeight) || 0;
    const tileCostForMeterSq = parseFloat(project.tileCostForMeterSq) || 0;

    const tileArea = (tileHeight * tileWidth) / 1000000;
    const totalTileCount = tileArea > 0 ? Math.ceil(area / tileArea) : 0;
    const tilesPerSquareMeter = tileArea > 0 ? 1 / tileArea : 0;
    const areaWithPercentage = area + area * ZAPAS_PLYTKY;
    const workPrice = area * price;
    const glueTotalAmount = KG_OF_GLUE_PER_mSQ * areaWithPercentage;
    const glueTotalPrice = (glueTotalAmount/glueWeight) * gluePrice ;

    const additionalPrice = selectedServices.reduce((sum, service) => {
        return sum + (service.type === "forArea" ? service.price * areaWithPercentage : service.price);
    }, 0);

    const totalWorkPrice = workPrice + additionalPrice;

    const totalTilePrice = areaWithPercentage * tileCostForMeterSq;

    const totalPrice = totalWorkPrice + totalTilePrice + glueTotalPrice;

    return {
        tileArea,
        tilesPerSquareMeter,
        areaWithPercentage,
        totalTileCount,
        glueTotalAmount,
        workPrice,
        additionalPrice,
        totalWorkPrice,
        totalPrice,
        totalTilePrice,
        glueTotalPrice
    };
}

