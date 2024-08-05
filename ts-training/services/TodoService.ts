// src/services/TodoService.ts

import AsyncStorage from "@react-native-async-storage/async-storage";
import { Todo, TodoInput } from "../models/Todo";

export class TodoService {
  private static instance: TodoService;
  private readonly STORAGE_KEY = "@todos";

  private constructor() {}

  static getInstance(): TodoService {
    if (!TodoService.instance) {
      TodoService.instance = new TodoService();
    }
    return TodoService.instance;
  }

  async getTodos(): Promise<Todo[]> {
    const todosJson = await AsyncStorage.getItem(this.STORAGE_KEY);
    return todosJson ? JSON.parse(todosJson) : [];
  }

  async addTodo(todoInput: TodoInput): Promise<Todo> {
    const todos = await this.getTodos();
    const newTodo: Todo = {
      ...todoInput,
      id: Date.now().toString(),
      createdAt: new Date(),
    };
    todos.push(newTodo);
    await AsyncStorage.setItem(this.STORAGE_KEY, JSON.stringify(todos));
    return newTodo;
  }

  async updateTodo(
    id: string,
    updates: Partial<TodoInput>
  ): Promise<Todo | null> {
    const todos = await this.getTodos();
    const todoIndex = todos.findIndex((todo) => todo.id === id);
    if (todoIndex === -1) return null;

    todos[todoIndex] = { ...todos[todoIndex], ...updates };
    await AsyncStorage.setItem(this.STORAGE_KEY, JSON.stringify(todos));
    return todos[todoIndex];
  }

  async deleteTodo(id: string): Promise<boolean> {
    const todos = await this.getTodos();
    const updatedTodos = todos.filter((todo) => todo.id !== id);
    if (updatedTodos.length === todos.length) return false;

    await AsyncStorage.setItem(this.STORAGE_KEY, JSON.stringify(updatedTodos));
    return true;
  }
}
