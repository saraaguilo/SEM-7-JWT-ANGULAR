import { Component, OnInit } from '@angular/core';
import { TaskService } from '../../services/tasks.service'

@Component({
  selector: 'app-private-tasks',
  templateUrl: './private-tasks.component.html',
  styleUrls: ['./private-tasks.component.css']
})
export class PrivateTasksComponent implements OnInit {
  userData: any;

  constructor(private taskService: TaskService) { }

  ngOnInit(): void {
    this.taskService.getPrivateTasks().subscribe(
      (res: any) => {
        this.userData = res;
        console.log('Datos del usuario:', this.userData);
      },
      (err: any) => {
        console.error('Error al obtener los datos del usuario:', err);
      }
    );
  }
}