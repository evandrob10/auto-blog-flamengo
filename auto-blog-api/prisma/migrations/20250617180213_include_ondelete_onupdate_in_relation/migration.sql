-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Website" (
    "websiteID" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "urlwebsite" TEXT NOT NULL,
    "userID" INTEGER NOT NULL,
    CONSTRAINT "Website_userID_fkey" FOREIGN KEY ("userID") REFERENCES "User" ("userID") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Website" ("urlwebsite", "userID", "websiteID") SELECT "urlwebsite", "userID", "websiteID" FROM "Website";
DROP TABLE "Website";
ALTER TABLE "new_Website" RENAME TO "Website";
CREATE UNIQUE INDEX "Website_websiteID_key" ON "Website"("websiteID");
CREATE TABLE "new_linksExtract" (
    "linkID" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "link" TEXT NOT NULL,
    "websiteID" INTEGER NOT NULL,
    CONSTRAINT "linksExtract_websiteID_fkey" FOREIGN KEY ("websiteID") REFERENCES "Website" ("websiteID") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_linksExtract" ("link", "linkID", "websiteID") SELECT "link", "linkID", "websiteID" FROM "linksExtract";
DROP TABLE "linksExtract";
ALTER TABLE "new_linksExtract" RENAME TO "linksExtract";
CREATE UNIQUE INDEX "linksExtract_linkID_key" ON "linksExtract"("linkID");
CREATE UNIQUE INDEX "linksExtract_link_key" ON "linksExtract"("link");
CREATE TABLE "new_postCollect" (
    "postCollectID" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "dateTime" DATETIME,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "linkExtractID" INTEGER NOT NULL,
    CONSTRAINT "postCollect_linkExtractID_fkey" FOREIGN KEY ("linkExtractID") REFERENCES "linksExtract" ("linkID") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_postCollect" ("content", "dateTime", "linkExtractID", "postCollectID", "title") SELECT "content", "dateTime", "linkExtractID", "postCollectID", "title" FROM "postCollect";
DROP TABLE "postCollect";
ALTER TABLE "new_postCollect" RENAME TO "postCollect";
CREATE UNIQUE INDEX "postCollect_postCollectID_key" ON "postCollect"("postCollectID");
CREATE UNIQUE INDEX "postCollect_linkExtractID_key" ON "postCollect"("linkExtractID");
CREATE TABLE "new_postFinally" (
    "postFinallyID" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "summary" TEXT NOT NULL,
    "keywords" TEXT NOT NULL,
    "featuredPost" TEXT NOT NULL,
    "authorID" INTEGER NOT NULL,
    "postCollectID" INTEGER NOT NULL,
    CONSTRAINT "postFinally_authorID_fkey" FOREIGN KEY ("authorID") REFERENCES "User" ("userID") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "postFinally_postCollectID_fkey" FOREIGN KEY ("postCollectID") REFERENCES "postCollect" ("postCollectID") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_postFinally" ("authorID", "content", "featuredPost", "keywords", "postCollectID", "postFinallyID", "summary", "title") SELECT "authorID", "content", "featuredPost", "keywords", "postCollectID", "postFinallyID", "summary", "title" FROM "postFinally";
DROP TABLE "postFinally";
ALTER TABLE "new_postFinally" RENAME TO "postFinally";
CREATE UNIQUE INDEX "postFinally_postFinallyID_key" ON "postFinally"("postFinallyID");
CREATE UNIQUE INDEX "postFinally_authorID_key" ON "postFinally"("authorID");
CREATE UNIQUE INDEX "postFinally_postCollectID_key" ON "postFinally"("postCollectID");
CREATE TABLE "new_webConfig" (
    "webConfigID" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "typeAwaitLoad" TEXT NOT NULL,
    "selectAwaitLoad" TEXT,
    "selectorPosts" TEXT NOT NULL,
    "selectorTitle" TEXT NOT NULL,
    "selectorContent" TEXT NOT NULL,
    "websiteID" INTEGER NOT NULL,
    CONSTRAINT "webConfig_websiteID_fkey" FOREIGN KEY ("websiteID") REFERENCES "Website" ("websiteID") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_webConfig" ("selectAwaitLoad", "selectorContent", "selectorPosts", "selectorTitle", "typeAwaitLoad", "webConfigID", "websiteID") SELECT "selectAwaitLoad", "selectorContent", "selectorPosts", "selectorTitle", "typeAwaitLoad", "webConfigID", "websiteID" FROM "webConfig";
DROP TABLE "webConfig";
ALTER TABLE "new_webConfig" RENAME TO "webConfig";
CREATE UNIQUE INDEX "webConfig_webConfigID_key" ON "webConfig"("webConfigID");
CREATE UNIQUE INDEX "webConfig_websiteID_key" ON "webConfig"("websiteID");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
