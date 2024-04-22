/*
  Warnings:

  - Added the required column `commentId` to the `CommentLike` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "CommentLike" ADD COLUMN     "commentId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "CommentLike" ADD CONSTRAINT "CommentLike_commentId_fkey" FOREIGN KEY ("commentId") REFERENCES "Comment"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
