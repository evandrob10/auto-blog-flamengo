-- CreateTable
CREATE TABLE "Website" (
    "websiteID" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "urlwebsite" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "linksExtract" (
    "linkID" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "link" TEXT NOT NULL,
    "websiteID" INTEGER NOT NULL,
    CONSTRAINT "linksExtract_websiteID_fkey" FOREIGN KEY ("websiteID") REFERENCES "Website" ("websiteID") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "postCollect" (
    "postCollectID" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "linkExtractID" INTEGER NOT NULL,
    CONSTRAINT "postCollect_linkExtractID_fkey" FOREIGN KEY ("linkExtractID") REFERENCES "linksExtract" ("linkID") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Website_websiteID_key" ON "Website"("websiteID");

-- CreateIndex
CREATE UNIQUE INDEX "Website_urlwebsite_key" ON "Website"("urlwebsite");

-- CreateIndex
CREATE UNIQUE INDEX "linksExtract_linkID_key" ON "linksExtract"("linkID");

-- CreateIndex
CREATE UNIQUE INDEX "linksExtract_link_key" ON "linksExtract"("link");

-- CreateIndex
CREATE UNIQUE INDEX "postCollect_postCollectID_key" ON "postCollect"("postCollectID");

-- CreateIndex
CREATE UNIQUE INDEX "postCollect_linkExtractID_key" ON "postCollect"("linkExtractID");
