/*
  Warnings:

  - Added the required column `postCollectID` to the `postFinally` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_postFinally" (
    "postFinallyID" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "summary" TEXT NOT NULL,
    "keywords" TEXT NOT NULL,
    "postCollectID" INTEGER NOT NULL,
    CONSTRAINT "postFinally_postCollectID_fkey" FOREIGN KEY ("postCollectID") REFERENCES "postCollect" ("postCollectID") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_postFinally" ("content", "keywords", "postFinallyID", "summary", "title") SELECT "content", "keywords", "postFinallyID", "summary", "title" FROM "postFinally";
DROP TABLE "postFinally";
ALTER TABLE "new_postFinally" RENAME TO "postFinally";
CREATE UNIQUE INDEX "postFinally_postFinallyID_key" ON "postFinally"("postFinallyID");
CREATE UNIQUE INDEX "postFinally_postCollectID_key" ON "postFinally"("postCollectID");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
