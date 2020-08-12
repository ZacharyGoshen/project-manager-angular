import { Component, ElementRef, EventEmitter, Input, OnInit, Output, Renderer2, ViewChild } from '@angular/core';

import { Task } from './../../models/task';
import { TaskService } from '../../services/task.service';
import { MessageService } from '../../services/message.service';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {
  @ViewChild('taskNameInput', { static: false }) taskNameInput: ElementRef;

  @Input() task: Task;
  @Output() deleteTaskEvent: EventEmitter<Task> = new EventEmitter<Task>();

  constructor(private renderer: Renderer2, private taskService: TaskService, private messageService: MessageService) { }

  ngOnInit() {
    this.onClickOutsideTaskNameInput();
  }

  updateTaskCompleted(): void {
    this.task.completed = !this.task.completed;
    this.taskService.updateTask(this.task).subscribe();
  }

  updateTaskName(name: string): void {
    name = name.trim();
    if (!name) {
      this.messageService.addMessage("A task's name must not be nothing");
      this.taskNameInput.nativeElement.value = this.task.name;
      this.taskNameInput.nativeElement.blur();
      return;
    }
    if (name.length > 100) {
      this.messageService.addMessage("A task's name can not be longer than 100 characters");
      this.taskNameInput.nativeElement.value = this.task.name;
      this.taskNameInput.nativeElement.blur();
      return;
    }
    this.task.name = name;
    this.taskService.updateTask(this.task).subscribe();
    this.taskNameInput.nativeElement.blur();
  }

  updateTaskPriority(priority: number) {
    this.task.priority = priority;
    this.taskService.updateTask(this.task).subscribe();
  }

  deleteTask(): void {
    this.deleteTaskEvent.emit(this.task);
  }

  onClickOutsideTaskNameInput(): void {
    this.renderer.listen('window', 'click', (event: Event) => {
      if (
        event.target != this.taskNameInput.nativeElement &&
        this.taskNameInput.nativeElement.value != this.task.name
      ) {
        this.updateTaskName(this.taskNameInput.nativeElement.value);
      }
    });
  }

  priorityToString(priority: number): string {
    switch (priority) {
      case 0:
        return "None";
      case 1:
        return "Very Low";
      case 2:
        return "Low";
      case 3:
        return "Medium";
      case 4:
        return "High";
      case 5:
        return "Very High";
    }
  }

}
