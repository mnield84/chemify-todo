# Chemify-mn

Chemify-mn is a project structured with a split frontend and backend architecture, designed to streamline the development process of modern web applications. This README provides an overview of the project setup, including scripts to manage both environments efficiently.

## Project Structure

- **Backend**: The backend directory contains the server-side code of the application, utilizing Prisma as an ORM for database operations.
- **Frontend**: The frontend directory houses the client-side code, responsible for rendering the user interface and handling user interactions.

## Available Scripts

In the project directory, you can run the following scripts:

- **`npm run install:backend`**: Installs the necessary dependencies for the backend.
- **`npm run generate:prisma`**: Generates the Prisma client, essential for interacting with the database through Prisma.
- **`npm run prisma:seed`**: Seeds the database using the Prisma seed script, located in the `prisma/seed.ts` file.
- **`npm run prisma:studio`**: Opens Prisma Studio, a visual editor for your database, allowing for easy manipulation and querying of data.
- **`npm run dev:backend`**: Starts the backend development server.
- **`npm run dev:frontend`**: Launches the frontend development server.
- **`npm run cy:open`**: Launches cypress testing suite.
- **`npm run dev:studio`**: Opens Prisma Studio for database management.
- **`npm run dev`**: Runs the backend, frontend, cypress and Prisma Studio concurrently, allowing for a seamless development experience across the full stack.

## Clone the project

To clone the project run the following inside you terminal at your desired directory.

```bash
git clone git@github.com:mnield84/chemify-todo.git
```

Once cloned cd into the project root.

```bash
cd chemify-todo
```

## Getting Started

To get started with developing on chemify-mn, do the following:

```bash
npm install
npm run install:backend
```

```bash
cd frontend
npm install
```

Once that has run if you navigate to the frontend directory and create a .env file and paste the following:

```bash
VITE_API_BASE_URL=http://localhost:8080
```

Once the setup is complete, you can start the development servers for both frontend and backend by running the following commmand at the root of the project.

```bash
cd ..
npm run dev
```

You can view the application locally at:

[Chemify-mn](http://localhost:5173 "Todos")
