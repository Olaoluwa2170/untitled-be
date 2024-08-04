/*
  Warnings:

  - You are about to drop the column `uniqueId` on the `Event` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "Event_uniqueId_key";

-- AlterTable
ALTER TABLE "Event" DROP COLUMN "uniqueId";
