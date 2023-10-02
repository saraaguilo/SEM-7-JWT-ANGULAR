import { Component,OnInit} from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { TaskService } from '../../services/tasks.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-public-task',
  templateUrl: './public-task.component.html',
  styleUrls: ['./public-task.component.css']
})
export class PublicTaskComponent implements OnInit {
  user: any; 

  constructor(private authService: AuthService, private taskService: TaskService) { }

  ngOnInit(): void {
    const userRole = this.authService.getRole();
    if (this.authService.loggedIn() && userRole === 'client') {
      this.taskService.getPublicProfile().subscribe(
        (res) => {
          this.user = res.user; 
        },
        (err) => {
          console.error(err);
        }
      );
    }
  }
  }