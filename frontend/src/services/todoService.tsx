import axios from "axios";
import { CreateTodo, DeleteTodoArgs, Todo, UpdateTodoArgs } from "../types";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const getAllTodos = async (): Promise<Todo[]> => {
  try {
    const response = await axios.get(`${API_BASE_URL}/todos`);
    return response.data.data;
  } catch (error) {
    console.error("Error fetching todos:", error);
    throw new Error("Failed to fetch todos.");
  }
};

export const createTodo = async (todo: CreateTodo): Promise<Todo[]> => {
  try {
    const response = await axios.post(`${API_BASE_URL}/todos`, todo);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error(
        "Error creating todo:",
        error.response?.data || error.message
      );
      throw new Error(
        error.response?.data?.error ||
          "An error occurred while creating the todo."
      );
    } else {
      console.error("Unexpected error:", error);
      throw new Error("An unexpected error occurred.");
    }
  }
};

export const deleteTodo = async ({ id }: DeleteTodoArgs): Promise<void> => {
  const response = await fetch(`${API_BASE_URL}/todos/${id}`, {
    method: "DELETE",
  });
  if (!response.ok) {
    throw new Error("Failed to delete todo");
  }
};

export const updateTodo = async ({
  id,
  todo,
}: UpdateTodoArgs): Promise<Todo> => {
  try {
    const response = await axios.put(`${API_BASE_URL}/todos/${id}`, todo);
    return response.data;
  } catch (error) {
    console.error("Error fetching todo:", error);
    throw new Error("Failed to fetch todo.");
  }
};

export const getTodoById = async (todoId: string): Promise<Todo> => {
  try {
    const response = await axios.get(`${API_BASE_URL}/todos/${todoId}`);
    return response.data.data;
  } catch (error) {
    console.error("Error fetching todo:", error);
    throw new Error("Failed to fetch todo.");
  }
};
