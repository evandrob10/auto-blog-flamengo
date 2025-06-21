-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_postCollect" (
    "postCollectID" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "dateTime" TEXT,
    "linkExtractID" INTEGER NOT NULL,
    CONSTRAINT "postCollect_linkExtractID_fkey" FOREIGN KEY ("linkExtractID") REFERENCES "linksExtract" ("linkID") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_postCollect" ("content", "dateTime", "linkExtractID", "postCollectID", "title") SELECT "content", "dateTime", "linkExtractID", "postCollectID", "title" FROM "postCollect";
DROP TABLE "postCollect";
ALTER TABLE "new_postCollect" RENAME TO "postCollect";
CREATE UNIQUE INDEX "postCollect_postCollectID_key" ON "postCollect"("postCollectID");
CREATE UNIQUE INDEX "postCollect_linkExtractID_key" ON "postCollect"("linkExtractID");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
