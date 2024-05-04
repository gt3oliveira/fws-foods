/*
  Warnings:

  - The primary key for the `UserFavouriteRestaurant` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `UserFavouriteRestaurant` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "UserFavouriteRestaurant" DROP CONSTRAINT "UserFavouriteRestaurant_pkey",
DROP COLUMN "id",
ADD CONSTRAINT "UserFavouriteRestaurant_pkey" PRIMARY KEY ("userId", "restaurantId");
