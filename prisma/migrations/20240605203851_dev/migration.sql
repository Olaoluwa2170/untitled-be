/*
  Warnings:

  - The `prices` column on the `Event` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `date` column on the `Event` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Event" DROP COLUMN "prices",
ADD COLUMN     "prices" JSONB[],
DROP COLUMN "date",
ADD COLUMN     "date" TIMESTAMP(3)[];
