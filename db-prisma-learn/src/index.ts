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

  // const newUser = await prisma.user.create({
  //   data: {
  //     name: "Joko",
  //     email : "Joko12@gmail.com",
  //   },
  // });

  const allUsers = await prisma.user.findMany();
  console.log(allUsers);

  // const userUpdated = await prisma.user.update({
  //   where: { id: 2 },
  //   data: { name: "Joko Widodo", email: "joko777@gmail.com" },
  // });
  // console.log(`User Data ${userUpdated.name} after update : `, userUpdated);

  const userDeleted = await prisma.user.delete({
    where: { id: 1 },
  });
  console.log(`User with ${userDeleted.id} deleted successful :`, userDeleted);
};

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => await prisma.$disconnect());
