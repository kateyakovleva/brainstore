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
  image_description?: string;
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
  advantage_title?: string;
  advs?: { text: string, count: string }[];
  seo_alias?: string;
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
  header_menu: ISettingItem[];
  menu: IMenuItem[];
  state_1: string;
  state_2: string;
  state_3: string;
  state_title: string;
  contacts_description: string;
  contacts_sub_description: string;
  contacts_image_url: string;
  contacts_image_description: string;

  team_description: string;
  team_sub_description: string;
  team_image_url: string;
  team_image_description: string;
}

export interface ISettingItem {
  type: string;
  data: IMenuItem;
}

export interface IMenuItem {
  name: string;
  link: string;
  status: boolean;
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
  link?: string;
  description?: string;
  show_logo: boolean;
  apply_blur: boolean;
  image_url?: string;
}
