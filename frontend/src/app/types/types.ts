export interface ISlide {
  banner: string;
  services: IService[];
  company: string;
  description: string;
  background: string;
}

export interface ICustomer {
  showDescription: any;
  company: string;
  logo: string;
  description: string;
  services: IService[];
}

export interface IService {
  id: number;
  service: string;
}

export interface ICard {
  img: string;
  title: string;
  status: string;
}

export interface IProject {
  title: string;
  services: IService[];
  tasks: string;
  img_main: string;
  results: string;
  img_results: string;
  research: string;
  img_research: string;
  naming: string;
  img_naming: string;
}



