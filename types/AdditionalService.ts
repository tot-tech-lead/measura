export interface AdditionalService {
  id: string;
  name: string;
  price: number;
  type: string;
}

export interface AdditionalServicesState {
  additionalServices: AdditionalService[];
}