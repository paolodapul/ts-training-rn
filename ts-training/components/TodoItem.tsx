// src/components/TodoItem.tsx

import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Todo } from "../models/Todo";
import { DateUtils } from "../utils/DateUtils";

interface Props {
  todo: Todo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

export const TodoItem: React.FC<Props> = ({ todo, onToggle, onDelete }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => onToggle(todo.id)}>
        <Text style={[styles.title, todo.done && styles.done]}>
          {todo.title}
        </Text>
      </TouchableOpacity>
      <Text style={styles.description}>{todo.description}</Text>
      <Text style={styles.date}>
        {DateUtils.formatDate(new Date(todo.dueDate))}
      </Text>
      <Text style={[styles.priority, styles[todo.priority]]}>
        {todo.priority}
      </Text>
      <TouchableOpacity onPress={() => onDelete(todo.id)}>
        <Text style={styles.deleteButton}>Delete</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
  },
  done: {
    textDecorationLine: "line-through",
  },
  description: {
    fontSize: 14,
  },
  date: {
    fontSize: 12,
    color: "#666",
  },
  priority: {
    fontSize: 12,
    fontWeight: "bold",
    marginBottom: 10,
  },
  low: { color: "green" },
  medium: { color: "orange" },
  high: { color: "red" },
  deleteButton: {
    width: "30%",
    textAlign: "center",
    padding: 5,
    borderRadius: 10,
    backgroundColor: "#fecaca",
    color: "red",
    fontSize: 12,
  },
});
