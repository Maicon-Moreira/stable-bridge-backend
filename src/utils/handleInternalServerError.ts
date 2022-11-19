// import { PrismaClient } from "@prisma/client";
import express from "express";

// const prisma = new PrismaClient();

async function handleInternalServerError(
  error: any,
  req: express.Request,
  res: express.Response
) {
  const { message, stack } = error;
  // const internalError = await prisma.expressInternalError.create({
  //   data: {
  //     message,
  //     stack,
  //   },
  // });
  if (process.env.NODE_ENV === "development") {
    console.error(error);
  }
  return res.status(500).json({
    // error: `Internal server error. Please contact support with the following code: ${internalError.uuid}`,
    error: `Internal server error. Please contact support with the following code:`,
  });
}

export default handleInternalServerError;
