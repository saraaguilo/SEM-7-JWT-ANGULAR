import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private URL = 'http://localhost:3000/api';

  constructor(private http: HttpClient) { }

  getPrivateTasks() {
    // Obten el token de localStorage
    const token = this.getToken();

    // Configura las cabeceras con el token de autorización
    let headers = new HttpHeaders();
    if (token !== null) {
      headers = headers.set("x-access-token", token);
    } else {
      // Manejar el caso en el que token es nulo
    }

    // Realiza la solicitud GET con las cabeceras
    return this.http.get<any>(`${this.URL}/me`, { headers });
  }

  getToken() {
    return localStorage.getItem('token');
  }
}
