import {Routes} from '@angular/router';
import {HomeComponent} from './pages/home/home.component';
import {ProjectComponent} from './pages/project/project.component';
import {MerchComponent} from './pages/merch/merch.component';

export const routes: Routes = [
  {path: "", component: HomeComponent},
  {path: "projects/:id", component: ProjectComponent},
  {path: "merch", component: MerchComponent},
];
