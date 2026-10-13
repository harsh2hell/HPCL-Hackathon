import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getCurrentUser, getComplaintFilterForUser } from "@/lib/auth";
import { triageComplaint } from "@/lib/triage";

export async function GET() {
  try {
    const user = await getCurrentUser();
    const whereFilter = getComplaintFilterForUser(user);

    const complaints = await prisma.complaint.findMany({
      where: whereFilter,
      include: {
        outlet: true,
        reporter: {
          select: { id: true, name: true, role: true },
        },
      },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({ complaints });
  } catch (err) {
    return NextResponse.json(
      { error: "Failed to fetch complaints", details: (err as Error).message },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const user = await getCurrentUser();
    const body = await request.json();
    const { title, description, outletId, source = "FORM" } = body;

    if (!title || !description) {
      return NextResponse.json(
        { error: "Title and description are required" },
        { status: 400 }
      );
    }

    // 1. Execute Smart Triage (LLM temp 0.0 or offline rule-based heuristic)
    const triage = await triageComplaint(title, description);

    // 2. Resolve outletId: if user is a dealer, lock to their outlet; else use provided outlet or fallback
    let targetOutletId = outletId || user.outletId;
    if (!targetOutletId) {
      const defaultOutlet = await prisma.outlet.findFirst();
      targetOutletId = defaultOutlet?.id;
    }

    // 3. Save complaint to database
    const newComplaint = await prisma.complaint.create({
      data: {
        title,
        description,
        category: triage.category,
        subcategory: triage.subcategory,
        priority: triage.priority,
        status: "OPEN",
        assignedDept: triage.assignedDept,
        slaHours: triage.slaHours,
        outletId: targetOutletId,
        reporterId: user.id,
        source,
        rationale: triage.explainableRationale,
        suggestedAction: triage.suggestedAction,
      },
      include: {
        outlet: true,
      },
    });

    return NextResponse.json({
      success: true,
      complaint: newComplaint,
      triage,
    });
  } catch (err) {
    return NextResponse.json(
      { error: "Failed to lodge complaint", details: (err as Error).message },
      { status: 500 }
    );
  }
}
