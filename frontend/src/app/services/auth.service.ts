import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Router} from '@angular/router';

interface User {
  email: string;
  password: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private URL = 'http://localhost:3000/api/'

  constructor(private http: HttpClient,private router:Router) { }

  signUp(user: User) { 
    return this.http.post<any>(this.URL + '/signup', user);
  }
  signIn(user: User) { 
    return this.http.post<any>(this.URL + '/signin', user);
  }
  loggedIn() {
    return !!localStorage.getItem('token');
  }
  getToken() {
    return localStorage.getItem('token')
  }
  logout(){
    localStorage.removeItem('token');
    this.router.navigate(['/signin']);
  }
  getRole() {
    const token = this.getToken();
    if (token) {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.rol; 
    }
    return null; 
  }
}
