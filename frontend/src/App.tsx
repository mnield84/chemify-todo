import React from "react";
import "./App.css";
import { useTodos } from "./hooks/useTodos";
import { AddTodoForm } from "./components/AddTodoForm";
import TodoList from "./components/TodoList";
import { Button, Flex, Title } from "@mantine/core";
import { CompletedTodo } from "./components/CompletedTodo";

function App() {
  const [showForm, setShowForm] = React.useState(false);
  const {
    todos,
    isLoading,
    isError,
    error,
    updateTodoMutation,
    deleteTodoMutation,
  } = useTodos();

  if (isLoading) {
    return (
      <div role="alert" aria-busy="true">
        Loading todos...
      </div>
    );
  }

  if (isError && error) {
    return <div role="alert">Error loading todos: {error.message}</div>;
  }

  return (
    <main className="todo-container" aria-labelledby="main-title">
      <Flex direction="row" align="center">
        <Title order={1} id="main-title">
          Todos
        </Title>

        <Button
          className="create-todo-button"
          onClick={() => setShowForm(!showForm)}
          aria-expanded={showForm}
          color="#3A3A3C"
        >
          {showForm ? "Close Form" : "Create Todo"}
        </Button>
      </Flex>

      {showForm && <AddTodoForm onClose={() => setShowForm(false)} />}

      <TodoList
        todos={todos?.filter((todo) => !todo.done)}
        onUpdate={updateTodoMutation}
        onDelete={deleteTodoMutation}
      />
      <CompletedTodo
        completed={todos?.filter((todo) => todo.done)}
        onUpdate={updateTodoMutation}
      />
    </main>
  );
}

export default App;
