/*
  Warnings:

  - A unique constraint covering the columns `[title,author,publishedYear]` on the table `Book` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Book_title_author_publishedYear_key" ON "Book"("title", "author", "publishedYear");
