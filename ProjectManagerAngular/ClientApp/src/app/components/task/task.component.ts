import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';

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

  @Input() task: Task
  @Output() deleteTaskEvent: EventEmitter<Task> = new EventEmitter<Task>();

  constructor(private taskService: TaskService, private messageService: MessageService) { }

  ngOnInit() {
    
  }

  updateTaskName(name: string): void {
    name = name.trim();
    if (!name) {
      this.messageService.addMessage("A task's name must not be nothing");
      return;
    }
    if (name.length > 50) {
      this.messageService.addMessage("A task's name can not be longer than 100 characters");
      return;
    }
    this.task.name = name;
    this.taskService.updateTask(this.task).subscribe();
    this.taskNameInput.nativeElement.blur(); ``
  }

  deleteTask(): void {
    this.deleteTaskEvent.emit(this.task);
  }

}
