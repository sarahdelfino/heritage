import { Routes } from '@angular/router';
import { BuildingTypePage } from './building-type-page/building-type-page';
import { Home } from './home/home';
import { WhyHeritagePage } from './why-heritage-page/why-heritage-page';
import { AboutPage } from './about-page/about-page';
import { ResourcesPage } from './resources-page/resources-page';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./home/home').then((m) => m.Home),
  },
  {
    path: 'about',
    loadComponent: () => import('./about-page/about-page').then((m) => m.AboutPage),
  },
    {
    path: 'contact',
    loadComponent: () => import('./contact-page/contact-page').then((m) => m.ContactPage),
  },
  {
    path: 'resources',
    loadComponent: () => import('./resources-page/resources-page').then((m) => m.ResourcesPage),
  },
  {
    path: 'resources/faqs',
    loadComponent: () => import('./resources-page/resources-page').then((m) => m.ResourcesPage),
  },
  {
    path: 'why-heritage',
    loadComponent: () =>
      import('./why-heritage-page/why-heritage-page').then((m) => m.WhyHeritagePage),
  },
  {
    path: 'building-types',
    loadComponent: () =>
      import('./building-type-landing/building-type-landing').then((m) => m.BuildingTypeLanding),
  },
  {
    path: 'building-types/:slug',
    loadComponent: () =>
      import('./building-type-page/building-type-page').then((m) => m.BuildingTypePage),
  },
];
