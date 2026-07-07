-- AlterTable
ALTER TABLE "Book" ADD COLUMN     "publisherId" TEXT NOT NULL DEFAULT '6c25a6ed-7f1b-4690-8ef7-674a98f2fe72';

-- AddForeignKey
ALTER TABLE "Book" ADD CONSTRAINT "Book_publisherId_fkey" FOREIGN KEY ("publisherId") REFERENCES "Publisher"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
