// src/components/TodoForm.tsx

import React, { useState } from "react";
import { View, TextInput, Button, StyleSheet } from "react-native";
import { TodoInput } from "../models/Todo";
import { validateTodoInput } from "../utils/ValidationUtils";

interface Props {
  onSubmit: (todo: TodoInput) => void;
}

export const TodoForm: React.FC<Props> = ({ onSubmit }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [priority, setPriority] = useState<"low" | "medium" | "high">("medium");

  const handleSubmit = () => {
    const todoInput: TodoInput = {
      title,
      description,
      dueDate: new Date(dueDate),
      priority,
      done: false,
    };

    const validationError = validateTodoInput(todoInput);
    if (validationError) {
      alert(validationError);
      return;
    }

    onSubmit(todoInput);
    setTitle("");
    setDescription("");
    setDueDate("");
    setPriority("medium");
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        value={title}
        onChangeText={setTitle}
        placeholder="Title"
      />
      <TextInput
        style={styles.input}
        value={description}
        onChangeText={setDescription}
        placeholder="Description"
      />
      <TextInput
        style={styles.input}
        value={dueDate}
        onChangeText={setDueDate}
        placeholder="Due Date (YYYY-MM-DD)"
      />
      {/* Add a proper date picker in a real app */}
      <Button title="Add Todo" onPress={handleSubmit} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 8,
    marginBottom: 10,
  },
});
