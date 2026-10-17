export type UserRole = 'USER' | 'CONTRIBUTOR' | 'ADMIN';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  image?: string;
  bio?: string;
  location?: string;
}

export interface Person {
  id: string;
  slug: string;
  fullName: string;
  displayName?: string;
  aliases?: string;
  profileImage?: string;
  force?: string;
  rank?: string;
  serviceNumber?: string;
  dateOfBirth?: string;
  dateOfDeath?: string;
  placeOfBirth?: string;
  hometown?: string;
  district?: string;
  state?: string;
  country?: string;
  shortSummary?: string;
  fullBiography?: string;
  education?: string;
  familyBackground?: string;
  dateJoinedService?: string;
  placeOfDeath?: string;
  circumstancesOfDeath?: string;
  deathTerminology?: string;
  verificationStatus: VerificationStatus;
  featured: boolean;
  publishedAt?: string;
  createdAt: string;
  updatedAt: string;
  serviceRecords?: ServiceRecord[];
  timelineEvents?: TimelineEvent[];
  awards?: PersonAward[];
  operations?: PersonOperation[];
  sources?: PersonSource[];
  mediaAssets?: MediaAsset[];
}

export type VerificationStatus =
  | 'OFFICIALLY_DOCUMENTED'
  | 'VERIFIED_MULTIPLE_SOURCES'
  | 'FAMILY_SUBMITTED'
  | 'COMMUNITY_SUBMITTED'
  | 'UNDER_REVIEW'
  | 'INFORMATION_INCOMPLETE';

export interface ServiceRecord {
  id: string;
  personId: string;
  organization?: string;
  force?: string;
  rank?: string;
  unit?: string;
  regiment?: string;
  battalion?: string;
  posting?: string;
  location?: string;
  startDate?: string;
  endDate?: string;
  description?: string;
}

export interface TimelineEvent {
  id: string;
  personId: string;
  title: string;
  description?: string;
  date?: string;
  location?: string;
  eventType?: string;
  displayOrder: number;
}

export interface Award {
  id: string;
  name: string;
  category?: string;
  description?: string;
  issuingAuthority?: string;
}

export interface PersonAward {
  award: Award;
  citation?: string;
  date?: string;
}

export interface Operation {
  id: string;
  slug: string;
  name: string;
  description?: string;
  startDate?: string;
  endDate?: string;
  location?: string;
  historicalContext?: string;
}

export interface PersonOperation {
  operation: Operation;
  role?: string;
  description?: string;
}

export interface Source {
  id: string;
  title: string;
  publisher?: string;
  author?: string;
  sourceType?: string;
  url?: string;
  publicationDate?: string;
  accessedAt?: string;
  reliabilityNotes?: string;
}

export interface PersonSource {
  source: Source;
  notes?: string;
  sourceOrder: number;
}

export interface MediaAsset {
  id: string;
  personId: string;
  url: string;
  altText?: string;
  caption?: string;
  credit?: string;
  license?: string;
  mediaType: string;
  approvalStatus: 'PENDING' | 'APPROVED' | 'REJECTED';
}

export interface StorySubmission {
  id: string;
  contributorId: string;
  personId?: string;
  title: string;
  content: string;
  structuredData?: Record<string, unknown>;
  status: StoryStatus;
  adminNote?: string;
  submittedAt?: string;
  reviewedAt?: string;
  publishedAt?: string;
  createdAt: string;
  updatedAt: string;
  person?: Person;
}

export type StoryStatus =
  | 'DRAFT'
  | 'SUBMITTED_FOR_REVIEW'
  | 'NEEDS_CHANGES'
  | 'RESUBMITTED'
  | 'APPROVED'
  | 'PUBLISHED'
  | 'ARCHIVED'
  | 'REJECTED';

export interface CorrectionReport {
  id: string;
  personId: string;
  reporterId?: string;
  message: string;
  supportingSourceUrl?: string;
  status: CorrectionStatus;
  adminNote?: string;
  resolvedBy?: string;
  resolvedAt?: string;
  createdAt: string;
  person?: Person;
}

export type CorrectionStatus =
  | 'PENDING'
  | 'IN_REVIEW'
  | 'ACCEPTED'
  | 'RESOLVED'
  | 'REJECTED';

export interface Bookmark {
  id: string;
  userId: string;
  personId: string;
  createdAt: string;
}

export interface ContributorApplication {
  id: string;
  userId: string;
  reason: string;
  relevantExperience?: string;
  supportingLinks?: string;
  status: ApplicationStatus;
  adminNote?: string;
  reviewedBy?: string;
  reviewedAt?: string;
  createdAt: string;
  user?: User;
}

export type ApplicationStatus = 'PENDING' | 'APPROVED' | 'REJECTED';

export interface AuditLog {
  id: string;
  actorId: string;
  action: string;
  entityType: string;
  entityId: string;
  metadata?: Record<string, unknown>;
  createdAt: string;
  actor?: User;
}
