import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';
import { TaskService } from './services/tasks.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(public authService: AuthService,public taskService: TaskService){}
}
