import { Component, ElementRef, EventEmitter, Input, OnInit, Output, Renderer2, ViewChild } from '@angular/core';

import { Task } from './../../models/task';
import { CategoryService } from './../../services/category.service';
import { TaskService } from './../../services/task.service';
import { MessageService } from '../../services/message.service';
import { Category } from '../../models/category';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

  @ViewChild('categoryNameInput', { static: false }) categoryNameInput: ElementRef;
  @ViewChild('newTaskButton', { static: false }) newTaskButton: ElementRef;
  @ViewChild('newTaskInput', { static: false }) newTaskInput: ElementRef;

  @Input() category: Category;
  @Output() deleteCategoryEvent: EventEmitter<Category> = new EventEmitter<Category>();

  tasks: Task[];
  categoryNameInputHidden: boolean = true;
  newTaskInputHidden: boolean = true;

  constructor(private renderer: Renderer2, private categoryService: CategoryService, private taskService: TaskService, private messageService: MessageService) { }

  ngOnInit() {
    this.getTasksInCategory();
    this.onClickOutsideNewTaskInput();
    this.onClickOutsideCategoryNameInput()
  }

  deleteCategory(): void {
    this.deleteCategoryEvent.emit(this.category);
  }

  getTasksInCategory(): void {
    this.taskService.getTasksInCategory(this.category.id)
      .subscribe(tasks => this.tasks = tasks);
  }

  addTask(name: string): void {
    name = name.trim();
    if (!name) {
      this.messageService.addMessage('Name can not be empty', 'Create Task');
      return;
    }
    if (name.length > 100) {
      this.messageService.addMessage('Name must be 100 characters or less', 'Create Task');
      return;
    }
    this.taskService.addTask({ name: name, categoryId: this.category.id } as Task)
      .subscribe(task => {
        this.tasks.push(task);
      });
    this.hideNewTaskInput();
  }

  deleteTask($event): void {
    this.tasks = this.tasks.filter(t => t !== $event);
    this.taskService.deleteTask($event).subscribe();
  }

  updateCategoryName(name: string): void {
    name = name.trim();
    if (!name) {
      this.messageService.addMessage('Name can not be empty', 'Update Category');
      this.categoryNameInput.nativeElement.value = this.category.name;
      this.categoryNameInput.nativeElement.blur();
      return;
    }
    if (name.length > 50) {
      this.messageService.addMessage('Name must be 50 characters or less', 'Update Category');
      this.categoryNameInput.nativeElement.value = this.category.name;
      this.categoryNameInput.nativeElement.blur();
      return;
    }
    this.category.name = name;
    this.categoryService.updateCategory(this.category).subscribe();
    this.categoryNameInput.nativeElement.blur();
  }

  onClickOutsideCategoryNameInput(): void {
    this.renderer.listen('window', 'click', (event: Event) => {
      if (
        event.target != this.categoryNameInput.nativeElement &&
        this.categoryNameInput.nativeElement.value != this.category.name
      ) {
        this.updateCategoryName(this.categoryNameInput.nativeElement.value);
      }
    });
  }

  showNewTaskInput(): void {
    this.newTaskInputHidden = !this.newTaskInputHidden;
    setTimeout(() => {
      this.newTaskInput.nativeElement.focus();
      this.newTaskInput.nativeElement.select();
    }, 0);
  }

  hideNewTaskInput(): void {
    this.newTaskInputHidden = !this.newTaskInputHidden;
    this.newTaskInput.nativeElement.value = '';
  }

  onClickOutsideNewTaskInput(): void {
    this.renderer.listen('window', 'click', (event: Event) => {
      if (
        event.target != this.newTaskButton.nativeElement &&
        event.target != this.newTaskInput.nativeElement &&
        !this.newTaskInputHidden
      ) {
        this.hideNewTaskInput();
      }
    });
  }

}
