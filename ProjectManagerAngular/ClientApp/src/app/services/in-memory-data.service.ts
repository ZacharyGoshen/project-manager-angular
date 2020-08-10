import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';

import { Task } from './../models/task';

@Injectable({
  providedIn: 'root',
})
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const categories = [
      { id: 11, name: 'category one' },
      { id: 12, name: 'category two' },
      { id: 13, name: 'category three' },
    ];
    const tasks = [
      { id: 11, name: 'task one' },
      { id: 12, name: 'task two' },
      { id: 13, name: 'task three' },
      { id: 14, name: 'task four' },
      { id: 15, name: 'task five' },
      { id: 16, name: 'task six' },
      { id: 17, name: 'task seven' },
      { id: 18, name: 'task eight' },
      { id: 19, name: 'task nine' },
      { id: 20, name: 'task ten' }
    ];
    return { tasks };
  }

  // Overrides the genId method to ensure that a task always has an id.
  // If the tasks array is empty,
  // the method below returns the initial number (11).
  // if the tasks array is not empty, the method below returns the highest
  // hero id + 1.
  genId(tasks: Task[]): number {
    return tasks.length > 0 ? Math.max(...tasks.map(task => task.id)) + 1 : 11;
  }
}
