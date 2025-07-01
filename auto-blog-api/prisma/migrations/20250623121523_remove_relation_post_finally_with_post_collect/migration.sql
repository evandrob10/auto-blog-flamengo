/*
  Warnings:

  - You are about to drop the column `postCollectID` on the `postFinally` table. All the data in the column will be lost.

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
    "featuredPost" TEXT NOT NULL,
    "authorID" INTEGER NOT NULL,
    CONSTRAINT "postFinally_authorID_fkey" FOREIGN KEY ("authorID") REFERENCES "User" ("userID") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_postFinally" ("authorID", "content", "featuredPost", "keywords", "postFinallyID", "summary", "title") SELECT "authorID", "content", "featuredPost", "keywords", "postFinallyID", "summary", "title" FROM "postFinally";
DROP TABLE "postFinally";
ALTER TABLE "new_postFinally" RENAME TO "postFinally";
CREATE UNIQUE INDEX "postFinally_postFinallyID_key" ON "postFinally"("postFinallyID");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
