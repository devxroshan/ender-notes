import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../generated/prisma/client.js";

const connectionString = process.env.DATABASE_URL;

if (connectionString === undefined) {
  throw new Error("DATABASE_URL is not set. Check your .env file and that it's loaded before this module runs.");
}

const adapter = new PrismaPg({ connectionString: connectionString.toString() });
const prisma = new PrismaClient({ adapter });

export { prisma };
