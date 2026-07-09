import { Routes } from '@angular/router';
import { BuildingTypePage } from './building-type-page/building-type-page';
import { Home } from './home/home';
import { WhyHeritagePage } from './why-heritage-page/why-heritage-page';
import { AboutPage } from './about-page/about-page';
import { ResourcesPage } from './resources-page/resources-page';

export const routes: Routes = [
    { path: '', component: Home },
        { path: 'about', component: AboutPage },
            { path: 'resources', component: ResourcesPage },
    { path: 'why-heritage', component: WhyHeritagePage },
    {
        path: ':slug',
        component: BuildingTypePage,
    },
];
