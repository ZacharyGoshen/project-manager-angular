import { Category } from "./category";

export interface Task {
  id: number,
  category: Category,
  name: string
}