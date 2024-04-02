import React, { useState } from "react";
import {
  List,
  Text,
  Paper,
  TextInput,
  Button,
  Flex,
  ActionIcon,
} from "@mantine/core";
import { IconCircle } from "@tabler/icons-react";
import { DeleteTodoArgs, Todo, UpdateTodoArgs } from "../types";
import { UseMutateFunction } from "@tanstack/react-query";
import { formatDateIntl } from "../utils/formatDate";
import { zodResolver } from "@hookform/resolvers/zod";
import { todoSchema } from "../schemas/todoSchema";
import { SubmitHandler, useForm } from "react-hook-form";

type TodoListProps = {
  todos?: Todo[];
  onUpdate: UseMutateFunction<Todo, Error, UpdateTodoArgs, unknown>;
  onDelete: UseMutateFunction<void, Error, DeleteTodoArgs, unknown>;
};

const TodoList: React.FC<TodoListProps> = ({ todos, onUpdate, onDelete }) => {
  const [editId, setEditId] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<Todo>({
    resolver: zodResolver(todoSchema),
  });

  const handleEdit = (todo: Todo) => {
    setEditId(todo.id);
    setValue("title", todo.title);
  };

  const handleSave: SubmitHandler<Todo> = async (data) => {
    if (editId) {
      onUpdate({
        id: editId,
        todo: data,
      });
      setEditId(null);
      reset();
    }
  };

  const handleDelete = async (id: string) => {
    onDelete({
      id,
    });
  };

  const handleToggleDone = async (id: string, title: string, done: boolean) => {
    onUpdate({
      id,
      todo: {
        title,
        done,
      },
    });
  };

  const sortedTodos = todos
    ?.filter((todo) => !todo.done)
    .sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );

  const isEmpty = sortedTodos?.length === 0;

  if (isEmpty) {
    return (
      <Paper mt="md" my={20}>
        <Text size="md">Please add a new task</Text>
      </Paper>
    );
  }

  return (
    <Paper mt="md">
      <List className="todo-list">
        {sortedTodos?.map((todo) => (
          <List.Item
            key={todo.id}
            className="todo-list-item"
            data-testid={`todo-${todo.id}`}
          >
            {editId === todo.id ? (
              <form onSubmit={handleSubmit(handleSave)}>
                <TextInput
                  {...register("title")}
                  label="Title"
                  error={errors.title?.message}
                />
                <Flex align="center" mt="sm">
                  <Button type="submit">Save</Button>
                  <Button
                    onClick={() => setEditId(null)}
                    variant="outline"
                    ml="sm"
                  >
                    Cancel
                  </Button>
                </Flex>
              </form>
            ) : (
              <Flex align="center" direction="row" style={{ width: "100%" }}>
                <ActionIcon
                  variant="transparent"
                  color="#3A3A3C"
                  onClick={() =>
                    handleToggleDone(todo.id, todo.title, !todo.done)
                  }
                  aria-label="Toggle done"
                >
                  <IconCircle />
                </ActionIcon>
                <Flex ml="md" direction="column">
                  <Text fw={700}>{todo.title}</Text>
                  <Flex align="center">
                    <Text size="sm" fw={600}>
                      Task Created:
                    </Text>
                    <Text size="sm">{formatDateIntl(todo.createdAt)}</Text>
                  </Flex>
                </Flex>
                <Flex className="todo-controls" align="center" ml="auto">
                  <Button onClick={() => handleEdit(todo)} size="xs" ml="md">
                    Edit
                  </Button>
                  <Button
                    onClick={() => handleDelete(todo.id)}
                    size="xs"
                    ml="md"
                    color="red"
                  >
                    Delete
                  </Button>
                </Flex>
              </Flex>
            )}
          </List.Item>
        ))}
      </List>
    </Paper>
  );
};

export default TodoList;
