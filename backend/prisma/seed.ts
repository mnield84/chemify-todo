import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const todoData = [
  { title: 'Do the laundry', done: false },
  { title: 'Wash the dishes', done: false },
  { title: 'Vacuum living room', done: false },
  { title: 'Take out the trash', done: false },
  { title: 'Water the plants', done: false },
  { title: 'Clean the bathroom', done: false },
  { title: 'Grocery shopping', done: false },
  { title: 'Prepare dinner', done: false },
  { title: 'Mow the lawn', done: false },
  { title: 'Organize the garage', done: false },
];

async function main() {
  console.log(`Start seeding ...`);
  
  // Delete all existing Todos
  await prisma.todo.deleteMany({});
  console.log(`Deleted all existing todos.`);

  // Seed new Todos
  for (const t of todoData) {
    const todo = await prisma.todo.create({
      data: t,
    });
    console.log(`Created todo with id: ${todo.id}`);
  }
  console.log(`Seeding finished.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
