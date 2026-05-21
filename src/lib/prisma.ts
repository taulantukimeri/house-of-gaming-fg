import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient };

function makePrisma() {
  return new PrismaClient({
    log: process.env.NODE_ENV === "development" ? ["error", "warn"] : ["error"],
  });
}

// Proxy defers engine binary loading until the first actual DB call,
// so a binary mismatch shows as a page error instead of a 503 crash.
export const prisma: PrismaClient = new Proxy({} as PrismaClient, {
  get(_, prop) {
    if (!globalForPrisma.prisma) {
      globalForPrisma.prisma = makePrisma();
    }
    return Reflect.get(globalForPrisma.prisma, prop, globalForPrisma.prisma);
  },
});
