-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "public";

-- CreateEnum
CREATE TYPE "Attendance" AS ENUM ('yes', 'no', 'unknown');

-- CreateTable
CREATE TABLE "post_stats" (
    "slug" TEXT NOT NULL,
    "readCount" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "post_stats_pkey" PRIMARY KEY ("slug")
);

-- CreateTable
CREATE TABLE "page_stats" (
    "page" TEXT NOT NULL,
    "viewCount" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "page_stats_pkey" PRIMARY KEY ("page")
);

-- CreateTable
CREATE TABLE "referrals" (
    "slug" TEXT NOT NULL,
    "source" TEXT NOT NULL,
    "count" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "referrals_pkey" PRIMARY KEY ("slug","source")
);

-- CreateTable
CREATE TABLE "invites" (
    "slug" TEXT NOT NULL,
    "displayName" TEXT NOT NULL,

    CONSTRAINT "invites_pkey" PRIMARY KEY ("slug")
);

-- CreateTable
CREATE TABLE "guests" (
    "id" SERIAL NOT NULL,
    "inviteSlug" TEXT NOT NULL,
    "position" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "willAttend" "Attendance" NOT NULL DEFAULT 'unknown',
    "foodPreferences" TEXT NOT NULL DEFAULT '',
    "bio" TEXT NOT NULL DEFAULT '',
    "willSpeak" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "guests_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "guests_inviteSlug_position_key" ON "guests"("inviteSlug", "position");

-- AddForeignKey
ALTER TABLE "guests" ADD CONSTRAINT "guests_inviteSlug_fkey" FOREIGN KEY ("inviteSlug") REFERENCES "invites"("slug") ON DELETE CASCADE ON UPDATE CASCADE;
