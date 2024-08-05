// src/utils/ValidationUtils.ts

import { TodoInput } from "../models/Todo";

export function validateTodoInput(input: TodoInput): string | null {
  if (input.title.trim().length === 0) {
    return "Title cannot be empty";
  }
  if (input.description.trim().length === 0) {
    return "Description cannot be empty";
  }
  if (input.dueDate < new Date()) {
    return "Due date cannot be in the past";
  }
  return null;
}
