/*
  Warnings:

  - The values [DESDE_15_A_45] on the enum `Edad` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "Edad_new" AS ENUM ('DESDE_18_A_45', 'MAS_45');
ALTER TABLE "Respuesta" ALTER COLUMN "edad" TYPE "Edad_new" USING ("edad"::text::"Edad_new");
ALTER TYPE "Edad" RENAME TO "Edad_old";
ALTER TYPE "Edad_new" RENAME TO "Edad";
DROP TYPE "Edad_old";
COMMIT;
