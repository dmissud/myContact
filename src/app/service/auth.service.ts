import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() {
  }

  getTokenFromLocalStorage(): string {
    return localStorage.getItem('token');
  }

  setTokenInLocalStorage(value: string): void {
    localStorage.setItem('token', value);
  }

  isLogin(): boolean {
    return (this.getTokenFromLocalStorage() !== null);
  }
}
