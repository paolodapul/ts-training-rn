// src/hooks/useTodos.ts

import { useState, useEffect, useCallback } from "react";
import { Todo, TodoInput } from "../models/Todo";
import { TodoService } from "../services/TodoService";

export function useTodos() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const todoService = TodoService.getInstance();

  const loadTodos = useCallback(async () => {
    const loadedTodos = await todoService.getTodos();
    setTodos(loadedTodos);
  }, []);

  useEffect(() => {
    loadTodos();
  }, [loadTodos]);

  const addTodo = async (todoInput: TodoInput) => {
    const newTodo = await todoService.addTodo(todoInput);
    setTodos((prevTodos) => [...prevTodos, newTodo]);
  };

  const updateTodo = async (id: string, updates: Partial<TodoInput>) => {
    const updatedTodo = await todoService.updateTodo(id, updates);
    if (updatedTodo) {
      setTodos((prevTodos) =>
        prevTodos.map((todo) => (todo.id === id ? updatedTodo : todo))
      );
    }
  };

  const deleteTodo = async (id: string) => {
    const success = await todoService.deleteTodo(id);
    if (success) {
      setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
    }
  };

  return { todos, addTodo, updateTodo, deleteTodo };
}
