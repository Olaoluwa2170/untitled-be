/*
  Warnings:

  - A unique constraint covering the columns `[uniqueId]` on the table `Event` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Event" ADD COLUMN     "uniqueId" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Event_uniqueId_key" ON "Event"("uniqueId");
