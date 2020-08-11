import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';

import { Category } from '../models/category';
import { MessageService } from './message.service';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private categoriesUrl = 'categories';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient, private messageService: MessageService) { }

  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(this.categoriesUrl);
  }

  addCategory(category: Category): Observable<Category> {
    this.messageService.addMessage(`Created new category: ${category.name}`);
    return this.http.post<Category>(this.categoriesUrl, category, this.httpOptions);
  }

  deleteCategory(category: Category): Observable<Category> {
    this.messageService.addMessage(`Deleted category: ${category.name}`);
    const url = `${this.categoriesUrl}/${category.id}`;
    return this.http.delete<Category>(url, this.httpOptions);
  }
}
