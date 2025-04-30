import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from './pages/home/home.component';
import {ProjectComponent} from './pages/project/project.component';
import {MerchComponent} from './pages/merch/merch.component';
import {TeamComponent} from './pages/team/team.component';
import {ContactsComponent} from './pages/contacts/contacts.component';

export const routes: Routes = [
  {path: "", component: HomeComponent},
  {path: "projects/:id", component: ProjectComponent},
  {path: "merch", component: MerchComponent},
  {path: "workforempire", component: TeamComponent},
  {path: "contacts", component: ContactsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {scrollPositionRestoration: 'enabled'})],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
