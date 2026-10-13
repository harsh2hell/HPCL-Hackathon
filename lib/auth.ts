import { cookies } from "next/headers";
import { prisma } from "./db";

export type Role = "CUSTOMER" | "DEALER" | "MANAGER" | "ADMIN";
export type Region = "NORTH" | "SOUTH" | "EAST" | "WEST";

export interface SessionUser {
  id: string;
  name: string;
  email: string;
  role: Role;
  region: Region | null;
  outletId: string | null;
}

export const DEMO_USERS = {
  admin: {
    id: "user-admin-1",
    name: "Rajesh Sharma (HQ Admin)",
    email: "rajesh.admin@hpcl.in",
    role: "ADMIN" as Role,
    region: null,
    outletId: null,
  },
  managerNorth: {
    id: "user-mgr-north",
    name: "Vikram Malhotra (Regional Head - North)",
    email: "vikram.rm.north@hpcl.in",
    role: "MANAGER" as Role,
    region: "NORTH" as Region,
    outletId: null,
  },
  dealerDelhi: {
    id: "user-dlr-delhi",
    name: "Sunil Verma (Dealer - Delhi Central)",
    email: "sunil.dealer@hpcl-delhi.in",
    role: "DEALER" as Role,
    region: "NORTH" as Region,
    outletId: "outlet-del-01",
  },
  dealerMumbai: {
    id: "user-dlr-mumbai",
    name: "Pooja Kulkarni (Dealer - Mumbai West)",
    email: "pooja.dealer@hpcl-mumbai.in",
    role: "DEALER" as Role,
    region: "WEST" as Region,
    outletId: "outlet-mum-01",
  },
  customer: {
    id: "user-cust-1",
    name: "Amit Kumar (HP Gas Customer)",
    email: "amit.kumar@gmail.com",
    role: "CUSTOMER" as Role,
    region: null,
    outletId: null,
  },
};

/**
 * Resolves current session from cookie or header (defaulting to Dealer Delhi for quick judge experience).
 */
export async function getCurrentUser(): Promise<SessionUser> {
  try {
    const cookieStore = cookies();
    const activeUserId = cookieStore.get("hp_active_user")?.value;

    if (activeUserId) {
      const match = Object.values(DEMO_USERS).find((u) => u.id === activeUserId);
      if (match) return match;

      // Check DB
      const dbUser = await prisma.user.findUnique({
        where: { id: activeUserId },
      });
      if (dbUser) {
        return {
          id: dbUser.id,
          name: dbUser.name,
          email: dbUser.email,
          role: dbUser.role as Role,
          region: (dbUser.region as Region) || null,
          outletId: dbUser.outletId || null,
        };
      }
    }
  } catch {
    // If called outside request context (e.g. tests or build time)
  }

  // Default fallback for judging session
  return DEMO_USERS.dealerDelhi;
}

/**
 * RBAC Scoping Helpers for API and Queries
 */
export function getComplaintFilterForUser(user: SessionUser) {
  switch (user.role) {
    case "ADMIN":
      return {}; // Admins see all complaints
    case "MANAGER":
      return {
        outlet: {
          region: user.region || undefined,
        },
      }; // Managers see all complaints within their region
    case "DEALER":
      return {
        outletId: user.outletId || "none",
      }; // Dealers see only complaints filed for their outlet
    case "CUSTOMER":
      return {
        reporterId: user.id,
      }; // Customers see only complaints they personally reported
    default:
      return { id: "unauthorized" };
  }
}

export function getOutletFilterForUser(user: SessionUser) {
  switch (user.role) {
    case "ADMIN":
      return {};
    case "MANAGER":
      return {
        region: user.region || undefined,
      };
    case "DEALER":
      return {
        id: user.outletId || "none",
      };
    case "CUSTOMER":
      return { id: "none" }; // Customers have no direct outlet dashboard access
    default:
      return { id: "unauthorized" };
  }
}

export function canAccessAdmin(user: SessionUser): boolean {
  return user.role === "ADMIN";
}

export function canAccessAnalytics(user: SessionUser): boolean {
  return ["ADMIN", "MANAGER", "DEALER"].includes(user.role);
}
