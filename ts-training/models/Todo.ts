// src/models/Todo.ts

export interface Todo {
  id: string;
  title: string;
  description: string;
  priority: "low" | "medium" | "high";
  done: boolean;
  dueDate: Date;
  createdAt: Date;
}

export type TodoInput = Omit<Todo, "id" | "createdAt">;
