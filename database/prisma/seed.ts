/**
 * Veeranjali Database Seed Script
 *
 * Creates fictional development data only.
 * All persons, events, and details are entirely fictional.
 *
 * DO NOT use real names, real service histories, or real deaths.
 */

import { PrismaClient, UserRole, ApplicationStatus, VerificationStatus, StoryStatus, CorrectionStatus } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seed...\n');

  // Clean existing data
  console.log('🧹 Cleaning existing data...');
  await prisma.auditLog.deleteMany();
  await prisma.bookmark.deleteMany();
  await prisma.correctionReport.deleteMany();
  await prisma.storyRevision.deleteMany();
  await prisma.storySubmission.deleteMany();
  await prisma.mediaAsset.deleteMany();
  await prisma.personSource.deleteMany();
  await prisma.personOperation.deleteMany();
  await prisma.personAward.deleteMany();
  await prisma.timelineEvent.deleteMany();
  await prisma.serviceRecord.deleteMany();
  await prisma.correctionReport.deleteMany();
  await prisma.contributorApplication.deleteMany();
  await prisma.person.deleteMany();
  await prisma.source.deleteMany();
  await prisma.operation.deleteMany();
  await prisma.award.deleteMany();
  await prisma.user.deleteMany();

  // ========================================
  // Create Users
  // ========================================
  console.log('\n👥 Creating users...');

  const passwordHash = await bcrypt.hash('password123', 10);

  const admin = await prisma.user.create({
    data: {
      name: 'Admin User',
      email: 'admin@veeranjali.dev',
      passwordHash,
      role: UserRole.ADMIN,
      bio: 'Platform administrator',
      emailVerified: new Date(),
    },
  });
  console.log(`  ✓ Admin: ${admin.email}`);

  const contributor = await prisma.user.create({
    data: {
      name: 'Contributor User',
      email: 'contributor@veeranjali.dev',
      passwordHash,
      role: UserRole.CONTRIBUTOR,
      bio: 'Content contributor and researcher',
      emailVerified: new Date(),
    },
  });
  console.log(`  ✓ Contributor: ${contributor.email}`);

  const user = await prisma.user.create({
    data: {
      name: 'Regular User',
      email: 'user@veeranjali.dev',
      passwordHash,
      role: UserRole.USER,
      bio: 'Visitor and reader',
      emailVerified: new Date(),
    },
  });
  console.log(`  ✓ User: ${user.email}`);

  // ========================================
  // Create Awards
  // ========================================
  console.log('\n🏆 Creating awards...');

  const awards = await Promise.all([
    prisma.award.create({
      data: {
        name: 'Param Vir Chakra',
        category: 'Gallantry Award',
        description: 'India\'s highest military decoration for valour in the presence of the enemy.',
        issuingAuthority: 'Government of India',
      },
    }),
    prisma.award.create({
      data: {
        name: 'Ashoka Chakra',
        category: 'Peacetime Gallantry Award',
        description: 'India\'s highest peacetime military decoration for valour, courageous action or self-sacrifice away from the battlefield.',
        issuingAuthority: 'Government of India',
      },
    }),
    prisma.award.create({
      data: {
        name: 'Kirti Chakra',
        category: 'Peacetime Gallantry Award',
        description: 'Second in order of precedence of peacetime gallantry awards.',
        issuingAuthority: 'Government of India',
      },
    }),
    prisma.award.create({
      data: {
        name: 'Shaurya Chakra',
        category: 'Peacetime Gallantry Award',
        description: 'Third in order of precedence of peacetime gallantry awards.',
        issuingAuthority: 'Government of India',
      },
    }),
    prisma.award.create({
      data: {
        name: 'Vir Chakra',
        category: 'Gallantry Award',
        description: 'Third in order of precedence of wartime gallantry awards.',
        issuingAuthority: 'Government of India',
      },
    }),
    prisma.award.create({
      data: {
        name: 'Sena Medal',
        category: 'Gallantry Award',
        description: 'Awarded to army personnel for individual acts of gallantry.',
        issuingAuthority: 'Indian Army',
      },
    }),
  ]);
  console.log(`  ✓ Created ${awards.length} awards`);

  // ========================================
  // Create Operations
  // ========================================
  console.log('\n⚔️  Creating operations...');

  const operations = await Promise.all([
    prisma.operation.create({
      data: {
        slug: 'operation-vijay-fictional',
        name: 'Operation Vijay (Fictional)',
        description: 'A fictional military operation for development testing purposes only.',
        startDate: new Date('1999-05-01'),
        endDate: new Date('1999-07-26'),
        location: 'Fictional Location',
        historicalContext: 'This is entirely fictional data created for development purposes.',
      },
    }),
    prisma.operation.create({
      data: {
        slug: 'operation-safed-sagar-fictional',
        name: 'Operation Safed Sagar (Fictional)',
        description: 'A fictional air operation for development testing purposes only.',
        startDate: new Date('1999-05-25'),
        endDate: new Date('1999-07-15'),
        location: 'Fictional Location',
        historicalContext: 'This is entirely fictional data created for development purposes.',
      },
    }),
    prisma.operation.create({
      data: {
        slug: 'operation-cactus-fictional',
        name: 'Operation Cactus (Fictional)',
        description: 'A fictional operation for development testing purposes only.',
        startDate: new Date('1988-11-03'),
        endDate: new Date('1988-11-04'),
        location: 'Fictional Location',
        historicalContext: 'This is entirely fictional data created for development purposes.',
      },
    }),
  ]);
  console.log(`  ✓ Created ${operations.length} operations`);

  // ========================================
  // Create Sources
  // ========================================
  console.log('\n📚 Creating sources...');

  const sources = await Promise.all([
    prisma.source.create({
      data: {
        title: 'Fictional Military Archives',
        publisher: 'Veeranjali Development Team',
        author: 'Development Team',
        sourceType: 'ARCHIVE',
        url: 'https://example.com/fictional-archive',
        publicationDate: new Date('2024-01-01'),
        accessedAt: new Date(),
        reliabilityNotes: 'This is fictional data for development purposes only.',
      },
    }),
    prisma.source.create({
      data: {
        title: 'Fictional News Report',
        publisher: 'Fictional Times',
        author: 'Fictional Reporter',
        sourceType: 'NEWS',
        url: 'https://example.com/fictional-news',
        publicationDate: new Date('2024-02-15'),
        accessedAt: new Date(),
        reliabilityNotes: 'This is fictional data for development purposes only.',
      },
    }),
  ]);
  console.log(`  ✓ Created ${sources.length} sources`);

  // ========================================
  // Create Fictional Persons
  // ========================================
  console.log('\n👤 Creating fictional persons...');

  const person1 = await prisma.person.create({
    data: {
      slug: 'captain-aarav-mehta-fictional',
      fullName: 'Captain Aarav Mehta (Fictional)',
      displayName: 'Capt. Aarav Mehta',
      aliases: 'Aaru',
      profileImage: '/images/placeholder-profile.jpg',
      force: 'Indian Army',
      rank: 'Captain',
      serviceNumber: 'FICTIONAL-001',
      dateOfBirth: new Date('1975-03-15'),
      dateOfDeath: new Date('2000-07-15'),
      placeOfBirth: 'Mumbai, Maharashtra',
      hometown: 'Mumbai',
      district: 'Mumbai',
      state: 'Maharashtra',
      country: 'India',
      shortSummary: 'A fictional Indian Army officer created for development purposes. This is not a real person.',
      fullBiography: 'Captain Aarav Mehta is entirely fictional. He was created for development and testing of the Veeranjali platform. No such person existed in reality. Any resemblance to real persons is coincidental.',
      education: 'Fictional Military Academy',
      familyBackground: 'This is fictional information for development purposes only.',
      dateJoinedService: new Date('1996-06-01'),
      placeOfDeath: 'Fictional Location',
      circumstancesOfDeath: 'This is fictional data. No real event is depicted.',
      deathTerminology: 'died_in_service',
      verificationStatus: VerificationStatus.OFFICIALLY_DOCUMENTED,
      featured: true,
      publishedAt: new Date(),
    },
  });
  console.log(`  ✓ Created: ${person1.fullName}`);

  // Service record for person1
  await prisma.serviceRecord.create({
    data: {
      personId: person1.id,
      organization: 'Indian Army',
      force: 'Army',
      rank: 'Captain',
      unit: 'Fictional Battalion',
      regiment: 'Fictional Regiment',
      startDate: new Date('1996-06-01'),
      endDate: new Date('2000-07-15'),
      description: 'Fictional service record for development purposes.',
    },
  });

  // Timeline events for person1
  await Promise.all([
    prisma.timelineEvent.create({
      data: {
        personId: person1.id,
        title: 'Born',
        description: 'Born in Mumbai, Maharashtra (Fictional)',
        date: new Date('1975-03-15'),
        eventType: 'BIRTH',
        displayOrder: 1,
      },
    }),
    prisma.timelineEvent.create({
      data: {
        personId: person1.id,
        title: 'Joined Military Academy',
        description: 'Joined Fictional Military Academy (Fictional)',
        date: new Date('1994-07-01'),
        eventType: 'EDUCATION',
        displayOrder: 2,
      },
    }),
    prisma.timelineEvent.create({
      data: {
        personId: person1.id,
        title: 'Commissioned',
        description: 'Commissioned as Lieutenant (Fictional)',
        date: new Date('1996-06-01'),
        eventType: 'CAREER',
        displayOrder: 3,
      },
    }),
    prisma.timelineEvent.create({
      data: {
        personId: person1.id,
        title: 'Promoted to Captain',
        description: 'Promoted to rank of Captain (Fictional)',
        date: new Date('1999-01-01'),
        eventType: 'CAREER',
        displayOrder: 4,
      },
    }),
  ]);

  // Award for person1
  await prisma.personAward.create({
    data: {
      personId: person1.id,
      awardId: awards[5].id, // Sena Medal
      citation: 'Fictional citation for development purposes.',
      date: new Date('2000-08-15'),
    },
  });

  // Operation for person1
  await prisma.personOperation.create({
    data: {
      personId: person1.id,
      operationId: operations[0].id,
      role: 'Unit Commander',
      description: 'Fictional participation for development purposes.',
    },
  });

  // Source for person1
  await prisma.personSource.create({
    data: {
      personId: person1.id,
      sourceId: sources[0].id,
      notes: 'Primary fictional source',
      sourceOrder: 1,
    },
  });

  // Person 2
  const person2 = await prisma.person.create({
    data: {
      slug: 'inspector-kavya-rao-fictional',
      fullName: 'Inspector Kavya Rao (Fictional)',
      displayName: 'Insp. Kavya Rao',
      profileImage: '/images/placeholder-profile.jpg',
      force: 'Central Reserve Police Force',
      rank: 'Inspector',
      serviceNumber: 'FICTIONAL-002',
      dateOfBirth: new Date('1980-07-22'),
      dateOfDeath: new Date('2019-03-10'),
      placeOfBirth: 'Bengaluru, Karnataka',
      hometown: 'Bengaluru',
      district: 'Bengaluru Urban',
      state: 'Karnataka',
      country: 'India',
      shortSummary: 'A fictional CRPF officer created for development purposes. This is not a real person.',
      fullBiography: 'Inspector Kavya Rao is entirely fictional. She was created for development and testing of the Veeranjali platform. No such person existed in reality. Any resemblance to real persons is coincidental.',
      education: 'Fictional University',
      familyBackground: 'This is fictional information for development purposes only.',
      dateJoinedService: new Date('2002-08-15'),
      placeOfDeath: 'Fictional Location',
      circumstancesOfDeath: 'This is fictional data. No real event is depicted.',
      deathTerminology: 'killed_in_action',
      verificationStatus: VerificationStatus.VERIFIED_MULTIPLE_SOURCES,
      featured: false,
      publishedAt: new Date(),
    },
  });
  console.log(`  ✓ Created: ${person2.fullName}`);

  // Service record for person2
  await prisma.serviceRecord.create({
    data: {
      personId: person2.id,
      organization: 'Central Reserve Police Force',
      force: 'CAPF',
      rank: 'Inspector',
      unit: 'Fictional Battalion',
      startDate: new Date('2002-08-15'),
      endDate: new Date('2019-03-10'),
      description: 'Fictional service record for development purposes.',
    },
  });

  // Award for person2
  await prisma.personAward.create({
    data: {
      personId: person2.id,
      awardId: awards[3].id, // Shaurya Chakra
      citation: 'Fictional citation for development purposes.',
      date: new Date('2019-04-15'),
    },
  });

  // Person 3
  const person3 = await prisma.person.create({
    data: {
      slug: 'rifleman-arjun-singh-fictional',
      fullName: 'Rifleman Arjun Singh (Fictional)',
      displayName: 'Rfn. Arjun Singh',
      profileImage: '/images/placeholder-profile.jpg',
      force: 'Indian Army',
      rank: 'Rifleman',
      serviceNumber: 'FICTIONAL-003',
      dateOfBirth: new Date('1985-11-08'),
      dateOfDeath: new Date('2018-06-20'),
      placeOfBirth: 'Dehradun, Uttarakhand',
      hometown: 'Dehradun',
      district: 'Dehradun',
      state: 'Uttarakhand',
      country: 'India',
      shortSummary: 'A fictional Indian Army rifleman created for development purposes. This is not a real person.',
      fullBiography: 'Rifleman Arjun Singh is entirely fictional. He was created for development and testing of the Veeranjali platform. No such person existed in reality. Any resemblance to real persons is coincidental.',
      education: 'Fictional School',
      familyBackground: 'This is fictional information for development purposes only.',
      dateJoinedService: new Date('2005-01-15'),
      placeOfDeath: 'Fictional Location',
      circumstancesOfDeath: 'This is fictional data. No real event is depicted.',
      deathTerminology: 'martyred',
      verificationStatus: VerificationStatus.FAMILY_SUBMITTED,
      featured: false,
      publishedAt: new Date(),
    },
  });
  console.log(`  ✓ Created: ${person3.fullName}`);

  // Service record for person3
  await prisma.serviceRecord.create({
    data: {
      personId: person3.id,
      organization: 'Indian Army',
      force: 'Army',
      rank: 'Rifleman',
      unit: 'Fictional Rifles',
      regiment: 'Fictional Regiment',
      startDate: new Date('2005-01-15'),
      endDate: new Date('2018-06-20'),
      description: 'Fictional service record for development purposes.',
    },
  });

  // Operation for person3
  await prisma.personOperation.create({
    data: {
      personId: person3.id,
      operationId: operations[1].id,
      role: 'Rifleman',
      description: 'Fictional participation for development purposes.',
    },
  });

  // Person 4 (Unpublished - for testing)
  const person4 = await prisma.person.create({
    data: {
      slug: 'subedar-priya-sharma-fictional',
      fullName: 'Subedar Priya Sharma (Fictional)',
      displayName: 'Sub. Priya Sharma',
      profileImage: '/images/placeholder-profile.jpg',
      force: 'Indian Army',
      rank: 'Subedar',
      serviceNumber: 'FICTIONAL-004',
      dateOfBirth: new Date('1978-02-28'),
      hometown: 'Pune, Maharashtra',
      state: 'Maharashtra',
      shortSummary: 'A fictional unpublished profile for testing.',
      verificationStatus: VerificationStatus.UNDER_REVIEW,
      featured: false,
      publishedAt: null,
    },
  });
  console.log(`  ✓ Created (unpublished): ${person4.fullName}`);

  console.log(`  ✓ Total persons created: 4`);

  // ========================================
  // Create Bookmarks
  // ========================================
  console.log('\n🔖 Creating bookmarks...');

  await prisma.bookmark.create({
    data: {
      userId: user.id,
      personId: person1.id,
    },
  });
  console.log(`  ✓ User bookmarked ${person1.displayName}`);

  // ========================================
  // Create Story Submissions
  // ========================================
  console.log('\n📝 Creating story submissions...');

  const submission1 = await prisma.storySubmission.create({
    data: {
      contributorId: contributor.id,
      personId: null,
      title: 'New Story: Fictional Hero (Draft)',
      content: 'This is a fictional draft story for development purposes.',
      structuredData: {
        force: 'Indian Navy',
        rank: 'Commander',
        state: 'Kerala',
      },
      status: StoryStatus.DRAFT,
    },
  });
  console.log(`  ✓ Draft submission: ${submission1.title}`);

  const submission2 = await prisma.storySubmission.create({
    data: {
      contributorId: contributor.id,
      personId: null,
      title: 'New Story: Fictional Officer (Submitted)',
      content: 'This is a fictional submitted story for development purposes.',
      structuredData: {
        force: 'Indian Air Force',
        rank: 'Wing Commander',
        state: 'Rajasthan',
      },
      status: StoryStatus.SUBMITTED_FOR_REVIEW,
      submittedAt: new Date(),
    },
  });
  console.log(`  ✓ Submitted submission: ${submission2.title}`);

  // ========================================
  // Create Contributor Applications
  // ========================================
  console.log('\n📋 Creating contributor applications...');

  const application = await prisma.contributorApplication.create({
    data: {
      userId: user.id,
      reason: 'I would like to contribute to this meaningful project by researching and documenting stories of courage.',
      relevantExperience: 'I have experience in historical research and have previously contributed to similar documentation projects.',
      supportingLinks: 'https://example.com/my-research',
      status: ApplicationStatus.PENDING,
    },
  });
  console.log(`  ✓ Application from user: ${application.id}`);

  // ========================================
  // Create Correction Reports
  // ========================================
  console.log('\n✏️  Creating correction reports...');

  await prisma.correctionReport.create({
    data: {
      personId: person1.id,
      reporterId: user.id,
      message: 'This is a fictional correction report for development testing purposes.',
      supportingSourceUrl: 'https://example.com/fictional-source',
      status: CorrectionStatus.PENDING,
    },
  });
  console.log(`  ✓ Correction report for ${person1.displayName}`);

  // ========================================
  // Create Audit Logs
  // ========================================
  console.log('\n📊 Creating audit logs...');

  await prisma.auditLog.create({
    data: {
      actorId: admin.id,
      action: 'PUBLISH_PERSON',
      entityType: 'Person',
      entityId: person1.id,
      metadata: {
        previousStatus: 'APPROVED',
        newStatus: 'PUBLISHED',
      },
    },
  });
  console.log(`  ✓ Audit log for publishing ${person1.displayName}`);

  // ========================================
  // Summary
  // ========================================
  console.log('\n✅ Seed completed successfully!\n');
  console.log('📊 Summary:');
  console.log('  • 3 users (admin, contributor, user)');
  console.log('  • 6 awards');
  console.log('  • 3 operations');
  console.log('  • 2 sources');
  console.log('  • 4 fictional persons (3 published, 1 unpublished)');
  console.log('  • 1 bookmark');
  console.log('  • 2 story submissions');
  console.log('  • 1 contributor application');
  console.log('  • 1 correction report');
  console.log('  • 1 audit log');
  console.log('\n⚠️  All data is fictional and for development purposes only.');
  console.log('🔐 Test credentials:');
  console.log('   Admin: admin@veeranjali.dev / password123');
  console.log('   Contributor: contributor@veeranjali.dev / password123');
  console.log('   User: user@veeranjali.dev / password123\n');
}

main()
  .catch((e) => {
    console.error('❌ Seed failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
