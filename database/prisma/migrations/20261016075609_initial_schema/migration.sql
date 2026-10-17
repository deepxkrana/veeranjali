-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('USER', 'CONTRIBUTOR', 'ADMIN');

-- CreateEnum
CREATE TYPE "ApplicationStatus" AS ENUM ('PENDING', 'APPROVED', 'REJECTED');

-- CreateEnum
CREATE TYPE "VerificationStatus" AS ENUM ('OFFICIALLY_DOCUMENTED', 'VERIFIED_MULTIPLE_SOURCES', 'FAMILY_SUBMITTED', 'COMMUNITY_SUBMITTED', 'UNDER_REVIEW', 'INFORMATION_INCOMPLETE');

-- CreateEnum
CREATE TYPE "ApprovalStatus" AS ENUM ('PENDING', 'APPROVED', 'REJECTED');

-- CreateEnum
CREATE TYPE "StoryStatus" AS ENUM ('DRAFT', 'SUBMITTED_FOR_REVIEW', 'NEEDS_CHANGES', 'RESUBMITTED', 'APPROVED', 'PUBLISHED', 'ARCHIVED', 'REJECTED');

-- CreateEnum
CREATE TYPE "CorrectionStatus" AS ENUM ('PENDING', 'IN_REVIEW', 'ACCEPTED', 'RESOLVED', 'REJECTED');

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password_hash" TEXT,
    "image" TEXT,
    "bio" TEXT,
    "location" TEXT,
    "role" "UserRole" NOT NULL DEFAULT 'USER',
    "email_verified" TIMESTAMP(3),
    "suspended_at" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "contributor_applications" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "reason" TEXT NOT NULL,
    "relevant_experience" TEXT,
    "supporting_links" TEXT,
    "status" "ApplicationStatus" NOT NULL DEFAULT 'PENDING',
    "admin_note" TEXT,
    "reviewed_by" TEXT,
    "reviewed_at" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "contributor_applications_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "people" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "full_name" TEXT NOT NULL,
    "display_name" TEXT,
    "aliases" TEXT,
    "profile_image" TEXT,
    "force" TEXT,
    "rank" TEXT,
    "service_number" TEXT,
    "date_of_birth" TIMESTAMP(3),
    "date_of_death" TIMESTAMP(3),
    "place_of_birth" TEXT,
    "hometown" TEXT,
    "district" TEXT,
    "state" TEXT,
    "country" TEXT DEFAULT 'India',
    "short_summary" TEXT,
    "full_biography" TEXT,
    "education" TEXT,
    "family_background" TEXT,
    "date_joined_service" TIMESTAMP(3),
    "place_of_death" TEXT,
    "circumstances_of_death" TEXT,
    "death_terminology" TEXT DEFAULT 'died_in_service',
    "verification_status" "VerificationStatus" NOT NULL DEFAULT 'UNDER_REVIEW',
    "featured" BOOLEAN NOT NULL DEFAULT false,
    "published_at" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "people_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "service_records" (
    "id" TEXT NOT NULL,
    "person_id" TEXT NOT NULL,
    "organization" TEXT,
    "force" TEXT,
    "rank" TEXT,
    "unit" TEXT,
    "regiment" TEXT,
    "battalion" TEXT,
    "posting" TEXT,
    "location" TEXT,
    "start_date" TIMESTAMP(3),
    "end_date" TIMESTAMP(3),
    "description" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "service_records_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "timeline_events" (
    "id" TEXT NOT NULL,
    "person_id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "date" TIMESTAMP(3),
    "location" TEXT,
    "event_type" TEXT,
    "display_order" INTEGER NOT NULL DEFAULT 0,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "timeline_events_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "awards" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "category" TEXT,
    "description" TEXT,
    "issuing_authority" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "awards_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "person_awards" (
    "person_id" TEXT NOT NULL,
    "award_id" TEXT NOT NULL,
    "citation" TEXT,
    "date" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "person_awards_pkey" PRIMARY KEY ("person_id","award_id")
);

-- CreateTable
CREATE TABLE "operations" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "start_date" TIMESTAMP(3),
    "end_date" TIMESTAMP(3),
    "location" TEXT,
    "historical_context" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "operations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "person_operations" (
    "person_id" TEXT NOT NULL,
    "operation_id" TEXT NOT NULL,
    "role" TEXT,
    "description" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "person_operations_pkey" PRIMARY KEY ("person_id","operation_id")
);

-- CreateTable
CREATE TABLE "sources" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "publisher" TEXT,
    "author" TEXT,
    "source_type" TEXT,
    "url" TEXT,
    "publication_date" TIMESTAMP(3),
    "accessed_at" TIMESTAMP(3),
    "reliability_notes" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "sources_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "person_sources" (
    "person_id" TEXT NOT NULL,
    "source_id" TEXT NOT NULL,
    "notes" TEXT,
    "source_order" INTEGER NOT NULL DEFAULT 0,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "person_sources_pkey" PRIMARY KEY ("person_id","source_id")
);

-- CreateTable
CREATE TABLE "media_assets" (
    "id" TEXT NOT NULL,
    "person_id" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "alt_text" TEXT,
    "caption" TEXT,
    "credit" TEXT,
    "license" TEXT,
    "media_type" TEXT NOT NULL,
    "approval_status" "ApprovalStatus" NOT NULL DEFAULT 'PENDING',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "media_assets_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "story_submissions" (
    "id" TEXT NOT NULL,
    "contributor_id" TEXT NOT NULL,
    "person_id" TEXT,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "structured_data" JSONB,
    "status" "StoryStatus" NOT NULL DEFAULT 'DRAFT',
    "admin_note" TEXT,
    "submitted_at" TIMESTAMP(3),
    "reviewed_at" TIMESTAMP(3),
    "published_at" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "story_submissions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "story_revisions" (
    "id" TEXT NOT NULL,
    "story_submission_id" TEXT NOT NULL,
    "editor_id" TEXT NOT NULL,
    "content_snapshot" JSONB NOT NULL,
    "change_summary" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "story_revisions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "correction_reports" (
    "id" TEXT NOT NULL,
    "person_id" TEXT NOT NULL,
    "reporter_id" TEXT,
    "message" TEXT NOT NULL,
    "supporting_source_url" TEXT,
    "status" "CorrectionStatus" NOT NULL DEFAULT 'PENDING',
    "admin_note" TEXT,
    "resolved_by" TEXT,
    "resolved_at" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "correction_reports_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "bookmarks" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "person_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "bookmarks_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "audit_logs" (
    "id" TEXT NOT NULL,
    "actor_id" TEXT NOT NULL,
    "action" TEXT NOT NULL,
    "entity_type" TEXT NOT NULL,
    "entity_id" TEXT NOT NULL,
    "metadata" JSONB,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "audit_logs_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE INDEX "contributor_applications_status_idx" ON "contributor_applications"("status");

-- CreateIndex
CREATE INDEX "contributor_applications_user_id_idx" ON "contributor_applications"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "people_slug_key" ON "people"("slug");

-- CreateIndex
CREATE INDEX "people_slug_idx" ON "people"("slug");

-- CreateIndex
CREATE INDEX "people_force_idx" ON "people"("force");

-- CreateIndex
CREATE INDEX "people_state_idx" ON "people"("state");

-- CreateIndex
CREATE INDEX "people_published_at_idx" ON "people"("published_at");

-- CreateIndex
CREATE INDEX "people_featured_idx" ON "people"("featured");

-- CreateIndex
CREATE INDEX "people_verification_status_idx" ON "people"("verification_status");

-- CreateIndex
CREATE INDEX "service_records_person_id_idx" ON "service_records"("person_id");

-- CreateIndex
CREATE INDEX "timeline_events_person_id_idx" ON "timeline_events"("person_id");

-- CreateIndex
CREATE INDEX "timeline_events_date_idx" ON "timeline_events"("date");

-- CreateIndex
CREATE UNIQUE INDEX "awards_name_key" ON "awards"("name");

-- CreateIndex
CREATE UNIQUE INDEX "operations_slug_key" ON "operations"("slug");

-- CreateIndex
CREATE INDEX "operations_slug_idx" ON "operations"("slug");

-- CreateIndex
CREATE INDEX "media_assets_person_id_idx" ON "media_assets"("person_id");

-- CreateIndex
CREATE INDEX "media_assets_approval_status_idx" ON "media_assets"("approval_status");

-- CreateIndex
CREATE INDEX "story_submissions_status_idx" ON "story_submissions"("status");

-- CreateIndex
CREATE INDEX "story_submissions_contributor_id_idx" ON "story_submissions"("contributor_id");

-- CreateIndex
CREATE INDEX "story_submissions_person_id_idx" ON "story_submissions"("person_id");

-- CreateIndex
CREATE INDEX "story_revisions_story_submission_id_idx" ON "story_revisions"("story_submission_id");

-- CreateIndex
CREATE INDEX "correction_reports_status_idx" ON "correction_reports"("status");

-- CreateIndex
CREATE INDEX "correction_reports_person_id_idx" ON "correction_reports"("person_id");

-- CreateIndex
CREATE INDEX "correction_reports_reporter_id_idx" ON "correction_reports"("reporter_id");

-- CreateIndex
CREATE INDEX "bookmarks_user_id_idx" ON "bookmarks"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "bookmarks_user_id_person_id_key" ON "bookmarks"("user_id", "person_id");

-- CreateIndex
CREATE INDEX "audit_logs_actor_id_idx" ON "audit_logs"("actor_id");

-- CreateIndex
CREATE INDEX "audit_logs_entity_type_entity_id_idx" ON "audit_logs"("entity_type", "entity_id");

-- CreateIndex
CREATE INDEX "audit_logs_created_at_idx" ON "audit_logs"("created_at");

-- AddForeignKey
ALTER TABLE "contributor_applications" ADD CONSTRAINT "contributor_applications_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "contributor_applications" ADD CONSTRAINT "contributor_applications_reviewed_by_fkey" FOREIGN KEY ("reviewed_by") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "service_records" ADD CONSTRAINT "service_records_person_id_fkey" FOREIGN KEY ("person_id") REFERENCES "people"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "timeline_events" ADD CONSTRAINT "timeline_events_person_id_fkey" FOREIGN KEY ("person_id") REFERENCES "people"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "person_awards" ADD CONSTRAINT "person_awards_person_id_fkey" FOREIGN KEY ("person_id") REFERENCES "people"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "person_awards" ADD CONSTRAINT "person_awards_award_id_fkey" FOREIGN KEY ("award_id") REFERENCES "awards"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "person_operations" ADD CONSTRAINT "person_operations_person_id_fkey" FOREIGN KEY ("person_id") REFERENCES "people"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "person_operations" ADD CONSTRAINT "person_operations_operation_id_fkey" FOREIGN KEY ("operation_id") REFERENCES "operations"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "person_sources" ADD CONSTRAINT "person_sources_person_id_fkey" FOREIGN KEY ("person_id") REFERENCES "people"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "person_sources" ADD CONSTRAINT "person_sources_source_id_fkey" FOREIGN KEY ("source_id") REFERENCES "sources"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "media_assets" ADD CONSTRAINT "media_assets_person_id_fkey" FOREIGN KEY ("person_id") REFERENCES "people"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "story_submissions" ADD CONSTRAINT "story_submissions_contributor_id_fkey" FOREIGN KEY ("contributor_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "story_submissions" ADD CONSTRAINT "story_submissions_person_id_fkey" FOREIGN KEY ("person_id") REFERENCES "people"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "story_revisions" ADD CONSTRAINT "story_revisions_story_submission_id_fkey" FOREIGN KEY ("story_submission_id") REFERENCES "story_submissions"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "story_revisions" ADD CONSTRAINT "story_revisions_editor_id_fkey" FOREIGN KEY ("editor_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "correction_reports" ADD CONSTRAINT "correction_reports_person_id_fkey" FOREIGN KEY ("person_id") REFERENCES "people"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "correction_reports" ADD CONSTRAINT "correction_reports_reporter_id_fkey" FOREIGN KEY ("reporter_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "correction_reports" ADD CONSTRAINT "correction_reports_resolved_by_fkey" FOREIGN KEY ("resolved_by") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "bookmarks" ADD CONSTRAINT "bookmarks_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "bookmarks" ADD CONSTRAINT "bookmarks_person_id_fkey" FOREIGN KEY ("person_id") REFERENCES "people"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "audit_logs" ADD CONSTRAINT "audit_logs_actor_id_fkey" FOREIGN KEY ("actor_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
