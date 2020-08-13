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
    this.messageService.addMessage(`"${category.name}" created`, 'Create Category');
    return this.http.post<Category>(this.categoriesUrl, category, this.httpOptions);
  }

  updateCategory(category: Category): Observable<Category> {
    return this.http.put<Category>(this.categoriesUrl, category, this.httpOptions);
  }

  deleteCategory(category: Category): Observable<Category> {
    this.messageService.addMessage(`"${category.name}" deleted`, 'Delete Category');
    const url = `${this.categoriesUrl}/${category.id}`;
    return this.http.delete<Category>(url, this.httpOptions);
  }
}
