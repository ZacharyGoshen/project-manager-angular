import { Component, Input, OnInit, Renderer2 } from '@angular/core';

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

  @Input() category: Category;
  tasks: Task[];

  constructor(private renderer: Renderer2, private taskService: TaskService, private messageService: MessageService) { }

  ngOnInit() {
    this.getTasksInCategory();
  }

  getTasksInCategory(): void {
    this.taskService.getTasksInCategory(this.category.id)
      .subscribe(tasks => this.tasks = tasks);
  }

  addTask(name: string): void {
    name = name.trim();
    if (!name) {
      this.messageService.addMessage('A task can not be created without a name');
      return;
    }
    if (name.length > 100) {
      this.messageService.addMessage("A task's name can not be longer than 100 characters");
      return;
    }
    this.taskService.addTask({ name: name, categoryId: this.category.id } as Task)
      .subscribe(task => {
        this.tasks.push(task);
      });
  }

  deleteTask($event): void {
    this.tasks = this.tasks.filter(t => t !== $event);
    this.taskService.deleteTask($event).subscribe();
  }

}
