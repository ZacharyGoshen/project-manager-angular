import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { Task } from './../models/task';
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

  getTasksInCategory(categoryId: number): Observable<Task[]> {
    return this.http.get<Task[]>(`${this.tasksUrl}?categoryId=${categoryId}`);
  }

  addTask(task: Task): Observable<Task> {
    this.messageService.addMessage(`"${task.name}" created`, 'Create Task');
    return this.http.post<Task>(this.tasksUrl, task, this.httpOptions);
  }

  updateTask(task: Task): Observable<Task> {
    return this.http.put<Task>(this.tasksUrl, task, this.httpOptions);
  }

  deleteTask(task: Task): Observable<Task> {
    this.messageService.addMessage(`"${task.name}" deleted`, 'Delete Task');
    const url = `${this.tasksUrl}/${task.id}`;
    return this.http.delete<Task>(url, this.httpOptions);
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      this.messageService.addMessage(error.message, operation);
      return of(result as T);
    }
  }

}
