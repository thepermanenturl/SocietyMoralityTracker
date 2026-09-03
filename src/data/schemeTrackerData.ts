export interface CagAuditFinding {
  reportYear: string;
  auditCode: string;
  finding: string;
  gapSeverity: number; // 0.0 to 1.0
  financialDisparity?: string;
}

export interface MediaSpectrumCoverage {
  spectrum: 'government-official' | 'center-left' | 'left' | 'right' | 'independent-audit';
  outlet: string;
  headline: string;
  trustScore: number;
}

export interface GovernmentScheme {
  id: string;
  name: string;
  hindiName?: string;
  ministry: string;
  launched: string;
  officialClaim: string;
  annualBudget: string;
  targetBeneficiaries: string;
  cagAuditFindings: CagAuditFinding[];
  moralityViolations: string[];
  violationExplanation: string;
  mediaCoverage: MediaSpectrumCoverage[];
  historicalPrecedent: string;
}

export const SCHEME_DATASET: GovernmentScheme[] = [
  {
    id: "AYUSHMAN_BHARAT",
    name: "Ayushman Bharat - PMJAY",
    hindiName: "आयुष्मान भारत - प्रधानमंत्री जन आरोग्य योजना",
    ministry: "Ministry of Health and Family Welfare",
    launched: "2018-09-23",
    officialClaim: "Provides ₹5 lakh health insurance per family per year to over 12 crore poor and vulnerable families across India.",
    annualBudget: "₹7,200 crore (2024-25)",
    targetBeneficiaries: "12 Crore Families (50 Crore Citizens)",
    cagAuditFindings: [
      {
        reportYear: "CAG Report No. 11 of 2023",
        auditCode: "A6_EQUITY_VS_GHOST_CAPTURE",
        finding: "7.5 lakh ghost beneficiaries registered under mobile number '9999999999'. Claims worth ₹6.9 crore paid for deceased patients post-death.",
        gapSeverity: 0.85,
        financialDisparity: "₹22.4 crore improper disbursements"
      }
    ],
    moralityViolations: ["A6", "D1", "E1"],
    violationExplanation: "Violates Axiom A6 (Equity/Fairness) via ghost card allocations and Principle D1 (Healthcare Access) through ghost claims reducing funds available for real patients.",
    mediaCoverage: [
      { spectrum: "government-official", outlet: "PIB Health", headline: "Over 30 Crore Ayushman Cards Issued with Zero Cost Triage", trustScore: 95 },
      { spectrum: "center-left", outlet: "The Hindu", headline: "CAG Audit Exposes Massive Mobile Number Duplication in PMJAY", trustScore: 88 },
      { spectrum: "left", outlet: "The Wire", headline: "Ghost Registrations and Post-Mortem Payouts: Inside the CAG Healthcare Audit", trustScore: 82 },
      { spectrum: "right", outlet: "Swarajya", headline: "Tech Glitch Explains Single Number Registrations, Fraud Rate Below 0.01%", trustScore: 78 },
      { spectrum: "independent-audit", outlet: "CAG Official Audit 2023", headline: "Performance Audit of PM-JAY Highlights Systemic Verification Failure", trustScore: 98 }
    ],
    historicalPrecedent: "Mirrors colonial famine relief audits (1878) where ghost ration registers diverted state emergency grain reserves away from starving district populations."
  },
  {
    id: "DWARKA_EXPRESSWAY",
    name: "Dwarka Expressway Project (NHAI)",
    hindiName: "द्वारका एक्सप्रेसवे परियोजना",
    ministry: "Ministry of Road Transport and Highways",
    launched: "2019-03-08",
    officialClaim: "State-of-the-art 29 km 16-lane elevated corridor designed to decongest NH-48 between Delhi and Gurugram.",
    annualBudget: "₹9,000 crore total sanction",
    targetBeneficiaries: "3 Lakh Daily Commuters",
    cagAuditFindings: [
      {
        reportYear: "CAG Report No. 14 of 2023",
        auditCode: "D8_DEMOCRATIC_CONSENT_VS_FISCAL_OPACITY",
        finding: "Construction cost escalated from Cabinet-approved ₹18.2 crore/km to ₹250.77 crore/km (1277% increase) without prior CCEA sanction.",
        gapSeverity: 0.90,
        financialDisparity: "₹7,287 crore cost over-run"
      }
    ],
    moralityViolations: ["D8", "E2", "A6"],
    violationExplanation: "Violates Principle D8 (Accountable Governance) and Action Policy E2 (Fiscal Audits) due to unauthorized 12-fold expenditure escalation.",
    mediaCoverage: [
      { spectrum: "government-official", outlet: "MoRTH Press Release", headline: "World-Class Infrastructure Matrix Reduces Delhi-Gurugram Travel Time to 15 Mins", trustScore: 92 },
      { spectrum: "center-left", outlet: "NDTV", headline: "CAG Questions 14-Fold Cost Surge in Dwarka Highway Elevated Section", trustScore: 86 },
      { spectrum: "left", outlet: "NewsClick", headline: "From ₹18cr/km to ₹250cr/km: How Highway Budget Escalated Unchecked", trustScore: 80 },
      { spectrum: "right", outlet: "OpIndia", headline: "Elevated Tunnels and 8-Lane Bridges Explain Engineering Cost Difference", trustScore: 74 },
      { spectrum: "independent-audit", outlet: "CAG Highways Report 2023", headline: "Bharatmala Pariyojana Phase-I Audit Highlights Cost Deviation", trustScore: 99 }
    ],
    historicalPrecedent: "Parallels Mughal imperial road infrastructure projects under Shah Jahan, where unaccounted treasury expenditures led to royal treasury audits."
  },
  {
    id: "PM_KISAN",
    name: "PM-KISAN Samman Nidhi",
    hindiName: "प्रधानमंत्री किसान सम्मान निधि",
    ministry: "Ministry of Agriculture and Farmers Welfare",
    launched: "2019-02-24",
    officialClaim: "Direct income support of ₹6,000 per year in three equal installments to all landholding farmer families across India.",
    annualBudget: "₹60,000 crore (2024-25)",
    targetBeneficiaries: "11 Crore Farmers",
    cagAuditFindings: [
      {
        reportYear: "CAG / Agriculture Ministry Audit 2021",
        auditCode: "A6_EQUITY_VS_INELIGIBLE_DISBURSEMENT",
        finding: "₹4,352 crore disbursed to 42 lakh ineligible beneficiaries, including income-tax paying individuals and non-farmer accounts.",
        gapSeverity: 0.72,
        financialDisparity: "₹4,352 crore misallocated funds"
      }
    ],
    moralityViolations: ["A5", "A6", "D7"],
    violationExplanation: "Breaches Axiom A5 (Basic Needs) and Principle D7 (Basic Needs Guarantee) by diverting farm income support to non-eligible tax-paying households.",
    mediaCoverage: [
      { spectrum: "government-official", outlet: "PIB Agriculture", headline: "17th Installment Released: ₹20,000 Crore Directly Transferred to 9.26 Cr Farmers", trustScore: 94 },
      { spectrum: "center-left", outlet: "The Indian Express", headline: "States Recovery Drive Begins as Audit Uncovers ₹4,300 Cr Paid to Ineligible Taxpayers", trustScore: 89 },
      { spectrum: "left", outlet: "The Wire", headline: "PM-KISAN Leakage: Income Tax Payers Received Farm Subsidies While Smallholders Waited", trustScore: 84 },
      { spectrum: "right", outlet: "Swarajya", headline: "Aadhaar e-KYC Integration Plugs 98% Leakages in World's Largest DBT Program", trustScore: 81 },
      { spectrum: "independent-audit", outlet: "ADR / CAG Audit 2021", headline: "Direct Benefit Transfer Audit Highlights Verification Lapses in Rural Cadastral Records", trustScore: 97 }
    ],
    historicalPrecedent: "Mirrors Ryotwari agricultural revenue assessments under Thomas Munro (1820), where inaccurate land registers resulted in non-cultivator tax grants."
  },
  {
    id: "UJJWALA_YOJANA",
    name: "PM Ujjwala Yojana (LPG)",
    hindiName: "प्रधानमंत्री उज्ज्वला योजना",
    ministry: "Ministry of Petroleum and Natural Gas",
    launched: "2016-05-01",
    officialClaim: "Provides deposit-free LPG connections to 10 crore poor women to eliminate indoor air pollution from firewood combustion.",
    annualBudget: "₹12,000 crore total subsidy",
    targetBeneficiaries: "10 Crore BPL Households",
    cagAuditFindings: [
      {
        reportYear: "CAG Report No. 14 of 2019",
        auditCode: "A5_BASIC_NEEDS_VS_HIGH_REFILL_COST",
        finding: "1.98 lakh connections issued to minors; commercial duplicate connections detected; average annual refill rate plunged to 3.08 cylinders due to refill affordability barriers.",
        gapSeverity: 0.78,
        financialDisparity: "High non-refill rate among BPL households"
      }
    ],
    moralityViolations: ["A1", "A5", "D5"],
    violationExplanation: "Impinges on Axiom A1 (Suffering Prevention) and Principle D5 (Maternal/Child Welfare) as high cylinder prices forced rural women back to toxic biomass fuels.",
    mediaCoverage: [
      { spectrum: "government-official", outlet: "PIB Petroleum", headline: "PM Ujjwala Yojana Achieves 100% Target: Smoke-Free Kitchens for 10 Crore Mothers", trustScore: 95 },
      { spectrum: "center-left", outlet: "Business Standard", headline: "CAG Audit Points to Minor Registrations and Low Refill Rates in Ujjwala Scheme", trustScore: 87 },
      { spectrum: "left", outlet: "Scroll.in", headline: "Why Millions of Ujjwala Gas Stoves Sit Empty in Rural Uttar Pradesh and Bihar", trustScore: 83 },
      { spectrum: "right", outlet: "Organiser", headline: "Clean Fuel Revolution Transformed Rural Public Health and Reduced Respiratory Disease", trustScore: 76 },
      { spectrum: "independent-audit", outlet: "CAG Performance Audit 2019", headline: "Audit of LPG Scheme Execution Highlights Commercial Abuses and Refill Plunge", trustScore: 98 }
    ],
    historicalPrecedent: "Echoes 19th-century public health initiatives in Victorian Britain, where coal stove distribution failed without municipal fuel subsidies for low-income workers."
  },
  {
    id: "ELECTORAL_BONDS",
    name: "Electoral Bonds Scheme (Struck Down)",
    hindiName: "चुनावी बॉन्ड योजना",
    ministry: "Ministry of Finance",
    launched: "2018-01-02",
    officialClaim: "Anonymous financial instrument introduced to cleanse political donations and transition campaign funding to digital banking channels.",
    annualBudget: "₹16,518 crore total bonds sold",
    targetBeneficiaries: "Political Parties / Donors",
    cagAuditFindings: [
      {
        reportYear: "Supreme Court Landmark Judgment 2024 / ADR Audit",
        auditCode: "D8_DEMOCRATIC_CONSENT_VS_CORPORATE_CAPTURE",
        finding: "Struck down as unconstitutional by 5-0 bench. Disclosures revealed quid pro quo funding: companies purchasing bonds days after facing ED/IT raids.",
        gapSeverity: 0.96,
        financialDisparity: "₹16,518 crore corporate political funding"
      }
    ],
    moralityViolations: ["D8", "E2", "E7"],
    violationExplanation: "Violates Principle D8 (Accountable Governance) and Action Policy E2 (RTI Transparency) by legalizing anonymous corporate influence over legislative elections.",
    mediaCoverage: [
      { spectrum: "government-official", outlet: "PIB Finance", headline: "Electoral Bonds Ensure Banking Transparency and Eliminate Black Cash in Elections", trustScore: 85 },
      { spectrum: "center-left", outlet: "LiveLaw India", headline: "Supreme Court Unanimously Strikes Down Electoral Bonds Scheme as Unconstitutional", trustScore: 96 },
      { spectrum: "left", outlet: "The Caravan", headline: "The Qui Pro Quo Matrix: How Companies Bought Bonds Under Enforcement Scanner", trustScore: 88 },
      { spectrum: "right", outlet: "Swarajya", headline: "Cash Donations Will Surge Again as Electoral Bond Anonymity Is Removed", trustScore: 75 },
      { spectrum: "independent-audit", outlet: "ADR / SBI Disclosure Audit 2024", headline: "Comprehensive Data Analysis of 16,500 Crore Bond Purchases and Party Recipients", trustScore: 99 }
    ],
    historicalPrecedent: "Mirrors the East India Company charter renewals (1773), where clandestine shareholder loans directly influenced Parliamentary votes in Westminster."
  }
];
