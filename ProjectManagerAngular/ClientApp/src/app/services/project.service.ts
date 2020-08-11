import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';

import { Project } from '../models/project';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  private projectsUrl = 'projects';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) { }

  getProject(): Observable<Project> {
    return this.http.get<Project>(this.projectsUrl);
  }
}
