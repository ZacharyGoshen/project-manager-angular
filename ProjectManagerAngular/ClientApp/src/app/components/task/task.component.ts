import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { Task } from './../../models/task';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {
  @Input() task: Task
  @Output() deleteTaskEvent: EventEmitter<Task> = new EventEmitter<Task>();

  constructor() { }

  ngOnInit() {
    
  }

  deleteTask(): void {
    this.deleteTaskEvent.emit(this.task);
  }

}
