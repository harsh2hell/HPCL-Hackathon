import { describe, it, expect } from "vitest";
import { offlineHeuristicTriage } from "@/lib/triage";

describe("Smart Complaint Triage Unit Tests", () => {
  it("classifies LPG gas leak as CRITICAL with 4h SLA and Safety Cell assignment", () => {
    const result = offlineHeuristicTriage(
      "Continuous strong LPG gas smell from cylinder valve",
      "Customer heard hissing sound and smelled gas in kitchen after connecting new 14.2kg cylinder."
    );

    expect(result.priority).toBe("CRITICAL");
    expect(result.slaHours).toBeLessThanOrEqual(4);
    expect(result.category).toBe("SAFETY_HAZARD");
    expect(result.assignedDept).toContain("Safety");
    expect(result.explainableRationale).toBeTruthy();
    expect(result.suggestedAction).toContain("Emergency");
  });

  it("classifies forecourt fire or smoke as CRITICAL", () => {
    const result = offlineHeuristicTriage(
      "Smoke and sparks near dispenser 2",
      "Smoldering wire detected on island."
    );

    expect(result.priority).toBe("CRITICAL");
    expect(result.slaHours).toBe(4);
  });

  it("classifies fuel adulteration as HIGH priority with 12h SLA", () => {
    const result = offlineHeuristicTriage(
      "Suspected adulteration in petrol",
      "Customer observed vehicle misfiring and requested filter paper test."
    );

    expect(result.priority).toBe("HIGH");
    expect(result.slaHours).toBe(12);
    expect(result.assignedDept).toContain("Quality");
  });

  it("classifies EV charging infrastructure outage as HIGH priority", () => {
    const result = offlineHeuristicTriage(
      "EV fast charger not working",
      "DC charger gun 1 tripped on highway station."
    );

    expect(result.priority).toBe("HIGH");
    expect(result.slaHours).toBe(12);
    expect(result.category).toBe("EV_INFRASTRUCTURE");
  });

  it("classifies LPG subsidy credit delay as MEDIUM priority with 24h SLA", () => {
    const result = offlineHeuristicTriage(
      "LPG DBTL subsidy not received",
      "March refill delivered but Rs 300 subsidy not credited to bank account."
    );

    expect(result.priority).toBe("MEDIUM");
    expect(result.slaHours).toBe(24);
  });

  it("classifies station cleanliness and washroom amenities as LOW priority with 48h SLA", () => {
    const result = offlineHeuristicTriage(
      "Restroom cleanliness issue",
      "Liquid soap dispenser empty and floor wet."
    );

    expect(result.priority).toBe("LOW");
    expect(result.slaHours).toBe(48);
  });
});
