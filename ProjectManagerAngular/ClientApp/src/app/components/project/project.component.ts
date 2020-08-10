import { Component, OnInit } from '@angular/core';

import { Category } from '../../models/category';
import { CategoryService } from './../../services/category.service';
import { MessageService } from '../../services/message.service';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent implements OnInit {

  categories: Category[];

  constructor(private categoryService: CategoryService, private messageService: MessageService) { }

  ngOnInit() {
    this.getCategories();
  }

  getCategories(): void {
    this.categoryService.getCategories()
      .subscribe(categories => this.categories = categories);
  }

  addCategory(name: string): void {
    name = name.trim();
    if (!name) {
      this.messageService.addMessage('A category can not be created without a name');
      return;
    }
    if (name.length > 50) {
      this.messageService.addMessage("A category's name can not be longer than 50 characters");
      return;
    }
    this.categoryService.addCategory({ name: name } as Category)
      .subscribe(category => {
        this.categories.push(category);
      });
  }

}
