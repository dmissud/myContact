import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {IContact} from '../models/contact.interface';
import {environment} from '../../environments/environment';
import {BehaviorSubject, Observable} from 'rxjs';
import {AuthService} from './auth.service';


@Injectable({
  providedIn: 'root'
})
export class ContactsService {

  sortByNameAscOrDsc: string;
  private contactsSubject: BehaviorSubject<IContact[]> = new BehaviorSubject([]);
  public contacts: Observable<IContact[]> = this.contactsSubject.asObservable();
  private metasSubject: BehaviorSubject<any> = new BehaviorSubject({});
  public meta: Observable<any> = this.metasSubject.asObservable();
  private favorsSubject = new BehaviorSubject([]);
  public favors: Observable<IContact[]> = this.favorsSubject.asObservable();
  private API = environment.API_CONTACT_URL;

  constructor(private http: HttpClient, private authService: AuthService) {
    this.sortByNameAscOrDsc = 'ASC';
  }

  addFavoris(contact: IContact): void {
    const fav = this.favorsSubject.getValue();
    const pos = fav.indexOf(contact);
    if (pos < 0) {
      contact.isFavoris = true;
      this.favorsSubject.next([...fav, contact]);
    } else {
      contact.isFavoris = false;
      fav.splice(pos, 1);
      this.favorsSubject.next(fav);
    }
    this.sortFavoris();
  }

  sortContactsByName(): void {
    this.sortByNameAscOrDsc === 'ASC' ? this.sortByNameAscOrDsc = 'DSC' : this.sortByNameAscOrDsc = 'ASC';
    this.doSort();
  }

  doSort(): void {
    this.sortContacts();
    this.sortFavoris();
  }

  retrieveContacts(): void {
    this.loadContacts(this.http.get(this.API + '/users'));
  }

  loadUsersWithMetaPagination(pageNumber: number): void {
    if (pageNumber < 1) {
      pageNumber = 1;
    } else {
      if (pageNumber > this.metasSubject.value.pagination.pages) {
        pageNumber = this.metasSubject.value.pagination.pages;
      }
    }
    this.loadContacts(this.http.get(this.API + '/users?page=' + pageNumber));
  }

  removeContactOnDb(contact: IContact): void {
    this.http.delete('https://gorest.co.in/public-api/users/' + contact.id).toPromise()
      .then((response: any) => {
        if (response.code === 204) {
          this.contactsSubject.value.splice(this.contactsSubject.value.indexOf(contact), 1);
          if (contact.isFavoris === true) {
            this.favorsSubject.value.splice(this.favorsSubject.value.indexOf(contact), 1);
          }
        }
      })
      .catch(err => console.log(err));
  }

  private loadContacts(observableContact: Observable<any>): void {
    observableContact
      .toPromise()
      .then((response: any) => {
        const newSetOfContact: IContact[] = response.data as IContact[];
        let newSetOfFavors = this.favorsSubject.getValue();
        newSetOfContact.map((contact: IContact) => {
          const favorToUpdate = newSetOfFavors.find((favor: IContact) => favor.id === contact.id);
          if (favorToUpdate !== undefined) {
            contact.isFavoris = true;
            newSetOfFavors.splice(newSetOfFavors.indexOf(favorToUpdate), 1);
            newSetOfFavors = [...newSetOfFavors, contact];
          }
        });
        this.contactsSubject.next(newSetOfContact);
        this.favorsSubject.next(newSetOfFavors);
        this.metasSubject.next(response.meta);
      })
      .then(() => this.doSort());
  }

  private sortFavoris(): void {
    this.favorsSubject.getValue().sort((a, b) => {
      if (this.sortByNameAscOrDsc === 'ASC') {
        return a.name < b.name ? -1 : 1;
      } else {
        return b.name < a.name ? -1 : 1;
      }
    });
  }

  private sortContacts(): void {
    this.contactsSubject.getValue().sort((a, b) => {
      if (this.sortByNameAscOrDsc === 'ASC') {
        return a.name < b.name ? -1 : 1;
      } else {
        return b.name < a.name ? -1 : 1;
      }
    });
  }

}

