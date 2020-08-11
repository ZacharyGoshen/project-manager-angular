import { Category } from "./category";

export interface Task {
  id: number,
  name: string,
  completed: boolean,
  categoryId: number
}