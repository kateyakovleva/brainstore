import {IMenuItem} from '../types/types';

export const isMobile = window.innerWidth < 1000;

export const videoUrl = (url: string, controls = true, play = false) => {
  if (url.indexOf('rutube.ru') !== -1) {
    return url.replace('https://rutube.ru/video/', 'https://rutube.ru/play/embed/');
  }

  if (url.indexOf('vimeo.com')) {
    let add = '';
    if (!controls) {
      add = `&controls=0&sidedock=0&title=0&autoplay=${play ? '1' : '0'}`;
    }
    return url.replace(/^https:\/\/vimeo.com\/([^\/]+)/, 'https://player.vimeo.com/video/$1?h=$2') + add;
  }
  //https://vimeo.com/1053368072/7b446baf6d

  //https://player.vimeo.com/video/1053368072?h=7b446baf6d

  return url;
}

export const getLink = (item: IMenuItem, current_location: string) => {
  let path: any = item.link.split('#');
  path = path[0];

  if (path === current_location) {
    path = '#';
  }

  return path;
}

export const toSection = (item: IMenuItem, event?: any) => {
  let name = item.link.split('#')[1];

  setTimeout(() => {
    let top = (document.querySelector('app-' + name) as HTMLElement)?.offsetTop - 95;
    document.scrollingElement?.scrollTo({top: top, behavior: 'smooth'});
  }, 100);
}
