import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Router} from '@angular/router';


// Define una interfaz que describe la estructura de 'user'
interface User {
  email: string;
  password: string;
  // Otras propiedades de 'user'
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private URL = 'http://localhost:3000/api/'

  constructor(private http: HttpClient,private router:Router) { }

  signUp(user: User) { // Especifica el tipo de 'user' como 'User'
    return this.http.post<any>(this.URL + '/signup', user);
  }
  signIn(user: User) { // Especifica el tipo de 'user' como 'User'
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

  inicio() {
    return this.http.get(this.URL + 'api/inicio').subscribe(
      res => {
        console.log(res);
      },
      err => console.log(err)
    )
  }
}
