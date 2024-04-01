// hooks/useTodos.ts
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getAllTodos,
  createTodo,
  updateTodo,
  deleteTodo,
} from "../services/todoService"; // Ensure UpdateTodoArgs is imported

export const useTodos = () => {
  const queryClient = useQueryClient();

  const {
    data: todos,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["todos"],
    queryFn: () => getAllTodos(),
    staleTime: Infinity,
  });

  const { mutateAsync: createTodoMutation } = useMutation({
    mutationFn: createTodo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });

  const { mutate: updateTodoMutation } = useMutation({
    mutationFn: updateTodo,
    onSuccess: (data, variables) => {
      queryClient.setQueryData(["todos", { id: variables.id }], data);
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });

  // Delete Mutation
  const { mutate: deleteTodoMutation } = useMutation({
    mutationFn: deleteTodo,
    onSuccess: (data, variables) => {
      queryClient.setQueryData(["todos", { id: variables.id }], data);
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });

  return {
    todos,
    isLoading,
    isError,
    error,
    createTodoMutation,
    updateTodoMutation,
    deleteTodoMutation,
  };
};
