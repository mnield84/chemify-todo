import * as React from "react";
import { Box, Flex, Title, Text, List, ActionIcon } from "@mantine/core";
import { Todo, UpdateTodoArgs } from "../types";
import { formatDateIntl } from "../utils/formatDate";
import { IconArrowBackUp, IconCircleCheck } from "@tabler/icons-react";
import { UseMutateFunction } from "@tanstack/react-query";

type CompletedArgs = {
  completed?: Todo[];
  onUpdate: UseMutateFunction<Todo, Error, UpdateTodoArgs, unknown>;
};

export const CompletedTodo = ({ completed, onUpdate }: CompletedArgs) => {
  const hasCompletedTodos = completed?.some((todo) => todo.done);

  if (!hasCompletedTodos) {
    return;
  }

  const handleToggleDone = async (id: string, title: string, done: boolean) => {
    onUpdate({
      id,
      todo: {
        title,
        done: done,
      },
    });
  };

  return (
    <Box py={20} role="region" aria-labelledby="completed-tasks-title">
      <Title order={3} mb={20} id="completed-tasks-title">
        Completed
      </Title>
      <List className="todo-list" role="list">
        {completed?.map((todo) =>
          todo.done ? (
            <List.Item key={todo.id} className="todo-list-item" role="listitem">
              <Flex align="center" direction="row" style={{ width: "100%" }}>
                <IconCircleCheck color="teal" aria-hidden="true" />
                <Flex ml="md" direction="column">
                  <Text fw={700}>{todo.title}</Text>
                  <Text size="sm">
                    Task Completed: {formatDateIntl(todo.updatedAt)}
                  </Text>
                </Flex>
                <ActionIcon
                  variant="transparent"
                  className="todo-action-icon"
                  onClick={() =>
                    handleToggleDone(todo.id, todo.title, !todo.done)
                  }
                  aria-label={`Mark ${todo.title} as not completed`}
                >
                  <IconArrowBackUp />
                </ActionIcon>
              </Flex>
            </List.Item>
          ) : null
        )}
      </List>
    </Box>
  );
};
