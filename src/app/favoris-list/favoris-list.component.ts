import {Component, OnInit} from '@angular/core';
import {ContactsService} from '../service/contacts.service';
import {IContact} from '../models/contact.interface';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-favoris-list',
  templateUrl: './favoris-list.component.html',
  styleUrls: ['./favoris-list.component.scss']
})
export class FavorisListComponent implements OnInit {

  favors$: Observable<IContact[]>;

  constructor(private contactsService: ContactsService) {
  }

  ngOnInit(): void {
    this.favors$ = this.contactsService.favors;
  }

  removeFavoris(favori: IContact): void {
    this.contactsService.addFavoris(favori);
  }
}
