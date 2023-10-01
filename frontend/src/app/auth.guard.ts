import { Injectable } from '@angular/core';
import { CanActivate} from '@angular/router';
import { AuthService } from './services/auth.service';
import {Router} from '@angular/router'; 

@Injectable({
  providedIn: 'root'
})
// Se encarga de ver si hay un token o no si no lo hay te devuelve a signin para que obtengas el token
export class AuthGuard implements CanActivate {

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  canActivate(): boolean {
    if (this.authService.loggedIn()) {
      return true;
    }
    this.router.navigate(['/signin']);
    return false;
  }

} 