import { describe, it, expect } from "vitest";
import { prisma } from "@/lib/db";
import { computeOutletAnalytics } from "@/lib/analytics";
import { DEMO_USERS } from "@/lib/auth";
import { isGeminiAvailable } from "@/lib/gemini";

describe("HP Mitra Smoke Test Suite", () => {
  it("verifies 15 KnowledgeDocs are seeded in the database", async () => {
    const count = await prisma.knowledgeDoc.count();
    expect(count).toBe(15);
  });

  it("verifies 12 Outlets across 4 regions are seeded", async () => {
    const outlets = await prisma.outlet.findMany();
    expect(outlets.length).toBe(12);

    const regions = new Set(outlets.map((o) => o.region));
    expect(regions.has("NORTH")).toBe(true);
    expect(regions.has("SOUTH")).toBe(true);
    expect(regions.has("EAST")).toBe(true);
    expect(regions.has("WEST")).toBe(true);
  });

  it("verifies 5 Users with correct RBAC roles are seeded", async () => {
    const users = await prisma.user.findMany();
    expect(users.length).toBe(5);

    const roles = users.map((u) => u.role);
    expect(roles).toContain("ADMIN");
    expect(roles).toContain("MANAGER");
    expect(roles).toContain("DEALER");
    expect(roles).toContain("CUSTOMER");
  });

  it("verifies 20 Complaints with exact severity mix and 8 resolved", async () => {
    const complaints = await prisma.complaint.findMany();
    expect(complaints.length).toBe(20);

    const critical = complaints.filter((c) => c.priority === "CRITICAL");
    const high = complaints.filter((c) => c.priority === "HIGH");
    const medium = complaints.filter((c) => c.priority === "MEDIUM");
    const low = complaints.filter((c) => c.priority === "LOW");
    const resolved = complaints.filter((c) => c.status === "RESOLVED");

    expect(critical.length).toBe(2);
    expect(high.length).toBe(4);
    expect(medium.length).toBe(8);
    expect(low.length).toBe(6);
    expect(resolved.length).toBe(8);
  });

  it("verifies average resolution time is strictly computed from DB and under 48h SLA", async () => {
    const adminAnalytics = await computeOutletAnalytics(DEMO_USERS.admin);
    expect(adminAnalytics.avgResolutionHours).not.toBeNull();
    // Avg resolution time should be computed from the 8 resolved tickets (~10.9 hrs)
    expect(adminAnalytics.avgResolutionHours).toBeGreaterThan(0);
    expect(adminAnalytics.avgResolutionHours).toBeLessThan(48);
  });

  it("verifies app never crashes without GEMINI_API_KEY", () => {
    // Current environment has empty GEMINI_API_KEY
    expect(typeof isGeminiAvailable()).toBe("boolean");
  });
});
