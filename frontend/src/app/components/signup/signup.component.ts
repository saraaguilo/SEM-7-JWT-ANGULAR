import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  user = {
    username: '',
    email: '',
    password: '',
    rol: ''
  }
  constructor(
    private authService: AuthService,
    private router: Router
  ) { }
  updateRol(selectedRol: string) {
    this.user.rol = selectedRol;
  }
  signUp() {
    if (this.user.rol === '') {
      console.error('Debes seleccionar una opción (admin o client)');
    } else {
      this.authService.signUp(this.user)
        .subscribe(
          res => {
            console.log(res);
            this.router.navigate(['signin']);
          },
          err => console.log(err)
        )
    }
  }
}
