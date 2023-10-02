import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private URL = 'http://localhost:3000/api';

  constructor(private http: HttpClient) { }

  getPrivateTasks() {
    const token = this.getToken(); 
    let headers = new HttpHeaders();
    if (token !== null) {
      headers = headers.set("x-access-token", token);
    } else {
    }   
    return this.http.get<any>(`${this.URL}/private`, { headers });
  }
  getPublicProfile() {
    const token = this.getToken();
    let headers = new HttpHeaders();
    if (token !== null) {
      headers = headers.set("x-access-token", token);
    } else {
    }
    return this.http.get<any>(`${this.URL}/public`, { headers });
  }
  getToken() {
    return localStorage.getItem('token');
  }
}
