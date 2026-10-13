import { prisma } from "./db";
import { SessionUser, getComplaintFilterForUser } from "./auth";

export interface AnalyticsSummary {
  totalComplaints: number;
  openCount: number;
  inProgressCount: number;
  resolvedCount: number;
  avgResolutionHours: number | null; // Computed from DB resolved records only
  criticalCount: number;
  highCount: number;
  mediumCount: number;
  lowCount: number;
  healthScore: number;
  hasData: boolean;
  byCategory: { category: string; count: number }[];
  byPriority: { priority: string; count: number; color: string }[];
  byRegion: { region: string; count: number }[];
  slaBreachCount: number;
  recentResolved: number;
}

/**
 * Computes live operational metrics STRICTLY from database records.
 * Never invents numbers or hardcodes averages.
 */
export async function computeOutletAnalytics(
  user: SessionUser,
  outletIdOverride?: string
): Promise<AnalyticsSummary> {
  const whereFilter = outletIdOverride
    ? { outletId: outletIdOverride }
    : getComplaintFilterForUser(user);

  const complaints = await prisma.complaint.findMany({
    where: whereFilter,
    include: {
      outlet: true,
    },
  });

  if (complaints.length === 0) {
    return {
      totalComplaints: 0,
      openCount: 0,
      inProgressCount: 0,
      resolvedCount: 0,
      avgResolutionHours: null,
      criticalCount: 0,
      highCount: 0,
      mediumCount: 0,
      lowCount: 0,
      healthScore: 100,
      hasData: false,
      byCategory: [],
      byPriority: [],
      byRegion: [],
      slaBreachCount: 0,
      recentResolved: 0,
    };
  }

  const totalComplaints = complaints.length;
  let openCount = 0;
  let inProgressCount = 0;
  let resolvedCount = 0;
  let criticalCount = 0;
  let highCount = 0;
  let mediumCount = 0;
  let lowCount = 0;
  let slaBreachCount = 0;

  const categoryMap: Record<string, number> = {};
  const regionMap: Record<string, number> = {};

  let totalResolutionTimeMs = 0;
  let resolvedCountWithTimestamps = 0;

  const now = new Date();

  for (const c of complaints) {
    // Status counts
    if (c.status === "RESOLVED") {
      resolvedCount++;
      if (c.resolvedAt && c.createdAt) {
        const diffMs = c.resolvedAt.getTime() - c.createdAt.getTime();
        if (diffMs > 0) {
          totalResolutionTimeMs += diffMs;
          resolvedCountWithTimestamps++;
        }
      }
    } else if (c.status === "IN_PROGRESS") {
      inProgressCount++;
      // Check SLA breach on active tickets
      const elapsedHours = (now.getTime() - c.createdAt.getTime()) / (1000 * 60 * 60);
      if (elapsedHours > c.slaHours) {
        slaBreachCount++;
      }
    } else {
      openCount++;
      const elapsedHours = (now.getTime() - c.createdAt.getTime()) / (1000 * 60 * 60);
      if (elapsedHours > c.slaHours) {
        slaBreachCount++;
      }
    }

    // Priority counts
    if (c.priority === "CRITICAL") criticalCount++;
    else if (c.priority === "HIGH") highCount++;
    else if (c.priority === "MEDIUM") mediumCount++;
    else if (c.priority === "LOW") lowCount++;

    // Category
    const cat = c.category || "GENERAL";
    categoryMap[cat] = (categoryMap[cat] || 0) + 1;

    // Region
    const reg = c.outlet?.region || "UNASSIGNED";
    regionMap[reg] = (regionMap[reg] || 0) + 1;
  }

  // Exact computed average resolution hours
  const avgResolutionHours =
    resolvedCountWithTimestamps > 0
      ? Number((totalResolutionTimeMs / (resolvedCountWithTimestamps * 1000 * 60 * 60)).toFixed(1))
      : null;

  // Health Score algorithm (0 to 100)
  // Base 100 - (CRITICAL open * 25) - (HIGH open * 10) - (SLA breaches * 5) + (resolution rate * 15)
  const openCritical = complaints.filter(
    (c) => c.priority === "CRITICAL" && c.status !== "RESOLVED"
  ).length;
  const openHigh = complaints.filter(
    (c) => c.priority === "HIGH" && c.status !== "RESOLVED"
  ).length;

  const resolutionRate = totalComplaints > 0 ? resolvedCount / totalComplaints : 1;
  let score = Math.round(
    100 - openCritical * 30 - openHigh * 15 - slaBreachCount * 8 + resolutionRate * 10
  );
  if (score > 100) score = 100;
  if (score < 0) score = 0;

  const byCategory = Object.entries(categoryMap)
    .map(([category, count]) => ({ category, count }))
    .sort((a, b) => b.count - a.count);

  const byPriority = [
    { priority: "CRITICAL", count: criticalCount, color: "#D9252A" },
    { priority: "HIGH", count: highCount, color: "#EA580C" },
    { priority: "MEDIUM", count: mediumCount, color: "#2563EB" },
    { priority: "LOW", count: lowCount, color: "#16A34A" },
  ];

  const byRegion = Object.entries(regionMap).map(([region, count]) => ({
    region,
    count,
  }));

  return {
    totalComplaints,
    openCount,
    inProgressCount,
    resolvedCount,
    avgResolutionHours,
    criticalCount,
    highCount,
    mediumCount,
    lowCount,
    healthScore: score,
    hasData: true,
    byCategory,
    byPriority,
    byRegion,
    slaBreachCount,
    recentResolved: resolvedCount,
  };
}
