// src/screens/HomeScreen.tsx

import React from "react";
import { View, StyleSheet } from "react-native";
import { TodoList } from "../components/TodoList";
import { TodoForm } from "../components/TodoForm";
import { useTodos } from "../hooks/useTodos";

export const HomeScreen: React.FC = () => {
  const { todos, addTodo, updateTodo, deleteTodo } = useTodos();

  return (
    <View style={styles.container}>
      <TodoForm onSubmit={addTodo} />
      <TodoList
        todos={todos}
        onToggle={(id) =>
          updateTodo(id, { done: !todos.find((t) => t.id === id)?.done })
        }
        onDelete={deleteTodo}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
});
