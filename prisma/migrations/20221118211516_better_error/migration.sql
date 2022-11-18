/*
  Warnings:

  - You are about to drop the column `error` on the `ExpressInternalError` table. All the data in the column will be lost.
  - You are about to drop the column `errorObject` on the `ExpressInternalError` table. All the data in the column will be lost.
  - You are about to drop the column `statusCode` on the `ExpressInternalError` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "ExpressInternalError" DROP COLUMN "error",
DROP COLUMN "errorObject",
DROP COLUMN "statusCode";
