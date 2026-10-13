export interface SeedDoc {
  id: string;
  title: string;
  category: string;
  source: string;
  language: string;
  content: string;
}

export const SEED_DOCS: SeedDoc[] = [
  {
    id: "doc-01-lpg-safety",
    title: "HP Gas LPG Safety SOP (Leak Response & Emergency Containment)",
    category: "SAFETY_HAZARD",
    source: "HPCL Corporate Health, Safety & Environment (HSE) Manual 2024-V2",
    language: "en",
    content: `Section 1: Scope and Applicability
This Standard Operating Procedure (SOP) governs emergency response and immediate containment protocols for domestic (14.2 kg), commercial (19 kg, 47.5 kg), and auto-LPG leakage incidents across all Hindustan Petroleum Corporation Limited (HPCL) retail outlets, distributorships, and consumer premises. Compliance with this directive is mandatory under the Petroleum and Explosives Safety Organization (PESO) regulations.

Section 2: Immediate Emergency Actions for Consumers and Delivery Staff
Upon identifying an LPG smell (characterized by Ethyl Mercaptan odorant) or audible hissing from the cylinder valve or regulator assembly:
1. Do not ignite any open flame, matchstick, candle, or lighter under any circumstance.
2. Do not operate electrical switches, appliances, exhaust fans, doorbells, or mobile phones within a 15-meter radius, as spark discharge can cause vapor ignition.
3. Turn the regulator switch knob to the 'OFF' position clockwise immediately.
4. If the leak persists, gently remove the regulator and secure the safety cap firmly over the cylinder valve until the locking pin clicks.
5. Open all windows, external doors, and ventilators to promote air cross-circulation and natural gas dispersal. Note that LPG is heavier than air and settles near floor crevices and drains.
6. Evacuate all personnel, children, and pets immediately to an open upwind assembly location.

Section 3: Distributorship and Emergency Response Vehicle (ERV) Dispatch
The HPCL distributor must operate a dedicated 24x7 Emergency Response Vehicle (ERV) staffed by certified mechanics.
- Emergency Call Intake: The emergency operator must record the customer consumer number, exact address, leak severity, and landmarks within 90 seconds.
- SLA Commitment: The ERV mechanic must be dispatched within 10 minutes, with on-site containment targeted within 30 minutes in urban territories and 60 minutes in rural zones.
- Containment Kit: Mechanics must carry brass non-sparking wrenches, spare O-rings, approved safety caps, Teflon sealants, water troughs for submersing pin leaks, and a multi-gas portable detector.

Section 4: Technical Remediation & O-Ring Replacement
When on-site, the HPCL mechanic must inspect the cylinder neck O-ring (rubber grommet):
- If the O-ring is worn, cut, or brittle, extract using the non-magnetic brass extractor tool and install a fresh PESO-certified nitrile O-ring.
- Perform a soap-water solution leak test across the valve neck, spindle, and regulator crimp joint. Never use an open flame for testing.
- If the cylinder body exhibits valve spindle slippage or pin puncture, evacuate the cylinder immediately in an open ventilated water-safe carrier and log a defective cylinder ticket on the HPCL Portal.

Section 5: Escalation Matrix and Emergency Contact Lines
- All-India HP Gas 24x7 Leak Helpline: 1906 (Toll-Free, Priority IVR Routing).
- HPCL National Emergency Response Center: 1800-233-3555.
- Municipal Fire Control Room: 101.
- Regional HSE Officer escalation is required if leakage involves commercial manifolds exceeding 100 kg total capacity.`,
  },
  {
    id: "doc-02-dealer-margins",
    title: "HPCL Dealer Margin & Commission Circular 2024",
    category: "DEALER_OPERATIONS",
    source: "HPCL Retail Marketing Directorate Circular MKT/RET/2024/08",
    language: "en",
    content: `Section 1: Purpose & Effective Date
This circular details the revised commission structure, dealer margins, operating allowances, and working capital interest compensations payable to HPCL Retail Outlet (RO) dealers across MS (Motor Spirit / Petrol), HSD (High Speed Diesel), and CNG dispense operations, effective from the current fiscal cycle.

Section 2: Commission Breakdown for MS (Petrol)
The total dealer margin on Motor Spirit (Petrol) is structured into two fundamental components:
1. Return on Investment (ROI) & Working Capital Cost: Calculated at Rs. 1,420 per kilolitre (KL), covering inventory financing, stock transit shrinkage allowance (0.59% evaporation buffer), and terminal deposit carrying charges.
2. Operating Cost Reimbursement (OCR): Calculated at Rs. 2,440 per KL, incorporating staff wages (compliant with minimum wages act), uniform allowance, 24x7 canopy electricity, POS terminal bandwidth, and statutory insurance.
- Total Gross MS Dealer Margin: Rs. 3,860 per Kilolitre (Rs. 3.86 per Litre).
- Additional Incentive: Dealers achieving >98% compliance on digital payment transactions receive a performance bonus of Rs. 0.05 per Litre credited quarterly.

Section 3: Commission Breakdown for HSD (High Speed Diesel)
Due to higher batch volume throughput and distinct temperature-density coefficients:
1. ROI and Capital Charge: Rs. 1,180 per KL.
2. Operating Cost Component: Rs. 1,410 per KL, including heavy-vehicle driveway marshaling and high-flow dispenser nozzle maintenance.
- Total Gross HSD Dealer Margin: Rs. 2,590 per Kilolitre (Rs. 2.59 per Litre).
- Temperature Compensation: Automated stock calibration compensates invoice volume for density fluctuations measured at 15 degrees Celsius.

Section 4: Statutory Deductions and Quality Assurance Penalties
- Deductions: Mandatory TDS under Section 194H of the Income Tax Act is deducted at prevailing central rates.
- Quality Penalties: Any retail outlet found non-compliant with standard filter paper density tests or automated density sensor bypass will face instant margin freezing, stock supply embargo, and penalty under Marketing Discipline Guidelines (MDG).

Section 5: Settlement Timelines and Account Reconciliation
Margins are credited via automated daily reconciliation directly against the dealer's RTGS indentation ledger on the HPCL e-Portal (ERP SAP). Queries or discrepancies must be lodged within 7 working days with the Regional Retail Finance Manager.`,
  },
  {
    id: "doc-03-lpg-subsidy-faq",
    title: "HP Gas LPG Subsidy & Refill Booking FAQ (PAHAL / DBTL Guidelines)",
    category: "CUSTOMER_SERVICE",
    source: "HPCL LPG SBU Consumer Information Booklet 2024",
    language: "en",
    content: `Section 1: Direct Benefit Transfer for LPG (PAHAL / DBTL) Overview
Under the Government of India PAHAL (DBTL) scheme, domestic LPG consumers receive subsidized cylinders at market price while the central subsidy component is transferred directly to the consumer's Aadhaar-linked bank account.

Section 2: Eligibility and Cylinder Quotas
- Every registered domestic household with an active Single Bottle Cylinder (SBC) or Double Bottle Cylinder (DBC) connection is entitled to 12 subsidized 14.2 kg refills per financial year (April 1 to March 31).
- Refills booked beyond the 12-cylinder annual quota are billed at the prevailing Non-Subsidized Domestic Consumer Price.
- PMUY (Pradhan Mantri Ujjwala Yojana) beneficiaries receive an additional central targeted subsidy of Rs. 300 per cylinder credited automatically.

Section 3: How to Link Bank Account & Aadhaar for Subsidy Credit
1. Mode 1 (Aadhaar Seeding): Submit Form 1 to your bank branch to link your Aadhaar with your primary bank account and verify NPCI mapping. Submit Form 2 to your HP Gas distributor.
2. Mode 2 (Non-Aadhaar Direct Link): Submit Form 4 directly to the HP Gas distributor with a cancelled bank cheque and 17-digit LPG Consumer ID.
3. Verification: Check status online on www.myhpgas.in or via the HP Pay Mobile App under 'Subsidy Transfer Status'.

Section 4: Resolving Subsidy Transfer Delays and Failures
If subsidy has not arrived within 48 hours of cylinder delivery:
- Step 1: Ensure the delivery boy closed the order using the correct DAC (Delivery Authentication Code) or OTP. Subsidy release triggers only upon successful electronic proof of delivery.
- Step 2: Confirm your bank account is active and has not been marked dormant or KYC-lapsed.
- Step 3: Check whether your Aadhaar has been re-mapped to another bank account without notification.
- Step 4: Lodge a grievance through HP Mitra Copilot or call the HPCL Customer Care toll-free number 1800-233-3555 with your 17-digit LPG ID and Cash Memo number.

Section 5: Refill Booking Channels
Refills can be booked 24x7 via:
- WhatsApp Booking: Send 'Hi' to 9222201122.
- Missed Call Service: Give a missed call from registered mobile number to 9493602222.
- HP Pay Mobile Application & IVRS Telephone System.
- Minimum Refill Interval: A gap of 15 days is mandatory between successive domestic refill bookings.`,
  },
  {
    id: "doc-04-ev-charging-guidelines",
    title: "HPCL EV Charging Station Infrastructure & Operations Guidelines",
    category: "EV_INFRASTRUCTURE",
    source: "HPCL Green Energy & New Initiatives Directorate Manual GE-2024",
    language: "en",
    content: `Section 1: Objective & Network Vision
HPCL has committed to establishing high-speed EV charging corridors across golden quadrilateral national highways and metro retail stations. This document sets down site readiness, equipment standards, and operational guidelines for combined fuel-EV outlets.

Section 2: Charging Hardware Specifications
All fast DC chargers installed at HPCL outlets must comply with AIS-138 Part 2 and IEC 61851 standards:
- Fast Charger Capacity: Dual-gun 60 kW and 120 kW CCS-2 / CHAdeMO DC chargers with dynamic power balancing.
- AC Slow Charger: Type-2 AC 22 kW charger for plug-in hybrid and overnight passenger fleet replenishment.
- Ingress Protection: IP54 rated outdoor enclosure with anti-corrosive powder coating and integrated lightning arrestor.
- Metering & Billing: Bi-directional smart energy meter compliant with CEA regulations and OCPP 1.6J / 2.0.1 protocol linked to HP Pay.

Section 3: Driveway Safety Clearances and Hazardous Area Classification
1. The EV charging bay must be located strictly in the Non-Hazardous Zone, outside Class-I Div-1 and Div-2 hazardous vapor boundaries of fuel dispensers and underground tank vent pipes (minimum 6-meter separation).
2. Bay Dimensions: Dedicated marked parking bay (minimum 6.0m length x 3.5m width per gun) with green high-visibility epoxy coating and anti-skid texture.
3. Wheel Stoppers and Bollards: Concrete wheel stoppers (150mm height) and heavy-duty steel safety bollards are mandatory to protect charging pedestals from vehicular impact.

Section 4: Daily Operational Protocol for Station Staff
- Cable Inspection: Outlet staff must examine charging cables every morning for insulation cuts, connector pin damage, water ingress, or latch malfunction.
- Emergency Stop Switch: Verify monthly that the mechanical red mushroom Emergency Stop button isolates high-voltage contactors instantly.
- Screen & Network Connectivity: Ensure 4G/fiber backhaul connectivity is active. If offline, the charger must support offline authorization for queued sessions.

Section 5: Emergency Breakdown & Fault Escalation
In case of connector jamming, thermal cut-off, or earth leakage fault (ELR trip):
- Do not force the CCS2 gun out; activate the vehicle lock release override.
- Log a priority ticket on HP Mitra with the Charger Station ID and fault code (e.g., OCPP Fault 0x14).
- HPCL EV Technical Operations Center helpline: 1800-425-4725. Standard uptime SLA is 99.2% with field dispatch within 4 hours.`,
  },
  {
    id: "doc-05-fuel-quality-checks",
    title: "HPCL Fuel Quality, Density & Anti-Adulteration SOP",
    category: "QUALITY_ASSURANCE",
    source: "HPCL Operations & Quality Control Manual QC-RO-102",
    language: "en",
    content: `Section 1: Commitment to Quality & Quantity (Q&Q)
HPCL guarantees 100% Quality and Quantity assurance at every retail outlet under the 'Club HP' and standard network pledge. Every customer has the statutory right to inspect fuel quality, density, and dispense accuracy free of charge.

Section 2: Mandatory Morning Density Check Protocol
Every retail outlet dealer or authorized manager must conduct the density test every morning before commencing fuel sales:
1. Draw a fuel sample from each underground storage tank using a clean brass sampling bottle.
2. Pour the sample into a clean 500ml glass hydrometer jar.
3. Note the temperature of the fuel using an ASTM 12C calibrated mercury-in-glass thermometer.
4. Float the calibrated ASTM hydrometer into the liquid, ensuring it does not touch the jar walls, and read the observed density.
5. Convert the observed density to Standard Density at 15°C using the authorized ASTM Petroleum Measurement Tables (Table 53B).
6. Compare with the refinery invoice density: The observed 15°C density must strictly match the invoice density within a permissible variance of +/- 3.0 kg/m3.
7. Record all readings in the physical Morning Density Register and input into the Automated Terminal Station System (ATSS).

Section 3: Filter Paper Test for Motor Spirit (Petrol)
The filter paper test is a decisive test for adulteration in petrol:
1. Clean the dispenser nozzle tip thoroughly.
2. Put 2 to 3 drops of petrol onto an authorized Whatman Grade 1 filter paper.
3. Allow the petrol drops to evaporate completely for 2 minutes in a shaded, well-ventilated space.
4. Observation: Pure petrol evaporates completely without leaving any stain or pinkish/brownish ring. Any persistent oily residue or discoloration indicates presence of solvent, naphtha, or kerosene adulteration.

Section 4: Standard 5-Litre Measure Delivery Verification
- Every retail outlet must maintain a 5-litre conical capacity measure stamped and certified annually by the Department of Legal Metrology.
- Permissible delivery tolerance at 5 litres dispense is +/- 25 ml.
- If delivery error exceeds 25 ml, the dispenser nozzle must be immediately tagged out of service and reported to the Legal Metrology Inspector and HPCL Field Officer.

Section 5: Adulteration Grievance Handling and Sealed Sampling
If a customer lodges a fuel adulteration complaint:
- Draw three 1-litre glass bottle samples in the customer's presence: one for terminal lab analysis, one for the customer, and one for dealer retention.
- Seal each bottle with tamper-evident HPCL seals signed by dealer and complainant.
- Forward sample to the accredited HPCL Quality Control Laboratory within 24 hours. Result must be published within 72 hours.`,
  },
  {
    id: "doc-06-outlet-cleanliness-audit",
    title: "HPCL Retail Outlet Cleanliness, Amenities & Audit Checklist",
    category: "STATION_AMENITIES",
    source: "HPCL Customer Experience & Station Standardization Manual CX-2024",
    language: "en",
    content: `Section 1: The 'Swachh Station' Standards
Hindustan Petroleum retail stations must serve as benchmarks for public sanitation, traveler convenience, and hygiene along urban roadways and state/national highways. Maintenance of clean restrooms and drinking water is an essential condition of retail licensing.

Section 2: Mandatory Customer Amenities Checklist
Every HPCL retail outlet must provide the following amenities 24 hours a day at zero cost to the traveling public:
1. Segregated Restrooms: Clean, well-lit, lockable male, female, and accessible restrooms equipped with running water, flush systems, hand soap dispensers, mirror, and trash bin.
2. RO Purified Drinking Water: Functioning Reverse Osmosis (RO) drinking water dispenser with disposable paper cups and daily TDS log monitoring.
3. Free Air & Nitrogen Pressure Check: Calibrated digital tire inflator with air and nitrogen dispense hoses and functional pressure gauge.
4. First Aid Kit: Up-to-date medical kit containing sterile gauze, burn ointments, antiseptic solution (Savlon/Dettol), band-aids, and emergency contact numbers.
5. Emergency Fire Bucket & Extinguishers: Full dry sand buckets and tested DCP fire extinguishers placed at dispenser islands.

Section 3: Cleaning Schedule and Inspection Frequency
- High-Traffic Restrooms: Cleaned and sanitized every 2 hours; housekeeping check-sheet signed and displayed on the restroom door.
- Driveway and Forecourt: Swept continuously to remove oil drippings, plastic litter, and gravel. Oil spills must be treated with chemical absorbent powder immediately.
- Canopy and Fascia Lighting: Inspect all LED lamps daily; illuminated signage must be fully operational from dusk till dawn.

Section 4: Mystery Audits and Quality Scoring
HPCL conducts unannounced quarterly Mystery Shopping audits across all outlets:
- Restroom hygiene carries 25% weightage in the dealer quarterly service incentive score.
- Missing soap, locked restrooms, or non-functional drinking water incurs an immediate grade deduction and notice from the Regional Sales Manager.
- Persistent non-compliance over two consecutive audit rounds leads to punitive reduction in dealer operational allowances.`,
  },
  {
    id: "doc-07-complaint-escalation-matrix",
    title: "HPCL Customer Grievance Redressal & Complaint Escalation Matrix",
    category: "CUSTOMER_SERVICE",
    source: "HPCL Public Grievance Charter & CPGRAMS Protocol PG-2024",
    language: "en",
    content: `Section 1: Grievance Redressal Policy Statement
HPCL is committed to resolving customer grievances with speed, transparency, and accountability. Every complaint logged via phone, mobile app, portal, or physical register is assigned a unique tracking token and tracked against strict Service Level Agreements (SLAs).

Section 2: Priority Categorization and Turnaround SLAs
Complaints are systematically triaged into four priority tiers:
1. Priority CRITICAL (SLA: 4 Hours)
   - Scope: LPG gas leakages, fire incidents, cylinder bursts, electric short circuits at forecourts, major fuel spills threatening life or property.
   - Action: Immediate dispatch of Emergency Response Vehicle (ERV), notification to local fire/police authorities and HPCL Area Safety Officer.
2. Priority HIGH (SLA: 12 Hours)
   - Scope: Fuel adulteration allegations, short delivery exceeding legal tolerance, EV fast charger breakdowns on highways, CNG dispenser failure.
   - Action: On-site verification by Field Officer, sample locking, or OEM technician ticket dispatch.
3. Priority MEDIUM (SLA: 24 Hours)
   - Scope: Delayed cylinder delivery (>48h after booking), DBTL subsidy credit failure, digital payment double deduction, DAC verification failure.
   - Action: Bank reconciliation, distributor stock audit, and automated refund trigger.
4. Priority LOW (SLA: 48 Hours)
   - Scope: Station cleanliness, staff demeanor, digital air gauge inoperative, missing signage, general inquiries.
   - Action: Outlet manager notification and corrective action closure report.

Section 3: Multi-Tier Escalation Levels
- Tier 1: Retail Outlet Dealer / LPG Distributor Customer Helpdesk (First point of resolution).
- Tier 2 (Breach > SLA): Regional Sales Officer (RSO) / Area Sales Manager (ASM).
- Tier 3 (Breach > 2x SLA): Regional Manager (Retail / LPG) / State Level Coordinator (SLC).
- Tier 4: Chief Grievance Redressal Officer (CGRO) at HPCL Corporate Headquarters, Mumbai.

Section 4: Complainant Rights & Closure Verification
No complaint ticket may be closed unilaterally by a dealer or officer without entering a verifiable resolution action report. The complainant receives an SMS notification with OTP to confirm satisfactory resolution. If unsatisfied, the complainant may reopen the case within 7 days.`,
  },
  {
    id: "doc-08-stock-management-sop",
    title: "HPCL Retail Petrol & Diesel Stock Management & Dip Measurement SOP",
    category: "DEALER_OPERATIONS",
    source: "HPCL Retail Operations Handbook SEC-STK-44",
    language: "en",
    content: `Section 1: Objective & Statutory Compliance
Precise stock accounting of Motor Spirit (MS) and High-Speed Diesel (HSD) is critical for preventing transit losses, identifying underground tank leakage, and ensuring environmental safety. Daily stock accounting is mandatory under the Essential Commodities Act.

Section 2: Physical Dip Measurement Protocol
Physical stock measurement must be taken twice daily (at 00:00 shift change and 06:00 opening):
1. Use an authorized, calibrated brass dip rod marked in centimeters and millimeters. Never use wooden or iron rods that could generate friction sparks.
2. Ensure the underground storage tank dip pipe cap is unscrewed carefully and any accumulated dust is wiped off.
3. Lower the brass dip rod vertically into the tank until it gently touches the datum strike plate at the bottom.
4. Extract the rod steadily and read the liquid level line immediately to the nearest millimeter.
5. Refer to the tank-specific PESO-approved Calibration Chart (Dip-to-Volume conversion table) to calculate gross physical stock in litres.
6. Check for Water Bottoms: Apply water-finding paste (Kolor Kut) to the bottom 10 cm of the dip rod. If the yellow paste turns bright red, water contamination exists and must be pumped out immediately using the hand suction pump before dispensing fuel.

Section 3: Automatic Tank Gauging (ATG) Reconciliation
Outlets equipped with ATG consoles (Veeder-Root or equivalent) must cross-reference physical dip readings against electronic sensor volume:
- Permissible variance between physical dip and electronic ATG readout is +/- 0.2% of tank volume.
- Sudden loss exceeding 150 litres without corresponding dispenser throughput indicates an underground pipeline or tank breach requiring immediate shutdown.

Section 4: Stock Evaporation Loss Limits
- Motor Spirit (Petrol): Evaporation and handling allowance is capped at 0.59% of sales throughput.
- High-Speed Diesel: Handling loss allowance is capped at 0.15% of throughput.
- Any loss exceeding these ceilings must be investigated for thermal density variation, meter calibration drift, or leakages.`,
  },
  {
    id: "doc-09-cylinder-delivery-dac",
    title: "HP Gas Cylinder Delivery & DAC / OTP Verification Process",
    category: "CUSTOMER_SERVICE",
    source: "HP Gas Distribution Operations Manual DIST-DAC-2024",
    language: "en",
    content: `Section 1: Delivery Authentication Code (DAC) System Overview
To prevent cylinder diversion, ensure authorized hand-over, and protect consumer subsidy rights, HPCL enforces mandatory Delivery Authentication Code (DAC) verification across all domestic LPG refill deliveries.

Section 2: Generation and Receipt of DAC
1. When a consumer books an LPG refill through WhatsApp, IVRS, or HP Pay, a 4-digit numeric DAC is automatically generated by the central ERP system.
2. The DAC is transmitted to the consumer's registered mobile number via SMS and WhatsApp message upon cash memo generation.
3. The DAC is unique to each individual refill cash memo and remains valid until successful delivery or cancellation.

Section 3: Delivery Process at Consumer Doorstep
1. Pre-Delivery Physical Inspection: The delivery person must demonstrate the cylinder intactness to the consumer by checking the tamper-proof plastic seal and holographic cap.
2. Sound and Leak Check: The delivery person must remove the safety cap with the consumer's consent and perform the mandatory soap-solution O-ring leak test.
3. Weight Verification: Every delivery vehicle carries a certified spring balance. The consumer is entitled to request free doorstep weight verification (Tare Weight + 14.2 kg LPG = Gross Weight).
4. Entering DAC: The delivery person enters the 4-digit DAC into the HP Gas Delivery Mobile App on their hand-held terminal.
5. Immediate Confirmation: Upon DAC validation, the order status flips to 'DELIVERED', an electronic receipt is generated, and the subsidy release request is transmitted to PFMS/NPCI.

Section 4: Protocol for Missing DAC or Unregistered Mobile Numbers
If the consumer has not received or cannot access the DAC SMS:
- The delivery person must initiate an 'On-Demand DAC Resend' via the delivery app, triggering an instant OTP to the registered mobile.
- If the mobile number has changed or is unreachable, an authorized OTP can be sent to the alternate verified family contact registered in HPCL KYC records.
- Delivery staff are strictly prohibited from refusing delivery if the consumer produces the original physical booking invoice and photo identity proof, provided the distributor authorizes manual verification.`,
  },
  {
    id: "doc-10-fire-safety-sop",
    title: "HPCL Emergency Fire Safety & Evacuation Standard Operating Procedure",
    category: "SAFETY_HAZARD",
    source: "HPCL HSE Emergency Preparedness & Disaster Management Plan 2024",
    language: "en",
    content: `Section 1: Fire Hazard Classification at Hydrocarbon Retail Facilities
HPCL retail outlets and LPG godowns handle Class A (solids/rubbish), Class B (flammable hydrocarbons: MS/HSD/LPG), and Class C (electrical/gas vapor) fire risks. Strict adherence to fire prevention norms is mandatory under OISD-STD-105 standards.

Section 2: First-Response Actions in the Event of Forecourt Fire
1. Sound the Emergency Alarm: Press the manual call point (MCP) or activate the forecourt siren to alert all staff, customers, and neighbors.
2. Activate Emergency Stop (ESD): Instantly press the big red master Emergency Stop button located near the cashier console to cut power to all submerged turbine pumps (STPs) and dispensers.
3. Stop Fueling & Evacuate: Cease all dispensing operations immediately. Instruct all vehicle drivers to leave ignition keys in place and evacuate calmly to the designated assembly area across the driveway upwind.
4. Cordon the Forecourt: Close entry and exit barricades to prevent oncoming vehicular traffic from entering the danger zone.

Section 3: Fire Extinguisher Deployment Techniques
Staff trained in PASS technique (Pull pin, Aim at base, Squeeze lever, Sweep side-to-side) must deploy fire equipment immediately:
- Small Surface Fire: Deploy Dry Chemical Powder (DCP) 9 kg extinguisher or AFFF (Aqueous Film Forming Foam) 50-litre mobile trolley.
- Electrical Panel Fire: Deploy Carbon Dioxide (CO2) 4.5 kg extinguisher. Never use water on live electrical components.
- Spill Protection: Cast dry forecourt sand from fire buckets over burning hydrocarbon liquid to suppress oxygen contact.

Section 4: Mandatory Safety Clearances and Prohibitions
- Smoking, open fires, cooking, incense sticks, and uncertified cell phone usage are strictly prohibited inside the retail premises.
- Tank Lorry Decantation: During fuel tanker unloading, connecting bonding cables to dissipate static electricity is mandatory before opening manifold valves. A minimum of two 9kg DCP extinguishers must be positioned alongside the decantation bay.

Section 5: Emergency Escalation Contacts
- Fire Brigade: 101 / National Emergency Number: 112.
- Local Police Station & Trauma Ambulance: 108.
- HPCL Emergency Control Center: 1800-233-3555.`,
  },
  {
    id: "doc-11-rural-outlet-scheme",
    title: "HPCL 'Hamara Pump' Rural Retail Outlet Support & Incentive Scheme",
    category: "DEALER_OPERATIONS",
    source: "HPCL Rural Marketing Cell Policy Circular RM-2024/02",
    language: "en",
    content: `Section 1: Objective & Rural Development Mandate
Under the 'Hamara Pump' initiative, HPCL empowers rural entrepreneurs to establish low-cost, high-efficiency retail outlets catering to agricultural communities, tractors, tube wells, rural transport, and localized micro-industries across Tier-3 and Tier-4 geographies.

Section 2: Infrastructure Support and Subsidized Capex
- Solar Electrification Subsidy: Up to 50% capital subsidy on installation of a 5 kVA off-grid solar photovoltaic power pack with battery storage to overcome erratic grid electricity.
- Compact Dispenser Units: Supply of low-maintenance dual-nozzle dispensers engineered to operate reliably in dusty and high-temperature environments.
- Mobile Testing Kits: Complimentary density hydrometers, thermometer kits, and 5L calibrated measures provided to all rural dealers.

Section 3: Working Capital Credit & Indent Financing
To assist rural dealers with limited liquidity:
1. Micro-Credit Window: Tie-up with state bank agricultural loan desks offering concessional inventory financing up to Rs. 15 Lakhs at base repo rate.
2. Split-Load Decantation: Rural dealers located along cluster routes can order split tanker loads (minimum 3 KL MS or 6 KL HSD) without paying full tanker freight surcharges.

Section 4: Farmer Loyalty and Agri-Services Integration
- Agro-Retail Corner: Rural dealers are encouraged to stock certified lubricants (HP Milcy Turbo), agricultural grease, and organic fertilizers.
- Agri-Point Loyalty Points: Farmers fueling tractors earn double loyalty points redeemable for engine oil refills and agricultural implements.
- Monsoon Support: Extended credit terms of 14 days during sowing and harvesting peak cycles.`,
  },
  {
    id: "doc-12-digital-payment-pos-sop",
    title: "HPCL Digital Payments, POS Machine & HP Pay Application SOP",
    category: "DIGITAL_PAYMENTS",
    source: "HPCL Retail Automation & Fintech Division Manual FIN-2024",
    language: "en",
    content: `Section 1: Cashless Driveway Vision
HPCL aims for 100% digital penetration across all urban and highway dispensing points through integrated Electronic Data Capture (EDC) POS terminals, UPI dynamic QR stands, and the flagship 'HP Pay' loyalty mobile wallet.

Section 2: Dynamic QR Code & EDC POS Integration
1. Integrated Automation: The POS device is directly interfaced with the fuel dispenser automation system (ATSS). When a fueling nozzle is replaced, the exact dispensed volume and rupee amount are transmitted digitally to the EDC screen.
2. Dynamic UPI QR: The customer scans a transaction-specific dynamic QR code displayed on the POS screen. This prevents manual amount entry errors and overbilling disputes.
3. Supported Instruments: Credit cards, debit cards, UPI, RuPay, HP Pay Wallet, FASTag-based fuel payments, and Fleet Card balances.

Section 3: Resolving Payment Failures and Double Deductions
In case of a transaction timeout or account deduction without receipt generation:
- Chargeback Protocol: The POS terminal will automatically attempt an instant reversal (auto-reversal) within 3 minutes if the server handshake failed.
- Offline Receipt Generation: Station staff must enter the 12-digit Bank RRN (Retrieval Reference Number) into the POS 'Check Status' menu before asking the customer to swipe again.
- Customer Guidance: Advise the customer that NPCI guidelines mandate automated reversal of timed-out UPI payments into their bank account within T+1 working days.
- Dispute Logging: Staff must log a ticket on HP Mitra with customer mobile number, RRN number, and transaction timestamp.

Section 4: Dealer Digital Incentive Scheme
- Zero MDR on UPI: No Merchant Discount Rate is charged on UPI transactions up to Rs. 2,000.
- Monthly Bandwidth Allowance: Dealers achieving >85% digital sales receive a Rs. 1,200 monthly broadband data reimbursement credited to their account.`,
  },
  {
    id: "doc-13-kyc-new-connection",
    title: "HP Gas Customer KYC & New LPG Connection Onboarding Process",
    category: "CUSTOMER_SERVICE",
    source: "HP Gas Customer Services Guidelines KYC-2024",
    language: "en",
    content: `Section 1: Guidelines for Release of New LPG Connections
Any Indian citizen aged 18 years and above residing at a domestic address without an existing LPG connection from IOCL (Indane), BPCL (Bharatgas), or HPCL (HP Gas) is eligible to apply for a domestic LPG connection.

Section 2: Required Documentation (KYC Framework)
Applicants must submit valid Proof of Identity (PoI) and Proof of Address (PoA):
1. Proof of Identity: Aadhaar Card, Passport, PAN Card, Voter ID, or Driving License.
2. Proof of Address: Aadhaar Card, utility bill (electricity, water, telephone) not older than 3 months, ration card, rent agreement, or bank passbook with photo.
3. Bank Details: Clear copy of bank passbook or cancelled cheque with visible IFSC and account number for DBTL subsidy seeding.
4. Self-Declaration: Standard declaration confirming no other domestic LPG cylinder is held within the applicant's household.

Section 3: Digital Onboarding via 'Sahaj' e-SV Portal
- Customers can apply 100% paperless through www.myhpgas.in or the HP Pay App.
- Identity and address verification is completed electronically via DigiLocker or Aadhaar e-KYC.
- Payment of security deposit (cylinder deposit Rs. 2,200 for 14.2 kg, regulator deposit Rs. 250) is processed online via net banking or UPI.
- Subscription Voucher (e-SV) is generated digitally and sent to the customer's registered email with an encrypted PDF copy.

Section 4: Mandatory Safety Inspection Before Connection Release
Before delivering the first cylinder, a certified mechanic must visit the customer premises to inspect the kitchen layout:
- The cooking platform must be above floor level (never at floor level).
- The gas stove must be positioned above the level of the cylinder.
- Adequate natural ventilation must exist.
- Connection is certified safe only upon installation of an approved Suraksha orange braided steel wire LPG hose.`,
  },
  {
    id: "doc-14-monsoon-safety-advisory",
    title: "HPCL Monsoon Safety Advisory & Flood Preparedness Protocol",
    category: "SAFETY_HAZARD",
    source: "HPCL HSE Circular MON-2024/01",
    language: "en",
    content: `Section 1: Monsoon Hazard Assessment
Heavy rains, waterlogging, lightning storms, and seasonal flash floods present acute risks of water ingress into underground fuel storage tanks, electrical short circuits, and LPG cylinder floating hazards.

Section 2: Underground Tank Water Contamination Prevention
1. Manhole Chamber Inspection: Inspect all tank manhole chambers prior to the monsoon. Clean silt, ensure drainage weep holes are unblocked, and replace cracked chamber covers.
2. Dip Pipe & Fill Pipe Caps: Ensure all dip pipe brass caps and fill caps are fitted with intact water-tight nitrile gaskets and tightened securely.
3. Vent Pipe Height: Verify that tank vent pipes stand at least 4 meters above ground level and are fitted with brass wire mesh flame arrestors to prevent water ingress during localized flooding.
4. Mandatory Morning Water Dip: Conduct water bottom testing with Kolor Kut paste before starting sales every single morning during the rainy season.

Section 3: Forecourt Electrical & Canopy Safety
- Earth Pit Testing: Measure earth pit resistance using an earth megger before the monsoon. Earth resistance must not exceed 4 ohms.
- Lightning Arrestor: Inspect the canopy lightning conductor and down-conductor continuity.
- Inundation Threshold: If water levels rise above the base of dispensing island concrete pedestals, immediately isolate the main power switchboard and stop all fueling.

Section 4: LPG Godown Safeguards
- Cylinders stored in low-lying godowns must be elevated on wooden dunnage or raised concrete platforms to prevent flood submersion.
- Valves of all empty and full cylinders in storage must be secured with safety caps.
- Emergency drainage pumps must be pre-tested and ready for immediate deployment.`,
  },
  {
    id: "doc-15-ev-charger-maintenance",
    title: "HPCL EV Fast Charger Preventive Maintenance & Fault Recovery SOP",
    category: "EV_INFRASTRUCTURE",
    source: "HPCL EV Technology Directorate Technical Bulletin EV-MNT-2024",
    language: "en",
    content: `Section 1: Preventive Maintenance Schedule
To achieve the mandatory 99.2% uptime across highway fast chargers, certified service technicians and station operators must execute periodic maintenance as detailed below.

Section 2: Weekly & Monthly Inspection Procedures
1. Weekly Filter Cleaning: Vacuum and clean the intake air dust filters of the power module cabinet to maintain cooling efficiency in high-ambient summer heat.
2. Connector Cable & Pin Inspection: Inspect the silver-plated copper pins inside CCS-2 and CHAdeMO guns for pitting, carbon build-up, moisture, or bent pilot pins (CP/PP).
3. Residual Current Device (RCD/ELCB) Trip Test: Press the test button on Type-B RCDs to ensure the trip mechanism disconnects power within 30 milliseconds.
4. Screen Touch & RFID Reader: Test RFID card reader responsiveness and sunlight readability of the 7-inch LCD interface.

Section 3: Common Fault Codes and First-Line Troubleshooting
- Error E01 (Insulation Resistance Low): Usually caused by rain moisture condensation inside the connector gun. Solution: Power down, blow dry connector pins with warm clean air, and test insulation with a 500V megger.
- Error E04 (Emergency Stop Engaged): Ensure the red mushroom button has not been accidentally tripped. Rotate knob clockwise to reset.
- Error E09 (OCPP Communication Timeout): Check 4G SIM signal strength on the internal router. Power-cycle the telematics modem. If offline persists beyond 15 minutes, the charger switches to offline whitelist authorization mode.

Section 4: Technical Support Escalation
- All Tier-2 hardware faults (power module failure, liquid cooling pump failure, contactor welding) must be reported to the OEM Central Helpdesk within 30 minutes of occurrence.
- Field support response SLA is 4 hours for highway corridor chargers and 8 hours for urban intra-city locations.`,
  },
];

export interface SeedOutlet {
  id: string;
  code: string;
  name: string;
  region: "NORTH" | "SOUTH" | "EAST" | "WEST";
  city: string;
  type: "PETROL" | "DIESEL" | "LPG" | "EV" | "COMBINED";
  dealerId?: string;
}

export const SEED_OUTLETS: SeedOutlet[] = [
  // NORTH (3 Outlets)
  {
    id: "outlet-del-01",
    code: "HP-DEL-001",
    name: "HPCL Auto Care Centre - Connaught Place",
    region: "NORTH",
    city: "New Delhi",
    type: "COMBINED",
    dealerId: "user-dlr-delhi",
  },
  {
    id: "outlet-del-02",
    code: "HP-DEL-002",
    name: "Shree Krishna HP Gas Agency - Rohini",
    region: "NORTH",
    city: "Delhi",
    type: "LPG",
  },
  {
    id: "outlet-chd-01",
    code: "HP-CHD-001",
    name: "HPCL Highway Oasis & EV Hub - Sector 22",
    region: "NORTH",
    city: "Chandigarh",
    type: "EV",
  },

  // SOUTH (3 Outlets)
  {
    id: "outlet-blr-01",
    code: "HP-BLR-001",
    name: "HPCL Tech Hub Superstation - Indiranagar",
    region: "SOUTH",
    city: "Bengaluru",
    type: "COMBINED",
  },
  {
    id: "outlet-chn-01",
    code: "HP-CHN-001",
    name: "Marina Coast HP Petrol & Diesel - Mylapore",
    region: "SOUTH",
    city: "Chennai",
    type: "PETROL",
  },
  {
    id: "outlet-hyd-01",
    code: "HP-HYD-001",
    name: "Bhagyanagar HP Gas Rural & Urban Distributor",
    region: "SOUTH",
    city: "Hyderabad",
    type: "LPG",
  },

  // EAST (3 Outlets)
  {
    id: "outlet-kol-01",
    code: "HP-KOL-001",
    name: "Victoria Greens HPCL Retail Point - Salt Lake",
    region: "EAST",
    city: "Kolkata",
    type: "COMBINED",
  },
  {
    id: "outlet-pat-01",
    code: "HP-PAT-001",
    name: "Ganga Valley HP Retail Outlet - Bailey Road",
    region: "EAST",
    city: "Patna",
    type: "DIESEL",
  },
  {
    id: "outlet-bhu-01",
    code: "HP-BHU-001",
    name: "Kalinga HP Gas Agency & Auto-LPG Center",
    region: "EAST",
    city: "Bhubaneswar",
    type: "LPG",
  },

  // WEST (3 Outlets)
  {
    id: "outlet-mum-01",
    code: "HP-MUM-001",
    name: "Gateway HPCL Express & Fast EV Depot - Bandra",
    region: "WEST",
    city: "Mumbai",
    type: "COMBINED",
    dealerId: "user-dlr-mumbai",
  },
  {
    id: "outlet-pun-01",
    code: "HP-PUN-001",
    name: "Pune Expressway HP Highway Care - Hinjewadi",
    region: "WEST",
    city: "Pune",
    type: "EV",
  },
  {
    id: "outlet-ahm-01",
    code: "HP-AHM-001",
    name: "Sabarmati HP Gas Distribution & Cylinder Hub",
    region: "WEST",
    city: "Ahmedabad",
    type: "LPG",
  },
];

export interface SeedComplaint {
  id: string;
  title: string;
  description: string;
  category: string;
  subcategory: string;
  priority: "CRITICAL" | "HIGH" | "MEDIUM" | "LOW";
  status: "OPEN" | "IN_PROGRESS" | "RESOLVED";
  outletId: string;
  reporterId: string;
  assignedDept: string;
  slaHours: number;
  source: "CHAT" | "FORM" | "PHONE";
  createdAt: Date;
  resolvedAt?: Date;
  rationale: string;
  suggestedAction: string;
}

// 20 realistic complaints:
// 2 CRITICAL, 4 HIGH, 8 MEDIUM, 6 LOW.
// 8 RESOLVED with realistic resolvedAt so avg resolution time is computable and under 48h SLA.
const baseDate = new Date();
const hoursAgo = (h: number) => new Date(baseDate.getTime() - h * 3600 * 1000);

export const SEED_COMPLAINTS: SeedComplaint[] = [
  // 1. CRITICAL 1 (LPG Gas Smell / Leak) - RESOLVED (resolved in 3.2 hours)
  {
    id: "comp-01-lpg-leak",
    title: "Continuous strong LPG odor from domestic cylinder regulator valve",
    description:
      "Consumer smells pungent gas odor from newly delivered 14.2kg cylinder in kitchen. Hissing sound heard upon turning regulator knob. Household evacuated into open yard.",
    category: "SAFETY_HAZARD",
    subcategory: "LPG Leakage Emergency",
    priority: "CRITICAL",
    status: "RESOLVED",
    outletId: "outlet-del-02",
    reporterId: "user-cust-1",
    assignedDept: "HPCL Safety & Emergency Response Cell",
    slaHours: 4,
    source: "CHAT",
    createdAt: hoursAgo(48),
    resolvedAt: hoursAgo(44.8), // Resolved in 3.2 hours (<4h SLA)
    rationale:
      "Active gas leak hazard detected with potential vapor cloud ignition risk. Highest emergency response mandated.",
    suggestedAction:
      "Emergency mechanic dispatched. Defective O-ring replaced, soap leak test validated zero ppm escape.",
  },

  // 2. CRITICAL 2 (Forecourt Fire Safety Issue) - IN_PROGRESS
  {
    id: "comp-02-fire-safety",
    title: "Static spark and smoldering wire near dispenser island 2 junction box",
    description:
      "Forecourt marshal noticed intermittent electrical sparks and faint acrid smoke near underground conduit adjacent to high-flow diesel dispenser 2.",
    category: "SAFETY_HAZARD",
    subcategory: "Electrical Forecourt Fire Risk",
    priority: "CRITICAL",
    status: "IN_PROGRESS",
    outletId: "outlet-del-01",
    reporterId: "user-dlr-delhi",
    assignedDept: "HPCL Safety & Engineering Inspection Cell",
    slaHours: 4,
    source: "PHONE",
    createdAt: hoursAgo(2),
    rationale:
      "Electrical sparking in hazardous Class 1 Zone forecourt area presents immediate explosion risk.",
    suggestedAction:
      "Power to Dispenser 2 isolated at main breaker panel. Sand buckets deployed. Senior electrical contractor en route.",
  },

  // 3. HIGH 1 (Adulteration Suspicion) - RESOLVED (resolved in 9.5 hours)
  {
    id: "comp-03-adulteration",
    title: "Suspected adulteration in Premium Petrol (Motor Spirit)",
    description:
      "Customer states engine misfiring shortly after refueling 35 litres of MS. Requests immediate filter paper test and density sample verification.",
    category: "QUALITY_ASSURANCE",
    subcategory: "Fuel Quality & Density Variance",
    priority: "HIGH",
    status: "RESOLVED",
    outletId: "outlet-chn-01",
    reporterId: "user-cust-1",
    assignedDept: "Retail Quality Assurance Cell",
    slaHours: 12,
    source: "FORM",
    createdAt: hoursAgo(36),
    resolvedAt: hoursAgo(26.5), // Resolved in 9.5 hours (<12h SLA)
    rationale:
      "Vehicle drivability issue and brand integrity risk requires formal joint sampling and lab verification.",
    suggestedAction:
      "Field officer conducted Whatman filter paper test and ASTM hydrometer check. Density matched invoice at 742 kg/m3. Filter clean.",
  },

  // 4. HIGH 2 (EV Fast Charger Inoperative on Transit Corridor) - OPEN
  {
    id: "comp-04-ev-charger-down",
    title: "60kW DC Fast Charger Gun 1 tripping on vehicle handshake",
    description:
      "Multiple EV drivers stranded on expressway. Charger screen reboots with OCPP Error 0x14 whenever CCS2 gun is plugged into vehicle.",
    category: "EV_INFRASTRUCTURE",
    subcategory: "Fast Charger System Failure",
    priority: "HIGH",
    status: "OPEN",
    outletId: "outlet-pun-01",
    reporterId: "user-dlr-mumbai",
    assignedDept: "HPCL e-Mobility Tech Ops",
    slaHours: 12,
    source: "CHAT",
    createdAt: hoursAgo(5),
    rationale:
      "Highway EV corridor critical charging asset offline; causes transit disruption for intercity electric vehicles.",
    suggestedAction:
      "Escalated to OEM rapid response tech. Remote power-module reset triggered; hardware replacement ticket issued.",
  },

  // 5. HIGH 3 (Cylinder Delivery Not Received > 4 Days) - RESOLVED (resolved in 8.0 hours)
  {
    id: "comp-05-delivery-not-received",
    title: "Cylinder marked delivered in app but physical cylinder never arrived",
    description:
      "Consumer received SMS stating cylinder delivered and subsidy claimed, but no delivery boy visited the residence. Consumer without cooking fuel.",
    category: "CUSTOMER_SERVICE",
    subcategory: "False Delivery / Diversion Suspicion",
    priority: "HIGH",
    status: "RESOLVED",
    outletId: "outlet-del-02",
    reporterId: "user-cust-1",
    assignedDept: "LPG Distribution Monitoring Cell",
    slaHours: 12,
    source: "PHONE",
    createdAt: hoursAgo(72),
    resolvedAt: hoursAgo(64.0), // Resolved in 8.0 hours (<12h SLA)
    rationale:
      "Potential DAC fraud or erroneous barcode scan resulting in customer food preparation disruption.",
    suggestedAction:
      "Distributor manager summoned delivery boy. Erroneous delivery to neighbor rectified, cylinder delivered with apology voucher.",
  },

  // 6. HIGH 4 (Dispensary Meter Calibration Discrepancy) - IN_PROGRESS
  {
    id: "comp-06-meter-calibration",
    title: "Nozzle 3 delivery variance exceeding 35ml on 5L check",
    description:
      "Internal routine calibration check showed Dispenser 1 Nozzle 3 dispensing -38ml under-delivery on 5-litre stamped measure.",
    category: "DEALER_OPERATIONS",
    subcategory: "Legal Metrology Meter Calibration",
    priority: "HIGH",
    status: "IN_PROGRESS",
    outletId: "outlet-del-01",
    reporterId: "user-dlr-delhi",
    assignedDept: "Retail Engineering & Legal Metrology",
    slaHours: 12,
    source: "FORM",
    createdAt: hoursAgo(6),
    rationale:
      "Under-delivery breach violates Legal Metrology tolerances (+/- 25ml) and risks statutory penalty.",
    suggestedAction:
      "Nozzle tagged out of service immediately with yellow caution seal. Legal metrology calibration inspector booked.",
  },

  // 7. MEDIUM 1 (LPG Subsidy Not Credited) - RESOLVED (resolved in 18.2 hours)
  {
    id: "comp-07-subsidy-delay",
    title: "Subsidy amount of Rs. 300 not credited to bank account for March refill",
    description:
      "Refill delivered on 12th; Cash memo confirms DAC validation, but subsidy not received in Aadhaar-seeded SBI account after 5 days.",
    category: "BILLING_AND_SUBSIDY",
    subcategory: "DBTL PAHAL Subsidy Transfer Delay",
    priority: "MEDIUM",
    status: "RESOLVED",
    outletId: "outlet-hyd-01",
    reporterId: "user-cust-1",
    assignedDept: "HPCL Customer Accounts & LPG Distribution",
    slaHours: 24,
    source: "CHAT",
    createdAt: hoursAgo(90),
    resolvedAt: hoursAgo(71.8), // Resolved in 18.2 hours (<24h SLA)
    rationale:
      "Bank mapper delay or PFMS transaction timeout requiring reconciliation.",
    suggestedAction:
      "NPCI mapper status refreshed. PFMS re-triggered subsidy payment; funds confirmed credited to customer account.",
  },

  // 8. MEDIUM 2 (Diesel Stock Mismatch on Terminal Automation) - OPEN
  {
    id: "comp-08-stock-mismatch",
    title: "Physical dip shows 180L variance compared to automated ATG console",
    description:
      "Morning reconciliation shows tank 2 physical dip volume is 14,200L while ATG reads 14,380L following nighttime tanker unloading.",
    category: "DEALER_OPERATIONS",
    subcategory: "Stock Reconciliation Variance",
    priority: "MEDIUM",
    status: "OPEN",
    outletId: "outlet-del-01",
    reporterId: "user-dlr-delhi",
    assignedDept: "Terminal Automation Technical Team",
    slaHours: 24,
    source: "FORM",
    createdAt: hoursAgo(10),
    rationale:
      "Inventory reconciliation discrepancy exceeds daily temperature variance threshold.",
    suggestedAction:
      "Field officer requested ATG sensor recalibration and validation of tanker decantation receipt log.",
  },

  // 9. MEDIUM 3 (Digital Payment Double Deduction) - RESOLVED (resolved in 14.0 hours)
  {
    id: "comp-09-payment-deduction",
    title: "UPI amount deducted twice (Rs. 2,500 x 2) during fuel purchase",
    description:
      "Customer UPI payment timed out on POS terminal. Customer initiated second payment which passed, but both amounts deducted from HDFC account.",
    category: "DIGITAL_PAYMENTS",
    subcategory: "POS Gateway Timeout Double Debit",
    priority: "MEDIUM",
    status: "RESOLVED",
    outletId: "outlet-blr-01",
    reporterId: "user-cust-1",
    assignedDept: "Fintech & Digital Reconciliation Cell",
    slaHours: 24,
    source: "CHAT",
    createdAt: hoursAgo(40),
    resolvedAt: hoursAgo(26.0), // Resolved in 14.0 hours (<24h SLA)
    rationale:
      "Banking network gateway timeout resulting in dual debit requiring merchant auto-refund.",
    suggestedAction:
      "Terminal transaction RRN matched against gateway logs. Duplicate charge refunded via automated NPCI clearing.",
  },

  // 10. MEDIUM 4 (DAC OTP SMS Not Received at Delivery) - RESOLVED (resolved in 6.5 hours)
  {
    id: "comp-10-dac-otp-delay",
    title: "DAC SMS not received by customer; delivery boy unable to close order",
    description:
      "Delivery vehicle waiting at customer doorstep in Sector 22. Customer mobile not receiving DAC SMS despite 3 resend attempts.",
    category: "CUSTOMER_SERVICE",
    subcategory: "DAC Authentication Gateway Latency",
    priority: "MEDIUM",
    status: "RESOLVED",
    outletId: "outlet-del-02",
    reporterId: "user-cust-1",
    assignedDept: "HP Gas IT Operations",
    slaHours: 24,
    source: "PHONE",
    createdAt: hoursAgo(55),
    resolvedAt: hoursAgo(48.5), // Resolved in 6.5 hours (<24h SLA)
    rationale:
      "Telecom SMS gateway throttling blocking authorized delivery completion.",
    suggestedAction:
      "IVR fallback OTP triggered to alternate verified mobile. Delivery completed and verified.",
  },

  // 11. MEDIUM 5 (HP Pay Wallet Cashback Not Credited) - OPEN
  {
    id: "comp-11-wallet-cashback",
    title: "Promotional festive fuel cashback of Rs. 150 missing on HP Pay",
    description:
      "Customer fueled for Rs. 3,000 using HP Pay wallet under promo code HPFESTIVE. Promo terms confirmed eligible but cashback not reflected.",
    category: "DIGITAL_PAYMENTS",
    subcategory: "Loyalty Cashback Reconciliation",
    priority: "MEDIUM",
    status: "OPEN",
    outletId: "outlet-mum-01",
    reporterId: "user-cust-1",
    assignedDept: "HP Pay Loyalty Services Cell",
    slaHours: 24,
    source: "CHAT",
    createdAt: hoursAgo(14),
    rationale:
      "Promotional reward allocation batch process delay.",
    suggestedAction:
      "Customer account ticket assigned to Loyalty Ops for manual reward credit upon verification.",
  },

  // 12. MEDIUM 6 (Commercial LPG Invoice GST Number Discrepancy) - IN_PROGRESS
  {
    id: "comp-12-commercial-gst",
    title: "Commercial 19kg cylinder invoice printed with incorrect buyer GSTIN",
    description:
      "Hotel consumer invoiced for four 19kg commercial cylinders with one mismatched digit in GSTIN, jeopardizing tax credit filing.",
    category: "BILLING_AND_SUBSIDY",
    subcategory: "Commercial Tax Invoice Correction",
    priority: "MEDIUM",
    status: "IN_PROGRESS",
    outletId: "outlet-kol-01",
    reporterId: "user-dlr-delhi",
    assignedDept: "HPCL Commercial Sales & Billing",
    slaHours: 24,
    source: "FORM",
    createdAt: hoursAgo(16),
    rationale:
      "Statutory tax credit discrepancy affecting commercial account relationship.",
    suggestedAction:
      "Distributor accountant instructed to issue credit note and re-generate corrected GST tax invoice.",
  },

  // 13. MEDIUM 7 (Auto-LPG Dispenser Pressure Fluctuation) - OPEN
  {
    id: "comp-13-auto-lpg-pressure",
    title: "Auto-LPG dispenser dispensing rate abnormally slow (under 5 L/min)",
    description:
      "Auto-rickshaws queuing up due to low differential pressure on Auto-LPG dispenser nozzle. Pump motor sound abnormal.",
    category: "DEALER_OPERATIONS",
    subcategory: "Dispenser Hydraulics & Pump Strainer",
    priority: "MEDIUM",
    status: "OPEN",
    outletId: "outlet-bhu-01",
    reporterId: "user-dlr-mumbai",
    assignedDept: "LPG Engineering & Maintenance",
    slaHours: 24,
    source: "PHONE",
    createdAt: hoursAgo(12),
    rationale:
      "Mechanical strainer clogging or vapor lock impacting throughput.",
    suggestedAction:
      "Technician scheduled to check suction strainer and vapor return valve.",
  },

  // 14. MEDIUM 8 (New Connection e-SV Delay) - RESOLVED (resolved in 21.0 hours)
  {
    id: "comp-14-esv-delay",
    title: "e-SV Subscription Voucher not issued 48 hours after online payment",
    description:
      "Customer applied online for Sahaj new connection, completed KYC, and paid Rs. 2,450. Status still pending at distributor queue.",
    category: "CUSTOMER_SERVICE",
    subcategory: "New Connection KYC Allocation",
    priority: "MEDIUM",
    status: "RESOLVED",
    outletId: "outlet-del-02",
    reporterId: "user-cust-1",
    assignedDept: "HP Gas Onboarding & Customer Care",
    slaHours: 24,
    source: "CHAT",
    createdAt: hoursAgo(60),
    resolvedAt: hoursAgo(39.0), // Resolved in 21.0 hours (<24h SLA)
    rationale:
      "Distributor portal pending queue backlog delayed e-SV issuance.",
    suggestedAction:
      "Distributor processed pending document verification. Electronic Subscription Voucher generated and emailed.",
  },

  // 15. LOW 1 (Restroom Cleanliness & Missing Hand Soap) - RESOLVED (resolved in 7.0 hours)
  {
    id: "comp-15-restroom-cleanliness",
    title: "Customer restroom lacks liquid soap and has wet floor",
    description:
      "Customer visiting highway outlet noted empty soap dispenser and lack of dry floor matting in male washroom.",
    category: "STATION_AMENITIES",
    subcategory: "Sanitation & Hygiene",
    priority: "LOW",
    status: "RESOLVED",
    outletId: "outlet-chd-01",
    reporterId: "user-cust-1",
    assignedDept: "Retail Outlet Customer Experience",
    slaHours: 48,
    source: "CHAT",
    createdAt: hoursAgo(28),
    resolvedAt: hoursAgo(21.0), // Resolved in 7.0 hours (<48h SLA)
    rationale:
      "Routine station amenity maintenance feedback.",
    suggestedAction:
      "Station manager refilled soap dispenser and deep-cleaned restroom. Housekeeping schedule adjusted.",
  },

  // 16. LOW 2 (Canopy LED Fascia Light Flickering) - OPEN
  {
    id: "comp-16-canopy-lighting",
    title: "Two LED illumination panels flickering on highway side canopy",
    description:
      "Outer edge canopy lighting panel flickering intermittently during nighttime hours, impacting brand visibility.",
    category: "STATION_AMENITIES",
    subcategory: "Visual Merchandising & Signage",
    priority: "LOW",
    status: "OPEN",
    outletId: "outlet-del-01",
    reporterId: "user-dlr-delhi",
    assignedDept: "Retail Outlet Customer Experience",
    slaHours: 48,
    source: "FORM",
    createdAt: hoursAgo(18),
    rationale:
      "Cosmetic visual appearance defect.",
    suggestedAction:
      "Electrician notified to replace LED driver module during scheduled morning maintenance.",
  },

  // 17. LOW 3 (Digital Air Machine Hose Nozzle Worn) - IN_PROGRESS
  {
    id: "comp-17-air-nozzle-worn",
    title: "Free Air inflator clip-on brass chuck leaking air during tire fill",
    description:
      "Digital air tire inflator hose has cracked rubber washer causing slight air leak when clamping onto tire valve.",
    category: "STATION_AMENITIES",
    subcategory: "Air & Nitrogen Dispense Amenity",
    priority: "LOW",
    status: "IN_PROGRESS",
    outletId: "outlet-mum-01",
    reporterId: "user-cust-1",
    assignedDept: "Retail Outlet Customer Experience",
    slaHours: 48,
    source: "CHAT",
    createdAt: hoursAgo(22),
    rationale:
      "Free traveler amenity wear and tear.",
    suggestedAction:
      "Replacement brass chuck and rubber seal sourced from station spare parts inventory.",
  },

  // 18. LOW 4 (Drinking Water RO Filter Indicator Lamp) - OPEN
  {
    id: "comp-18-ro-indicator",
    title: "RO purified drinking water machine shows service alert light",
    description:
      "Customer water cooler water is dispensing clean water but yellow filter change indicator light is blinking.",
    category: "STATION_AMENITIES",
    subcategory: "Drinking Water Maintenance",
    priority: "LOW",
    status: "OPEN",
    outletId: "outlet-pat-01",
    reporterId: "user-dlr-delhi",
    assignedDept: "Retail Outlet Customer Experience",
    slaHours: 48,
    source: "FORM",
    createdAt: hoursAgo(15),
    rationale:
      "Preventive maintenance alert on public amenity.",
    suggestedAction:
      "RO service vendor scheduled to replace carbon and sediment filters within 24 hours.",
  },

  // 19. LOW 5 (Driveway Directional Signage Board Faded) - OPEN
  {
    id: "comp-19-signage-faded",
    title: "Entry driveway arrow sign faded due to sunlight exposure",
    description:
      "Entry directional arrow sign near highway access ramp has faded paint and needs touch-up for incoming night traffic.",
    category: "STATION_AMENITIES",
    subcategory: "Driveway Signage & Safety Boards",
    priority: "LOW",
    status: "OPEN",
    outletId: "outlet-kol-01",
    reporterId: "user-dlr-mumbai",
    assignedDept: "Retail Visual Merchandising",
    slaHours: 48,
    source: "PHONE",
    createdAt: hoursAgo(30),
    rationale:
      "Driveway guidance visual asset maintenance.",
    suggestedAction:
      "New standard retro-reflective HPCL vinyl signage board requisition submitted to Regional Office.",
  },

  // 20. LOW 6 (HP Pay QR Stand Acrylic Holder Cracked) - OPEN
  {
    id: "comp-20-qr-stand",
    title: "Driveway island 3 acrylic QR code tabletop stand cracked",
    description:
      "Wind gust tipped over the acrylic QR holder on island 3. QR code is readable but stand cracked.",
    category: "DIGITAL_PAYMENTS",
    subcategory: "Driveway Marketing Collateral",
    priority: "LOW",
    status: "OPEN",
    outletId: "outlet-del-01",
    reporterId: "user-dlr-delhi",
    assignedDept: "Retail Operations & Fintech",
    slaHours: 48,
    source: "FORM",
    createdAt: hoursAgo(11),
    rationale:
      "Minor countertop collateral replacement.",
    suggestedAction:
      "New weather-proof heavy-base QR stand provided to island cashier.",
  },
];
