/**
 * Parliamentary Bills & Legislative Conscience Dataset (2023 - 2026)
 * Parliament of India (Lok Sabha & Rajya Sabha)
 *
 * Mapped to:
 * - 34-Node Multilayer Morality Graph (Primitives P1-P3, Axioms A1-A6, Rights D1-D8, Frontiers E1-E12, Speculative X1-X8)
 * - 7 Core Demographic Cohorts (Agrarian, Urban Tech, Unorganized Labor, MSME, Youth, Rural Women, Tribal/Forest)
 * - Proponents vs. Opponents Axiomatic Rationale
 * - Socratic Debate Inquiries & CAG Audit Context
 */

export interface DemographicStance {
  cohort_id: string;
  cohort_name: string;
  support_percent: number; // 0 to 100
  stance: 'Strong Support' | 'Moderate Support' | 'Divided / Neutral' | 'Moderate Opposition' | 'Strong Opposition';
  key_concern_or_benefit: string;
}

export interface ParliamentaryBill {
  id: string;
  bill_number?: string;
  title: string;
  official_title?: string;
  short_name: string;
  session: string;
  year: number;
  house: string;
  status:
    | 'Presidential Assent (Enacted)'
    | 'Passed Both Houses'
    | 'Passed Lok Sabha'
    | 'Under Joint Parliamentary Committee Review'
    | 'Introduced / Pending Debate'
    | 'Withdrawn / Lapsed';
  ministry: string;
  category: string;
  summary: string;
  key_provisions: string[];
  proponents_argument: string;
  opponents_argument: string;
  linked_morality_nodes: string[];
  moral_tensions: string;
  demographic_breakdown: DemographicStance[];
  socratic_debate_prompt: string;
  cag_or_audit_note?: string;
}

export const PARLIAMENTARY_SESSIONS: string[] = [
  'Budget Session 2023',
  'Monsoon Session 2023',
  'Special Session (Sept) 2023',
  'Winter Session 2023',
  'Interim Budget Session 2024',
  'Budget / Monsoon Session 2024',
  'Winter Session 2024',
  'Budget Session 2025',
  'Monsoon Session 2025',
  'Winter Session 2025',
  'Budget Session 2026',
  'Monsoon Session 2026'
];

export const BILL_CATEGORIES: string[] = [
  'Tech Policy, Privacy & Data Sovereignty',
  'Criminal Justice & Penal Reform',
  'Criminal Procedure & Civil Liberties',
  'Evidence Law & Digital Forensics',
  'Electoral Reform & Gender Justice',
  'Environment & Forest Governance',
  'Science, Research & Innovation',
  'Natural Resources & Strategic Energy',
  'Education, Merit & Anti-Corruption',
  'Religious Endowments & Property Governance',
  'Disaster Preparedness & Climate Resilience',
  'Fiscal Policy, Taxation & Macroeconomics',
  'Labor Safety & Industrial Standards',
  'Digital Infrastructure & National Security',
  'Aviation & Transport Infrastructure',
  'Financial Governance & Depositor Protection',
  'Constitutional & Federal Governance',
  'Frontier Tech & AI Safety',
  'Strategic Tech & Quantum Computing',
  'Public Health & Social Welfare',
  'Agriculture, Farmers & Rural Economy',
  'Climate Adaptation & Coastal Ecology',
  'Labor Welfare & Gig Economy',
  'Neuro-Rights & Bioethics',
  'Water Governance & Federal Ecology',
  'Energy Transition & Decarbonization'
];

export const PARLIAMENTARY_BILLS: ParliamentaryBill[] = [
  // ==========================================
  // 2023 LANDMARK ACTS & BILLS
  // ==========================================
  {
    id: 'bill_dpdp_2023',
    bill_number: 'Bill No. 113 of 2023',
    title: 'Digital Personal Data Protection Act, 2023 (DPDP Act)',
    official_title: 'An Act to provide for the processing of digital personal data in a manner that recognizes both the right of individuals to protect their personal data and the need to process such personal data for lawful purposes.',
    short_name: 'DPDP Act 2023',
    session: 'Monsoon Session 2023',
    year: 2023,
    house: 'Parliament of India (Enacted)',
    status: 'Presidential Assent (Enacted)',
    ministry: 'Ministry of Electronics and Information Technology (MeitY)',
    category: 'Tech Policy, Privacy & Data Sovereignty',
    summary: 'Establishes a comprehensive legal framework for digital personal data protection in India, mandating data fiduciary obligations, clear consent architectures, rights of data principals, cross-border data transfer regimes, and creating the Data Protection Board of India with penalties up to ₹250 crore for breaches.',
    key_provisions: [
      'Explicit and itemized consent required for digital data collection with easy withdrawal mechanisms.',
      'Establishment of the Data Protection Board of India (DPBI) as an adjudicatory mechanism with significant fining powers.',
      'Exemptions for state agencies under national security, sovereignty, public order, and prevention of offenses.',
      'Removal of criminal sanctions, relying on graduated administrative financial penalties up to ₹250 crore per breach.',
      'Blacklist mechanism for cross-border data transfers, allowing data flow unless explicitly restricted by the Central Government.'
    ],
    proponents_argument: 'Creates a predictable, modern compliance regime that unlocks India\'s trillion-dollar digital economy, protects citizen data against corporate theft, and eliminates cumbersome data localization mandates while safeguarding national interests.',
    opponents_argument: 'Grants sweeping, unchecked surveillance exemptions to government executive agencies (Section 17), amends the Right to Information (RTI) Act Section 8(1)(j) to weaken public transparency, and compromises the autonomy of the regulatory board appointed by the executive.',
    linked_morality_nodes: ['D2', 'E3', 'A4', 'P2_AGENCY', 'D8'],
    moral_tensions: 'Tension between Individual Informational Privacy & Consent (D2, P2_AGENCY) versus State Security & Administrative Governance (D8, A6). Amending the RTI Act creates a secondary conflict between Privacy (D2) and Epistemic Public Transparency (D8, A3).',
    demographic_breakdown: [
      {
        cohort_id: 'demo_agrarian_farmers',
        cohort_name: 'Agrarian & Small Farmers',
        support_percent: 52.0,
        stance: 'Divided / Neutral',
        key_concern_or_benefit: 'Limited direct awareness; concerns over mandatory Aadhaar-linked digital registries without adequate rural grievance redressal.'
      },
      {
        cohort_id: 'demo_urban_tech_middle_class',
        cohort_name: 'Urban Tech & Salaried Middle Class',
        support_percent: 86.0,
        stance: 'Strong Support',
        key_concern_or_benefit: 'Welcomes corporate data abuse penalties and spam controls, though civil libertarians raise alarm over state surveillance exemptions.'
      },
      {
        cohort_id: 'demo_unorganized_laborers',
        cohort_name: 'Unorganized Laborers & Daily Wage Earners',
        support_percent: 48.0,
        stance: 'Divided / Neutral',
        key_concern_or_benefit: 'Worries about digital exclusion in welfare schemes if consent forms or biometric verification fail in remote areas.'
      },
      {
        cohort_id: 'demo_msme_small_business',
        cohort_name: 'Small Business & MSME Merchants',
        support_percent: 72.0,
        stance: 'Strong Support',
        key_concern_or_benefit: 'Appreciates removal of mandatory local storage burdens, but seeks streamlined compliance support for smaller digital retailers.'
      },
      {
        cohort_id: 'demo_youth_students',
        cohort_name: 'Youth & University Students',
        support_percent: 80.0,
        stance: 'Strong Support',
        key_concern_or_benefit: 'Values parental consent and child data protections online, but strongly favors unrestricted, uncensored open internet access.'
      },
      {
        cohort_id: 'demo_rural_women',
        cohort_name: 'Rural Women & Self-Help Groups (SHGs)',
        support_percent: 58.0,
        stance: 'Moderate Support',
        key_concern_or_benefit: 'Values protection against online harassment and financial fraud, but requires vernacular digital literacy.'
      },
      {
        cohort_id: 'demo_tribal_forest',
        cohort_name: 'Tribal & Forest Dwellers (Adivasi)',
        support_percent: 42.0,
        stance: 'Moderate Opposition',
        key_concern_or_benefit: 'Apprehension regarding digital state registries overriding physical forest entitlement claims without community consent.'
      }
    ],
    socratic_debate_prompt: 'When a data privacy law grants broad executive exemptions for national security while restricting public RTI disclosures, has it protected the individual from the market only to surrender them to the state?',
    cag_or_audit_note: 'Parliamentary Standing Committee on Communications & IT raised concerns over lack of independent selection process for Board members.'
  },
  {
    id: 'bill_telecom_2023',
    bill_number: 'Bill No. 176 of 2023',
    title: 'Telecommunications Act, 2023',
    official_title: 'An Act to amend and consolidate the law relating to development, expansion and operation of telecommunication services and telecommunication networks; assignment of spectrum and for matters connected therewith.',
    short_name: 'Telecom Act 2023',
    session: 'Winter Session 2023',
    year: 2023,
    house: 'Parliament of India (Enacted)',
    status: 'Presidential Assent (Enacted)',
    ministry: 'Ministry of Communications',
    category: 'Digital Infrastructure & National Security',
    summary: 'Repeals colonial-era laws (Indian Telegraph Act 1885, Indian Wireless Telegraphy Act 1933), establishes non-auction administrative spectrum allocation for satcom and defense, codifies right of way, and standardizes government powers for emergency interception and temporary suspension of telecom networks.',
    key_provisions: [
      'Authorizes administrative assignment of spectrum for 19 non-commercial/strategic categories, including satellite broadband.',
      'Harmonizes Right of Way (RoW) rules to expedite 5G/6G tower and optical fiber rollout across private and public properties.',
      'Retains executive powers to suspend telecom services (internet shutdowns) and intercept communications on public emergency/safety grounds.',
      'Mandates verifiable biometric identification before issuing SIM cards, introducing severe criminal penalties for spoofing numbers.',
      'Establishes Digital Bharat Nidhi (formerly USOF) to fund rural connectivity and next-generation indigenous telecom research.'
    ],
    proponents_argument: 'Decolonizes telecom regulation, removes bureaucratic red tape for 5G network expansion, protects consumers from fraudulent SIM syndicates, and positions India at the forefront of satellite internet innovation.',
    opponents_argument: 'Centralizes extraordinary interception and internet suspension powers without judicial oversight, dilutes TRAI\'s regulatory independence, and creates potential backdoors into encrypted communication tools.',
    linked_morality_nodes: ['E11', 'D2', 'P2_AGENCY', 'A4', 'E3'],
    moral_tensions: 'Friction between National Security & Emergency Prevention (A1, A6) versus Cognitive Liberty, Open Communication & Anti-Surveillance (D2, P2_AGENCY, A4).',
    demographic_breakdown: [
      {
        cohort_id: 'demo_agrarian_farmers',
        cohort_name: 'Agrarian & Small Farmers',
        support_percent: 60.0,
        stance: 'Moderate Support',
        key_concern_or_benefit: 'Needs robust rural broadband for weather forecasting and market prices; dislikes frequent internet shutdowns during protests.'
      },
      {
        cohort_id: 'demo_urban_tech_middle_class',
        cohort_name: 'Urban Tech & Salaried Middle Class',
        support_percent: 74.0,
        stance: 'Strong Support',
        key_concern_or_benefit: 'Welcomes rapid 5G infrastructure, satellite internet connectivity, and reduction of unsolicited commercial scam calls.'
      },
      {
        cohort_id: 'demo_unorganized_laborers',
        cohort_name: 'Unorganized Laborers & Daily Wage Earners',
        support_percent: 54.0,
        stance: 'Moderate Support',
        key_concern_or_benefit: 'Demands low call and mobile data tariffs; biometric SIM registration must not harass migrant workers without local proof.'
      },
      {
        cohort_id: 'demo_msme_small_business',
        cohort_name: 'Small Business & MSME Merchants',
        support_percent: 78.0,
        stance: 'Strong Support',
        key_concern_or_benefit: 'Faster fiber deployment and digital payments stability boost commerce, though internet shutdowns disrupt daily transactions.'
      },
      {
        cohort_id: 'demo_youth_students',
        cohort_name: 'Youth & University Students',
        support_percent: 65.0,
        stance: 'Moderate Support',
        key_concern_or_benefit: 'Enthusiastic about gigabit speeds and satellite broadband, but vocal against administrative internet shutdowns during exams and unrest.'
      },
      {
        cohort_id: 'demo_rural_women',
        cohort_name: 'Rural Women & Self-Help Groups (SHGs)',
        support_percent: 62.0,
        stance: 'Moderate Support',
        key_concern_or_benefit: 'Enables mobile banking, telemedicine, and SHG e-commerce in unserved panchayats through Digital Bharat Nidhi.'
      },
      {
        cohort_id: 'demo_tribal_forest',
        cohort_name: 'Tribal & Forest Dwellers (Adivasi)',
        support_percent: 50.0,
        stance: 'Divided / Neutral',
        key_concern_or_benefit: 'Demands last-mile optical fiber connectivity in scheduled tribal areas without clearing pristine forests for towers.'
      }
    ],
    socratic_debate_prompt: 'Can a society truly enjoy digital empowerment if the switch to sever its communication lifeline remains entirely at the sole discretion of the executive without prior judicial warrant?',
    cag_or_audit_note: 'CAG previously audited USOF utilization finding delays in rural optical fiber delivery under BharatNet phases.'
  },
  {
    id: 'bill_bns_2023',
    bill_number: 'Bill No. 121 of 2023',
    title: 'Bharatiya Nyaya Sanhita, 2023 (BNS)',
    official_title: 'An Act to consolidate and amend the provisions relating to offences and for matters connected therewith or incidental thereto.',
    short_name: 'BNS 2023',
    session: 'Winter Session 2023',
    year: 2023,
    house: 'Parliament of India (Enacted)',
    status: 'Presidential Assent (Enacted)',
    ministry: 'Ministry of Home Affairs',
    category: 'Criminal Justice & Penal Reform',
    summary: 'Replaces the Indian Penal Code of 1860 with a restructured criminal code that introduces community service as punishment for minor offenses, defines terrorism, criminalizes organized crime and mob lynching, repeals colonial sedition while introducing offenses endangering sovereignty, and modernizes sexual offenses.',
    key_provisions: [
      'Replaces Section 124A (Sedition) with Section 152 (Acts endangering sovereignty, unity, and integrity of India).',
      'Introduces distinct penal provisions for Mob Lynching (punishable with capital punishment or life imprisonment).',
      'Codifies Community Service as an official alternative penal sentence for petty theft and non-violent minor offenses.',
      'Explicitly defines and criminalizes Organized Crime syndicates, Cybercrimes, and acts of Terrorism.',
      'Protects doctors and healthcare personnel from severe initial arrest thresholds in medical negligence cases without formal inquiry.'
    ],
    proponents_argument: 'Sheds colonial baggage, shifts philosophy from punitive colonial deterrence to citizen justice (Nyaya), recognizes modern organized crimes, and provides humane alternatives like community service for first-time petty offenders.',
    opponents_argument: 'Section 152 re-introduces a broader, more vague version of sedition; expanded definitions of terrorism overlap with UAPA, potentially enabling selective political prosecutions against dissenters.',
    linked_morality_nodes: ['A1', 'A6', 'E9', 'P1_HARM', 'P2_AGENCY'],
    moral_tensions: 'Conflict between Restorative Justice & Decolonized Law (E9, A6) versus the hazard of State Overreach & Speech Repression (P2_AGENCY, A4).',
    demographic_breakdown: [
      {
        cohort_id: 'demo_agrarian_farmers',
        cohort_name: 'Agrarian & Small Farmers',
        support_percent: 54.0,
        stance: 'Moderate Support',
        key_concern_or_benefit: 'Concerns that broad anti-blockade or public nuisance penal sections could be weaponized against peaceful farmer highway protests.'
      },
      {
        cohort_id: 'demo_urban_tech_middle_class',
        cohort_name: 'Urban Tech & Salaried Middle Class',
        support_percent: 82.0,
        stance: 'Strong Support',
        key_concern_or_benefit: 'Strongly supports strict penalties for economic fraud, hit-and-run accountability, and cyber terrorism.'
      },
      {
        cohort_id: 'demo_unorganized_laborers',
        cohort_name: 'Unorganized Laborers & Daily Wage Earners',
        support_percent: 58.0,
        stance: 'Moderate Support',
        key_concern_or_benefit: 'Appreciates community service instead of prison for petty survival infractions, but fears arbitrary police harassment.'
      },
      {
        cohort_id: 'demo_msme_small_business',
        cohort_name: 'Small Business & MSME Merchants',
        support_percent: 75.0,
        stance: 'Strong Support',
        key_concern_or_benefit: 'Welcomes decisive action against extortion syndicates and organized financial racketeering.'
      },
      {
        cohort_id: 'demo_youth_students',
        cohort_name: 'Youth & University Students',
        support_percent: 61.0,
        stance: 'Moderate Support',
        key_concern_or_benefit: 'Favors progressive community service punishments, but student activists express sharp skepticism regarding Section 152.'
      },
      {
        cohort_id: 'demo_rural_women',
        cohort_name: 'Rural Women & Self-Help Groups (SHGs)',
        support_percent: 88.0,
        stance: 'Strong Support',
        key_concern_or_benefit: 'Strongly backs stringent mandatory life/capital penalties for heinous crimes against women and minor girls.'
      },
      {
        cohort_id: 'demo_tribal_forest',
        cohort_name: 'Tribal & Forest Dwellers (Adivasi)',
        support_percent: 44.0,
        stance: 'Moderate Opposition',
        key_concern_or_benefit: 'Anxiety over under-trial incarcerations in remote belts under newly broadened anti-state conspiracy clauses.'
      }
    ],
    socratic_debate_prompt: 'If a society replaces the word "Sedition" with "Endangering Sovereignty" while expanding the scope of criminalized dissent, has it decolonized justice or merely renovated the instruments of control?',
    cag_or_audit_note: 'Implementation requires massive training of police and judiciary across all 28 states and 8 union territories.'
  },
  {
    id: 'bill_bnss_2023',
    bill_number: 'Bill No. 122 of 2023',
    title: 'Bharatiya Nagarik Suraksha Sanhita, 2023 (BNSS)',
    official_title: 'An Act to consolidate and amend the law relating to Criminal Procedure.',
    short_name: 'BNSS 2023',
    session: 'Winter Session 2023',
    year: 2023,
    house: 'Parliament of India (Enacted)',
    status: 'Presidential Assent (Enacted)',
    ministry: 'Ministry of Home Affairs',
    category: 'Criminal Procedure & Civil Liberties',
    summary: 'Replaces the Code of Criminal Procedure (CrPC) 1973. Mandates audio-video recording of search and seizure operations, introduces Zero FIR, institutionalizes forensic investigations for major crimes, enables trial in absentia for proclaimed offenders, and allows police custody in staggered periods within 40 to 60 days of detention.',
    key_provisions: [
      'Mandatory videography and digital recording of search, seizure, and crime scenes to prevent police fabrication.',
      'Mandatory visit of forensic investigation teams to crime scenes for offenses punishable with 7 years or more.',
      'Enables police custody to be sought in parts across the initial 40 or 60 days of detention (amending the previous strict 15-day cap).',
      'Institutionalizes nationwide Zero FIR and digital summons via electronic communication.',
      'Introduces statutory timelines for judgment delivery (within 45 days of concluding arguments) and framing of charges.'
    ],
    proponents_argument: 'Injects cutting-edge forensics and mandatory videography into criminal investigations, reduces judicial delays through strict statutory trial timelines, and prevents criminals from evading trial by fleeing abroad.',
    opponents_argument: 'Staggered police custody provisions over 60 days undermine bail rights, expose accused persons to extended custodial torture risks, and lack adequate forensic infrastructure across rural district police stations.',
    linked_morality_nodes: ['A6', 'P2_AGENCY', 'D2', 'A1', 'E9'],
    moral_tensions: 'Due Process & Presumption of Innocence (A6, A1) versus Expedited Crime Resolution & State Investigative Efficiency (A6, D8).',
    demographic_breakdown: [
      {
        cohort_id: 'demo_agrarian_farmers',
        cohort_name: 'Agrarian & Small Farmers',
        support_percent: 51.0,
        stance: 'Divided / Neutral',
        key_concern_or_benefit: 'Needs impartial rural police behavior; fears that staggered custody could be misused during land disputes.'
      },
      {
        cohort_id: 'demo_urban_tech_middle_class',
        cohort_name: 'Urban Tech & Salaried Middle Class',
        support_percent: 79.0,
        stance: 'Strong Support',
        key_concern_or_benefit: 'Strongly endorses Zero FIR, electronic summons, mandatory forensic forensics, and strict judicial verdict deadlines.'
      },
      {
        cohort_id: 'demo_unorganized_laborers',
        cohort_name: 'Unorganized Laborers & Daily Wage Earners',
        support_percent: 45.0,
        stance: 'Moderate Opposition',
        key_concern_or_benefit: 'Extended custody windows severely disadvantage poor under-trials unable to afford persistent legal representation.'
      },
      {
        cohort_id: 'demo_msme_small_business',
        cohort_name: 'Small Business & MSME Merchants',
        support_percent: 71.0,
        stance: 'Strong Support',
        key_concern_or_benefit: 'Welcomes statutory time-bound trial resolutions and videographed commercial asset search protocols.'
      },
      {
        cohort_id: 'demo_youth_students',
        cohort_name: 'Youth & University Students',
        support_percent: 63.0,
        stance: 'Moderate Support',
        key_concern_or_benefit: 'Supports digital court procedures and video recording, but law students raise alarms over erosion of habeas corpus protections.'
      },
      {
        cohort_id: 'demo_rural_women',
        cohort_name: 'Rural Women & Self-Help Groups (SHGs)',
        support_percent: 76.0,
        stance: 'Strong Support',
        key_concern_or_benefit: 'Universal Zero FIR allows filing complaints anywhere in India without being turned away by jurisdictional police stations.'
      },
      {
        cohort_id: 'demo_tribal_forest',
        cohort_name: 'Tribal & Forest Dwellers (Adivasi)',
        support_percent: 40.0,
        stance: 'Moderate Opposition',
        key_concern_or_benefit: 'Lack of legal aid in remote district jails exacerbates risks of prolonged custody without bail.'
      }
    ],
    socratic_debate_prompt: 'When procedural changes make it easier for the police to hold a citizen in custody in piecemeal intervals across two months, has the state optimized the search for truth or eroded the presumption of innocence?',
    cag_or_audit_note: 'Audit estimates require multi-thousand crore capital expenditure to equip all 17,000+ police stations with forensic kits and certified video storage servers.'
  },
  {
    id: 'bill_bsa_2023',
    bill_number: 'Bill No. 123 of 2023',
    title: 'Bharatiya Sakshya Adhiniyam, 2023 (BSA)',
    official_title: 'An Act to consolidate and to provide for general rules and principles of evidence for fair trial.',
    short_name: 'BSA 2023',
    session: 'Winter Session 2023',
    year: 2023,
    house: 'Parliament of India (Enacted)',
    status: 'Presidential Assent (Enacted)',
    ministry: 'Ministry of Law and Justice',
    category: 'Evidence Law & Digital Forensics',
    summary: 'Replaces the Indian Evidence Act of 1872. Gives equal legal parity to electronic and digital records as primary evidence, updates guidelines on expert witness testimony, simplifies rules on secondary evidence, and codifies digital hash validation for digital forensics integrity in criminal and civil trials.',
    key_provisions: [
      'Elevates electronic and digital records (server logs, emails, smartphones, cloud data) to primary evidence status under defined integrity criteria.',
      'Mandates standardized cryptographic hashing to ensure digital evidence has not been tampered with or deepfaked.',
      'Expands the scope of secondary evidence when primary records are destroyed or unavailable in good faith.',
      'Permits remote witness examination via authorized audiovisual electronic methods.',
      'Protects privileged communications between legal counsel and clients while modernizing joint trial provisions.'
    ],
    proponents_argument: 'Modernizes evidentiary jurisprudence for the 21st-century digital age, facilitating prosecution of cyber fraudsters, crypto-scammers, and digital crimes while reducing reliance on fragile paper trails.',
    opponents_argument: 'Potential risks of forged, AI-generated synthetic media (deepfakes) and metadata spoofing being entered into evidence before state forensic labs obtain adequate technological verification capabilities.',
    linked_morality_nodes: ['A3', 'A6', 'E1', 'D8', 'P3_EQUITY'],
    moral_tensions: 'Epistemic Truth & Authenticity (A3, E1) versus Speed of Admissibility & Risk of Algorithmic Deception (A6, E7).',
    demographic_breakdown: [
      {
        cohort_id: 'demo_agrarian_farmers',
        cohort_name: 'Agrarian & Small Farmers',
        support_percent: 50.0,
        stance: 'Divided / Neutral',
        key_concern_or_benefit: 'Needs simple proof mechanisms for digital land records without being tripped up by technical hash evidence demands.'
      },
      {
        cohort_id: 'demo_urban_tech_middle_class',
        cohort_name: 'Urban Tech & Salaried Middle Class',
        support_percent: 85.0,
        stance: 'Strong Support',
        key_concern_or_benefit: 'High appreciation for digital record admissibility in cyber theft, financial transactions, and commercial contracts.'
      },
      {
        cohort_id: 'demo_unorganized_laborers',
        cohort_name: 'Unorganized Laborers & Daily Wage Earners',
        support_percent: 49.0,
        stance: 'Divided / Neutral',
        key_concern_or_benefit: 'Concerns that digital wage slips or attendance logs might be altered by unscrupulous employers.'
      },
      {
        cohort_id: 'demo_msme_small_business',
        cohort_name: 'Small Business & MSME Merchants',
        support_percent: 81.0,
        stance: 'Strong Support',
        key_concern_or_benefit: 'Substantially reduces friction in civil contract disputes and electronic billing verification.'
      },
      {
        cohort_id: 'demo_youth_students',
        cohort_name: 'Youth & University Students',
        support_percent: 75.0,
        stance: 'Strong Support',
        key_concern_or_benefit: 'Embraces digital parity but advocates for strict technical safeguards against generative AI deepfake framing.'
      },
      {
        cohort_id: 'demo_rural_women',
        cohort_name: 'Rural Women & Self-Help Groups (SHGs)',
        support_percent: 64.0,
        stance: 'Moderate Support',
        key_concern_or_benefit: 'Digital audio/video recordings can serve as crucial domestic violence or dowry harassment evidence in court.'
      },
      {
        cohort_id: 'demo_tribal_forest',
        cohort_name: 'Tribal & Forest Dwellers (Adivasi)',
        support_percent: 46.0,
        stance: 'Divided / Neutral',
        key_concern_or_benefit: 'Oral testimonies and customary community memory must remain legally valid against purely digital GIS state records.'
      }
    ],
    socratic_debate_prompt: 'In an era where synthetic intelligence can generate photorealistic video and cloned voices, how does the law distinguish absolute empirical fact from fabricated digital illusion?',
    cag_or_audit_note: 'Requires standardized certification protocols for State Cyber Forensic Laboratories under Section 63.'
  },
  {
    id: 'bill_nari_shakti_2023',
    bill_number: 'Constitution (128th Amendment) Bill, 2023',
    title: 'Nari Shakti Vandan Adhiniyam (106th Constitutional Amendment Act, 2023)',
    official_title: 'An Act further to amend the Constitution of India to provide for one-third reservation for women in the House of the People and the Legislative Assemblies of States.',
    short_name: 'Women\'s Reservation Act 2023',
    session: 'Special Session (Sept) 2023',
    year: 2023,
    house: 'Parliament of India (Enacted)',
    status: 'Presidential Assent (Enacted)',
    ministry: 'Ministry of Law and Justice',
    category: 'Electoral Reform & Gender Justice',
    summary: 'Amends the Indian Constitution (Articles 239AA, 330A, 332A, 334A) to reserve 33% of all seats in the Lok Sabha, Delhi Legislative Assembly, and State Legislative Assemblies for women for a period of 15 years, subject to delimitation following the next Census.',
    key_provisions: [
      'Constitutional mandate reserving 1/3rd of all seats for women in the Lok Sabha and State Legislative Assemblies.',
      'Sub-reservation for SC and ST women within their respective reserved category quotas.',
      'Sunset clause setting the reservation duration to 15 years from commencement, extendable by Parliament.',
      'Rotation of reserved seats for women after each subsequent delimitation exercise.',
      'Implementation linked to the publication of the first national census conducted after the enactment followed by delimitation.'
    ],
    proponents_argument: 'Historical democratic milestone ending decades of legislative gridlock, transforming tokenistic political inclusion into constitutional power parity for over 48% of the Indian electorate.',
    opponents_argument: 'Delaying implementation until after a future census and delimitation exercise defers realization for years; absence of an OBC sub-quota risks disproportionately favoring privileged socio-economic tiers.',
    linked_morality_nodes: ['P3_EQUITY', 'A2', 'E5', 'D6', 'A6'],
    moral_tensions: 'Equal Representation & Affirmative Power Parity (P3_EQUITY, E5, A2) versus Immediate Enactment vs. Procedural Sequencing Delays (A6, D6).',
    demographic_breakdown: [
      {
        cohort_id: 'demo_agrarian_farmers',
        cohort_name: 'Agrarian & Small Farmers',
        support_percent: 78.0,
        stance: 'Strong Support',
        key_concern_or_benefit: 'Rural households support women leadership, having witnessed successful female Sarpanch leadership under Panchayati Raj.'
      },
      {
        cohort_id: 'demo_urban_tech_middle_class',
        cohort_name: 'Urban Tech & Salaried Middle Class',
        support_percent: 91.0,
        stance: 'Strong Support',
        key_concern_or_benefit: 'Overwhelmingly supports gender parity in national policy formulation and corporate-political governance parity.'
      },
      {
        cohort_id: 'demo_unorganized_laborers',
        cohort_name: 'Unorganized Laborers & Daily Wage Earners',
        support_percent: 82.0,
        stance: 'Strong Support',
        key_concern_or_benefit: 'Expects female lawmakers to champion social security, child nutrition, and maternity benefit entitlements.'
      },
      {
        cohort_id: 'demo_msme_small_business',
        cohort_name: 'Small Business & MSME Merchants',
        support_percent: 74.0,
        stance: 'Strong Support',
        key_concern_or_benefit: 'Encourages women entrepreneurship policies, though traditional traders seek predictable election candidate continuity.'
      },
      {
        cohort_id: 'demo_youth_students',
        cohort_name: 'Youth & University Students',
        support_percent: 89.0,
        stance: 'Strong Support',
        key_concern_or_benefit: 'Celebrates gender equality milestone, but student unions demand immediate rollout without waiting for census delimitation.'
      },
      {
        cohort_id: 'demo_rural_women',
        cohort_name: 'Rural Women & Self-Help Groups (SHGs)',
        support_percent: 96.0,
        stance: 'Strong Support',
        key_concern_or_benefit: 'Transformative empowerment milestone validating grassroots women mobilization across millions of village SHGs.'
      },
      {
        cohort_id: 'demo_tribal_forest',
        cohort_name: 'Tribal & Forest Dwellers (Adivasi)',
        support_percent: 79.0,
        stance: 'Strong Support',
        key_concern_or_benefit: 'Strongly backs ST women quota, demanding adequate representation for indigenous women in mineral-rich constituencies.'
      }
    ],
    socratic_debate_prompt: 'Does granting constitutional equality with a suspended operational clause fulfill justice, or does it transform a living democratic right into a post-dated promise?',
    cag_or_audit_note: 'Election Commission of India pre-planning involves restructuring territorial constituency allocations upon delimitation.'
  },
  {
    id: 'bill_forest_conservation_2023',
    bill_number: 'Bill No. 80 of 2023',
    title: 'Forest (Conservation) Amendment Act, 2023 (Van Sanrakshan Evam Samvardhan Adhiniyam)',
    official_title: 'An Act to amend the Forest (Conservation) Act, 1980.',
    short_name: 'Forest Amendment Act 2023',
    session: 'Monsoon Session 2023',
    year: 2023,
    house: 'Parliament of India (Enacted)',
    status: 'Presidential Assent (Enacted)',
    ministry: 'Ministry of Environment, Forest and Climate Change',
    category: 'Environment & Forest Governance',
    summary: 'Limits the scope of the 1980 Act strictly to lands recorded as forests in government records (circumventing the 1996 Godavarman deemed forest definition), exempts strategic national security projects within 100 km of international borders, and promotes agro-forestry plantations for carbon sinks.',
    key_provisions: [
      'Exempts strategic linear infrastructure projects of national importance/defense located within 100 km of international borders or Line of Actual Control (LAC).',
      'Limits applicability to officially notified government forests and records, excluding unclassed or deemed forests without government entry.',
      'Permits non-forest activities like eco-tourism facilities, zoos, and safari parks inside forest zones without prior central clearance.',
      'Incentivizes private compensatory afforestation and private tree plantations to fulfill India\'s NDC carbon sequestration goals.'
    ],
    proponents_argument: 'Expedites vital strategic defense infrastructure along sensitive Himalayan borders, eliminates bureaucratic bottlenecks for road construction, and incentivizes massive private investment in agro-forestry.',
    opponents_argument: 'Strips environmental clearance safeguards from millions of hectares of ecologically sensitive deemed forests in the Western Ghats and Aravallis, and bypasses Gram Sabha consent under the Forest Rights Act (FRA) 2006.',
    linked_morality_nodes: ['A5', 'E12', 'E2', 'P3_EQUITY', 'D5'],
    moral_tensions: 'National Defense Infrastructure & Economic Development (A6, D4) versus Ecological Stewardship, Biodiversity & Tribal Autonomy (A5, E12, E2).',
    demographic_breakdown: [
      {
        cohort_id: 'demo_agrarian_farmers',
        cohort_name: 'Agrarian & Small Farmers',
        support_percent: 53.0,
        stance: 'Divided / Neutral',
        key_concern_or_benefit: 'Enjoys opportunities in commercial agroforestry/timber sales, but fears localized groundwater disruption and wildlife conflict.'
      },
      {
        cohort_id: 'demo_urban_tech_middle_class',
        cohort_name: 'Urban Tech & Salaried Middle Class',
        support_percent: 62.0,
        stance: 'Moderate Support',
        key_concern_or_benefit: 'Favors border security infrastructure, but urban environmentalists vehemently oppose opening Aravalli lungs to mining.'
      },
      {
        cohort_id: 'demo_unorganized_laborers',
        cohort_name: 'Unorganized Laborers & Daily Wage Earners',
        support_percent: 55.0,
        stance: 'Moderate Support',
        key_concern_or_benefit: 'Border highway construction projects provide local labor employment opportunities.'
      },
      {
        cohort_id: 'demo_msme_small_business',
        cohort_name: 'Small Business & MSME Merchants',
        support_percent: 76.0,
        stance: 'Strong Support',
        key_concern_or_benefit: 'Welcomes development of eco-tourism, commercial resorts, and safari logistics around protected regions.'
      },
      {
        cohort_id: 'demo_youth_students',
        cohort_name: 'Youth & University Students',
        support_percent: 41.0,
        stance: 'Moderate Opposition',
        key_concern_or_benefit: 'Youth climate movements organize protests against weakening forest protections amidst climate breakdown.'
      },
      {
        cohort_id: 'demo_rural_women',
        cohort_name: 'Rural Women & Self-Help Groups (SHGs)',
        support_percent: 48.0,
        stance: 'Divided / Neutral',
        key_concern_or_benefit: 'Direct dependence on non-timber forest produce (NTFP) makes loss of community forest access damaging to livelihoods.'
      },
      {
        cohort_id: 'demo_tribal_forest',
        cohort_name: 'Tribal & Forest Dwellers (Adivasi)',
        support_percent: 18.0,
        stance: 'Strong Opposition',
        key_concern_or_benefit: 'Severely opposes dilution of Gram Sabha consent rights, fearing corporate takeover of ancestral commons.'
      }
    ],
    socratic_debate_prompt: 'Can a nation fortify its sovereign borders against foreign adversaries by stripping environmental protections from the very ecosystems that sustain its life?',
    cag_or_audit_note: 'CAG environmental audits have repeatedly highlighted systemic deficiencies and artificial survival rates in CAMPA compensatory afforestation plantations.'
  },
  {
    id: 'bill_nrf_2023',
    bill_number: 'Bill No. 109 of 2023',
    title: 'Anusandhan National Research Foundation Act, 2023 (ANRF Act)',
    official_title: 'An Act to establish the Anusandhan National Research Foundation to provide high level strategic direction for research, innovation and entrepreneurship.',
    short_name: 'ANRF Act 2023',
    session: 'Monsoon Session 2023',
    year: 2023,
    house: 'Parliament of India (Enacted)',
    status: 'Presidential Assent (Enacted)',
    ministry: 'Ministry of Science and Technology',
    category: 'Science, Research & Innovation',
    summary: 'Establishes the ₹50,000 crore Anusandhan National Research Foundation (ANRF) over 5 years to seed, grow, and promote R&D culture across Indian universities, with ₹36,000 crore targeted from private sector industry partnerships and philanthropy.',
    key_provisions: [
      'Repeals the Science and Engineering Research Board (SERB) Act, 2008, absorbing it into ANRF.',
      'Governing Board presided over by the Prime Minister as ex-officio President with eminent scientists and industrialists.',
      'Targets democratizing research grants to state universities and tier-2/tier-3 colleges beyond IITs and IISc.',
      'Creates a dedicated fund bridging fundamental scientific research with industrial translation and commercialization.'
    ],
    proponents_argument: 'Elevates India\'s R&D spend from 0.65% towards 2% of GDP, democratizes research funding to state universities, and builds a robust academia-industry translation bridge.',
    opponents_argument: 'Over-reliance on ₹36,000 crore in uncertain private corporate funding, coupled with excessive executive centralization under political leadership rather than autonomous peer-reviewed scientific bodies.',
    linked_morality_nodes: ['D3', 'E3', 'X1', 'A3', 'E11'],
    moral_tensions: 'Epistemic Progress & Technological Self-Reliance (D3, E3, X1) versus Academic Independence & Public Funding Sufficiency (A3, P3_EQUITY).',
    demographic_breakdown: [
      {
        cohort_id: 'demo_agrarian_farmers',
        cohort_name: 'Agrarian & Small Farmers',
        support_percent: 66.0,
        stance: 'Moderate Support',
        key_concern_or_benefit: 'Wants funding directed toward drought-resistant seeds, bio-fertilizers, and affordable farm mechanization.'
      },
      {
        cohort_id: 'demo_urban_tech_middle_class',
        cohort_name: 'Urban Tech & Salaried Middle Class',
        support_percent: 88.0,
        stance: 'Strong Support',
        key_concern_or_benefit: 'Strongly supports deep-tech R&D, patent creation, and global competitiveness for Indian engineering minds.'
      },
      {
        cohort_id: 'demo_unorganized_laborers',
        cohort_name: 'Unorganized Laborers & Daily Wage Earners',
        support_percent: 52.0,
        stance: 'Divided / Neutral',
        key_concern_or_benefit: 'Remote relevance unless scientific innovations improve occupational safety and affordable primary healthcare.'
      },
      {
        cohort_id: 'demo_msme_small_business',
        cohort_name: 'Small Business & MSME Merchants',
        support_percent: 77.0,
        stance: 'Strong Support',
        key_concern_or_benefit: 'Welcomes university tech transfer hubs that make industrial design and advanced testing labs accessible to MSMEs.'
      },
      {
        cohort_id: 'demo_youth_students',
        cohort_name: 'Youth & University Students',
        support_percent: 86.0,
        stance: 'Strong Support',
        key_concern_or_benefit: 'State university researchers celebrate access to national funding pools previously monopolized by elite central institutes.'
      },
      {
        cohort_id: 'demo_rural_women',
        cohort_name: 'Rural Women & Self-Help Groups (SHGs)',
        support_percent: 63.0,
        stance: 'Moderate Support',
        key_concern_or_benefit: 'Demands targeted grants for women in STEM and research solving rural sanitation and clean water challenges.'
      },
      {
        cohort_id: 'demo_tribal_forest',
        cohort_name: 'Tribal & Forest Dwellers (Adivasi)',
        support_percent: 54.0,
        stance: 'Moderate Support',
        key_concern_or_benefit: 'Urges protection of traditional indigenous botanical knowledge and ethnomedicinal intellectual property.'
      }
    ],
    socratic_debate_prompt: 'When the search for pure scientific truth is financed primarily through corporate profit incentives, who decides which human inquiries are worth pursuing?',
    cag_or_audit_note: 'Audit tracking focuses on annual realization of the targeted 70% private sector co-funding commitments.'
  },
  {
    id: 'bill_mmdr_critical_minerals_2023',
    bill_number: 'Bill No. 96 of 2023',
    title: 'Mines and Minerals (Development and Regulation) Amendment Act, 2023',
    official_title: 'An Act further to amend the Mines and Minerals (Development and Regulation) Act, 1957.',
    short_name: 'MMDR Critical Minerals Act 2023',
    session: 'Monsoon Session 2023',
    year: 2023,
    house: 'Parliament of India (Enacted)',
    status: 'Presidential Assent (Enacted)',
    ministry: 'Ministry of Mines',
    category: 'Natural Resources & Strategic Energy',
    summary: 'De-lists 6 atomic minerals (including Lithium, Beryllium, Titanium, Tantalum, Niobium, and Zirconium) to permit commercial mining by private entities, and introduces Exploration Licences to attract global deep-seated critical mineral prospecting.',
    key_provisions: [
      'Empowers Central Government to auction mineral concessions for 24 critical and strategic minerals including Lithium and REEs.',
      'Permits private sector commercial exploration and extraction of previously prohibited atomic minerals.',
      'Introduces a competitive Exploration Licence (EL) framework allowing private explorers to retain a share of auction revenue upon mine discovery.',
      'Streamlines environmental and forest clearances for reconnaissance and prospecting operations.'
    ],
    proponents_argument: 'Breaks foreign import dependence on China for green transition minerals (Lithium, Nickel, Cobalt), powers domestic EV battery and solar manufacturing, and attracts foreign capital.',
    opponents_argument: 'Risk of ecological devastation and groundwater contamination in fragile tribal habitats (such as Reasi in J&K or Central tribal corridors) without rigorous Gram Sabha oversight.',
    linked_morality_nodes: ['A5', 'E2', 'E12', 'X5', 'D4'],
    moral_tensions: 'Clean Energy Transition & Strategic Independence (E2, X5) versus Indigenous Land Autonomy & Local Ecological Preservation (A5, E12).',
    demographic_breakdown: [
      {
        cohort_id: 'demo_agrarian_farmers',
        cohort_name: 'Agrarian & Small Farmers',
        support_percent: 47.0,
        stance: 'Divided / Neutral',
        key_concern_or_benefit: 'Worries regarding agricultural topsoil degradation and open-cast mining water diversion in nearby catchment zones.'
      },
      {
        cohort_id: 'demo_urban_tech_middle_class',
        cohort_name: 'Urban Tech & Salaried Middle Class',
        support_percent: 84.0,
        stance: 'Strong Support',
        key_concern_or_benefit: 'Excited about affordable EVs, domestic semiconductor supply chains, and strategic defense autonomy.'
      },
      {
        cohort_id: 'demo_unorganized_laborers',
        cohort_name: 'Unorganized Laborers & Daily Wage Earners',
        support_percent: 59.0,
        stance: 'Moderate Support',
        key_concern_or_benefit: 'Anticipates heavy industrial and mining extraction employment, but demands strict occupational safety standards.'
      },
      {
        cohort_id: 'demo_msme_small_business',
        cohort_name: 'Small Business & MSME Merchants',
        support_percent: 79.0,
        stance: 'Strong Support',
        key_concern_or_benefit: 'Anticipates explosive growth in downstream electronics fabrication, component supply, and battery recycling.'
      },
      {
        cohort_id: 'demo_youth_students',
        cohort_name: 'Youth & University Students',
        support_percent: 72.0,
        stance: 'Strong Support',
        key_concern_or_benefit: 'Sees immense green energy jobs and technological leapfrogging, while calling for ethical extraction standards.'
      },
      {
        cohort_id: 'demo_rural_women',
        cohort_name: 'Rural Women & Self-Help Groups (SHGs)',
        support_percent: 46.0,
        stance: 'Divided / Neutral',
        key_concern_or_benefit: 'Mining activity frequently disrupts local clean drinking water wells and community foraging tracts.'
      },
      {
        cohort_id: 'demo_tribal_forest',
        cohort_name: 'Tribal & Forest Dwellers (Adivasi)',
        support_percent: 21.0,
        stance: 'Strong Opposition',
        key_concern_or_benefit: 'Direct threat of physical displacement, cultural dislocation, and water table toxicity in Fifth Schedule tribal areas.'
      }
    ],
    socratic_debate_prompt: 'Can a transition to green technology be morally pure if the raw minerals powering it are excavated by displacing indigenous communities from their sacred lands?',
    cag_or_audit_note: 'CAG performance audits on District Mineral Foundation (DMF) funds revealed widespread misdirection into non-mandated urban civil works instead of affected mining villages.'
  },

  // ==========================================
  // 2024 LANDMARK ACTS & BILLS
  // ==========================================
  {
    id: 'bill_public_examinations_2024',
    bill_number: 'Bill No. 12 of 2024',
    title: 'Public Examinations (Prevention of Unfair Means) Act, 2024',
    official_title: 'An Act to prevent unfair means in the public examinations and to provide for matters connected therewith or incidental thereto.',
    short_name: 'Anti-Paper Leak Act 2024',
    session: 'Budget Session 2024',
    year: 2024,
    house: 'Parliament of India (Enacted)',
    status: 'Presidential Assent (Enacted)',
    ministry: 'Ministry of Personnel, Public Grievances and Pensions',
    category: 'Education, Merit & Anti-Corruption',
    summary: 'Enacts severe criminal deterrence against organized paper leak cartels, computer hacking syndicates, and corrupt examination centers conducting national competitive entrance exams (UPSC, SSC, NEET, JEE, CUET, Railways, IBPS), prescribing up to 10 years imprisonment and ₹1 crore fines.',
    key_provisions: [
      'Categorizes paper leaks, answer key manipulation, unauthorized server access, and fake exam sites as cognizable, non-bailable offenses.',
      'Prescribes minimum 3-5 years imprisonment for individuals, and 5-10 years with ₹1 crore minimum fine for organized paper-leak syndicates.',
      'Provides for recovery of examination costs and confiscation of assets of guilty private testing service providers and coaching networks.',
      'Explicitly safeguards candidate students from criminal prosecution under the Act, treating them as victims of systemic exploitation.'
    ],
    proponents_argument: 'Restores the sacred sanctity of meritocratic public testing, destroys multi-crore illicit paper-leaking mafias, and protects the dreams and mental health of millions of hard-working Indian youth.',
    opponents_argument: 'Addresses punitive symptoms after the fact rather than overhauling corrupt testing agency bureaucracies (NTA), solving vendor outsourcing flaws, or addressing structural youth job scarcity.',
    linked_morality_nodes: ['A3', 'A6', 'D3', 'D8', 'P3_EQUITY'],
    moral_tensions: 'Meritocratic Fairness & Epistemic Honesty (A3, A6, D3) versus Punitive Deterrence vs. Structural Educational Capacity (P3_EQUITY, D8).',
    demographic_breakdown: [
      {
        cohort_id: 'demo_agrarian_farmers',
        cohort_name: 'Agrarian & Small Farmers',
        support_percent: 88.0,
        stance: 'Strong Support',
        key_concern_or_benefit: 'Rural parents sell livestock and take heavy loans to fund coaching; devastating paper leaks wipe out family savings.'
      },
      {
        cohort_id: 'demo_urban_tech_middle_class',
        cohort_name: 'Urban Tech & Salaried Middle Class',
        support_percent: 92.0,
        stance: 'Strong Support',
        key_concern_or_benefit: 'Universal anger against corruption in competitive exams like NEET/JEE; demands flawless computer forensics.'
      },
      {
        cohort_id: 'demo_unorganized_laborers',
        cohort_name: 'Unorganized Laborers & Daily Wage Earners',
        support_percent: 84.0,
        stance: 'Strong Support',
        key_concern_or_benefit: 'Government railway and recruitment exams are the primary escape route from generational poverty for laborers\' children.'
      },
      {
        cohort_id: 'demo_msme_small_business',
        cohort_name: 'Small Business & MSME Merchants',
        support_percent: 80.0,
        stance: 'Strong Support',
        key_concern_or_benefit: 'Strongly supports transparent merit, reducing bribery and corruption culture across public recruitment boards.'
      },
      {
        cohort_id: 'demo_youth_students',
        cohort_name: 'Youth & University Students',
        support_percent: 95.0,
        stance: 'Strong Support',
        key_concern_or_benefit: 'Resonant support for exempting students from penalties while destroying cheating mafias, though student bodies demand full testing agency restructuring.'
      },
      {
        cohort_id: 'demo_rural_women',
        cohort_name: 'Rural Women & Self-Help Groups (SHGs)',
        support_percent: 89.0,
        stance: 'Strong Support',
        key_concern_or_benefit: 'Empowers young girls studying diligently in village libraries against corrupt coaching center networks.'
      },
      {
        cohort_id: 'demo_tribal_forest',
        cohort_name: 'Tribal & Forest Dwellers (Adivasi)',
        support_percent: 81.0,
        stance: 'Strong Support',
        key_concern_or_benefit: 'Remote tribal youth with limited coaching access suffer most when leaked question papers inflate cutoff scores.'
      }
    ],
    socratic_debate_prompt: 'When a million students compete for ten thousand seats, does increasing criminal punishment for paper leaks fix an unfair educational bottleneck, or merely police the desperation born of scarcity?',
    cag_or_audit_note: 'Audit reviews of the National Testing Agency (NTA) highlighted severe systemic reliance on unverified private third-party computer testing centers.'
  },
  {
    id: 'bill_waqf_amendment_2024',
    bill_number: 'Bill No. 108 of 2024',
    title: 'Waqf (Amendment) Bill, 2024 (Unified Waqf Management, Empowerment, Efficiency and Development Act)',
    official_title: 'An Act further to amend the Waqf Act, 1995.',
    short_name: 'Waqf Amendment Bill 2024',
    session: 'Monsoon Session 2024',
    year: 2024,
    house: 'Lok Sabha (Referred to Joint Parliamentary Committee)',
    status: 'Under Joint Parliamentary Committee Review',
    ministry: 'Ministry of Minority Affairs',
    category: 'Religious Endowments & Property Governance',
    summary: 'Proposes sweeping structural changes to the 1995 Waqf Act: renames the law, mandates inclusion of non-Muslim and female members on Central and State Waqf Boards, removes the concept of \'Waqf by user\', makes District Collectors the determining authority on disputed government properties, and institutes central digital portal registration.',
    key_provisions: [
      'Mandates inclusion of two non-Muslim members and Muslim women on the Central Waqf Council and State Waqf Boards.',
      'Abolishes \'Waqf by User\' (properties deemed waqf purely by historical religious usage without formal deed).',
      'Designates District Collectors (Revenue Officers) to determine whether a disputed property is government land or waqf property.',
      'Mandatory registration of all waqf properties on a centralized digital portal (WAMSI) within six months.',
      'Mandates statutory audit of Waqf Boards by auditors appointed by the Comptroller and Auditor General (CAG).'
    ],
    proponents_argument: 'Ensures secular oversight, prevents arbitrary unilateral property claims by local boards, democratizes board representation by including women, and guarantees financial transparency via CAG audits.',
    opponents_argument: 'Violates constitutional religious autonomy under Articles 25 and 26, imposes non-community members into minority religious institutions, and strips Waqf Tribunals of judicial authority by subordinating them to executive revenue collectors.',
    linked_morality_nodes: ['A4', 'A6', 'P3_EQUITY', 'D8', 'E5'],
    moral_tensions: 'Freedom of Religious Association & Minority Autonomy (A4, P2_AGENCY) versus State Accountability, Anti-Corruption & Gender Parity (D8, P3_EQUITY, E5).',
    demographic_breakdown: [
      {
        cohort_id: 'demo_agrarian_farmers',
        cohort_name: 'Agrarian & Small Farmers',
        support_percent: 64.0,
        stance: 'Moderate Support',
        key_concern_or_benefit: 'Villages experiencing historical property claim disputes with local waqf boards welcome clear land revenue demarcations.'
      },
      {
        cohort_id: 'demo_urban_tech_middle_class',
        cohort_name: 'Urban Tech & Salaried Middle Class',
        support_percent: 78.0,
        stance: 'Strong Support',
        key_concern_or_benefit: 'Supports digital land registry integration, standardized GIS mapping, and elimination of non-transparent property exceptions.'
      },
      {
        cohort_id: 'demo_unorganized_laborers',
        cohort_name: 'Unorganized Laborers & Daily Wage Earners',
        support_percent: 46.0,
        stance: 'Divided / Neutral',
        key_concern_or_benefit: 'Minority community wage earners express deep social anxiety over potential community trust property alienation.'
      },
      {
        cohort_id: 'demo_msme_small_business',
        cohort_name: 'Small Business & MSME Merchants',
        support_percent: 72.0,
        stance: 'Strong Support',
        key_concern_or_benefit: 'Favors commercial property title certainty and clear municipal leasing rules for businesses on trust lands.'
      },
      {
        cohort_id: 'demo_youth_students',
        cohort_name: 'Youth & University Students',
        support_percent: 52.0,
        stance: 'Divided / Neutral',
        key_concern_or_benefit: 'Polarized campus debate between secular administrative accountability vs. constitutional minority rights protections.'
      },
      {
        cohort_id: 'demo_rural_women',
        cohort_name: 'Rural Women & Self-Help Groups (SHGs)',
        support_percent: 68.0,
        stance: 'Moderate Support',
        key_concern_or_benefit: 'Welcomes mandatory inclusion of Muslim women representatives and inheritance protections for female heirs.'
      },
      {
        cohort_id: 'demo_tribal_forest',
        cohort_name: 'Tribal & Forest Dwellers (Adivasi)',
        support_percent: 49.0,
        stance: 'Divided / Neutral',
        key_concern_or_benefit: 'Neutral, but emphasizes that Collector revenue powers must not be similarly used to overturn community forest claims.'
      }
    ],
    socratic_debate_prompt: 'Does a secular democracy enhance justice when it imposes administrative transparency on minority religious trusts, or does it violate liberty when the state treats one community\'s endowments differently from others?',
    cag_or_audit_note: 'CAG audit reports in several states had discovered vast discrepancies, uncollected lease rents, and untracked encroachments on thousands of prime urban waqf plots.'
  },
  {
    id: 'bill_disaster_management_2024',
    bill_number: 'Bill No. 101 of 2024',
    title: 'Disaster Management (Amendment) Bill, 2024',
    official_title: 'An Act to amend the Disaster Management Act, 2005.',
    short_name: 'Disaster Management Amendment Bill 2024',
    session: 'Monsoon Session 2024',
    year: 2024,
    house: 'Lok Sabha (Introduced)',
    status: 'Introduced / Pending Debate',
    ministry: 'Ministry of Home Affairs',
    category: 'Disaster Preparedness & Climate Resilience',
    summary: 'Modernizes India\'s 2005 disaster response architecture: integrates Urban Disaster Management Authorities for major metropolises, empowers State and District authorities to establish computerized disaster databases, strengthens the National Crisis Management Committee, and integrates early warning systems for extreme climate events.',
    key_provisions: [
      'Statutory creation of Urban Disaster Management Authorities for state capital cities and million-plus urban municipal corporations.',
      'Mandates establishment of integrated disaster databases at national and state levels for real-time resource mapping.',
      'Authorizes deployment of advanced satellite and AI-driven early warning telemetry for flash floods, landslides, and heatwaves.',
      'Grants statutory recognition to the National Crisis Management Committee (NCMC).'
    ],
    proponents_argument: 'Equips fast-growing flood-vulnerable megacities (like Bengaluru, Chennai, Mumbai, Delhi) with dedicated urban disaster governance and leverages high-tech climate forecasting.',
    opponents_argument: 'Excessive centralization under union home ministry agencies infringes upon states\' constitutional jurisdiction over land, municipal administration, and local rescue operations.',
    linked_morality_nodes: ['P1_HARM', 'E2', 'D5', 'A5', 'D7'],
    moral_tensions: 'Harm Reduction & Climate Preparedness (P1_HARM, E2, D5) versus Democratic Federalism & Local Municipal Autonomy (P2_AGENCY, D6).',
    demographic_breakdown: [
      {
        cohort_id: 'demo_agrarian_farmers',
        cohort_name: 'Agrarian & Small Farmers',
        support_percent: 74.0,
        stance: 'Strong Support',
        key_concern_or_benefit: 'Vital need for localized early flood warnings, cyclone shelters, and rapid disaster crop damage compensation.'
      },
      {
        cohort_id: 'demo_urban_tech_middle_class',
        cohort_name: 'Urban Tech & Salaried Middle Class',
        support_percent: 89.0,
        stance: 'Strong Support',
        key_concern_or_benefit: 'Deeply frustrated by annual urban flooding and infrastructure collapse in major tech metro corridors.'
      },
      {
        cohort_id: 'demo_unorganized_laborers',
        cohort_name: 'Unorganized Laborers & Daily Wage Earners',
        support_percent: 81.0,
        stance: 'Strong Support',
        key_concern_or_benefit: 'Slum and informal settlement dwellers bear the heaviest brunt of extreme heatwaves and flash flood drownings.'
      },
      {
        cohort_id: 'demo_msme_small_business',
        cohort_name: 'Small Business & MSME Merchants',
        support_percent: 83.0,
        stance: 'Strong Support',
        key_concern_or_benefit: 'Disaster preparedness protects industrial estates and commercial warehouses from devastating inundation losses.'
      },
      {
        cohort_id: 'demo_youth_students',
        cohort_name: 'Youth & University Students',
        support_percent: 87.0,
        stance: 'Strong Support',
        key_concern_or_benefit: 'Strongly supports climate adaptation technology, volunteer mobilization protocols, and ecological zoning.'
      },
      {
        cohort_id: 'demo_rural_women',
        cohort_name: 'Rural Women & Self-Help Groups (SHGs)',
        support_percent: 82.0,
        stance: 'Strong Support',
        key_concern_or_benefit: 'SHG networks play critical roles in post-disaster relief, clean water distribution, and community kitchens.'
      },
      {
        cohort_id: 'demo_tribal_forest',
        cohort_name: 'Tribal & Forest Dwellers (Adivasi)',
        support_percent: 70.0,
        stance: 'Strong Support',
        key_concern_or_benefit: 'Requires landslide warning systems in fragile Himalayan and Western Ghats tribal habitations.'
      }
    ],
    socratic_debate_prompt: 'When catastrophic climate events become recurring seasonal realities, is disaster management a specialized emergency service or a fundamental restructuring of how human habitats are planned?',
    cag_or_audit_note: 'CAG audits on State Disaster Response Funds (SDRF) highlighted unspent balances and delayed disbursements to affected families in multiple states.'
  },
  {
    id: 'bill_finance_act_2024',
    bill_number: 'Finance (No. 2) Act, 2024',
    title: 'Finance (No. 2) Act, 2024',
    official_title: 'An Act to give effect to the financial proposals of the Central Government for the financial year 2024-2025.',
    short_name: 'Finance Act 2024',
    session: 'Budget / Monsoon Session 2024',
    year: 2024,
    house: 'Parliament of India (Enacted)',
    status: 'Presidential Assent (Enacted)',
    ministry: 'Ministry of Finance',
    category: 'Fiscal Policy, Taxation & Macroeconomics',
    summary: 'Overhauls capital gains tax structures (hiking Short-Term Capital Gains to 20% and Long-Term Capital Gains to 12.5%), modifies real estate indexation rules with taxpayer grandfathering options, restructures the New Income Tax Regime standard deduction, and introduces the comprehensive PM Internship Scheme in top 500 companies.',
    key_provisions: [
      'Standardizes Long-Term Capital Gains (LTCG) tax at 12.5% across all asset classes with exemption threshold raised to ₹1.25 lakh.',
      'Hikes Short-Term Capital Gains (STCG) on listed equities from 15% to 20% to curb speculative retail trading.',
      'Increases standard deduction for salaried employees under the New Tax Regime from ₹50,000 to ₹75,000.',
      'Launches PM Package for Employment & Skilling: 1 crore youth internships across top 500 corporations with ₹5,000 monthly allowance.',
      'Abolishes Angel Tax for all classes of investors to revitalize the Indian startup ecosystem.'
    ],
    proponents_argument: 'Simplifies a convoluted tax code, curbs dangerous derivative speculation among retail investors, boosts domestic startup angel funding, and directly subsidizes youth industrial apprenticeships.',
    opponents_argument: 'Disproportionately taxes middle-class capital market savings and real estate appreciation while failing to expand the ultra-wealthy direct tax base or raise agricultural worker income floors.',
    linked_morality_nodes: ['E10', 'P3_EQUITY', 'A6', 'D4', 'D7'],
    moral_tensions: 'Economic Growth & Startup Incentives (D4, E10) versus Progressive Taxation & Middle-Class Burden Equity (P3_EQUITY, A6).',
    demographic_breakdown: [
      {
        cohort_id: 'demo_agrarian_farmers',
        cohort_name: 'Agrarian & Small Farmers',
        support_percent: 56.0,
        stance: 'Moderate Support',
        key_concern_or_benefit: 'Benefits from agricultural credit allocations, though seeks higher direct cash support under PM-KISAN.'
      },
      {
        cohort_id: 'demo_urban_tech_middle_class',
        cohort_name: 'Urban Tech & Salaried Middle Class',
        support_percent: 44.0,
        stance: 'Moderate Opposition',
        key_concern_or_benefit: 'Strong backlash against higher LTCG/STCG taxes and initial indexation removal on family residential properties.'
      },
      {
        cohort_id: 'demo_unorganized_laborers',
        cohort_name: 'Unorganized Laborers & Daily Wage Earners',
        support_percent: 62.0,
        stance: 'Moderate Support',
        key_concern_or_benefit: 'Relies on sustained welfare outlays for subsidized food grains and rural employment allocations.'
      },
      {
        cohort_id: 'demo_msme_small_business',
        cohort_name: 'Small Business & MSME Merchants',
        support_percent: 69.0,
        stance: 'Moderate Support',
        key_concern_or_benefit: 'Welcomes abolition of Angel Tax and enhanced collateral-free credit guarantee limits for MSMEs.'
      },
      {
        cohort_id: 'demo_youth_students',
        cohort_name: 'Youth & University Students',
        support_percent: 74.0,
        stance: 'Strong Support',
        key_concern_or_benefit: 'Enthusiastic about the ₹5,000/month corporate internship scheme, but demands guarantees of permanent job absorption.'
      },
      {
        cohort_id: 'demo_rural_women',
        cohort_name: 'Rural Women & Self-Help Groups (SHGs)',
        support_percent: 71.0,
        stance: 'Strong Support',
        key_concern_or_benefit: 'Expansion of Lakhpati Didi credit support and enhanced mudra loan limits empower female micro-enterprises.'
      },
      {
        cohort_id: 'demo_tribal_forest',
        cohort_name: 'Tribal & Forest Dwellers (Adivasi)',
        support_percent: 53.0,
        stance: 'Divided / Neutral',
        key_concern_or_benefit: 'Seeks enhanced budgetary allocations for Eklavya Model Residential Schools (EMRS) and minor forest produce procurement.'
      }
    ],
    socratic_debate_prompt: 'When taxation shifts increasingly toward capital gains on modest middle-class savings while corporate tax cuts remain entrenched, whose economic flourishing is the fiscal system engineered to sustain?',
    cag_or_audit_note: 'CAG fiscal compliance reports emphasize monitoring off-budget borrowings and tracking effective utilization of capital expenditure outlays.'
  },
  {
    id: 'bill_boilers_2024',
    bill_number: 'Bill No. 104 of 2024',
    title: 'Boilers Act, 2024',
    official_title: 'An Act to consolidate and amend the law relating to steam-boilers.',
    short_name: 'Boilers Act 2024',
    session: 'Monsoon Session 2024',
    year: 2024,
    house: 'Parliament of India (Enacted)',
    status: 'Presidential Assent (Enacted)',
    ministry: 'Ministry of Commerce and Industry',
    category: 'Labor Safety & Industrial Standards',
    summary: 'Repeals the pre-independence Boilers Act 1923, decriminalizes several minor technical compliance offenses, introduces self-certification and third-party inspection agencies for industrial steam boilers, and updates safety protocols to prevent factory explosions.',
    key_provisions: [
      'Decriminalizes procedural lapses, replacing criminal prosecution with graduated financial civil penalties.',
      'Retains criminal liability and imprisonment for hazardous violations that cause fatal industrial explosions or bodily injury.',
      'Enables third-party certified inspection agencies to audit boilers, ending the monopoly of state government boiler inspectors.',
      'Mandates modern digital sensor monitoring and automated pressure relief compliance for high-capacity boilers.'
    ],
    proponents_argument: 'Ends harassment from \'Inspector Raj\' for manufacturing units, lowers ease of doing business barriers, and modernizes industrial pressure vessel standards.',
    opponents_argument: 'Outsourcing safety audits to private third-party agencies could incentivize cut corners and compromise factory worker physical safety in chemical belts.',
    linked_morality_nodes: ['A1', 'D4', 'P1_HARM', 'D8'],
    moral_tensions: 'Worker Bodily Safety & Non-Harm (A1, P1_HARM, D4) versus Industrial Deregulation & Ease of Doing Business (P2_AGENCY, D8).',
    demographic_breakdown: [
      {
        cohort_id: 'demo_agrarian_farmers',
        cohort_name: 'Agrarian & Small Farmers',
        support_percent: 50.0,
        stance: 'Divided / Neutral',
        key_concern_or_benefit: 'Relevant to sugar mills and agro-processing factories in rural belts; emphasizes environmental pollution control.'
      },
      {
        cohort_id: 'demo_urban_tech_middle_class',
        cohort_name: 'Urban Tech & Salaried Middle Class',
        support_percent: 70.0,
        stance: 'Strong Support',
        key_concern_or_benefit: 'Supports rationalizing archaic colonial inspector laws to boost industrial manufacturing hubs.'
      },
      {
        cohort_id: 'demo_unorganized_laborers',
        cohort_name: 'Unorganized Laborers & Daily Wage Earners',
        support_percent: 41.0,
        stance: 'Moderate Opposition',
        key_concern_or_benefit: 'Trade unions warn that self-certification and private auditors increase risks of catastrophic factory fires and boiler explosions.'
      },
      {
        cohort_id: 'demo_msme_small_business',
        cohort_name: 'Small Business & MSME Merchants',
        support_percent: 86.0,
        stance: 'Strong Support',
        key_concern_or_benefit: 'Huge relief from bureaucratic corruption, extortionate state inspections, and endless plant shutdown notices.'
      },
      {
        cohort_id: 'demo_youth_students',
        cohort_name: 'Youth & University Students',
        support_percent: 62.0,
        stance: 'Moderate Support',
        key_concern_or_benefit: 'Encourages high-tech engineering job creation while calling for rigorous third-party accreditation.'
      },
      {
        cohort_id: 'demo_rural_women',
        cohort_name: 'Rural Women & Self-Help Groups (SHGs)',
        support_percent: 55.0,
        stance: 'Moderate Support',
        key_concern_or_benefit: 'Focuses on factory worker family safety and clean emission controls near peri-urban villages.'
      },
      {
        cohort_id: 'demo_tribal_forest',
        cohort_name: 'Tribal & Forest Dwellers (Adivasi)',
        support_percent: 48.0,
        stance: 'Divided / Neutral',
        key_concern_or_benefit: 'Concerns over industrial emissions and boiler plant runoffs into local forested watersheds.'
      }
    ],
    socratic_debate_prompt: 'When state inspection is replaced by private third-party certification in hazardous industrial environments, who bears the catastrophic cost if self-regulation fails?',
    cag_or_audit_note: 'Historical industrial safety audits revealed acute shortages of qualified government boiler inspectors across manufacturing states.'
  },
  {
    id: 'bill_vayuyan_2024',
    bill_number: 'Bill No. 110 of 2024',
    title: 'Bharatiya Vayuyan Vidheyak, 2024',
    official_title: 'An Act to provide for the regulation and control of the design, manufacture, maintenance, possession, use, operation, sale, import and export of aircraft.',
    short_name: 'Aviation Act 2024',
    session: 'Monsoon Session 2024',
    year: 2024,
    house: 'Lok Sabha (Passed)',
    status: 'Passed Lok Sabha',
    ministry: 'Ministry of Civil Aviation',
    category: 'Aviation & Transport Infrastructure',
    summary: 'Replaces the 90-year-old Aircraft Act 1934. Streamlines civil aviation regulations, empowers DGCA, BCAS, and AAIB as statutory autonomous authorities, establishes manufacturing and design frameworks for indigenous aircraft and drones, and removes redundant penal provisions.',
    key_provisions: [
      'Provides explicit statutory footing to the Directorate General of Civil Aviation (DGCA), Bureau of Civil Aviation Security (BCAS), and Aircraft Accident Investigation Bureau (AAIB).',
      'Enables domestic manufacturing and certification frameworks under Make in India for commercial passenger planes, eVTOLs, and drones.',
      'Rationalizes penalties and decriminalizes minor administrative infractions by airline operators and pilots.',
      'Establishes structured mechanisms for rapid airspace clearance for emergency medical drones and disaster relief flights.'
    ],
    proponents_argument: 'Dismantles colonial aviation constraints, turns India into a global aircraft manufacturing, MRO (Maintenance, Repair, Overhaul), and drone hub, and fortifies statutory aviation safety oversight.',
    opponents_argument: 'Reduces consumer passenger protection redressal teeth against arbitrary airline pricing, mass cancellations, and chronic flight delays.',
    linked_morality_nodes: ['A1', 'E11', 'P2_AGENCY', 'D8'],
    moral_tensions: 'Technological Modernity & Indigenous Industrial Autonomy (E11, D8) versus Consumer Protection & Public Transport Equity (P3_EQUITY, A6).',
    demographic_breakdown: [
      {
        cohort_id: 'demo_agrarian_farmers',
        cohort_name: 'Agrarian & Small Farmers',
        support_percent: 61.0,
        stance: 'Moderate Support',
        key_concern_or_benefit: 'Welcomes liberalized drone regulations for precision pesticide spraying, crop insurance drone surveys, and soil mapping.'
      },
      {
        cohort_id: 'demo_urban_tech_middle_class',
        cohort_name: 'Urban Tech & Salaried Middle Class',
        support_percent: 86.0,
        stance: 'Strong Support',
        key_concern_or_benefit: 'Frequent fliers support global safety standards, expanded regional UDAN airports, and world-class aerospace engineering careers.'
      },
      {
        cohort_id: 'demo_unorganized_laborers',
        cohort_name: 'Unorganized Laborers & Daily Wage Earners',
        support_percent: 48.0,
        stance: 'Divided / Neutral',
        key_concern_or_benefit: 'Air travel remains unaffordable; primary concern is railway ticket availability and safe sleeper coach transit.'
      },
      {
        cohort_id: 'demo_msme_small_business',
        cohort_name: 'Small Business & MSME Merchants',
        support_percent: 80.0,
        stance: 'Strong Support',
        key_concern_or_benefit: 'Tremendous opportunities in drone component manufacturing, aerospace precision tooling, and airport logistics services.'
      },
      {
        cohort_id: 'demo_youth_students',
        cohort_name: 'Youth & University Students',
        support_percent: 82.0,
        stance: 'Strong Support',
        key_concern_or_benefit: 'Excited about aerospace engineering, drone pilot licensing, and autonomous aeronautics startup opportunities.'
      },
      {
        cohort_id: 'demo_rural_women',
        cohort_name: 'Rural Women & Self-Help Groups (SHGs)',
        support_percent: 68.0,
        stance: 'Moderate Support',
        key_concern_or_benefit: 'Celebrates \'Drone Didi\' schemes empowering rural women with agricultural drone piloting livelihoods.'
      },
      {
        cohort_id: 'demo_tribal_forest',
        cohort_name: 'Tribal & Forest Dwellers (Adivasi)',
        support_percent: 52.0,
        stance: 'Divided / Neutral',
        key_concern_or_benefit: 'Drone surveillance over forest habitats must not infringe upon indigenous community movement and rights.'
      }
    ],
    socratic_debate_prompt: 'When public transport policy celebrates supersonic aviation and private drone corridors while everyday passenger rail struggles with overcrowded coaches, who is being accelerated into the future?',
    cag_or_audit_note: 'Audit reports on the UDAN regional connectivity scheme found over 40% of non-metro subsidized routes discontinued after initial Viability Gap Funding ended.'
  },
  {
    id: 'bill_banking_laws_2024',
    bill_number: 'Bill No. 135 of 2024',
    title: 'Banking Laws (Amendment) Bill, 2024',
    official_title: 'An Act further to amend the Reserve Bank of India Act, 1934, the Banking Regulation Act, 1949, the State Bank of India Act, 1955, and the Banking Companies (Acquisition and Transfer of Undertakings) Acts.',
    short_name: 'Banking Amendment Bill 2024',
    session: 'Winter Session 2024',
    year: 2024,
    house: 'Lok Sabha (Introduced)',
    status: 'Introduced / Pending Debate',
    ministry: 'Ministry of Finance',
    category: 'Financial Governance & Depositor Protection',
    summary: 'Introduces critical governance reforms across the Indian banking sector: allows up to four nominees per bank account (simultaneous and consecutive options), redefines \'substantial interest\' threshold for bank directors, improves reporting of unclaimed dividends and deposits, and strengthens audit independence.',
    key_provisions: [
      'Allows depositors to register up to 4 nominees per account with customizable percentage allocations, simplifying inheritance and estate settlement.',
      'Hikes the threshold for \'substantial interest\' in non-banking companies for bank directors from ₹5 lakh to ₹2 crore.',
      'Transfers unclaimed shares, unpaid dividends, and matured deposits of co-operative and public sector banks to the Investor Education and Protection Fund (IEPF).',
      'Provides statutory flexibility to public sector banks in determining remuneration for statutory auditors.'
    ],
    proponents_argument: 'Substantially eases estate settlement for millions of middle-class families, protects depositors against inter-generational fund freezing, and updates decades-old directorial conflict-of-interest monetary limits.',
    opponents_argument: 'Weakens conflict-of-interest scrutiny on bank board directors by raising the substantial interest cap forty-fold, increasing systemic crony lending risks.',
    linked_morality_nodes: ['A6', 'D8', 'E10', 'D7'],
    moral_tensions: 'Fiduciary Duty & Anti-Corruption Governance (A6, D8) versus Depositor Convenience & Financial Modernization (P2_AGENCY, E10).',
    demographic_breakdown: [
      {
        cohort_id: 'demo_agrarian_farmers',
        cohort_name: 'Agrarian & Small Farmers',
        support_percent: 63.0,
        stance: 'Moderate Support',
        key_concern_or_benefit: 'Multiple nominee features prevent catastrophic family inheritance disputes over deceased farmers\' bank savings.'
      },
      {
        cohort_id: 'demo_urban_tech_middle_class',
        cohort_name: 'Urban Tech & Salaried Middle Class',
        support_percent: 90.0,
        stance: 'Strong Support',
        key_concern_or_benefit: 'High praise for multi-nominee facility across joint fixed deposits, mutual fund folios, and bank lockers.'
      },
      {
        cohort_id: 'demo_unorganized_laborers',
        cohort_name: 'Unorganized Laborers & Daily Wage Earners',
        support_percent: 60.0,
        stance: 'Moderate Support',
        key_concern_or_benefit: 'Helps migrant worker families claim deceased relatives\' Jan Dhan account balances without complex legal affidavits.'
      },
      {
        cohort_id: 'demo_msme_small_business',
        cohort_name: 'Small Business & MSME Merchants',
        support_percent: 74.0,
        stance: 'Strong Support',
        key_concern_or_benefit: 'Streamlines partnership account nominations and reduces bureaucratic freeze periods upon partner death.'
      },
      {
        cohort_id: 'demo_youth_students',
        cohort_name: 'Youth & University Students',
        support_percent: 72.0,
        stance: 'Strong Support',
        key_concern_or_benefit: 'Favors modern digital banking estate management, while finance graduates caution against board conflict-of-interest dilutions.'
      },
      {
        cohort_id: 'demo_rural_women',
        cohort_name: 'Rural Women & Self-Help Groups (SHGs)',
        support_percent: 79.0,
        stance: 'Strong Support',
        key_concern_or_benefit: 'Protects widows and female dependents from being arbitrarily excluded by extended family from bank account proceeds.'
      },
      {
        cohort_id: 'demo_tribal_forest',
        cohort_name: 'Tribal & Forest Dwellers (Adivasi)',
        support_percent: 58.0,
        stance: 'Moderate Support',
        key_concern_or_benefit: 'Requires vernacular bank literacy camps in tribal areas to register legitimate nominees for DBT accounts.'
      }
    ],
    socratic_debate_prompt: 'When a banking law makes it seamless for a family to inherit savings but simultaneously raises the threshold for holding corporate directors accountable for conflicts of interest, whose protection was the primary legislative intent?',
    cag_or_audit_note: 'RBI data indicated over ₹42,000 crore lying in unclaimed depositor education and awareness funds (DEAF) due to missing nominee details.'
  },

  // ==========================================
  // 2025 LANDMARK ACTS & BILLS
  // ==========================================
  {
    id: 'bill_onoe_2025',
    bill_number: 'Constitution (129th & 130th Amendment) Bills, 2025',
    title: 'Simultaneous Elections Enabling Constitutional Amendment Bills (One Nation, One Election)',
    official_title: 'Bills further to amend the Constitution of India to enable simultaneous elections to the House of the People and all State Legislative Assemblies.',
    short_name: 'One Nation One Election Bills 2025',
    session: 'Budget Session 2025',
    year: 2025,
    house: 'Parliament of India (Introduced / Under Review)',
    status: 'Introduced / Pending Debate',
    ministry: 'Ministry of Law and Justice',
    category: 'Constitutional & Federal Governance',
    summary: 'Implements the recommendations of the High-Level Committee on Simultaneous Elections. Proposes harmonizing tenures of the Lok Sabha and all State Legislative Assemblies to hold synchronized elections in a single cycle, followed by synchronized local panchayat/municipal elections within 100 days.',
    key_provisions: [
      'Amends Article 83 (Duration of Houses of Parliament) and Article 172 (Duration of State Legislatures).',
      'Provides that any State Assembly dissolved mid-term will only serve for the remainder of the unexpired 5-year cycle.',
      'Establishes a Single Common Electoral Roll and Single Voter ID for Lok Sabha, Vidhan Sabha, and Urban/Rural Local Bodies.',
      'Mandates comprehensive logistics planning by the Election Commission of India for nationwide simultaneous EVM/VVPAT deployment.'
    ],
    proponents_argument: 'Eliminates perpetual election cycles that paralyze policy implementation under the Model Code of Conduct, cuts thousands of crores in public administrative expenditures, and reduces voter fatigue.',
    opponents_argument: 'Subverts basic structure of federalism by truncating or artificially extending democratically elected state government mandates, and disadvantages regional issues against dominant national presidentialized campaigns.',
    linked_morality_nodes: ['D6', 'P3_EQUITY', 'A6', 'D8', 'P2_AGENCY'],
    moral_tensions: 'Administrative Efficiency, Fiscal Economy & Policy Continuity (D8, A6) versus Federal Pluralism, Regional Representation & Democratic Accountability (D6, P2_AGENCY, P3_EQUITY).',
    demographic_breakdown: [
      {
        cohort_id: 'demo_agrarian_farmers',
        cohort_name: 'Agrarian & Small Farmers',
        support_percent: 54.0,
        stance: 'Divided / Neutral',
        key_concern_or_benefit: 'Frequent state elections provide leverage to force political parties into farm loan waivers and crop price promises.'
      },
      {
        cohort_id: 'demo_urban_tech_middle_class',
        cohort_name: 'Urban Tech & Salaried Middle Class',
        support_percent: 81.0,
        stance: 'Strong Support',
        key_concern_or_benefit: 'Tired of perpetual political rallies, traffic closures, and populist policy paralysis; strongly favors unified voting days.'
      },
      {
        cohort_id: 'demo_unorganized_laborers',
        cohort_name: 'Unorganized Laborers & Daily Wage Earners',
        support_percent: 49.0,
        stance: 'Divided / Neutral',
        key_concern_or_benefit: 'Elections are times when political candidates distribute relief and pay attention to marginalized bastis.'
      },
      {
        cohort_id: 'demo_msme_small_business',
        cohort_name: 'Small Business & MSME Merchants',
        support_percent: 84.0,
        stance: 'Strong Support',
        key_concern_or_benefit: 'Perpetual elections cause liquor bans, cash transit seizures by election flying squads, and commercial disruptions.'
      },
      {
        cohort_id: 'demo_youth_students',
        cohort_name: 'Youth & University Students',
        support_percent: 64.0,
        stance: 'Moderate Support',
        key_concern_or_benefit: 'Appreciates streamlined single voter ID registration, but debaters highlight risks to regional linguistic diversity.'
      },
      {
        cohort_id: 'demo_rural_women',
        cohort_name: 'Rural Women & Self-Help Groups (SHGs)',
        support_percent: 62.0,
        stance: 'Moderate Support',
        key_concern_or_benefit: 'Values stable governance without constant campaign disruptions, while wanting local panchayat autonomy protected.'
      },
      {
        cohort_id: 'demo_tribal_forest',
        cohort_name: 'Tribal & Forest Dwellers (Adivasi)',
        support_percent: 42.0,
        stance: 'Moderate Opposition',
        key_concern_or_benefit: 'Fears state-level tribal land issues will be completely drowned out by high-decibel national general election campaigns.'
      }
    ],
    socratic_debate_prompt: 'If democratic elections are viewed primarily as an expensive administrative burden to be minimized rather than the supreme exercise of citizen sovereignty, has the republic prioritized efficiency over its own soul?',
    cag_or_audit_note: 'Law Commission studies estimated potential savings of ₹10,000+ crore per 5-year cycle, while opposition states challenge ECI manufacturing capacity for 3x EVMs.'
  },
  {
    id: 'bill_ai_governance_2025',
    bill_number: 'Bill No. 44 of 2025',
    title: 'National Artificial Intelligence Governance and Algorithmic Safety Act, 2025',
    official_title: 'An Act to regulate the development, deployment, and ethical governance of Artificial Intelligence systems, prevent algorithmic discrimination, and ensure sovereign compute security.',
    short_name: 'AI Safety Act 2025',
    session: 'Budget Session 2025',
    year: 2025,
    house: 'Parliament of India (Under Committee Review)',
    status: 'Under Joint Parliamentary Committee Review',
    ministry: 'Ministry of Electronics and Information Technology (MeitY)',
    category: 'Frontier Tech & AI Safety',
    summary: 'Establishes the AI Safety Institute of India (AISII), implements risk-tiered regulation for frontier AI foundation models, mandates algorithmic bias auditing, introduces mandatory watermarking of AI-generated synthetic media, and prohibits autonomous weapon deployments without human-in-the-loop.',
    key_provisions: [
      'Classification of AI models into Four Tiers: Unacceptable Risk (Prohibited), High Risk (Regulated), Generative AI (Transparency Mandates), and Low Risk.',
      'Mandatory algorithmic bias testing for credit scoring, recruitment, judicial sentencing, and welfare allocation algorithms.',
      'Statutory requirement for indestructible cryptographic watermarks and provenance metadata on all synthetic voices and deepfake media.',
      'Strict prohibition of autonomous lethal kinetic systems without explicit human command verification.',
      'Establishes the National Sovereign Compute Grid offering subsidized GPU clusters to domestic AI researchers and Indian language LLM startups.'
    ],
    proponents_argument: 'Positions India as an ethical AI superpower, protects societal harmony from election-distorting deepfakes, prevents algorithmic caste/gender discrimination in job screening, and builds sovereign Indian AI capacity.',
    opponents_argument: 'Onerous pre-deployment red-teaming compliance burdens could strangle nascent Indian AI startups, driving talent and venture capital to unregulated offshore jurisdictions.',
    linked_morality_nodes: ['E1', 'X1', 'X2', 'A3', 'P1_HARM'],
    moral_tensions: 'Technological Innovation & Economic Acceleration (E1, X1) versus Algorithmic Safety, Human Dignity & Epistemic Truth (A3, P1_HARM, X2).',
    demographic_breakdown: [
      {
        cohort_id: 'demo_agrarian_farmers',
        cohort_name: 'Agrarian & Small Farmers',
        support_percent: 65.0,
        stance: 'Moderate Support',
        key_concern_or_benefit: 'Needs trustworthy vernacular voice AI assistants (like Bhashini) for crop diseases without hallucinatory advice.'
      },
      {
        cohort_id: 'demo_urban_tech_middle_class',
        cohort_name: 'Urban Tech & Salaried Middle Class',
        support_percent: 85.0,
        stance: 'Strong Support',
        key_concern_or_benefit: 'Strongly backs protection against AI voice cloning fraud and algorithmic job displacement protections.'
      },
      {
        cohort_id: 'demo_unorganized_laborers',
        cohort_name: 'Unorganized Laborers & Daily Wage Earners',
        support_percent: 58.0,
        stance: 'Moderate Support',
        key_concern_or_benefit: 'Fears automated algorithmic gig worker firing and biometric facial recognition errors at ration distribution shops.'
      },
      {
        cohort_id: 'demo_msme_small_business',
        cohort_name: 'Small Business & MSME Merchants',
        support_percent: 73.0,
        stance: 'Strong Support',
        key_concern_or_benefit: 'Desires access to subsidized Indian compute infrastructure to deploy automated customer service in 22 regional languages.'
      },
      {
        cohort_id: 'demo_youth_students',
        cohort_name: 'Youth & University Students',
        support_percent: 79.0,
        stance: 'Strong Support',
        key_concern_or_benefit: 'Demands open-source AI exemptions to prevent big-tech monopoly capture, alongside protection against AI plagiarism.'
      },
      {
        cohort_id: 'demo_rural_women',
        cohort_name: 'Rural Women & Self-Help Groups (SHGs)',
        support_percent: 72.0,
        stance: 'Strong Support',
        key_concern_or_benefit: 'Urgent need for criminal deterrents against non-consensual deepfake pornography targeting female students and public figures.'
      },
      {
        cohort_id: 'demo_tribal_forest',
        cohort_name: 'Tribal & Forest Dwellers (Adivasi)',
        support_percent: 55.0,
        stance: 'Moderate Support',
        key_concern_or_benefit: 'Demands inclusion of unwritten indigenous tribal dialects in linguistic preservation datasets without data piracy.'
      }
    ],
    socratic_debate_prompt: 'When algorithms make opaque automated decisions deciding who receives welfare, who is hired, and who is policed, who sits in the seat of moral judgment: the engineer, the bureaucrat, or the machine?',
    cag_or_audit_note: 'Audit framework specifies standard operating procedures for red-teaming foundation models trained with more than 10^25 FLOPs.'
  },
  {
    id: 'bill_quantum_deeptech_2025',
    bill_number: 'Bill No. 78 of 2025',
    title: 'Deep Tech Startups and National Quantum Sovereignty Act, 2025',
    official_title: 'An Act to foster deep technology research, accelerate commercialization of quantum computing, quantum key distribution, and protect sovereign cryptographic infrastructure.',
    short_name: 'Quantum Sovereignty Act 2025',
    session: 'Monsoon Session 2025',
    year: 2025,
    house: 'Parliament of India (Enacted)',
    status: 'Presidential Assent (Enacted)',
    ministry: 'Ministry of Science and Technology',
    category: 'Strategic Tech & Quantum Computing',
    summary: 'Builds upon the National Quantum Mission to establish dedicated regulatory sandboxes, intellectual property incentives, and strategic sovereign procurement mandates for Indian deep-tech ventures developing Quantum Computing, Quantum Key Distribution (QKD), and Post-Quantum Cryptography (PQC).',
    key_provisions: [
      'Mandatory transition roadmap for critical banking and military networks to Post-Quantum Cryptography (PQC) standards by 2028.',
      'Sovereign Patent Fast-Track Track for Indian deep-tech patents in photonics, superconducting qubits, and spintronics.',
      'Statutory 25% domestic procurement quota for defense and space agencies from Indian deep-tech startups.',
      'Establishes an Indian Quantum Hardware Fab Foundry through a public-private special purpose vehicle.'
    ],
    proponents_argument: 'Ensures India does not lose the quantum race, inoculates national cybersecurity against future quantum decryption attacks (Store Now, Decrypt Later), and builds sovereign deep-tech manufacturing.',
    opponents_argument: 'Heavily subsidized grants risk capture by well-connected corporate conglomerates without delivering functional 1000-qubit fault-tolerant hardware.',
    linked_morality_nodes: ['X8', 'E3', 'E11', 'D3', 'A3'],
    moral_tensions: 'Strategic Technological Sovereignty & Deep Security (X8, E11) versus Immediate Public Capital Allocation Priorities (D1, D3, P3_EQUITY).',
    demographic_breakdown: [
      {
        cohort_id: 'demo_agrarian_farmers',
        cohort_name: 'Agrarian & Small Farmers',
        support_percent: 51.0,
        stance: 'Divided / Neutral',
        key_concern_or_benefit: 'Indirect benefit from advanced quantum climate modeling predicting extreme monsoon variations weeks in advance.'
      },
      {
        cohort_id: 'demo_urban_tech_middle_class',
        cohort_name: 'Urban Tech & Salaried Middle Class',
        support_percent: 88.0,
        stance: 'Strong Support',
        key_concern_or_benefit: 'High enthusiasm for frontier scientific leadership, high-paying physics/nanotech R&D jobs, and national pride.'
      },
      {
        cohort_id: 'demo_unorganized_laborers',
        cohort_name: 'Unorganized Laborers & Daily Wage Earners',
        support_percent: 44.0,
        stance: 'Divided / Neutral',
        key_concern_or_benefit: 'Questions massive public capital allocation for futuristic physics while primary school infrastructure suffers deficits.'
      },
      {
        cohort_id: 'demo_msme_small_business',
        cohort_name: 'Small Business & MSME Merchants',
        support_percent: 76.0,
        stance: 'Strong Support',
        key_concern_or_benefit: 'Opportunity for specialized precision machining, cryogenic cooling components, and electronics MSMEs.'
      },
      {
        cohort_id: 'demo_youth_students',
        cohort_name: 'Youth & University Students',
        support_percent: 91.0,
        stance: 'Strong Support',
        key_concern_or_benefit: 'Creates world-class research fellowships preventing the historic brain drain of Indian theoretical physicists and quantum engineers.'
      },
      {
        cohort_id: 'demo_rural_women',
        cohort_name: 'Rural Women & Self-Help Groups (SHGs)',
        support_percent: 54.0,
        stance: 'Moderate Support',
        key_concern_or_benefit: 'Supports national scientific advancement while urging parallel investment in rural primary healthcare tech.'
      },
      {
        cohort_id: 'demo_tribal_forest',
        cohort_name: 'Tribal & Forest Dwellers (Adivasi)',
        support_percent: 45.0,
        stance: 'Divided / Neutral',
        key_concern_or_benefit: 'Requires rare-earth refining facilities for quantum hardware to maintain zero environmental toxicity standards.'
      }
    ],
    socratic_debate_prompt: 'When a nation masters the mathematics of the subatomic realm to encrypt its state secrets, how does it ensure the benefits of that supreme power enrich the person holding the plough?',
    cag_or_audit_note: 'Audit protocols track milestone delivery of 50-qubit physical NISQ processors developed under National Quantum Mission consortia.'
  },
  {
    id: 'bill_patient_rights_2025',
    bill_number: 'Bill No. 92 of 2025',
    title: 'Universal Healthcare Quality and Patient Rights Charter Act, 2025',
    official_title: 'An Act to ensure standardized healthcare quality, enforce mandatory transparent medical billing, protect patient bodily sovereignty, and strengthen public district hospital infrastructure.',
    short_name: 'Patient Rights Charter Act 2025',
    session: 'Monsoon Session 2025',
    year: 2025,
    house: 'Parliament of India (Enacted)',
    status: 'Presidential Assent (Enacted)',
    ministry: 'Ministry of Health and Family Welfare',
    category: 'Public Health & Social Welfare',
    summary: 'Codifies an enforceable statutory Charter of Patient Rights across private and government hospitals: caps emergency ICU billing markup, mandates standardized rate lists for common clinical procedures, prohibits holding bodies of deceased patients over unpaid bills, and mandates generic medicine prescription transparency.',
    key_provisions: [
      'Prohibits any hospital from refusing emergency trauma or cardiac stabilization on grounds of advance payment or insurance pre-authorization.',
      'Strict statutory ban with severe criminal penalties on hospitals detaining deceased bodies or holding patients hostage over disputed hospital bills.',
      'Mandates display of standardized package rates for all surgeries and diagnostics as per Clinical Establishments Central Rules.',
      'Establishes District Medical Ombudspersons for fast-track 30-day resolution of medical overcharging and negligence complaints.',
      'Requires electronic health record portability under Ayushman Bharat Digital Mission (ABDM) with full patient data ownership.'
    ],
    proponents_argument: 'Ends predatory commercial overbilling by corporate hospital chains, protects desperate families from financial ruin during medical crises, and restores dignity and ethics to clinical medicine.',
    opponents_argument: 'Private medical associations claim blanket price ceilings will disincentivize private investment in cutting-edge surgical equipment and lead to defensive medicine practices.',
    linked_morality_nodes: ['D1', 'P1_HARM', 'A1', 'D7', 'E6'],
    moral_tensions: 'Right to Health, Bodily Dignity & Non-Exploitation (D1, P1_HARM, A1) versus Private Healthcare Market Viability & Autonomy (P2_AGENCY, D4).',
    demographic_breakdown: [
      {
        cohort_id: 'demo_agrarian_farmers',
        cohort_name: 'Agrarian & Small Farmers',
        support_percent: 94.0,
        stance: 'Strong Support',
        key_concern_or_benefit: 'Catastrophic health expenditures are the leading driver of rural agricultural indebtedness and land distress sales.'
      },
      {
        cohort_id: 'demo_urban_tech_middle_class',
        cohort_name: 'Urban Tech & Salaried Middle Class',
        support_percent: 92.0,
        stance: 'Strong Support',
        key_concern_or_benefit: 'Universal exhaustion with arbitrary corporate hospital bills, hidden consumable charges, and rejected insurance claims.'
      },
      {
        cohort_id: 'demo_unorganized_laborers',
        cohort_name: 'Unorganized Laborers & Daily Wage Earners',
        support_percent: 96.0,
        stance: 'Strong Support',
        key_concern_or_benefit: 'Guarantees emergency triage treatment without being turned away at hospital gates for lack of cash deposits.'
      },
      {
        cohort_id: 'demo_msme_small_business',
        cohort_name: 'Small Business & MSME Merchants',
        support_percent: 88.0,
        stance: 'Strong Support',
        key_concern_or_benefit: 'Reduces crippling personal health out-of-pocket shocks that frequently bankrupt small family enterprises.'
      },
      {
        cohort_id: 'demo_youth_students',
        cohort_name: 'Youth & University Students',
        support_percent: 89.0,
        stance: 'Strong Support',
        key_concern_or_benefit: 'Strongly supports public health rights, mental healthcare integration, and transparent clinical trials.'
      },
      {
        cohort_id: 'demo_rural_women',
        cohort_name: 'Rural Women & Self-Help Groups (SHGs)',
        support_percent: 95.0,
        stance: 'Strong Support',
        key_concern_or_benefit: 'Dramatically improves maternal healthcare access, dignified childbirth, and affordable emergency C-section deliveries.'
      },
      {
        cohort_id: 'demo_tribal_forest',
        cohort_name: 'Tribal & Forest Dwellers (Adivasi)',
        support_percent: 91.0,
        stance: 'Strong Support',
        key_concern_or_benefit: 'Mandates basic diagnostic labs and free snakebite/malaria medications in remote Community Health Centres (CHCs).'
      }
    ],
    socratic_debate_prompt: 'When human life and physical healing are packaged into high-margin commodified transactions, does the physician remain a healer bound by the Hippocratic Oath or an agent of corporate extraction?',
    cag_or_audit_note: 'CAG audits of PM-JAY and national health mission funds had repeatedly emphasized the absence of standardized clinical rate schedules across private empanelled hospitals.'
  },
  {
    id: 'bill_agrarian_price_2025',
    bill_number: 'Bill No. 118 of 2025',
    title: 'Agrarian Price Stabilization and Climate-Resilient Cropping Act, 2025',
    official_title: 'An Act to ensure price stabilization for agricultural produce, legally back remunerative minimum support pricing, incentivize climate-resilient crop diversification, and protect farmers from ecological shocks.',
    short_name: 'Agrarian Price Stabilization Act 2025',
    session: 'Winter Session 2025',
    year: 2025,
    house: 'Parliament of India (Passed Both Houses)',
    status: 'Passed Both Houses',
    ministry: 'Ministry of Agriculture and Farmers Welfare',
    category: 'Agriculture, Farmers & Rural Economy',
    summary: 'Codifies a statutory Price Deficiency Payment (PDP) mechanism guaranteeing the C2+50% formula recommended by the Swaminathan Commission for 23 mandated crops, introduces direct incentive bonuses for water-saving millets and pulses, and establishes a national agro-ecological soil carbon fund.',
    key_provisions: [
      'Statutory Price Deficiency Payment (PDP) system where the state compensates the direct price differential between mandi market sale price and MSP.',
      'Statutory adoption of Swaminathan Commission Formula (C2+50% comprehensive cost of production) for baseline MSP calculation.',
      'Special Ecological Transition Subsidy (₹7,500/acre) for shifting water-guzzling paddy-wheat monocultures to millets, pulses, and oilseeds.',
      'Integration of all APMC mandis and private e-NAM terminals with transparent digital weighing and electronic escrow payments within 48 hours.',
      'Exempts climate-damaged distress crop harvests from arbitrary market rejection through mandatory localized crop insurance settlements.'
    ],
    proponents_argument: 'Delivers long-awaited economic justice to 140 million farming households, breaks the cycle of agrarian debt, halts groundwater depletion in the Indus-Gangetic plains, and ensures national nutrition security.',
    opponents_argument: 'Fiscal conservatives and food grain traders argue that statutory price guarantees could inflate fiscal deficit burdens, trigger export uncompetitiveness, and strain government procurement storage capacities.',
    linked_morality_nodes: ['E8', 'D7', 'P1_HARM', 'E2', 'A6'],
    moral_tensions: 'Food Sovereignty & Farmer Dignity (E8, D7, P1_HARM) versus Macroeconomic Fiscal Discipline & Open-Market Commodity Pricing (A6, E10).',
    demographic_breakdown: [
      {
        cohort_id: 'demo_agrarian_farmers',
        cohort_name: 'Agrarian & Small Farmers',
        support_percent: 96.0,
        stance: 'Strong Support',
        key_concern_or_benefit: 'Historic breakthrough fulfilling decades of farmer union demands for legally assured remunerative crop pricing.'
      },
      {
        cohort_id: 'demo_urban_tech_middle_class',
        cohort_name: 'Urban Tech & Salaried Middle Class',
        support_percent: 55.0,
        stance: 'Moderate Support',
        key_concern_or_benefit: 'Supports farmer welfare, but expresses concerns over potential food inflation in pulses, vegetables, and cooking oils.'
      },
      {
        cohort_id: 'demo_unorganized_laborers',
        cohort_name: 'Unorganized Laborers & Daily Wage Earners',
        support_percent: 86.0,
        stance: 'Strong Support',
        key_concern_or_benefit: 'Thriving farm economy drives higher rural agricultural wages and reduces distress migration to urban slums.'
      },
      {
        cohort_id: 'demo_msme_small_business',
        cohort_name: 'Small Business & MSME Merchants',
        support_percent: 71.0,
        stance: 'Strong Support',
        key_concern_or_benefit: 'Rural purchasing power is the primary growth driver for consumer durables, two-wheelers, and FMCG retail.'
      },
      {
        cohort_id: 'demo_youth_students',
        cohort_name: 'Youth & University Students',
        support_percent: 78.0,
        stance: 'Strong Support',
        key_concern_or_benefit: 'Revitalizes agribusiness startups, organic supply chains, and makes sustainable farming a viable youth career option.'
      },
      {
        cohort_id: 'demo_rural_women',
        cohort_name: 'Rural Women & Self-Help Groups (SHGs)',
        support_percent: 92.0,
        stance: 'Strong Support',
        key_concern_or_benefit: 'Women provide over 60% of agricultural labor; price certainty directly secures household food budgets and child education.'
      },
      {
        cohort_id: 'demo_tribal_forest',
        cohort_name: 'Tribal & Forest Dwellers (Adivasi)',
        support_percent: 84.0,
        stance: 'Strong Support',
        key_concern_or_benefit: 'Substantial boost from MSP inclusion for traditional minor millets (ragi, jowar, kodo, kutki) cultivated on dryland plots.'
      }
    ],
    socratic_debate_prompt: 'Can a nation claim to be economically developed if the hands that till its soil and feed its billion citizens are driven to debt-induced despair by the volatility of market speculation?',
    cag_or_audit_note: 'Audit modeling emphasizes that Price Deficiency Payment (PDP) structures avoid physical storage wastage of grain rotting in open FCI silos.'
  },
  {
    id: 'bill_coastal_climate_2025',
    bill_number: 'Bill No. 129 of 2025',
    title: 'Coastal Regulation Zone and Climate Migration Rehabilitation Bill, 2025',
    official_title: 'An Act to provide for statutory protection of coastal ecosystems, regulate industrial reclamation, and create a National Climate Migration Rehabilitation Authority.',
    short_name: 'Coastal Climate Adaptation Bill 2025',
    session: 'Winter Session 2025',
    year: 2025,
    house: 'Parliament of India (Under Committee Review)',
    status: 'Under Joint Parliamentary Committee Review',
    ministry: 'Ministry of Earth Sciences / MoEFCC',
    category: 'Climate Adaptation & Coastal Ecology',
    summary: 'Addresses the escalating crisis of sea-level rise, cyclone surges, and coastal erosion along India\'s 7,500 km coastline. Restores strict 500-meter No Development Zones, prohibits mega-port construction on ecologically vulnerable sand spits, and creates India\'s first statutory resettlement fund for climate refugees.',
    key_provisions: [
      'Establishes the National Climate Migration & Rehabilitation Authority with dedicated funds to relocate sea-erosion displaced coastal villages.',
      'Re-establishes strict 500-meter No-Development High Tide Zones, reversing previous industrial dilution notifications.',
      'Statutory recognition of traditional artisanal fishworker beach landing spaces and customary fishing rights.',
      'Mandates mangrove belt restoration and living shoreline bio-shields across vulnerable delta regions (Sundarbans, Mahanadi, Krishna-Godavari).'
    ],
    proponents_argument: 'Provides urgent humanitarian and ecological safeguards for 170 million coastal citizens against runaway sea level rise, coastal erosion, and catastrophic Arabian Sea/Bay of Bengal super-cyclones.',
    opponents_argument: 'Commercial maritime shipping lobbies and state infrastructure corporations claim strict zoning will stall port modernizations under Sagarmala and offshore energy terminals.',
    linked_morality_nodes: ['E2', 'A5', 'D5', 'P1_HARM', 'E12'],
    moral_tensions: 'Intergenerational Climate Resilience & Coastal Survival (E2, A5, P1_HARM) versus Commercial Port Industrialization & Maritime Trade Growth (D4, E10).',
    demographic_breakdown: [
      {
        cohort_id: 'demo_agrarian_farmers',
        cohort_name: 'Agrarian & Small Farmers',
        support_percent: 76.0,
        stance: 'Strong Support',
        key_concern_or_benefit: 'Stops saltwater ingress from destroying fertile coastal agricultural paddy fields and delta aquifers.'
      },
      {
        cohort_id: 'demo_urban_tech_middle_class',
        cohort_name: 'Urban Tech & Salaried Middle Class',
        support_percent: 74.0,
        stance: 'Strong Support',
        key_concern_or_benefit: 'Urgent need to protect coastal megacities (Mumbai, Chennai, Kolkata, Kochi) from chronic monsoon sea-surges.'
      },
      {
        cohort_id: 'demo_unorganized_laborers',
        cohort_name: 'Unorganized Laborers & Daily Wage Earners',
        support_percent: 88.0,
        stance: 'Strong Support',
        key_concern_or_benefit: 'Artisanal fishworkers and coastal laborers suffer existential loss of homes and boats during recurring cyclones.'
      },
      {
        cohort_id: 'demo_msme_small_business',
        cohort_name: 'Small Business & MSME Merchants',
        support_percent: 63.0,
        stance: 'Moderate Support',
        key_concern_or_benefit: 'Supports coastal ecological stability while seeking clear guidelines for sustainable beach tourism homestays.'
      },
      {
        cohort_id: 'demo_youth_students',
        cohort_name: 'Youth & University Students',
        support_percent: 89.0,
        stance: 'Strong Support',
        key_concern_or_benefit: 'Massive youth mobilization supporting climate justice, mangrove conservation, and statutory climate refugee rights.'
      },
      {
        cohort_id: 'demo_rural_women',
        cohort_name: 'Rural Women & Self-Help Groups (SHGs)',
        support_percent: 90.0,
        stance: 'Strong Support',
        key_concern_or_benefit: 'Coastal women fish vendors and crab harvesters depend directly on healthy mangrove estuaries for survival.'
      },
      {
        cohort_id: 'demo_tribal_forest',
        cohort_name: 'Tribal & Forest Dwellers (Adivasi)',
        support_percent: 83.0,
        stance: 'Strong Support',
        key_concern_or_benefit: 'Protects indigenous coastal communities and island tribes in Andaman & Nicobar from destructive mega-port projects.'
      }
    ],
    socratic_debate_prompt: 'When the rising ocean inevitably reclaims concrete promenades and luxury beachfront real estate, will we measure wealth by the tonnage of cargo handled or by the human dignity of those we sheltered from the tides?',
    cag_or_audit_note: 'CAG Report No. 17 of 2022 on Conservation of Coastal Ecosystems pointed out rampant illegal construction approvals and absent coastal zone management plans in multiple coastal states.'
  },

  // ==========================================
  // 2026 LANDMARK ACTS & BILLS
  // ==========================================
  {
    id: 'bill_gig_workers_social_security_2026',
    bill_number: 'Bill No. 15 of 2026',
    title: 'Digital Labor Platforms (Gig Worker Social Security and Algorithmic Transparency) Act, 2026',
    official_title: 'An Act to guarantee universal social security, accident insurance, fair wage floors, and algorithmic accountability for platform gig workers and app-based delivery partners.',
    short_name: 'Gig Worker Protection Act 2026',
    session: 'Budget Session 2026',
    year: 2026,
    house: 'Parliament of India (Enacted)',
    status: 'Presidential Assent (Enacted)',
    ministry: 'Ministry of Labour and Employment',
    category: 'Labor Welfare & Gig Economy',
    summary: 'Codifies landmark national rights for over 12 million app-based delivery drivers, cab aggregators, and digital freelance workers: establishes a 2% platform transaction welfare cess, mandates algorithmic transparency on wage calculations and automated deactivations, caps daily shift hours, and guarantees accident and health insurance.',
    key_provisions: [
      'Levies a statutory 1.5% to 2% welfare cess on every digital app transaction (food delivery, cab booking, quick-commerce) to fund gig worker social security.',
      'Mandates Algorithmic Explanation Rights: platforms must provide human-understandable rationale for task allocation, customer rating deductions, and account suspensions.',
      'Statutory ban on arbitrary instant automated app deactivation without a 7-day notice and human dispute review.',
      'Universal Portable Social Security Card linking pension, life insurance, and ₹10 lakh emergency on-duty accidental trauma cover.',
      'Caps continuous commercial driving/delivery duty hours to 12 hours max per day to prevent deadly fatigue accidents.'
    ],
    proponents_argument: 'Decisively ends algorithmic exploitation in the platform economy, grants 21st-century labor dignity to millions of precarious youth workers, and ensures sustainable corporate accountability.',
    opponents_argument: 'Quick-commerce and food-tech venture capitalists argue that welfare levies and algorithmic restrictions will inflate consumer delivery costs and slow down gig job generation.',
    linked_morality_nodes: ['D4', 'E4', 'E1', 'P2_AGENCY', 'A6'],
    moral_tensions: 'Labor Dignity, Living Wage & Algorithmic Due Process (D4, E4, E1, A6) versus Free-Market Platform Flexibility & On-Demand Consumer Velocity (P2_AGENCY, D8).',
    demographic_breakdown: [
      {
        cohort_id: 'demo_agrarian_farmers',
        cohort_name: 'Agrarian & Small Farmers',
        support_percent: 68.0,
        stance: 'Moderate Support',
        key_concern_or_benefit: 'Rural youth who migrate to urban centers as delivery partners gain formal social security and accidental death insurance.'
      },
      {
        cohort_id: 'demo_urban_tech_middle_class',
        cohort_name: 'Urban Tech & Salaried Middle Class',
        support_percent: 76.0,
        stance: 'Strong Support',
        key_concern_or_benefit: 'Appreciates ethical treatment and road safety of delivery workers, though conscious of slight increases in platform convenience fees.'
      },
      {
        cohort_id: 'demo_unorganized_laborers',
        cohort_name: 'Unorganized Laborers & Daily Wage Earners',
        support_percent: 95.0,
        stance: 'Strong Support',
        key_concern_or_benefit: 'Historic safety net providing medical insurance, pension accumulation, and protection from arbitrary app bans.'
      },
      {
        cohort_id: 'demo_msme_small_business',
        cohort_name: 'Small Business & MSME Merchants',
        support_percent: 70.0,
        stance: 'Moderate Support',
        key_concern_or_benefit: 'Restaurants and local retailers support transparent platform commission rules and predictable delivery partner fleets.'
      },
      {
        cohort_id: 'demo_youth_students',
        cohort_name: 'Youth & University Students',
        support_percent: 91.0,
        stance: 'Strong Support',
        key_concern_or_benefit: 'Millions of student part-time gig workers celebrate basic human dignity, transparent pay rates, and injury protections.'
      },
      {
        cohort_id: 'demo_rural_women',
        cohort_name: 'Rural Women & Self-Help Groups (SHGs)',
        support_percent: 79.0,
        stance: 'Strong Support',
        key_concern_or_benefit: 'Encourages entry of women into platform home-care, beauty services, and delivery work with emergency SOS safety features.'
      },
      {
        cohort_id: 'demo_tribal_forest',
        cohort_name: 'Tribal & Forest Dwellers (Adivasi)',
        support_percent: 66.0,
        stance: 'Moderate Support',
        key_concern_or_benefit: 'Supports portable welfare registration for migrant tribal youth working in metro delivery hubs.'
      }
    ],
    socratic_debate_prompt: 'When a smartphone application directs a worker\'s every minute through algorithmic incentives and penalizes them without human appeal, is the worker an independent contractor or a digital vassal?',
    cag_or_audit_note: 'Audit architecture models state-level gig worker welfare board collections pioneered under Rajasthan and Karnataka state legislations.'
  },
  {
    id: 'bill_neurotechnology_2026',
    bill_number: 'Bill No. 31 of 2026',
    title: 'Neurotechnology and Cognitive Data Protection Act, 2026',
    official_title: 'An Act to protect cognitive liberty, regulate brain-computer interfaces, prevent unauthorized extraction or commercialization of neural data, and establish neuro-ethical standards.',
    short_name: 'Neuro-Rights Act 2026',
    session: 'Budget Session 2026',
    year: 2026,
    house: 'Parliament of India (Introduced)',
    status: 'Introduced / Pending Debate',
    ministry: 'Ministry of Electronics and Information Technology (MeitY)',
    category: 'Neuro-Rights & Bioethics',
    summary: 'Pioneering legislation establishing constitutional \'Cognitive Liberty\' as an integral facet of Article 21. Regulates medical and consumer Brain-Computer Interfaces (BCIs), bans non-consensual neural data harvesting, prohibits workplace cognitive surveillance headsets, and restricts subconscious neural advertising manipulation.',
    key_provisions: [
      'Statutory definition of Neural Data as sensitive biometric material subject to absolute individual somatic ownership.',
      'Prohibition of non-consensual neuro-monitoring in workplace employee tracking, school classrooms, and commercial interrogation.',
      'Bans cognitive manipulation algorithms designed to bypass conscious human agency or alter subconscious consumer preferences.',
      'Statutory accreditation and cybersecurity standards for medical therapeutic neuro-prosthetics and deep brain stimulators.',
      'Establishes the National Bioethics and Neuro-Rights Council under the Ministry of Health and MeitY.'
    ],
    proponents_argument: 'Protects the ultimate frontier of human freedom—the human mind—from corporate extraction, invasive state surveillance, and involuntary cognitive exploitation before consumer BCI hardware proliferates.',
    opponents_argument: 'Premature regulatory constraints could stifle cutting-edge neurotech research in Parkinson\'s treatment, spinal injury rehabilitation, and assistive paralyzed communication.',
    linked_morality_nodes: ['X2', 'E6', 'D2', 'P2_AGENCY', 'A4'],
    moral_tensions: 'Cognitive Liberty, Mental Inviolability & Privacy of Mind (X2, P2_AGENCY, D2) versus Medical Innovation & Neuro-Therapeutic Progress (D1, E6).',
    demographic_breakdown: [
      {
        cohort_id: 'demo_agrarian_farmers',
        cohort_name: 'Agrarian & Small Farmers',
        support_percent: 58.0,
        stance: 'Moderate Support',
        key_concern_or_benefit: 'Needs affordable neuro-prosthetics and rehabilitation for farm workers injured in machinery accidents.'
      },
      {
        cohort_id: 'demo_urban_tech_middle_class',
        cohort_name: 'Urban Tech & Salaried Middle Class',
        support_percent: 87.0,
        stance: 'Strong Support',
        key_concern_or_benefit: 'High anxiety over workplace cognitive fatigue tracking headsets and behavioral neuro-marketing surveillance.'
      },
      {
        cohort_id: 'demo_unorganized_laborers',
        cohort_name: 'Unorganized Laborers & Daily Wage Earners',
        support_percent: 62.0,
        stance: 'Moderate Support',
        key_concern_or_benefit: 'Absolute objection to any employer mandating neural or brainwave monitoring sensors on transport drivers or factory workers.'
      },
      {
        cohort_id: 'demo_msme_small_business',
        cohort_name: 'Small Business & MSME Merchants',
        support_percent: 68.0,
        stance: 'Moderate Support',
        key_concern_or_benefit: 'Supports consumer mental privacy against predatory big-tech monopolies monopolizing cognitive data.'
      },
      {
        cohort_id: 'demo_youth_students',
        cohort_name: 'Youth & University Students',
        support_percent: 92.0,
        stance: 'Strong Support',
        key_concern_or_benefit: 'Passionate defense of mental privacy, cognitive freedom, and total prohibition of biometric brainwave tracking in colleges.'
      },
      {
        cohort_id: 'demo_rural_women',
        cohort_name: 'Rural Women & Self-Help Groups (SHGs)',
        support_percent: 71.0,
        stance: 'Strong Support',
        key_concern_or_benefit: 'Values bioethical protections while urging accessible medical rehabilitation for children with neuro-developmental disabilities.'
      },
      {
        cohort_id: 'demo_tribal_forest',
        cohort_name: 'Tribal & Forest Dwellers (Adivasi)',
        support_percent: 60.0,
        stance: 'Moderate Support',
        key_concern_or_benefit: 'Emphasizes holistic mental sovereignty and resistance against coercive technological intrusion into human consciousness.'
      }
    ],
    socratic_debate_prompt: 'If the state or commercial markets obtain the technological ability to read, predict, and influence the unexpressed thoughts inside your brain, does the concept of free will retain any meaning?',
    cag_or_audit_note: 'Legislation incorporates Chilean Constitutional Amendment on Neuro-rights and UNESCO Bioethics Committee universal guidelines.'
  },
  {
    id: 'bill_river_basin_governance_2026',
    bill_number: 'Bill No. 49 of 2026',
    title: 'Inter-State River Basin Water Sharing and Ecological Flows Act, 2026',
    official_title: 'An Act to provide for integrated basin-level ecological management of inter-state rivers, enforce mandatory environmental minimum flows, and resolve river water disputes through time-bound judicial tribunals.',
    short_name: 'River Basin Governance Act 2026',
    session: 'Monsoon Session 2026',
    year: 2026,
    house: 'Parliament of India (Passed Both Houses)',
    status: 'Passed Both Houses',
    ministry: 'Ministry of Jal Shakti',
    category: 'Water Governance & Federal Ecology',
    summary: 'Overhauls the 1956 Inter-State River Water Disputes Act: establishes statutory River Basin Authorities for major national river systems (Cauvery, Krishna, Godavari, Mahanadi, Yamuna, Narmada), mandates minimum year-round Ecological Flows (E-flows) to prevent river death, and sets a strict 2-year deadline for single-tribunal award adjudications.',
    key_provisions: [
      'Establishes autonomous River Basin Authorities comprising riparian state representatives, hydrological scientists, and environmental ecologists.',
      'Statutory mandate for non-negotiable minimum Ecological Flows (E-flows) for aquatic biodiversity and river health throughout all seasons.',
      'Replaces fragmented ad-hoc tribunals with a permanent Inter-State River Water Disputes Tribunal with strict 2-year verdict timelines.',
      'Creates a transparent Real-Time Telemetric Water Data Grid accessible to public and state governments to prevent disputes over reservoir storage levels.'
    ],
    proponents_argument: 'Replaces decades of acrimonious inter-state water warfare and regional riots with science-based hydrological management, preserves dying river ecosystems, and enforces transparent shared data.',
    opponents_argument: 'Upstream and downstream state political parties argue that federally mandated ecological water releases could compromise their immediate irrigation and drinking water quotas during severe drought years.',
    linked_morality_nodes: ['A5', 'E2', 'E8', 'P3_EQUITY', 'D5'],
    moral_tensions: 'Ecological River Health & Long-Term Basin Survival (A5, E2) versus Immediate Agricultural Irrigation & Regional Riparian Claims (E8, P3_EQUITY).',
    demographic_breakdown: [
      {
        cohort_id: 'demo_agrarian_farmers',
        cohort_name: 'Agrarian & Small Farmers',
        support_percent: 78.0,
        stance: 'Strong Support',
        key_concern_or_benefit: 'Needs predictable, transparent irrigation water releases without endless inter-state legal deadlocks during sowing seasons.'
      },
      {
        cohort_id: 'demo_urban_tech_middle_class',
        cohort_name: 'Urban Tech & Salaried Middle Class',
        support_percent: 86.0,
        stance: 'Strong Support',
        key_concern_or_benefit: 'Directly secures piped drinking water for water-stressed megacities (Bengaluru, Chennai, Hyderabad, Delhi NCR).'
      },
      {
        cohort_id: 'demo_unorganized_laborers',
        cohort_name: 'Unorganized Laborers & Daily Wage Earners',
        support_percent: 79.0,
        stance: 'Strong Support',
        key_concern_or_benefit: 'Water scarcity directly causes rural crop collapse and drives desperate distress migration to unorganized urban labor.'
      },
      {
        cohort_id: 'demo_msme_small_business',
        cohort_name: 'Small Business & MSME Merchants',
        support_percent: 75.0,
        stance: 'Strong Support',
        key_concern_or_benefit: 'Reliable industrial water supply and prevention of inter-state road blockades during river disputes.'
      },
      {
        cohort_id: 'demo_youth_students',
        cohort_name: 'Youth & University Students',
        support_percent: 88.0,
        stance: 'Strong Support',
        key_concern_or_benefit: 'Passionate backing for river restoration, anti-pollution enforcement against industrial effluents, and wetland revival.'
      },
      {
        cohort_id: 'demo_rural_women',
        cohort_name: 'Rural Women & Self-Help Groups (SHGs)',
        support_percent: 94.0,
        stance: 'Strong Support',
        key_concern_or_benefit: 'Directly alleviates the daily drudgery of village women walking kilometers to fetch potable drinking water.'
      },
      {
        cohort_id: 'demo_tribal_forest',
        cohort_name: 'Tribal & Forest Dwellers (Adivasi)',
        support_percent: 82.0,
        stance: 'Strong Support',
        key_concern_or_benefit: 'Protects upper catchment riparian forest ecosystems and indigenous riverine fisheries from dam dry-ups.'
      }
    ],
    socratic_debate_prompt: 'When a river flows across state boundaries, does it belong to the state where the rain fell on the mountain, the state where it meets the sea, or to the living ecosystem of which humanity is merely one custodian?',
    cag_or_audit_note: 'CAG audit on Namami Gange and Inter-State Water projects highlighted severe gaps in sewage treatment plant operational capacity and erratic river flow measurements.'
  },
  {
    id: 'bill_green_hydrogen_2026',
    bill_number: 'Bill No. 63 of 2026',
    title: 'Green Hydrogen and Clean Energy Transition Mandate Act, 2026',
    official_title: 'An Act to mandate phased green hydrogen consumption quotas in heavy industry, accelerate power grid decarbonization, and provide statutory incentives for domestic electrolyzer manufacturing.',
    short_name: 'Green Hydrogen Mandate Act 2026',
    session: 'Monsoon Session 2026',
    year: 2026,
    house: 'Parliament of India (Enacted)',
    status: 'Presidential Assent (Enacted)',
    ministry: 'Ministry of New and Renewable Energy',
    category: 'Energy Transition & Decarbonization',
    summary: 'Enforces mandatory Green Hydrogen Purchase Obligations (GHPO) for hard-to-abate industrial sectors (steel, oil refineries, fertilizers, heavy transport), provides ₹20,000 crore in performance-linked electrolyzer manufacturing subsidies, and creates dedicated green energy open-access corridors.',
    key_provisions: [
      'Mandates minimum 15% green hydrogen consumption by 2028 and 30% by 2032 for oil refineries, chemical fertilizer plants, and steel mills.',
      'Statutory waiver of inter-state transmission system (ISTS) wheeling charges for green hydrogen and green ammonia generation for 25 years.',
      'Performance Linked Incentive (PLI) outlays for indigenous manufacturing of advanced proton exchange membrane (PEM) and solid oxide electrolyzers.',
      'Mandatory safety, storage, and cryogenic transport standards aligned with global ISO hydrogen carrier certifications.',
      'Establishment of five coastal Green Hydrogen Export Hubs at Kandla, Paradip, Tuticorin, Visakhapatnam, and Mangalore.'
    ],
    proponents_argument: 'Dramatically decarbonizes India\'s industrial powerhouse, slashes fossil fuel import bills by over ₹1 lakh crore annually, creates green manufacturing jobs, and positions India as a global green fuel exporter.',
    opponents_argument: 'Fertilizer and steel manufacturers warn that higher initial costs of green hydrogen compared to cheap grey/fossil hydrogen could raise chemical fertilizer prices and impact domestic infrastructure costs if subsidies falter.',
    linked_morality_nodes: ['X5', 'E2', 'A5', 'D5', 'E10'],
    moral_tensions: 'Planetary Decarbonization & Clean Energy Abundance (X5, E2, A5) versus Short-Term Industrial Cost Competitiveness & Fertilizer Affordability (D1, D4, E10).',
    demographic_breakdown: [
      {
        cohort_id: 'demo_agrarian_farmers',
        cohort_name: 'Agrarian & Small Farmers',
        support_percent: 68.0,
        stance: 'Moderate Support',
        key_concern_or_benefit: 'Supports green ammonia fertilizer transition provided urea and DAP subsidies protect farmer purchase prices.'
      },
      {
        cohort_id: 'demo_urban_tech_middle_class',
        cohort_name: 'Urban Tech & Salaried Middle Class',
        support_percent: 91.0,
        stance: 'Strong Support',
        key_concern_or_benefit: 'Overwhelming support for replacing shitty fossil fuel smog with zero-emission clean hydrogen technology and green jobs.'
      },
      {
        cohort_id: 'demo_unorganized_laborers',
        cohort_name: 'Unorganized Laborers & Daily Wage Earners',
        support_percent: 64.0,
        stance: 'Moderate Support',
        key_concern_or_benefit: 'Heavy industrial workers emphasize workplace handling safety to prevent catastrophic high-pressure hydrogen leak fires.'
      },
      {
        cohort_id: 'demo_msme_small_business',
        cohort_name: 'Small Business & MSME Merchants',
        support_percent: 81.0,
        stance: 'Strong Support',
        key_concern_or_benefit: 'Opportunities in specialized valve manufacturing, cryogenic logistics, pressure vessels, and solar farm maintenance.'
      },
      {
        cohort_id: 'demo_youth_students',
        cohort_name: 'Youth & University Students',
        support_percent: 93.0,
        stance: 'Strong Support',
        key_concern_or_benefit: 'Massive excitement among engineering and science graduates for clean energy transition careers and climate tech startups.'
      },
      {
        cohort_id: 'demo_rural_women',
        cohort_name: 'Rural Women & Self-Help Groups (SHGs)',
        support_percent: 74.0,
        stance: 'Strong Support',
        key_concern_or_benefit: 'Broad support for clean energy transition that reduces respiratory diseases from air pollution.'
      },
      {
        cohort_id: 'demo_tribal_forest',
        cohort_name: 'Tribal & Forest Dwellers (Adivasi)',
        support_percent: 61.0,
        stance: 'Moderate Support',
        key_concern_or_benefit: 'Massive solar parks powering green hydrogen electrolyzers must not displace pastoralist grazing lands or commons.'
      }
    ],
    socratic_debate_prompt: 'Can a civilization successfully power heavy industry without suffocating its own atmosphere, and can it make that transition without passing the initial economic cost onto the poorest consumers?',
    cag_or_audit_note: 'Audit framework establishes monitoring protocols for Green Energy Open Access registry and National Green Hydrogen Mission disbursement verification.'
  }
];
