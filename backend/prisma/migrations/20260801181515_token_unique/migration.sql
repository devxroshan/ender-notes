/*
  Warnings:

  - A unique constraint covering the columns `[token]` on the table `ExchangeToken` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "ExchangeToken_token_key" ON "ExchangeToken"("token");
