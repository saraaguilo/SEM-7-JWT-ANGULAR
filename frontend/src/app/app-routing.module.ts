import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
//Components
import {PrivateTasksComponent} from './components/private-tasks/private-tasks.component'
import {SignupComponent} from './components/signup/signup.component'
import {SigninComponent} from './components/signin/signin.component'
import{AuthGuard} from './auth.guard';
import {PublicTaskComponent} from './components/public-task/public-task.component'

const routes: Routes = [
  {
    path:'',
    redirectTo:'/signin',
    pathMatch:'full'
  },
  {
    path:'private',
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
  },
  {
    path:'public',
    component:PublicTaskComponent,
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
