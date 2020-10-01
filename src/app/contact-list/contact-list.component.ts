import {Component, OnInit} from '@angular/core';
import {IContact} from '../models/contact.interface';
import {ContactsService} from '../service/contacts.service';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {AuthService} from '../service/auth.service';

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.scss']
})
export class ContactListComponent implements OnInit {

  contacts$: Observable<IContact[]>;
  meta$: Observable<any>;

  constructor(private contactsService: ContactsService, private authService: AuthService) {
  }

  get sortByNameAscOrDsc(): string {
    return this.contactsService.sortByNameAscOrDsc;
  }

  ngOnInit(): void {
    this.contacts$ = this.contactsService.contacts;
    this.meta$ = this.contactsService.meta;
  }

  addFavoris(contact: IContact): void {
    this.contactsService.addFavoris(contact);
  }

  search($event: string): void {
    $event = $event.toLowerCase();
    this.contacts$ = this.contactsService.contacts.pipe(
      map(contacts =>
        contacts.filter(contact => contact.name.toLowerCase().includes($event))));
  }

  sortByName(): void {
    this.contactsService.sortContactsByName();
  }

  previousPage(actualPage: number): void {
    this.contactsService.loadUsersWithMetaPagination(actualPage - 1);
  }

  nextPage(actualPage: number): void {
    this.contactsService.loadUsersWithMetaPagination(actualPage + 1);
  }

  deleteContact(contact: IContact): void {
    if (confirm('Supprimer le contact : ' + contact.name)) {
      this.contactsService.removeContactOnDb(contact);
    }
  }

  isLogin(): boolean {
    return this.authService.isLogin();
  }
}

