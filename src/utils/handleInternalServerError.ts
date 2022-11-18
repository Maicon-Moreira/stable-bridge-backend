import { PrismaClient } from "@prisma/client";
import express from "express";

const prisma = new PrismaClient();

async function handleInternalServerError(
  error: any,
  req: express.Request,
  res: express.Response
) {
  //   model ExpressInternalError {
  //     uuid      String   @id @default(cuid())
  //     createdAt DateTime @default(now())
  //     updatedAt DateTime @updatedAt
  //     message   String
  //     stack     String
  //   }

  const { message, stack } = error;
  const internalError = await prisma.expressInternalError.create({
    data: {
      message,
      stack,
    },
  });
  return res.status(500).json({
    error: `Internal server error. Please contact support with the following code: ${internalError.uuid}`,
  });
}

export default handleInternalServerError;
