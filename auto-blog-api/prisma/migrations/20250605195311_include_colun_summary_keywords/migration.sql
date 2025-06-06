/*
  Warnings:

  - Added the required column `keywords` to the `postFinally` table without a default value. This is not possible if the table is not empty.
  - Added the required column `summary` to the `postFinally` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_postFinally" (
    "postFinallyID" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "summary" TEXT NOT NULL,
    "keywords" TEXT NOT NULL
);
INSERT INTO "new_postFinally" ("content", "postFinallyID", "title") SELECT "content", "postFinallyID", "title" FROM "postFinally";
DROP TABLE "postFinally";
ALTER TABLE "new_postFinally" RENAME TO "postFinally";
CREATE UNIQUE INDEX "postFinally_postFinallyID_key" ON "postFinally"("postFinallyID");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
