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

  const allUsers = await prisma.user.findMany();
  console.log(allUsers);
};

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => await prisma.$disconnect());
