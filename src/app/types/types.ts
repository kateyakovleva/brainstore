export interface ISlide {
  banner: string;
  services: IService[];
  company: string;
  description: string;
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

