import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ContactListComponent } from './contact-list/contact-list.component';
import { FavorisListComponent } from './favoris-list/favoris-list.component';

import { HttpClientModule } from '@angular/common/http';
import { DateSimplePipe } from './shared/date-simple.pipe';
import {ContactsService} from './service/contacts.service';
import { PersoUppercasePipe } from './shared/perso-uppercase.pipe';
import { ApiComponent } from './api/api.component';

@NgModule({
  declarations: [
    AppComponent,
    ContactListComponent,
    FavorisListComponent,
    DateSimplePipe,
    PersoUppercasePipe,
    ApiComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [ContactsService],
  bootstrap: [AppComponent],
})
export class AppModule { }
