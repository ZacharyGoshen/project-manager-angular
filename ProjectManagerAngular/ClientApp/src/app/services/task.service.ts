import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { Task } from './../models/task';
import { TASKS } from './../data/task-data';
import { MessageService } from './message.service';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private tasksUrl = 'tasks';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient, private messageService: MessageService) { }

  getTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(this.tasksUrl);
  }

  addTask(task: Task): Observable<Task> {
    this.messageService.addMessage(`Created new task: ${task.name}`);
    return this.http.post<Task>(this.tasksUrl, task, this.httpOptions);
  }

  deleteTask(task: Task): Observable<Task> {
    this.messageService.addMessage(`Deleted task: ${task.name}`);
    const url = `${this.tasksUrl}/${task.id}`;
    return this.http.delete<Task>(url, this.httpOptions);
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      this.messageService.addMessage(`${operation} failed: ${error.message}`);
      return of(result as T);
    }
  }
}
