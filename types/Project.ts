export interface Project {
  image: string;
  name: string;
  address: string;
  id: string;
  cover: string;
  area: number;
  uri: string;
}

export type ProjectInfo = {
  id: string;
  name: string;
  area: string;
  gluePrice: string;
  glueWeight: string;
  services: string;
  tarif: string;
  tileCostForMeterSq: string;
  tileHeight: string;
  tileWidth: string;
  description: string;
  cover: string;
};

export interface ProjectsState {
  projects: Project[];
}

export interface ProjectInfoState {
  projects: ProjectInfo[];
}
