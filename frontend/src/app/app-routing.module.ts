import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
//Components
import {PrivateTasksComponent} from './components/private-tasks/private-tasks.component'
import {SignupComponent} from './components/signup/signup.component'
import {SigninComponent} from './components/signin/signin.component'
import{AuthGuard} from './auth.guard';


const routes: Routes = [
  {
    path:'',
    redirectTo:'/signin',
    pathMatch:'full'
  },
  {
    path:'me',
    component: PrivateTasksComponent,
     canActivate: [AuthGuard]
  },
  {
    path:'signup',
    component:SignupComponent
  },
  {
    path:'signin',
    component:SigninComponent
  }


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
