export interface CreateTodo {
  title: string;
  done?: boolean;
}

export interface Todo extends CreateTodo {
  id: string;
  title: string;
  done?: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface UpdateTodoArgs {
  id: string;
  todo: CreateTodo;
}

export interface DeleteTodoArgs {
  id: string;
}
