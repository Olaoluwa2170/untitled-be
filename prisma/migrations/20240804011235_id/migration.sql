/*
  Warnings:

  - Added the required column `noTickets` to the `Event` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ticketImage` to the `Event` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Event" ADD COLUMN     "noTickets" INTEGER NOT NULL,
ADD COLUMN     "ticketImage" TEXT NOT NULL;
