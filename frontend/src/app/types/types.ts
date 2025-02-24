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
  image?: string;
  title: string;
  description: string;
  link?: string;
}

export interface IProject {
  id: number;
  name: string;
  short_description?: any;
  image_url: string;
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

export interface ISettings {
  phone: string;
  address: string;
  tg: string;
  vk: string;
  manifest: string;
  formMessage: string;
  clients: IClient[];
  services: IServiceType[];
  home_slides: IHomeSlide[];
  state_1: string;
  state_2: string;
  state_3: string;
  state_title: string;
}

export interface IClient {
  id: number;
  name: string;
  image_url: string;
  description?: string;
  tags: string[];
}

export interface IServiceType {
  id: number;
  name: string;
  description?: string;
}

export interface IHomeSlide {
  id: number;
  image?: string;
  video?: string;
  description?: string;
  show_logo: boolean;
  image_url?: string;
}
