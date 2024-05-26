-- CreateTable
CREATE TABLE "urls" (
    "id" TEXT NOT NULL,
    "original" TEXT NOT NULL,
    "short" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "urls_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "urls_original_key" ON "urls"("original");

-- CreateIndex
CREATE UNIQUE INDEX "urls_short_key" ON "urls"("short");
