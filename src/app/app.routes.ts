import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    data: {
      seo: 'home',
    },
    loadComponent: () =>
      import('./home/home').then((m) => m.Home),
  },
  {
    path: 'about',
    data: {
      seo: 'about',
    },
    loadComponent: () =>
      import('./about-page/about-page').then((m) => m.AboutPage),
  },
  {
    path: 'contact',
    data: {
      seo: 'contact',
    },
    loadComponent: () =>
      import('./contact-page/contact-page').then((m) => m.ContactPage),
  },
  {
    path: 'resources',
    data: {
      seo: 'resources',
    },
    loadComponent: () =>
      import('./resources-page/resources-page').then((m) => m.ResourcesPage),
  },
  {
    path: 'why-heritage',
    data: {
      seo: 'why-heritage',
    },
    loadComponent: () =>
      import('./why-heritage-page/why-heritage-page').then(
        (m) => m.WhyHeritagePage
      ),
  },
  {
    path: 'building-types',
    data: {
      seo: 'building-types',
    },
    loadComponent: () =>
      import('./building-type-landing/building-type-landing').then(
        (m) => m.BuildingTypeLanding
      ),
  },
  {
    path: 'building-types/:slug',
    loadComponent: () =>
      import('./building-type-page/building-type-page').then(
        (m) => m.BuildingTypePage
      ),
  },
  {
    path: 'design-your-building',
    data: {
      seo: 'design-your-building',
    },
    loadComponent: () =>
      import('./designer-page/designer-page').then(
        (m) => m.DesignerPage
      ),
  },
];