import { useQuery } from "@tanstack/react-query";
import { getTodoById } from "../services/todoService";
import { Todo } from "../types";

export const useTodoById = (todoId: string) => {
  return useQuery<Todo, Error>({
    queryKey: ["todo", todoId],
    queryFn: () => getTodoById(todoId),
    enabled: !!todoId, // Only fetch the todo if the ID is provided
  });
};
