# HP MITRA — HPCL Enterprise AI Copilot
**HP Power Lab 3.0 Hackathon Entry (Unstop)**  
*Tagline: "Your perspective. Our next possibility."*

[![Next.js 14](https://img.shields.io/badge/Next.js-14.2_App_Router-black?logo=next.js)](https://nextjs.org/)
[![Prisma](https://img.shields.io/badge/Prisma-5.22-2D3748?logo=prisma)](https://www.prisma.io/)
[![SQLite](https://img.shields.io/badge/SQLite-Dev_DB-003B57?logo=sqlite)](https://www.sqlite.org/)
[![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-3.4-38B2AC?logo=tailwind-css)](https://tailwindcss.com/)
[![Vitest](https://img.shields.io/badge/Vitest-Passing-green?logo=vitest)](https://vitest.dev/)

---

## 🌟 Executive Summary & Hackathon One-Liner
**HP Mitra** is a unified, enterprise-grade AI assistant designed for everyone in Hindustan Petroleum's ecosystem:
- **Retail & LPG Dealers**: Margin calculations, physical dip conversion, SOP guidance.
- **Outlet Frontline Staff**: Morning density checks, filter paper test procedures, EV charger troubleshooting.
- **Consumers**: Doorstep DAC verification, LPG leak emergency guidance, DBTL subsidy tracking.
- **Regional Leadership & HQ Admin**: Live operational telemetry computed strictly from database records with zero synthetic numbers.

---

## 🏛️ The 3 Core Pillars

### 1. ASK HPCL — Grounded RAG Copilot
- **Zero Hallucination Guarantee**: Answers **strictly** from 15 ingested HPCL operational manuals and circulars.
- **Verified Citations**: Every single fact cites the exact source document title in brackets: `[HP Gas LPG Safety SOP]`.
- **Bilingual Interface**: Full support for English and Hindi queries and responses.
- **Offline Fallback**: If `GEMINI_API_KEY` is missing or the external network fails, the system automatically falls back to indexed keyword vector matching. The app **never crashes**.

### 2. Smart Complaint Triage Desk
- **Emergency Priority Engine**:
  - **CRITICAL (<4h SLA)**: LPG gas leaks, hissing regulators, forecourt sparks, or fire hazards. Instantly routed to the **HPCL Safety & Emergency Response Cell**.
  - **HIGH (<12h SLA)**: Fuel adulteration allegations, EV fast charger outages on highways, meter calibration discrepancies.
  - **MEDIUM (<24h SLA)**: DBTL subsidy delays, commercial billing GST issues, stock reconciliation variances.
  - **LOW (<48h SLA)**: Washroom amenities, canopy illumination, air nozzle maintenance.
- **Explainable Rationale**: Every automated triage decision displays its clear rationale in the UI so managers and dealers understand why an SLA was assigned.

### 3. Outlet Analytics Dashboard
- **Strictly Database-Computed**: All metrics (total complaints, resolution closure rates, category breakdowns, and average resolution times) are calculated directly from DB timestamps (`resolvedAt - createdAt`).
- **Zero Synthetic Averages**: If data is missing for an outlet, the UI displays a neutral zero-state with a `"live telemetry unavailable"` banner rather than inventing fake numbers.
- **Role-Based Access Control (RBAC)**: Dealers see only their outlet, Regional Managers see their region, and HQ Admins see global metrics.

---

## 👥 Role-Based Access Control (RBAC) Persona Matrix

| Persona | Name | Role | Access Scope |
|---|---|---|---|
| **HPCL HQ Admin** | Rajesh Sharma | `ADMIN` | Unrestricted global access; can view all 12 outlets, manage users, and inspect full complaint queues |
| **Regional Head (North)** | Vikram Malhotra | `MANAGER` | Regional scope: Sees only North region outlets (Delhi, Chandigarh) and regional complaints |
| **Dealer (Delhi Central)** | Sunil Verma | `DEALER` | Isolated scope: Sees only Outlet `HP-DEL-001` metrics, staff data, and outlet complaints |
| **Dealer (Mumbai West)** | Pooja Kulkarni | `DEALER` | Isolated scope: Sees only Outlet `HP-MUM-001` data |
| **HP Gas Customer** | Amit Kumar | `CUSTOMER` | Consumer scope: Can ask the Copilot, file tickets, and view only personally reported complaints |

> **30-Second Judge Experience**: A prominent **Persona Switcher** is located in the top navigation header. Evaluators can switch roles in 1 click to test strict RBAC enforcement on both the UI and API!

---

## 🗄️ Database Architecture & Seed Roster

### Seeded Models
- **Users**: 5 seeded realistic enterprise personas.
- **Outlets**: 12 retail and LPG stations distributed across 4 zones (`NORTH`, `SOUTH`, `EAST`, `WEST`) with facility types (`PETROL`, `DIESEL`, `LPG`, `EV`, `COMBINED`).
- **Knowledge Documents**: 15 official operational manuals (400–800 words each with clearly numbered sections):
  1. *HP Gas LPG Safety SOP (Leak Response & Emergency Containment)*
  2. *HPCL Dealer Margin & Commission Circular 2024*
  3. *HP Gas LPG Subsidy & Refill Booking FAQ (PAHAL / DBTL Guidelines)*
  4. *HPCL EV Charging Station Infrastructure & Operations Guidelines*
  5. *HPCL Fuel Quality, Density & Anti-Adulteration SOP*
  6. *HPCL Retail Outlet Cleanliness, Amenities & Audit Checklist*
  7. *HPCL Customer Grievance Redressal & Complaint Escalation Matrix*
  8. *HPCL Retail Petrol & Diesel Stock Management & Dip Measurement SOP*
  9. *HP Gas Cylinder Delivery & DAC / OTP Verification Process*
  10. *HPCL Emergency Fire Safety & Evacuation SOP*
  11. *HPCL 'Hamara Pump' Rural Retail Outlet Support & Incentive Scheme*
  12. *HPCL Digital Payments, POS Machine & HP Pay Application SOP*
  13. *HP Gas Customer KYC & New LPG Connection Onboarding Process*
  14. *HPCL Monsoon Safety Advisory & Flood Preparedness Protocol*
  15. *HPCL EV Fast Charger Preventive Maintenance & Fault Recovery SOP*
- **Document Chunks**: 68 chunked document segments (~800 characters each with overlap).
- **Complaints**: 20 realistic grievances:
  - 2 CRITICAL (LPG gas smell/leak, fire safety)
  - 4 HIGH (adulteration suspicion, EV charger down, delivery not received, meter discrepancy)
  - 8 MEDIUM (subsidy delay, stock mismatch, billing double debit, DAC latency, etc.)
  - 6 LOW (washroom soap, canopy light, air inflator chuck, etc.)
  - **8 RESOLVED**: Realistic timestamps yielding a computed average resolution time of **~10.9 hours**, well within the 48h SLA benchmark!

---

## 🚀 How to Run Locally

### 1. Prerequisites
- **Node.js**: v18+ or v20+ LTS
- **npm**: v10+

### 2. Setup Environment
```bash
# Clone and enter directory
cd HPCL-Hackathon

# Install dependencies
npm install

# Database setup (creates local dev.db SQLite database)
npx prisma db push

# Run idempotent seed script
npm run prisma:seed
```

### 3. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 4. Run Test Suite
```bash
npm test
```

### 5. Production Build
```bash
npm run build
npm start
```

---

## 🔑 Environment Configuration (`.env`)
```env
DATABASE_URL="file:./dev.db"
GEMINI_API_KEY="" # Optional: App features automatic offline fallback if empty
NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

---

## 🛡️ Judging Compliance Notice
> **"Demo data for judging — not real HPCL data"**  
> All simulated statistics, customer names, and outlet identifiers are created exclusively for competition evaluation in the HP Power Lab 3.0 Hackathon.
