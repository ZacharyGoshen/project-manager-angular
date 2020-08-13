import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';

import { Project } from '../models/project';
import { MessageService } from './message.service';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  private projectsUrl = 'projects';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient, private messageService: MessageService) { }

  getProjects(): Observable<Project[]> {
    return this.http.get<Project[]>(this.projectsUrl);
  }

  updateProject(project: Project): Observable<Project> {
    return this.http.put<Project>(this.projectsUrl, project, this.httpOptions);
  }

  deleteProject(project: Project): Observable<Project> {
    this.messageService.addMessage(`"${project.name}" deleted`, 'Delete Project');
    const url = `${this.projectsUrl}/${project.id}`;
    return this.http.delete<Project>(url, this.httpOptions);
  }

}
