import { generateContentSafe, isGeminiAvailable } from "./gemini";

export interface TriageResult {
  category: string;
  subcategory: string;
  priority: "CRITICAL" | "HIGH" | "MEDIUM" | "LOW";
  slaHours: number;
  assignedDept: string;
  dispatcherSummary: string;
  suggestedAction: string;
  explainableRationale: string;
  isAiTriaged: boolean;
}

/**
 * Deterministic offline rule-based heuristics when LLM is unavailable or offline.
 */
export function offlineHeuristicTriage(title: string, description: string): TriageResult {
  const combined = `${title} ${description}`.toLowerCase();

  // 1. CRITICAL: Safety Hazards (Gas Leak, Fire, Explosion risk)
  if (
    combined.includes("leak") ||
    combined.includes("gas smell") ||
    combined.includes("smell") ||
    combined.includes("fire") ||
    combined.includes("smoke") ||
    combined.includes("cylinder hiss") ||
    combined.includes("blast")
  ) {
    return {
      category: "SAFETY_HAZARD",
      subcategory: combined.includes("fire") ? "Fire Emergency" : "LPG Leakage",
      priority: "CRITICAL",
      slaHours: 4,
      assignedDept: "HPCL Safety & Emergency Response Cell",
      dispatcherSummary: "URGENT: Imminent fire/gas hazard reported. Immediate site cordoning required.",
      suggestedAction:
        "1. Dispatch Emergency Response Vehicle (ERV).\n2. Advise customer to extinguish flames and isolate regulator.\n3. Notify local Fire Service & HPCL Area Safety Officer.",
      explainableRationale:
        "Safety keyword trigger (leak/fire/smoke). HPCL safety protocol mandates <4h emergency turnaround.",
      isAiTriaged: false,
    };
  }

  // 2. HIGH: Fuel Adulteration, EV Fast Charger Inoperative, Meter Tampering
  if (
    combined.includes("adulterat") ||
    combined.includes("charger not working") ||
    combined.includes("ev charger") ||
    combined.includes("density mismatch") ||
    combined.includes("delivery not received") ||
    combined.includes("tamper")
  ) {
    const isEv = combined.includes("charger");
    return {
      category: isEv ? "EV_INFRASTRUCTURE" : "QUALITY_AND_DELIVERY",
      subcategory: isEv ? "EV Charger Fault" : "Fuel Quality / Non-Delivery",
      priority: "HIGH",
      slaHours: 12,
      assignedDept: isEv ? "HPCL e-Mobility Tech Ops" : "Retail Quality Assurance Cell",
      dispatcherSummary: isEv
        ? "Fast DC charger offline impacting EV fleet customer satisfaction."
        : "Quality or non-delivery grievance requiring field inspection verification.",
      suggestedAction: isEv
        ? "Remote reboot of CCS2/CHAdeMO hardware; dispatch OEM technician if unresponsive."
        : "Initiate filter paper test / hydrometer check audit with Regional Field Officer.",
      explainableRationale:
        "Critical operational failure impacting consumer brand trust or electric vehicle transit corridors.",
      isAiTriaged: false,
    };
  }

  // 3. MEDIUM: Subsidy delays, Stock mismatches, Billing discrepancies
  if (
    combined.includes("subsidy") ||
    combined.includes("dbtd") ||
    combined.includes("stock") ||
    combined.includes("bill") ||
    combined.includes("dac") ||
    combined.includes("otp") ||
    combined.includes("payment failed")
  ) {
    return {
      category: "BILLING_AND_SUBSIDY",
      subcategory: combined.includes("subsidy") ? "DBTL Subsidy Credit" : "Billing / DAC Discrepancy",
      priority: "MEDIUM",
      slaHours: 24,
      assignedDept: "HPCL Customer Accounts & LPG Distribution",
      dispatcherSummary: "Consumer transaction or subsidy reconciliation issue logged.",
      suggestedAction:
        "Cross-verify bank PFMS / NPCI mapper status and re-trigger DAC reconciliation ticket.",
      explainableRationale:
        "Commercial and customer reconciliation request adhering to standard 24-hour SLA.",
      isAiTriaged: false,
    };
  }

  // 4. LOW: Cleanliness, Signage, Minor Facility Feedback
  return {
    category: "STATION_AMENITIES",
    subcategory: combined.includes("clean") ? "Sanitation & Cleanliness" : "Signage & Customer Service",
    priority: "LOW",
    slaHours: 48,
    assignedDept: "Retail Outlet Customer Experience",
    dispatcherSummary: "Station amenity or visual merchandising feedback.",
    suggestedAction:
      "Notify Outlet Manager for rectification during daily housekeeping inspection round.",
    explainableRationale:
      "Non-urgent station maintenance or cosmetic complaint categorized under 48h turnaround.",
    isAiTriaged: false,
  };
}

/**
 * Intelligent Triage: uses Gemini Flash temp 0.0 with fallback to offline heuristics.
 */
export async function triageComplaint(title: string, description: string): Promise<TriageResult> {
  if (!isGeminiAvailable()) {
    return offlineHeuristicTriage(title, description);
  }

  const prompt = `You are the HPCL Complaint Triage Engine. Analyze the following grievance and output ONLY valid JSON matching this schema:
{
  "category": string,
  "subcategory": string,
  "priority": "CRITICAL" | "HIGH" | "MEDIUM" | "LOW",
  "slaHours": number (4 for CRITICAL, 12 for HIGH, 24 for MEDIUM, 48 for LOW),
  "assignedDept": string,
  "dispatcherSummary": string (1-2 sentences),
  "suggestedAction": string (bulleted concrete operational steps),
  "explainableRationale": string (clear reason why this priority and department were selected)
}

RULES:
- Gas leaks, hissing cylinders, fire, smoke, explosion threats MUST ALWAYS be "CRITICAL" with 4 hours SLA assigned to "HPCL Safety & Emergency Response Cell".
- Fuel adulteration, fuel density issues, and broken EV chargers are "HIGH" (12h SLA).
- Subsidy issues, booking delays, and billing errors are "MEDIUM" (24h SLA).
- Station cleanliness, lighting, and signage are "LOW" (48h SLA).

COMPLAINT TITLE: ${title}
COMPLAINT DETAILS: ${description}`;

  try {
    const res = await generateContentSafe(prompt);
    if (res.offlineFallback || !res.text) {
      return offlineHeuristicTriage(title, description);
    }

    const cleanJson = res.text.replace(/```json/g, "").replace(/```/g, "").trim();
    const parsed = JSON.parse(cleanJson);

    return {
      category: parsed.category || "GENERAL",
      subcategory: parsed.subcategory || "General Grievance",
      priority: ["CRITICAL", "HIGH", "MEDIUM", "LOW"].includes(parsed.priority)
        ? parsed.priority
        : "MEDIUM",
      slaHours: Number(parsed.slaHours) || 24,
      assignedDept: parsed.assignedDept || "HPCL Customer Care Cell",
      dispatcherSummary: parsed.dispatcherSummary || "Grievance registered for investigation.",
      suggestedAction: parsed.suggestedAction || "Review customer grievance and contact complainant.",
      explainableRationale: parsed.explainableRationale || "Categorized based on complaint context.",
      isAiTriaged: true,
    };
  } catch (err) {
    console.warn("AI Triage parsing error, using heuristic fallback:", err);
    return offlineHeuristicTriage(title, description);
  }
}
