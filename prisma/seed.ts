import { PrismaClient } from "@prisma/client";
import { SEED_DOCS, SEED_OUTLETS, SEED_COMPLAINTS } from "./seedData";
import { chunkDocument } from "../lib/rag";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Starting HP Mitra Database Seeding...");

  // 1. Seed Users (pass 1: without outletId to avoid FK violation)
  const usersData = [
    {
      id: "user-admin-1",
      name: "Rajesh Sharma (HQ Admin)",
      email: "rajesh.admin@hpcl.in",
      role: "ADMIN",
      region: null,
      outletId: null,
    },
    {
      id: "user-mgr-north",
      name: "Vikram Malhotra (Regional Head - North)",
      email: "vikram.rm.north@hpcl.in",
      role: "MANAGER",
      region: "NORTH",
      outletId: null,
    },
    {
      id: "user-dlr-delhi",
      name: "Sunil Verma (Dealer - Delhi Central)",
      email: "sunil.dealer@hpcl-delhi.in",
      role: "DEALER",
      region: "NORTH",
      outletId: "outlet-del-01",
    },
    {
      id: "user-dlr-mumbai",
      name: "Pooja Kulkarni (Dealer - Mumbai West)",
      email: "pooja.dealer@hpcl-mumbai.in",
      role: "DEALER",
      region: "WEST",
      outletId: "outlet-mum-01",
    },
    {
      id: "user-cust-1",
      name: "Amit Kumar (HP Gas Customer)",
      email: "amit.kumar@gmail.com",
      role: "CUSTOMER",
      region: null,
      outletId: null,
    },
  ];

  for (const u of usersData) {
    await prisma.user.upsert({
      where: { id: u.id },
      update: {
        name: u.name,
        email: u.email,
        role: u.role,
        region: u.region,
        outletId: null, // set in pass 2
      },
      create: {
        id: u.id,
        name: u.name,
        email: u.email,
        role: u.role,
        region: u.region,
        outletId: null,
      },
    });
  }
  console.log(`✅ Seeded ${usersData.length} Users (initial pass).`);

  // 2. Seed Outlets (12 Outlets across 4 regions, 3 per region, mixed types)
  for (const o of SEED_OUTLETS) {
    await prisma.outlet.upsert({
      where: { id: o.id },
      update: {
        code: o.code,
        name: o.name,
        region: o.region,
        city: o.city,
        type: o.type,
        dealerId: o.dealerId || null,
      },
      create: {
        id: o.id,
        code: o.code,
        name: o.name,
        region: o.region,
        city: o.city,
        type: o.type,
        dealerId: o.dealerId || null,
      },
    });
  }
  console.log(`✅ Seeded ${SEED_OUTLETS.length} Outlets across 4 regions.`);

  // 2b. Link User outletIds now that outlets exist
  for (const u of usersData) {
    if (u.outletId) {
      await prisma.user.update({
        where: { id: u.id },
        data: { outletId: u.outletId },
      });
    }
  }
  console.log(`✅ Linked User Outlet relationships.`);

  // 3. Seed KnowledgeDocs and Document Chunks
  let totalChunksCreated = 0;
  for (const doc of SEED_DOCS) {
    const savedDoc = await prisma.knowledgeDoc.upsert({
      where: { id: doc.id },
      update: {
        title: doc.title,
        category: doc.category,
        content: doc.content,
        source: doc.source,
        language: doc.language,
      },
      create: {
        id: doc.id,
        title: doc.title,
        category: doc.category,
        content: doc.content,
        source: doc.source,
        language: doc.language,
      },
    });

    // Clean previous chunks for idempotency
    await prisma.documentChunk.deleteMany({
      where: { docId: savedDoc.id },
    });

    // Generate ~800 char chunks with overlap
    const chunks = chunkDocument(doc.content, 800, 150);
    for (let i = 0; i < chunks.length; i++) {
      await prisma.documentChunk.create({
        data: {
          docId: savedDoc.id,
          chunkText: chunks[i],
          chunkIndex: i,
        },
      });
      totalChunksCreated++;
    }
  }
  console.log(
    `✅ Seeded ${SEED_DOCS.length} KnowledgeDocs and ${totalChunksCreated} Document Chunks.`
  );

  // 4. Seed Complaints (20 complaints with realistic resolution timestamps)
  for (const c of SEED_COMPLAINTS) {
    await prisma.complaint.upsert({
      where: { id: c.id },
      update: {
        title: c.title,
        description: c.description,
        category: c.category,
        subcategory: c.subcategory,
        priority: c.priority,
        status: c.status,
        outletId: c.outletId,
        reporterId: c.reporterId,
        assignedDept: c.assignedDept,
        slaHours: c.slaHours,
        source: c.source,
        createdAt: c.createdAt,
        resolvedAt: c.resolvedAt || null,
        rationale: c.rationale,
        suggestedAction: c.suggestedAction,
      },
      create: {
        id: c.id,
        title: c.title,
        description: c.description,
        category: c.category,
        subcategory: c.subcategory,
        priority: c.priority,
        status: c.status,
        outletId: c.outletId,
        reporterId: c.reporterId,
        assignedDept: c.assignedDept,
        slaHours: c.slaHours,
        source: c.source,
        createdAt: c.createdAt,
        resolvedAt: c.resolvedAt || null,
        rationale: c.rationale,
        suggestedAction: c.suggestedAction,
      },
    });
  }
  console.log(`✅ Seeded ${SEED_COMPLAINTS.length} Complaints.`);

  console.log("🎉 Seeding completed successfully and idempotently!");
}

main()
  .catch((e) => {
    console.error("❌ Seeding failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
