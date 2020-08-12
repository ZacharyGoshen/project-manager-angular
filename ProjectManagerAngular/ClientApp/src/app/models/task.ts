import { Category } from "./category";

export interface Task {
  id: number,
  name: string,
  completed: boolean,
  priority: number,
  dueDateStart: string,
  dueDateEnd: string,
  categoryId: number
}