import { useSelector } from 'react-redux';

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
  workPrice: number;
  additionalPrice: number;
  glueTotalAmount: number;
  totalWorkPrice: number;
  totalPrice: number;
  totalTilePrice: number;
  glueTotalPrice: number;
  countOfGlueBags: number;
  area: number;
  glueTotalAmountWithPercentage: number;
  countOfGlueBagsWithPercentage: number;
  glueTotalPriceWithPercentage: number;
  totalTilePriceWithPercentage: number;
  totalPriceWithPercentage: number;
};

export default function useCalculateProjectDetails(
  project: Project
): Calculations {
  const tarifDetails = useSelector((state: any) =>
    state.services.services.find(
      (service: Service) => service.id === project.tarif
    )
  );
  const price = tarifDetails?.price || 0;

  const allAdditionalServices = useSelector(
    (state: any) => state.additionalServices.additionalServices
  );
  const flatServices = project.services.flat();
  const selectedServices = allAdditionalServices.filter((service: Service) =>
    flatServices.includes(service.id)
  );

  const ZAPAS_PLYTKY = 0.07;
  const KG_OF_GLUE_PER_mSQ = 4;

  const area = parseFloat(project.area) || 0;
  const tileHeight = parseFloat(project.tileHeight) || 0;
  const tileWidth = parseFloat(project.tileWidth) || 0;
  const gluePrice = parseFloat(project.gluePrice) || 0;
  const glueWeight = parseFloat(project.glueWeight) || 0;
  const tileCostForMeterSq = parseFloat(project.tileCostForMeterSq) || 0;

  //CALCULATIONS
  //tiles calculations
  const tileArea = tileHeight * tileWidth;
  const totalTileCount = tileArea > 0 ? Math.ceil(area / tileArea) : 0;
  const tilesPerSquareMeter = tileArea > 0 ? 1 / tileArea : 0;
  const totalTilePrice = area * tileCostForMeterSq;

  //glue calculations
  const glueTotalAmount = KG_OF_GLUE_PER_mSQ * area;
  const countOfGlueBags = Math.ceil(glueTotalAmount / glueWeight);
  const glueTotalPrice = countOfGlueBags * gluePrice;

  // work calculations
  const additionalPrice = selectedServices.reduce((sum, service) => {
    return (
      sum + (service.type === 'forArea' ? service.price * area : service.price)
    );
  }, 0);
  const workPrice = area * price;
  const totalWorkPrice = workPrice + additionalPrice;
  const totalPrice = totalWorkPrice + totalTilePrice + glueTotalPrice;

  //CALCULATIONS WITH %
  const areaWithPercentage = area + area * ZAPAS_PLYTKY;

  const glueTotalAmountWithPercentage = KG_OF_GLUE_PER_mSQ * areaWithPercentage;

  const countOfGlueBagsWithPercentage = Math.ceil(
    glueTotalAmountWithPercentage / glueWeight
  );

  const glueTotalPriceWithPercentage =
    countOfGlueBagsWithPercentage * gluePrice;

  const totalTilePriceWithPercentage = areaWithPercentage * tileCostForMeterSq;

  const totalPriceWithPercentage =
    totalWorkPrice +
    totalTilePriceWithPercentage +
    glueTotalPriceWithPercentage;

  return {
    tileArea,
    tilesPerSquareMeter,
    totalTileCount,
    glueTotalAmount,
    workPrice,
    additionalPrice,
    totalWorkPrice,
    totalPrice,
    totalTilePrice,
    glueTotalPrice,
    countOfGlueBags,
    area,
    glueTotalAmountWithPercentage,
    countOfGlueBagsWithPercentage,
    glueTotalPriceWithPercentage,
    totalTilePriceWithPercentage,
    totalPriceWithPercentage,
  };
}
