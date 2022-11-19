-- CreateTable
CREATE TABLE "TokenPurchase" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "token" TEXT NOT NULL,
    "amountBRL" DOUBLE PRECISION NOT NULL,
    "pix_id" INTEGER NOT NULL,
    "qr_code" TEXT NOT NULL,
    "ticket_url" TEXT NOT NULL,
    "paid" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "TokenPurchase_pkey" PRIMARY KEY ("id")
);
