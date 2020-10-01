import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import { ApiComponent } from './api/api.component';
import { ContactListComponent } from './contact-list/contact-list.component';

const routes: Routes = [{path: '', component: ContactListComponent},
  {path: 'api', component: ApiComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
