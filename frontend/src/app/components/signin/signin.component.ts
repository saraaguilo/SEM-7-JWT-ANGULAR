import { Component } from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';
@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent {
  user= {
    email:'',
    password:''
  }
  constructor(
    private authService: AuthService,
    private router: Router
  ){}
  signIn(){
    this.authService.signIn(this.user)
    .subscribe(
      res =>{
        console.log(res)
        localStorage.setItem('token',res.token);
        if(this.authService.loggedIn() && this.authService.getRole() == 'admin'){
        this.router.navigate(['private']);
        }
        if(this.authService.loggedIn() && this.authService.getRole() == 'client'){
          this.router.navigate(['public']);
          }
      },
      err => console.log(err)
      )
  }
}
