import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { Task } from './../models/task';
import { TASKS } from './../data/task-data';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private tasksUrl = 'tasks';

  constructor(private http: HttpClient) { }

  getTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(this.tasksUrl);
  }
}
