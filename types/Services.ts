export interface Service {
  id: string; 
  name: string;
  description?: string; 
  price: number;
  category?: string; 
  conditions: string[];
}

export interface ServicesState {
  services: Service[]; 
}