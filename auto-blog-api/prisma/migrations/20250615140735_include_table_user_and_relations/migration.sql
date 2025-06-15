/*
  Warnings:

  - Added the required column `userID` to the `Website` table without a default value. This is not possible if the table is not empty.
  - Added the required column `authorID` to the `postFinally` table without a default value. This is not possible if the table is not empty.
  - Added the required column `featuredPost` to the `postFinally` table without a default value. This is not possible if the table is not empty.

*/
-- CreateTable
CREATE TABLE "User" (
    "userID" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Website" (
    "websiteID" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "urlwebsite" TEXT NOT NULL,
    "userID" INTEGER NOT NULL,
    CONSTRAINT "Website_userID_fkey" FOREIGN KEY ("userID") REFERENCES "User" ("userID") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Website" ("urlwebsite", "websiteID") SELECT "urlwebsite", "websiteID" FROM "Website";
DROP TABLE "Website";
ALTER TABLE "new_Website" RENAME TO "Website";
CREATE UNIQUE INDEX "Website_websiteID_key" ON "Website"("websiteID");
CREATE TABLE "new_postFinally" (
    "postFinallyID" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "summary" TEXT NOT NULL,
    "keywords" TEXT NOT NULL,
    "featuredPost" TEXT NOT NULL,
    "authorID" INTEGER NOT NULL,
    "postCollectID" INTEGER NOT NULL,
    CONSTRAINT "postFinally_authorID_fkey" FOREIGN KEY ("authorID") REFERENCES "User" ("userID") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "postFinally_postCollectID_fkey" FOREIGN KEY ("postCollectID") REFERENCES "postCollect" ("postCollectID") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_postFinally" ("content", "keywords", "postCollectID", "postFinallyID", "summary", "title") SELECT "content", "keywords", "postCollectID", "postFinallyID", "summary", "title" FROM "postFinally";
DROP TABLE "postFinally";
ALTER TABLE "new_postFinally" RENAME TO "postFinally";
CREATE UNIQUE INDEX "postFinally_postFinallyID_key" ON "postFinally"("postFinallyID");
CREATE UNIQUE INDEX "postFinally_authorID_key" ON "postFinally"("authorID");
CREATE UNIQUE INDEX "postFinally_postCollectID_key" ON "postFinally"("postCollectID");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

-- CreateIndex
CREATE UNIQUE INDEX "User_userID_key" ON "User"("userID");
