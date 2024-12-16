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

type Calculations = {
    tileArea: number;
    totalTileCount: number;
    tilesPerSquareMeter: number;
    areaWithPercentage: number;
    workPrice: number
};


export function useCalculateProjectDetails(project: Project): Calculations {
    const tarifDetails = useSelector((state: any) =>
        state.services.services.find((service: any) => service.id === project.tarif)
    );

    const price = tarifDetails.price;

    // Основні обчислення
    const area = parseFloat(project.area) || 0;
    const glueWeight = parseFloat(project.glueWeight) || 0;
    const tileCostForMeterSq = parseFloat(project.tileCostForMeterSq) || 0;
    const tileHeight = parseFloat(project.tileHeight) || 0;
    const tileWidth = parseFloat(project.tileWidth) || 0;

    const tileArea = (tileHeight * tileWidth) / 1000000;
    const totalTileCount = tileArea > 0 ? Math.ceil(area / tileArea) : 0;
    const tilesPerSquareMeter = 1 / tileArea;
    const areaWithPercentage = area + area * 0.07;
    const workPrice = areaWithPercentage * price;

    console.log("Tarif Details:", tarifDetails);

    return {
        tileArea,
        totalTileCount,
        tilesPerSquareMeter,
        areaWithPercentage,
        workPrice
    };
}

