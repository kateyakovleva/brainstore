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
  background: string;
}


export interface IProjects {
  current_page: number;
  data: IProject[];
  first_page_url: string;
  from: number;
  last_page: number;
  last_page_url: string;
  links: ILink[];
  next_page_url?: any;
  path: string;
  per_page: number;
  prev_page_url?: any;
  to: number;
  total: number;
}

export interface IProjectDescription {
  image: string;
  title: string;
  description: string;
}

export interface IProject {
  id: number;
  name: string;
  short_description?: any;
  image: string;
  tags: string[];
  blocks: IProjectDescription[];
  created_at: string;
  updated_at: string;
}

export interface ILink {
  url?: any;
  label: string;
  active: boolean;
}

