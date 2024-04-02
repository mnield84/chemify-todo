import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { todoSchema } from "../schemas/todoSchema";
import { useTodos } from "../hooks/useTodos";
import { TextInput, Button, Box } from "@mantine/core";

interface AddTodoFormProps {
  onClose: () => void;
}

type FormData = {
  title: string;
};

export const AddTodoForm = ({ onClose }: AddTodoFormProps) => {
  const { createTodoMutation } = useTodos();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(todoSchema),
  });

  const onSubmit: SubmitHandler<FormData> = (data) => {
    createTodoMutation(data, {
      onSuccess: () => {
        reset();
        onClose();
      },
    });
  };

  return (
    <Box mx="auto" py={20}>
      <form onSubmit={handleSubmit(onSubmit)} data-testid="create-todo-form">
        <TextInput
          label="Title"
          placeholder="Enter todo title"
          {...register("title")}
          error={errors.title?.message}
          id="title"
          name="title"
        />
        <Button type="submit" mt="md">
          Create Todo
        </Button>
        <Button variant="outline" mt="md" ml="sm" onClick={onClose}>
          Cancel
        </Button>
      </form>
    </Box>
  );
};
