-- CreateTable
CREATE TABLE "ExpressInternalError" (
    "uuid" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "message" TEXT NOT NULL,
    "stack" TEXT NOT NULL,
    "statusCode" INTEGER NOT NULL,
    "error" TEXT NOT NULL,
    "errorObject" TEXT NOT NULL,

    CONSTRAINT "ExpressInternalError_pkey" PRIMARY KEY ("uuid")
);
