import {Component, OnInit} from '@angular/core';
import {ContactsService} from './service/contacts.service';
import {AuthService} from './service/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'myContact';

  constructor(private contactsService: ContactsService, private authService: AuthService) {
  }

  ngOnInit(): void {
    this.contactsService.retrieveContacts();
  }

  login(): void {
    this.authService.setTokenInLocalStorage('a1c1f76c86a131c60779a250f23a34eeb5e519cc46349f5ad6ae37860cdc296a');
  }

  logout(): void {
    localStorage.clear();
  }

  isLogin(): boolean {
    return this.authService.isLogin();
  }
}
