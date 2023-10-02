import { Component, OnInit } from '@angular/core';
import { TaskService } from '../../services/tasks.service';
import { AuthService } from 'src/app/services/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-private-tasks',
  templateUrl: './private-tasks.component.html',
  styleUrls: ['./private-tasks.component.css']
})
export class PrivateTasksComponent implements OnInit {
  userData: any;
  user = {
    username: '',
    email: '',
    password: '',
    rol: ''
  }
  
  constructor(private taskService: TaskService, private router: Router, private authService: AuthService) { }

  ngOnInit(): void {
    const userRole = this.authService.getRole();
    if (this.authService.loggedIn() && userRole === 'admin') {
    this.taskService.getPrivateTasks().subscribe(
      (res: any) => {
        this.userData = res;
      },
      (err: any) => {
        console.error('Error al obtener los datos del usuario:', err);
      }
    );
  }
}
}