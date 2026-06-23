import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "./generated/client";
import "dotenv/config";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({
  adapter,
  log: ["query", "info", "warn", "error"],
});

const main = async () => {
  console.log("Prisma connection successfully connected");

  await prisma.$transaction(async (tx) => {
    const newUser = await tx.user.create({
      data: {
        name: "Ahmad",
        email: "ahmad123@gmail.com",
      },
    });

    const newPost = await tx.post.create({
      data: {
        title: "Post pertama Ahmad",
        author_id: newUser.id,
      },
    });

    console.log("Transaction has been successful : ", newUser, newPost);
  });

  const allUsers = await prisma.user.findMany();
  console.log(allUsers);
};

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => await prisma.$disconnect());
