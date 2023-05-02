import { PrismaClient } from "@prisma/client";

//const prismaClient = `__prevent-name-collision__prisma`;
type GlobalThisWithPrismaClient = typeof globalThis & {
  prismaClient: PrismaClient;
};

let prismaInit: PrismaClient;

if (process.env.NODE_ENV === "production") {
  prismaInit = new PrismaClient();
} else {
  if (!(global as GlobalThisWithPrismaClient).prismaClient) {
    (global as GlobalThisWithPrismaClient).prismaClient = new PrismaClient();
  }
  prismaInit = (global as GlobalThisWithPrismaClient).prismaClient;
}

export const prisma = prismaInit;
