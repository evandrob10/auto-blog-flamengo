/*
  Warnings:

  - You are about to drop the column `dataTime` on the `postCollect` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_postCollect" (
    "postCollectID" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "dateTime" DATETIME,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "linkExtractID" INTEGER NOT NULL,
    CONSTRAINT "postCollect_linkExtractID_fkey" FOREIGN KEY ("linkExtractID") REFERENCES "linksExtract" ("linkID") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_postCollect" ("content", "linkExtractID", "postCollectID", "title") SELECT "content", "linkExtractID", "postCollectID", "title" FROM "postCollect";
DROP TABLE "postCollect";
ALTER TABLE "new_postCollect" RENAME TO "postCollect";
CREATE UNIQUE INDEX "postCollect_postCollectID_key" ON "postCollect"("postCollectID");
CREATE UNIQUE INDEX "postCollect_linkExtractID_key" ON "postCollect"("linkExtractID");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
