-- CreateTable
CREATE TABLE "webConfig" (
    "webConfigID" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "typeAwaitLoad" TEXT NOT NULL,
    "selectAwaitLoad" TEXT,
    "selectorPosts" TEXT NOT NULL,
    "selectorTitle" TEXT NOT NULL,
    "selectorContent" TEXT NOT NULL,
    "websiteID" INTEGER NOT NULL,
    CONSTRAINT "webConfig_websiteID_fkey" FOREIGN KEY ("websiteID") REFERENCES "Website" ("websiteID") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "webConfig_webConfigID_key" ON "webConfig"("webConfigID");

-- CreateIndex
CREATE UNIQUE INDEX "webConfig_websiteID_key" ON "webConfig"("websiteID");
