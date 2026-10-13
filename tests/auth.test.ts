import { describe, it, expect } from "vitest";
import {
  DEMO_USERS,
  getComplaintFilterForUser,
  getOutletFilterForUser,
  canAccessAdmin,
} from "@/lib/auth";

describe("RBAC Access Scope Unit Tests", () => {
  it("restricts Dealer to only their assigned outlet", () => {
    const dealerFilter = getComplaintFilterForUser(DEMO_USERS.dealerDelhi);
    expect(dealerFilter).toEqual({ outletId: "outlet-del-01" });

    const outletFilter = getOutletFilterForUser(DEMO_USERS.dealerDelhi);
    expect(outletFilter).toEqual({ id: "outlet-del-01" });
  });

  it("restricts Regional Manager to only outlets within their region", () => {
    const mgrFilter = getComplaintFilterForUser(DEMO_USERS.managerNorth);
    expect(mgrFilter).toEqual({
      outlet: { region: "NORTH" },
    });

    const outletFilter = getOutletFilterForUser(DEMO_USERS.managerNorth);
    expect(outletFilter).toEqual({ region: "NORTH" });
  });

  it("allows HPCL HQ Admin unrestricted access", () => {
    const adminFilter = getComplaintFilterForUser(DEMO_USERS.admin);
    expect(adminFilter).toEqual({});

    expect(canAccessAdmin(DEMO_USERS.admin)).toBe(true);
    expect(canAccessAdmin(DEMO_USERS.dealerDelhi)).toBe(false);
    expect(canAccessAdmin(DEMO_USERS.customer)).toBe(false);
  });

  it("restricts Customer to only their personally filed complaints", () => {
    const customerFilter = getComplaintFilterForUser(DEMO_USERS.customer);
    expect(customerFilter).toEqual({ reporterId: "user-cust-1" });
  });
});
