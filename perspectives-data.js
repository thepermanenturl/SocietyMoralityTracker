const PERSPECTIVES_DATA = {
  // LAYER 0: AXIOMS
  A1: {
    constitution: {
      article: 'Article 21',
      excerpt: 'No person shall be deprived of his life or personal liberty except according to procedure established by law.',
      promise: 'Protection from arbitrary state actions that cause suffering or deprive life.',
      enforcementInstance: 'Supreme Court ruling in Maneka Gandhi vs Union of India (1978), expanding Right to Life to include dignity and protection from arbitrary state action.',
      implementationMeter: { percentage: 70, label: '70% — Broad Legal Framework, Sporadic Ground Reach' },
      color: '#ffffff'
    },
    modernBuddha: {
      value: 'Compassion / Mitigation of Suffering',
      humanStory: 'Dedicated his life to leprosy patients at Anandwan, easing their profound physical and social suffering.',
      name: 'Baba Amte',
      year: 1949,
      wikiUrl: 'https://en.wikipedia.org/wiki/Baba_Amte',
      color: '#fbbf24'
    },
    critic: {
      failure: 'Oxygen shortages and overwhelmed hospitals causing mass suffering during COVID-19 Delta wave.',
      failureYear: 2021,
      newsPublisher: 'The Hindu',
      newsUrl: 'https://www.thehindu.com/news/national/india-coronavirus-oxygen-crisis-covid-19/article34415844.ece',
      positiveExample: 'New Zealand eliminated community transmission quickly, preventing mass suffering.',
      positiveCountry: 'New Zealand',
      mechanism: 'Strict border controls, rapid lockdowns, clear science-based communication.',
      color: '#f87171'
    },
    wangchuk: {
      value: 'Environmental Stewardship & Selfless Resistance',
      innovations: 'Invented Ice Stupa artificial glaciers to solve spring desert water scarcity and SECMOL zero-carbon solar mud architecture.',
      struggles: 'Endured 21-day climate fasts at -15°C in Leh and Delhi border detention (Oct 2024) demanding 6th Schedule ecological safeguards for Himalayan ecosystems.',
      name: 'Sonam Wangchuk',
      year: 2024,
      wikiUrl: 'https://en.wikipedia.org/wiki/Sonam_Wangchuk',
      newsUrl: 'https://www.thehindu.com/news/national/other-states/sonam-wangchuk-ends-21-day-climate-fast-in-ladakh/article67994326.ece',
      color: '#38bdf8'
    },
    dailyDilemma: {
      scenario: 'You see an injured accident victim bleeding on the road, but fear police harassment if you take them to the hospital.',
      clarity: 'By valuing the mitigation of suffering above fear of bureaucracy, you prioritize saving a life (Good Samaritan Law protects you).'
    }
  },
  A2: {
    constitution: {
      article: 'Preamble',
      excerpt: '...Fraternity assuring the dignity of the individual...',
      promise: 'Recognition of the inherent worth and dignity of every individual.',
      enforcementInstance: 'The Prohibition of Employment as Manual Scavengers and their Rehabilitation Act, 2013.',
      implementationMeter: { percentage: 40, label: '40% — Law Exists, Poor Implementation' },
      color: '#ffffff'
    },
    modernBuddha: {
      value: 'Dignity of all Sentient Life',
      humanStory: 'Fought against manual scavenging and fought for the dignity of Dalits.',
      name: 'Bezwada Wilson',
      year: 1993,
      wikiUrl: 'https://en.wikipedia.org/wiki/Bezwada_Wilson',
      color: '#fbbf24'
    },
    critic: {
      failure: 'Continued deaths in sewers due to manual scavenging despite legal bans.',
      failureYear: 2023,
      newsPublisher: 'The Wire',
      newsUrl: 'https://thewire.in/rights/manual-scavenging-deaths-india',
      positiveExample: 'Fully mechanized sewer cleaning.',
      positiveCountry: 'Singapore',
      mechanism: 'Advanced robotics, strict labor laws, and zero tolerance for human hazard in waste management.',
      color: '#f87171'
    },
    dailyDilemma: {
      scenario: 'Your workplace consistently disrespects the janitorial staff, paying them late and denying them basic amenities.',
      clarity: 'Understanding human dignity requires you to speak up for them, ensuring they receive the respect and rights they deserve, even if unpopular.'
    }
  },
  A3: {
    constitution: {
      article: 'Article 51A(e)',
      excerpt: 'To promote harmony and the spirit of common brotherhood amongst all the people of India...',
      promise: 'A duty of empathy and brotherhood transcending religious, linguistic, and regional diversities.',
      enforcementInstance: 'National Integration Council meetings to combat communalism and promote inter-faith harmony.',
      implementationMeter: { percentage: 55, label: '55% — Mixed Social Compliance' },
      color: '#ffffff'
    },
    modernBuddha: {
      value: 'Empathy and Brotherhood',
      humanStory: 'Formed Khudai Khidmatgar, preaching non-violence and inter-faith harmony.',
      name: 'Abdul Ghaffar Khan',
      year: 1929,
      wikiUrl: 'https://en.wikipedia.org/wiki/Abdul_Ghaffar_Khan',
      color: '#fbbf24'
    },
    critic: {
      failure: 'Communal riots in North East Delhi revealing deep social fractures.',
      failureYear: 2020,
      newsPublisher: 'BBC News',
      newsUrl: 'https://www.bbc.com/news/world-asia-india-51639893',
      positiveExample: 'Truth and Reconciliation Commission fostering national healing.',
      positiveCountry: 'South Africa',
      mechanism: 'Acknowledging past wrongs publicly and prioritizing restorative truth over retributive violence.',
      color: '#f87171'
    },
    dailyDilemma: {
      scenario: 'Your family WhatsApp group forwards hateful misinformation about a minority community.',
      clarity: 'The principle of empathy and brotherhood compels you to firmly correct the misinformation and refuse to participate in hate, despite family friction.'
    }
  },
  A4: {
    constitution: {
      article: 'Article 19(1)',
      excerpt: 'All citizens shall have the right to freedom of speech and expression... to move freely... to reside and settle...',
      promise: 'Guarantee of personal autonomy and basic civil liberties.',
      enforcementInstance: 'Supreme Court ruling in Shreya Singhal v. Union of India (2015), striking down Section 66A of the IT Act for violating free speech.',
      implementationMeter: { percentage: 60, label: '60% — Constitutional Guarantee, Threatened by Local Laws' },
      color: '#ffffff'
    },
    modernBuddha: {
      value: 'Autonomy and Freedom',
      humanStory: 'Launched the Narmada Bachao Andolan, fighting for the autonomy of indigenous displaced people.',
      name: 'Medha Patkar',
      year: 1985,
      wikiUrl: 'https://en.wikipedia.org/wiki/Medha_Patkar',
      color: '#fbbf24'
    },
    critic: {
      failure: 'Longest Internet shutdown in a democracy imposed in Kashmir, stripping digital autonomy.',
      failureYear: 2019,
      newsPublisher: 'Reuters',
      newsUrl: 'https://www.reuters.com/world/india/india-imposes-longest-internet-shutdown-in-kashmir-2020-01-10/',
      positiveExample: 'Declaring internet access a fundamental human right and preventing state shutdowns.',
      positiveCountry: 'Estonia',
      mechanism: 'Robust e-governance infrastructure and constitutional safeguards against internet throttling.',
      color: '#f87171'
    },
    dailyDilemma: {
      scenario: 'A company demands employees install monitoring software on their personal phones, citing "security".',
      clarity: 'Valuing autonomy means firmly refusing unwarranted surveillance on personal devices, asserting your right to digital privacy.'
    }
  },
  A5: {
    constitution: {
      article: 'Article 47',
      excerpt: 'The State shall regard the raising of the level of nutrition and the standard of living of its people... as among its primary duties.',
      promise: 'State commitment to providing basic biological needs like nutrition.',
      enforcementInstance: 'National Food Security Act (NFSA) 2013, subsidizing food grains for 75% of rural and 50% of urban populations.',
      implementationMeter: { percentage: 80, label: '80% — Broad Coverage, Leakage Issues' },
      color: '#ffffff'
    },
    modernBuddha: {
      value: 'Right to Food and Necessities',
      humanStory: 'Organized the Right to Food Campaign, leading to the National Food Security Act.',
      name: 'Jean Drèze',
      year: 2001,
      wikiUrl: 'https://en.wikipedia.org/wiki/Jean_Dr%C3%A8ze',
      color: '#fbbf24'
    },
    critic: {
      failure: 'Millions faced sudden starvation and displacement during the unannounced COVID lockdown migrant crisis.',
      failureYear: 2020,
      newsPublisher: 'Indian Express',
      newsUrl: 'https://indianexpress.com/article/india/coronavirus-lockdown-migrant-workers-crisis-india-6380000/',
      positiveExample: 'Robust social safety net ensuring housing and food security during economic crises.',
      positiveCountry: 'Denmark',
      mechanism: 'Extensive welfare state, high unionization, and state-subsidized living standards.',
      color: '#f87171'
    },
    dailyDilemma: {
      scenario: 'You notice a neighborhood child often goes hungry, but you don\'t want to "meddle" in other families\' affairs.',
      clarity: 'The core necessity of nutrition overrides social awkwardness; you intervene by offering meals or connecting them to food programs.'
    }
  },
  A6: {
    constitution: {
      article: 'Article 14',
      excerpt: 'The State shall not deny to any person equality before the law or the equal protection of the laws within the territory of India.',
      promise: 'Absolute legal equality and fairness regardless of background.',
      enforcementInstance: 'Navtej Singh Johar v. Union of India (2018), relying heavily on Article 14 to strike down Section 377.',
      implementationMeter: { percentage: 65, label: '65% — Legal Parity, Societal Hurdles' },
      color: '#ffffff'
    },
    modernBuddha: {
      value: 'Equality and Justice',
      humanStory: 'Drafted the Constitution, fiercely advocating for the annihilation of caste and systemic inequality.',
      name: 'B.R. Ambedkar',
      year: 1949,
      wikiUrl: 'https://en.wikipedia.org/wiki/B._R._Ambedkar',
      color: '#fbbf24'
    },
    critic: {
      failure: 'Delayed justice and political shielding of accused in cases of violence against marginalized communities (e.g. Hathras).',
      failureYear: 2020,
      newsPublisher: 'The Hindu',
      newsUrl: 'https://www.thehindu.com/news/national/hathras-case-a-timeline/article32740000.ece',
      positiveExample: 'Strong, independent ombudsman system for rapid redressal of minority grievances.',
      positiveCountry: 'Sweden',
      mechanism: 'The Parliamentary Ombudsman (JO) holds authorities accountable with swift, non-partisan investigations.',
      color: '#f87171'
    },
    dailyDilemma: {
      scenario: 'A landlord refuses to rent an apartment to someone based on their religion or caste.',
      clarity: 'Commitment to equality demands you report the discrimination and refuse to live there yourself, refusing to be complicit in exclusion.'
    }
  },
  
  // LAYER 1: DERIVED PRINCIPLES
  D1: {
    constitution: {
      article: 'Article 21 & 47',
      excerpt: 'Right to Life fundamentally includes the right to health and medical care (Supreme Court interpretation).',
      promise: 'Access to life-saving medical treatment.',
      enforcementInstance: 'Launch of Ayushman Bharat Pradhan Mantri Jan Arogya Yojana (PM-JAY) providing health insurance cover of Rs. 5 lakhs.',
      implementationMeter: { percentage: 50, label: '50% — High Enrollment, Poor Rural Facilities' },
      color: '#ffffff'
    },
    modernBuddha: {
      value: 'Right to Healthcare',
      humanStory: 'Built a massive network of affordable pediatric heart hospitals across India, performing thousands of free surgeries.',
      name: 'Dr. Devi Shetty',
      year: 2001,
      wikiUrl: 'https://en.wikipedia.org/wiki/Devi_Shetty',
      color: '#fbbf24'
    },
    critic: {
      failure: 'Severe underfunding of public health infrastructure, resulting in tragic deaths in Gorakhpur due to lack of oxygen cylinders.',
      failureYear: 2017,
      newsPublisher: 'The Wire',
      newsUrl: 'https://thewire.in/health/gorakhpur-hospital-tragedy-brd-medical-college',
      positiveExample: 'Universal healthcare system free at the point of delivery.',
      positiveCountry: 'United Kingdom',
      mechanism: 'National Health Service (NHS) funded by general taxation covering all residents.',
      color: '#f87171'
    },
    dailyDilemma: {
      scenario: 'Your domestic worker needs an expensive surgery they cannot afford.',
      clarity: 'Viewing healthcare as a right compels you to help them navigate public health schemes like PM-JAY and contribute to or crowdfund their care.'
    }
  },
  D2: {
    constitution: {
      article: 'Article 21',
      excerpt: 'Right to personal liberty includes the right to bodily autonomy and privacy (Puttaswamy judgment).',
      promise: 'Protection of physical body and personal decisions from state coercion.',
      enforcementInstance: 'Justice K. S. Puttaswamy (Retd.) and Anr. vs Union Of India And Ors. (2017) affirming privacy and bodily autonomy.',
      implementationMeter: { percentage: 70, label: '70% — Landmark Legal Win, Subtle Violations Persist' },
      color: '#ffffff'
    },
    modernBuddha: {
      value: 'Bodily Integrity',
      humanStory: 'Fought against forced sterilizations during the Emergency, advocating for voluntary family planning.',
      name: 'Sushila Nayyar',
      year: 1976,
      wikiUrl: 'https://en.wikipedia.org/wiki/Sushila_Nayyar',
      color: '#fbbf24'
    },
    critic: {
      failure: 'Tragic deaths of women in Bilaspur due to botched, state-driven mass sterilization camps.',
      failureYear: 2014,
      newsPublisher: 'BBC News',
      newsUrl: 'https://www.bbc.com/news/world-asia-india-30040730',
      positiveExample: 'Strict informed consent laws and abolishing coercion in reproductive health.',
      positiveCountry: 'Canada',
      mechanism: 'Robust medical ethics boards and legal frameworks prioritizing individual patient consent above all.',
      color: '#f87171'
    },
    dailyDilemma: {
      scenario: 'Your family pressures a relative into undergoing a cosmetic procedure or reproductive choice against their will.',
      clarity: 'Defending bodily integrity means you stand firmly with the relative, affirming their sole right to dictate what happens to their body.'
    }
  },
  D3: {
    constitution: {
      article: 'Article 19(1)(a)',
      excerpt: 'All citizens shall have the right to freedom of speech and expression.',
      promise: 'Free press, free speech, and right to dissent.',
      enforcementInstance: 'Repeal of Section 66A of IT Act, protecting citizens from arbitrary arrest for online posts.',
      implementationMeter: { percentage: 50, label: '50% — Constantly Tested by Sedition/UAPA Laws' },
      color: '#ffffff'
    },
    modernBuddha: {
      value: 'Freedom of Expression',
      humanStory: 'Assassinated for her fearless journalism speaking against religious extremism and state corruption.',
      name: 'Gauri Lankesh',
      year: 2017,
      wikiUrl: 'https://en.wikipedia.org/wiki/Gauri_Lankesh',
      color: '#fbbf24'
    },
    critic: {
      failure: 'Routine use of UAPA and sedition laws to jail journalists and dissenting activists without trial.',
      failureYear: 2022,
      newsPublisher: 'Reuters',
      newsUrl: 'https://www.reuters.com/world/india/india-arrests-prominent-journalist-money-laundering-case-2022-06-28/',
      positiveExample: 'Strong constitutional protections for whistleblowers and journalists.',
      positiveCountry: 'Norway',
      mechanism: 'Legal frameworks protecting journalistic sources and state-funded independent media initiatives.',
      color: '#f87171'
    },
    dailyDilemma: {
      scenario: 'You want to call out corrupt practices in your local residents\' welfare association, but fear social ostracization.',
      clarity: 'Freedom of expression is worthless if not exercised in the face of local tyranny. You speak the truth calmly and face the backlash.'
    }
  },
  D4: {
    constitution: {
      article: 'Article 15',
      excerpt: 'The State shall not discriminate against any citizen on grounds only of religion, race, caste, sex, place of birth...',
      promise: 'A society free of structural discrimination based on unchosen traits.',
      enforcementInstance: 'NALSA vs Union of India (2014) recognizing transgender persons as a third gender with fundamental rights.',
      implementationMeter: { percentage: 65, label: '65% — Legal Protections High, Deep Social Prejudices' },
      color: '#ffffff'
    },
    modernBuddha: {
      value: 'Non-Discrimination',
      humanStory: 'Pioneered transgender rights in India, resulting in the NALSA judgment recognizing the third gender.',
      name: 'Gauri Sawant',
      year: 2014,
      wikiUrl: 'https://en.wikipedia.org/wiki/Gauri_Sawant',
      color: '#fbbf24'
    },
    critic: {
      failure: 'Passage of the Citizenship Amendment Act (CAA) creating a religious test for expedited citizenship.',
      failureYear: 2019,
      newsPublisher: 'The Hindu',
      newsUrl: 'https://www.thehindu.com/news/national/citizenship-amendment-bill-passed-in-rajya-sabha/article30278000.ece',
      positiveExample: 'Secular, points-based immigration system blind to religion.',
      positiveCountry: 'Australia',
      mechanism: 'Strict objective criteria based on skills, education, and language, with zero religious profiling.',
      color: '#f87171'
    },
    dailyDilemma: {
      scenario: 'You are hiring for a role and someone suggests discarding resumes with certain surnames to "avoid trouble".',
      clarity: 'The core duty of non-discrimination mandates that you refuse this practice outright, evaluating purely on merit and character.'
    }
  },
  D5: {
    constitution: {
      article: 'Article 21A',
      excerpt: 'The State shall provide free and compulsory education to all children of the age of six to fourteen years.',
      promise: 'Universal right to foundational education and literacy.',
      enforcementInstance: 'Right of Children to Free and Compulsory Education Act (RTE) 2009.',
      implementationMeter: { percentage: 75, label: '75% — Massive Enrollment Increase, Quality Remains Low' },
      color: '#ffffff'
    },
    modernBuddha: {
      value: 'Access to Education',
      humanStory: 'Founded the Super 30 program to tutor impoverished students for IIT entrance exams free of cost.',
      name: 'Anand Kumar',
      year: 2002,
      wikiUrl: 'https://en.wikipedia.org/wiki/Anand_Kumar',
      color: '#fbbf24'
    },
    critic: {
      failure: 'Massive digital divide during COVID school closures leaving millions of rural children without education for nearly two years.',
      failureYear: 2021,
      newsPublisher: 'Indian Express',
      newsUrl: 'https://indianexpress.com/article/education/covid-19-pandemic-digital-divide-education-7450000/',
      positiveExample: 'Equitable, high-quality public education system minimizing the digital divide.',
      positiveCountry: 'Finland',
      mechanism: 'Free school meals, decentralized teacher autonomy, and state-provided devices during crises.',
      color: '#f87171'
    },
    dailyDilemma: {
      scenario: 'You find out the child of the local grocer had to drop out to help run the shop.',
      clarity: 'Education is non-negotiable for human development; you intervene by helping secure scholarships, night schools, or tutoring them yourself.'
    }
  },
  D6: {
    constitution: {
      article: 'Article 19(2)',
      excerpt: '...reasonable restrictions... in the interests of the sovereignty and integrity of India, the security of the State, public order, decency or morality...',
      promise: 'Liberty is protected unless it actively harms public safety and order.',
      enforcementInstance: 'National Green Tribunal (NGT) established in 2010 to strictly enforce environmental laws against polluting industries.',
      implementationMeter: { percentage: 60, label: '60% — Institutional Presence, Often Bypassed' },
      color: '#ffffff'
    },
    modernBuddha: {
      value: 'Harm Reduction',
      humanStory: 'Fought against the hazardous effects of the Bhopal Gas Tragedy, seeking compensation for victims of corporate negligence.',
      name: 'Satinath Sarangi',
      year: 1984,
      wikiUrl: 'https://en.wikipedia.org/wiki/Satinath_Sarangi',
      color: '#fbbf24'
    },
    critic: {
      failure: 'Dilution of environmental impact assessment (EIA) norms, allowing hazardous industries near populations.',
      failureYear: 2020,
      newsPublisher: 'The Wire',
      newsUrl: 'https://thewire.in/environment/eia-notification-2020-draft-environment-ministry',
      positiveExample: 'Strict environmental and public health regulations enforcing the Precautionary Principle.',
      positiveCountry: 'Germany',
      mechanism: 'Binding environmental courts and heavy penalties for corporate pollution under EU law.',
      color: '#f87171'
    },
    dailyDilemma: {
      scenario: 'Your employer wants to dump untreated chemical waste into the local drain to save costs.',
      clarity: 'Harm reduction dictates that you must blow the whistle or refuse to comply, as the collective harm to public health outweighs your job security.'
    }
  },
  D7: {
    constitution: {
      article: 'Article 51A(d)',
      excerpt: 'To defend the country and render national service when called upon to do so.',
      promise: 'Civic duty to assist the collective and aid others in crisis.',
      enforcementInstance: 'The mobilization of National Disaster Response Force (NDRF) across states during floods and cyclones.',
      implementationMeter: { percentage: 80, label: '80% — Effective Emergency Force, Weak Citizen Coordination' },
      color: '#ffffff'
    },
    modernBuddha: {
      value: 'Mutual Aid',
      humanStory: 'The Sikh community organization Khalsa Aid providing global disaster relief and massive oxygen langars during COVID.',
      name: 'Ravi Singh (Khalsa Aid)',
      year: 2021,
      wikiUrl: 'https://en.wikipedia.org/wiki/Khalsa_Aid',
      color: '#fbbf24'
    },
    critic: {
      failure: 'State failure to organize systematic relief during the migrant crisis, relying heavily on NGOs and citizens.',
      failureYear: 2020,
      newsPublisher: 'BBC News',
      newsUrl: 'https://www.bbc.com/news/world-asia-india-52000000',
      positiveExample: 'Highly organized state disaster response and citizen safety net.',
      positiveCountry: 'Japan',
      mechanism: 'Integration of local governments, self-defense forces, and mutual aid societies in disaster preparedness.',
      color: '#f87171'
    },
    dailyDilemma: {
      scenario: 'A massive flood hits your city; you are safe, but nearby slums are underwater.',
      clarity: 'Civic duty overrides comfort. You mobilize resources, open your doors, or physically assist in relief efforts.'
    }
  },
  D8: {
    constitution: {
      article: 'Article 326',
      excerpt: 'The elections to the House of the People and to the Legislative Assembly of every State shall be on the basis of adult suffrage.',
      promise: 'Governance is entirely derived from the democratic consent of the governed.',
      enforcementInstance: 'The Election Commission of India conducting the world\'s largest democratic elections securely with EVMs.',
      implementationMeter: { percentage: 85, label: '85% — Very High Procedural Success, Funding Lacks Transparency' },
      color: '#ffffff'
    },
    modernBuddha: {
      value: 'Democratic Consent',
      humanStory: 'Led the widespread anti-corruption movement (India Against Corruption) demanding institutional accountability.',
      name: 'Anna Hazare',
      year: 2011,
      wikiUrl: 'https://en.wikipedia.org/wiki/Anna_Hazare',
      color: '#fbbf24'
    },
    critic: {
      failure: 'Introduction of Electoral Bonds, legalizing anonymous corporate funding to political parties (struck down in 2024).',
      failureYear: 2018,
      newsPublisher: 'The Hindu',
      newsUrl: 'https://www.thehindu.com/news/national/supreme-court-strikes-down-electoral-bonds-scheme/article67840000.ece',
      positiveExample: 'Strict transparency in political funding and lobbying.',
      positiveCountry: 'New Zealand',
      mechanism: 'Public disclosure of all political donations above a low threshold and strong anti-corruption commissions.',
      color: '#f87171'
    },
    dailyDilemma: {
      scenario: 'A local politician offers cash or gifts in exchange for your family\'s votes.',
      clarity: 'Democratic consent cannot be bought. You refuse the bribe and vote strictly on policy and character, encouraging neighbors to do the same.'
    }
  },

  // LAYER 2: APPLIED ETHICS
  E1: {
    constitution: {
      article: 'Article 41',
      excerpt: 'The State shall... make effective provision for securing the right to work, to education and to public assistance in cases of unemployment, old age, sickness and disablement...',
      promise: 'A welfare state providing a social safety net for the vulnerable.',
      enforcementInstance: 'Implementation of MGNREGA ensuring 100 days of wage employment in rural areas.',
      implementationMeter: { percentage: 70, label: '70% — Massive Reach, Budget/Wage Delays' },
      color: '#ffffff'
    },
    modernBuddha: {
      value: 'Universal Safety Nets',
      humanStory: 'Designed the framework for the Mahatma Gandhi National Rural Employment Guarantee Act (MGNREGA).',
      name: 'Aruna Roy',
      year: 2005,
      wikiUrl: 'https://en.wikipedia.org/wiki/Aruna_Roy',
      color: '#fbbf24'
    },
    critic: {
      failure: 'Stagnant MNREGA wages and delayed payments causing severe distress to rural laborers.',
      failureYear: 2023,
      newsPublisher: 'The Wire',
      newsUrl: 'https://thewire.in/rights/mgnrega-wage-delay-rural-distress',
      positiveExample: 'Universal Basic Income (UBI) trials showing enhanced well-being.',
      positiveCountry: 'Finland',
      mechanism: 'State-funded unconditional monthly payments to citizens replacing complex welfare bureaucracies.',
      color: '#f87171'
    },
    dailyDilemma: {
      scenario: 'You own a small business and must decide whether to lay off staff during a slow month or take a pay cut yourself.',
      clarity: 'Safety net ethics demand you absorb the financial shock to protect the vulnerable workers who live paycheck to paycheck.'
    }
  },
  E2: {
    constitution: {
      article: 'Article 21',
      excerpt: 'Right to life and personal liberty, which implicitly protects personal choices that harm no one else.',
      promise: 'Freedom from state interference in victimless private acts.',
      enforcementInstance: 'Navtej Singh Johar v. Union of India (2018) decriminalizing homosexuality.',
      implementationMeter: { percentage: 75, label: '75% — Progress Made, Police Overreach Exists' },
      color: '#ffffff'
    },
    modernBuddha: {
      value: 'Decriminalization of Victimless Acts',
      humanStory: 'Fought a long legal battle to strike down Section 377, decriminalizing consensual same-sex relations.',
      name: 'Navtej Singh Johar',
      year: 2018,
      wikiUrl: 'https://en.wikipedia.org/wiki/Navtej_Singh_Johar',
      color: '#fbbf24'
    },
    critic: {
      failure: 'Harsh criminalization and arbitrary arrests under NDPS Act for minor substance consumption.',
      failureYear: 2021,
      newsPublisher: 'Indian Express',
      newsUrl: 'https://indianexpress.com/article/explained/ndps-act-arrests-drugs-case-explained-7500000/',
      positiveExample: 'Decriminalization of all drugs and shifting to a public health model.',
      positiveCountry: 'Portugal',
      mechanism: 'Treating addiction via Dissuasion Commissions and therapy instead of police arrests and prison.',
      color: '#f87171'
    },
    dailyDilemma: {
      scenario: 'You find out a friend is using recreational substances; they aren\'t hurting anyone, but a neighbor wants to call the police.',
      clarity: 'You advocate for them, preventing police involvement for a victimless act, and instead offer a supportive, health-based conversation.'
    }
  },
  E3: {
    constitution: {
      article: 'Article 39(c)',
      excerpt: 'The State shall... direct its policy towards securing that the operation of the economic system does not result in the concentration of wealth and means of production to the common detriment.',
      promise: 'Preventing excessive wealth inequality through economic policy.',
      enforcementInstance: 'Abolition of Privy Purses (1971) and past Estate Duties to redistribute concentrated wealth.',
      implementationMeter: { percentage: 30, label: '30% — Largely Abandoned in Modern Policy' },
      color: '#ffffff'
    },
    modernBuddha: {
      value: 'Progressive Taxation',
      humanStory: 'Economist advocating for wealth taxes and minimum basic income to curb inequality in India.',
      name: 'Abhijit Banerjee',
      year: 2019,
      wikiUrl: 'https://en.wikipedia.org/wiki/Abhijit_Banerjee',
      color: '#fbbf24'
    },
    critic: {
      failure: 'Slashing corporate tax rates while relying heavily on regressive indirect taxes (GST) affecting the poor.',
      failureYear: 2019,
      newsPublisher: 'Reuters',
      newsUrl: 'https://www.reuters.com/article/us-india-economy-tax-idUSKBN1W50DA',
      positiveExample: 'High progressive taxation funding comprehensive social infrastructure.',
      positiveCountry: 'Norway',
      mechanism: 'Steep marginal tax rates on high incomes, wealth taxes, and state sovereign wealth fund dividends.',
      color: '#f87171'
    },
    dailyDilemma: {
      scenario: 'You discover a legal loophole to hide your income and avoid paying your full taxes.',
      clarity: 'Commitment to anti-concentration of wealth means you voluntarily pay your full share, knowing taxes fund the schools and roads others rely on.'
    }
  },
  E4: {
    constitution: {
      article: 'Article 21',
      excerpt: 'Women’s right to make reproductive choices is a dimension of personal liberty (Supreme Court).',
      promise: 'Bodily autonomy in matters of pregnancy and reproduction.',
      enforcementInstance: 'Medical Termination of Pregnancy (Amendment) Act 2021, expanding access to safe abortion up to 24 weeks.',
      implementationMeter: { percentage: 80, label: '80% — Strong Legal Framework, Stigma Persists' },
      color: '#ffffff'
    },
    modernBuddha: {
      value: 'Reproductive Rights',
      humanStory: 'Fought for comprehensive reproductive healthcare and abortion access for marginalized women.',
      name: 'Dr. Rani Bang',
      year: 1986,
      wikiUrl: 'https://en.wikipedia.org/wiki/Rani_Bang',
      color: '#fbbf24'
    },
    critic: {
      failure: 'Poor public health infrastructure forcing women into unsafe abortions despite legal MTP acts.',
      failureYear: 2022,
      newsPublisher: 'The Wire',
      newsUrl: 'https://thewire.in/health/unsafe-abortions-india-maternal-mortality',
      positiveExample: 'Fully legalized, free, and accessible abortion services as standard healthcare.',
      positiveCountry: 'France',
      mechanism: 'Enshrining the right to abortion in the Constitution and funding it through national health insurance.',
      color: '#f87171'
    },
    dailyDilemma: {
      scenario: 'An unmarried colleague is seeking an abortion but is terrified of judgment at the clinic.',
      clarity: 'You offer to accompany them, shielding them from stigma and ensuring they safely exercise their bodily autonomy without shame.'
    }
  },
  E5: {
    constitution: {
      article: 'Article 14 & 21',
      excerpt: 'Right to equality and life... but the State has yet to explicitly recognize same-sex marriage under constitutional law.',
      promise: 'Equality before the law, though legally contested regarding marriage.',
      enforcementInstance: 'Ongoing Supreme Court debates; marriage equality not yet recognized.',
      implementationMeter: { percentage: 20, label: '20% — Decriminalized, but No Marriage Equality' },
      color: '#ffffff'
    },
    modernBuddha: {
      value: 'Marriage & Relationship Equality',
      humanStory: 'Petitioners in the Supreme Court fighting for marriage equality under the Special Marriage Act.',
      name: 'Supriyo Chakraborty & Abhay Dang',
      year: 2023,
      wikiUrl: 'https://en.wikipedia.org/wiki/Supriyo_v._Union_of_India',
      color: '#fbbf24'
    },
    critic: {
      failure: 'Supreme Court declined to legalize same-sex marriage, leaving it to the Parliament which opposed it.',
      failureYear: 2023,
      newsPublisher: 'The Hindu',
      newsUrl: 'https://www.thehindu.com/news/national/supreme-court-verdict-on-same-sex-marriage/article67420000.ece',
      positiveExample: 'Legalizing same-sex marriage through a national referendum.',
      positiveCountry: 'Ireland',
      mechanism: 'Amending the constitution via popular vote to grant marriage equality universally.',
      color: '#f87171'
    },
    dailyDilemma: {
      scenario: 'Your family refuses to attend the wedding/commitment ceremony of a queer relative.',
      clarity: 'You attend enthusiastically and challenge the family boycott, normalizing their love as absolutely equal to any other relationship.'
    }
  },
  E6: {
    constitution: {
      article: 'Article 21',
      excerpt: 'Right to life... capital punishment is permitted only in the "rarest of rare" cases.',
      promise: 'Strict limitation on the state\'s power to execute citizens.',
      enforcementInstance: 'Bachan Singh v. State of Punjab (1980) establishing the "rarest of rare" doctrine for death penalty.',
      implementationMeter: { percentage: 40, label: '40% — Reduced Use, but Poor Overrepresented on Death Row' },
      color: '#ffffff'
    },
    modernBuddha: {
      value: 'Abolition of Capital Punishment',
      humanStory: 'Legal researcher and activist running Project 39A to provide legal defense for death row inmates.',
      name: 'Anup Surendranath',
      year: 2014,
      wikiUrl: 'https://en.wikipedia.org/wiki/Project_39A',
      color: '#fbbf24'
    },
    critic: {
      failure: 'Continuing to sentence individuals from highly marginalized, poor backgrounds to death without adequate legal representation.',
      failureYear: 2024,
      newsPublisher: 'Scroll.in',
      newsUrl: 'https://scroll.in/article/death-penalty-india-project-39a-report',
      positiveExample: 'Total abolition of the death penalty for all crimes.',
      positiveCountry: 'United Kingdom',
      mechanism: 'Human Rights Act 1998 formally incorporating the European Convention on Human Rights protocols banning executions.',
      color: '#f87171'
    },
    dailyDilemma: {
      scenario: 'A horrific crime occurs locally, and the community demands the immediate lynching or hanging of the suspect.',
      clarity: 'You oppose mob justice and state executions, advocating for a fair trial and life imprisonment instead of bloodlust.'
    }
  },
  E7: {
    constitution: {
      article: 'Article 21',
      excerpt: 'Right to life with dignity... Supreme Court recognized passive euthanasia and living wills (Common Cause judgment).',
      promise: 'Right to die with dignity in cases of terminal, irreversible coma.',
      enforcementInstance: 'Common Cause (A Regd. Society) v. Union of India (2018) legalizing passive euthanasia.',
      implementationMeter: { percentage: 50, label: '50% — Legal but Highly Bureaucratic' },
      color: '#ffffff'
    },
    modernBuddha: {
      value: 'Medical Assistance in Dying',
      humanStory: 'NGO Common Cause fought a historic PIL resulting in the legal recognition of passive euthanasia.',
      name: 'Prashant Bhushan (for Common Cause)',
      year: 2018,
      wikiUrl: 'https://en.wikipedia.org/wiki/Common_Cause_(India)',
      color: '#fbbf24'
    },
    critic: {
      failure: 'The process for executing a Living Will remains intensely bureaucratic, making passive euthanasia practically inaccessible.',
      failureYear: 2023,
      newsPublisher: 'The Hindu',
      newsUrl: 'https://www.thehindu.com/news/national/supreme-court-eases-process-for-living-will-passive-euthanasia/article66400000.ece',
      positiveExample: 'Legalized active medical assistance in dying with strict safeguards.',
      positiveCountry: 'Canada',
      mechanism: 'MAID legislation allowing competent adults with grievous and irremediable medical conditions to choose a peaceful death.',
      color: '#f87171'
    },
    dailyDilemma: {
      scenario: 'An elderly relative in immense terminal agony begs for medical support to be withdrawn, but other family members insist on keeping them on a ventilator.',
      clarity: 'You champion the patient\'s autonomy and right to a dignified death, helping the family draft a living will and confronting the emotional guilt.'
    }
  },
  E8: {
    constitution: {
      article: 'Article 51A(g)',
      excerpt: 'To have compassion for living creatures.',
      promise: 'Fundamental duty to treat animals humanely.',
      enforcementInstance: 'Prevention of Cruelty to Animals Act, 1960 and the ban on Jallikattu (initially passed, heavily contested).',
      implementationMeter: { percentage: 35, label: '35% — Weak Laws, Rampant Factory Farming' },
      color: '#ffffff'
    },
    modernBuddha: {
      value: 'Animal Welfare',
      humanStory: 'Fought against animal cruelty and pioneered the establishment of People for Animals (PFA).',
      name: 'Maneka Gandhi',
      year: 1992,
      wikiUrl: 'https://en.wikipedia.org/wiki/Maneka_Gandhi',
      color: '#fbbf24'
    },
    critic: {
      failure: 'Rampant rise of unregulated factory farming, battery cages, and weak enforcement of the Prevention of Cruelty to Animals Act.',
      failureYear: 2022,
      newsPublisher: 'The Wire',
      newsUrl: 'https://thewire.in/environment/india-animal-cruelty-act-failing',
      positiveExample: 'Banning battery cages and enforcing strict animal welfare standards in farming.',
      positiveCountry: 'Switzerland',
      mechanism: 'Constitutional recognition of the dignity of animals and stringent agricultural welfare laws.',
      color: '#f87171'
    },
    dailyDilemma: {
      scenario: 'You witness local boys throwing stones at stray dogs for fun.',
      clarity: 'Compassion requires intervention; you step in, stop the abuse, educate the kids, and if necessary, contact animal welfare authorities.'
    }
  },
  E9: {
    constitution: {
      article: 'Article 21',
      excerpt: 'Right to life applies to all persons (citizens and non-citizens alike) within Indian territory.',
      promise: 'Basic protection of life for refugees and migrants.',
      enforcementInstance: 'Chakma refugee rulings protecting stateless persons from arbitrary eviction.',
      implementationMeter: { percentage: 40, label: '40% — Ad-hoc Policies, No National Refugee Law' },
      color: '#ffffff'
    },
    modernBuddha: {
      value: 'Humanitarian Migration Rights',
      humanStory: 'Defended the rights of Rohingya refugees against arbitrary deportation to a genocidal regime.',
      name: 'Colin Gonsalves',
      year: 2017,
      wikiUrl: 'https://en.wikipedia.org/wiki/Colin_Gonsalves',
      color: '#fbbf24'
    },
    critic: {
      failure: 'Deportation of Rohingya refugees to Myanmar in violation of the principle of non-refoulement.',
      failureYear: 2018,
      newsPublisher: 'Reuters',
      newsUrl: 'https://www.reuters.com/article/us-india-rohingya-deportation-idUSKCN1MC0C4',
      positiveExample: 'Integrating massive numbers of war refugees with full work and residency rights.',
      positiveCountry: 'Germany',
      mechanism: 'Comprehensive integration programs and suspension of Dublin protocols during the Syrian refugee crisis.',
      color: '#f87171'
    },
    dailyDilemma: {
      scenario: 'Your housing society wants to fire all migrant security guards due to generalized xenophobia after a local theft.',
      clarity: 'You categorically oppose this collective punishment and ensure that the workers are protected from arbitrary, prejudiced termination.'
    }
  },
  E10: {
    constitution: {
      article: 'Article 21',
      excerpt: 'Right to Privacy is a fundamental right intrinsic to life and liberty (Puttaswamy Judgment).',
      promise: 'Protection of informational autonomy and personal data.',
      enforcementInstance: 'Justice K. S. Puttaswamy (Retd.) vs Union of India (2017) formally establishing privacy as a fundamental right.',
      implementationMeter: { percentage: 55, label: '55% — Court Victory, New Data Law Lacks State Accountability' },
      color: '#ffffff'
    },
    modernBuddha: {
      value: 'Data Privacy',
      humanStory: 'Lead petitioner in the historic Supreme Court case that recognized privacy as a fundamental right.',
      name: 'Justice K.S. Puttaswamy',
      year: 2017,
      wikiUrl: 'https://en.wikipedia.org/wiki/K._S._Puttaswamy',
      color: '#fbbf24'
    },
    critic: {
      failure: 'Passage of the DPDP Act 2023 giving sweeping exemptions to the government regarding state surveillance and data processing.',
      failureYear: 2023,
      newsPublisher: 'Indian Express',
      newsUrl: 'https://indianexpress.com/article/explained/dpdp-bill-digital-personal-data-protection-bill-provisions-exemptions-8870000/',
      positiveExample: 'Stringent data protection laws severely penalizing corporate and state misuse.',
      positiveCountry: 'European Union',
      mechanism: 'General Data Protection Regulation (GDPR) enforcing user consent and the right to be forgotten.',
      color: '#f87171'
    },
    dailyDilemma: {
      scenario: 'A free app you need for work asks for access to your contacts, microphone, and location, which it doesn\'t need.',
      clarity: 'You refuse the permissions, find an alternative tool, and refuse to sacrifice your personal and professional privacy for mere convenience.'
    }
  },
  E11: {
    constitution: {
      article: 'Article 20',
      excerpt: 'Protection in respect of conviction for offences (protection against double jeopardy, self-incrimination).',
      promise: 'A restrained justice system focused on fairness, not mere vengeance.',
      enforcementInstance: 'D.K. Basu v. State of West Bengal (1997) laying down mandatory guidelines to prevent custodial torture.',
      implementationMeter: { percentage: 40, label: '40% — Guidelines Exist, Custodial Violence Rampant' },
      color: '#ffffff'
    },
    modernBuddha: {
      value: 'Restorative Justice',
      humanStory: 'Reformed Tihar Jail, introducing meditation (Vipassana) and education, treating inmates with dignity.',
      name: 'Kiran Bedi',
      year: 1993,
      wikiUrl: 'https://en.wikipedia.org/wiki/Kiran_Bedi',
      color: '#fbbf24'
    },
    critic: {
      failure: 'Extreme prison overcrowding with 77% of inmates being undertrials languishing without conviction.',
      failureYear: 2022,
      newsPublisher: 'The Hindu',
      newsUrl: 'https://www.thehindu.com/news/national/77-of-prison-inmates-in-2021-were-undertrials-ncrb-report/article65830000.ece',
      positiveExample: 'Prisons operating as rehabilitation centers with open facilities and highly humane conditions.',
      positiveCountry: 'Norway',
      mechanism: 'Bastøy Prison model focusing strictly on reintegration, achieving world-lowest recidivism rates.',
      color: '#f87171'
    },
    dailyDilemma: {
      scenario: 'A neighborhood teenager is caught stealing a minor item; the crowd wants to beat him up and hand him to the police.',
      clarity: 'You shield the teen from mob violence and pursue restorative justice—speaking to their parents, finding out why they stole, and demanding community service instead of prison.'
    }
  },
  E12: {
    constitution: {
      article: 'Article 21 & 47',
      excerpt: 'The State shall regard the raising of the level of nutrition and the standard of living of its people and the improvement of public health as among its primary duties.',
      promise: 'State mandate to manage public health crises to protect life.',
      enforcementInstance: 'National rollout of the Universal Immunization Programme (UIP) combating polio and other diseases.',
      implementationMeter: { percentage: 80, label: '80% — Excellent Vaccination Networks, Weak Hospital Infrastructure' },
      color: '#ffffff'
    },
    modernBuddha: {
      value: 'Contextual Public Health Mandates',
      humanStory: 'Instrumental in India\'s successful polio eradication campaign through massive targeted vaccination drives.',
      name: 'Dr. T. Jacob John',
      year: 2014,
      wikiUrl: 'https://en.wikipedia.org/wiki/T._Jacob_John',
      color: '#fbbf24'
    },
    critic: {
      failure: 'Allowing massive political rallies and religious gatherings (Kumbh Mela) during a lethal pandemic wave.',
      failureYear: 2021,
      newsPublisher: 'BBC News',
      newsUrl: 'https://www.bbc.com/news/world-asia-india-56770400',
      positiveExample: 'Strict, localized, and highly effective short-term pandemic containment.',
      positiveCountry: 'South Korea',
      mechanism: 'Rapid mass testing, digital contact tracing, and immediate localized quarantines avoiding national shutdowns.',
      color: '#f87171'
    },
    dailyDilemma: {
      scenario: 'You are mildly sick but expected to attend an important indoor family wedding.',
      clarity: 'Public health mandates override social obligations. You completely isolate yourself, refusing to risk infecting elderly or vulnerable attendees.'
    }
  },

  // LAYER 3: COMPLEX DILEMMAS
  X1: {
    constitution: {
      article: 'Article 21',
      excerpt: 'Right to Life imposes a duty on the State to provide adequate medical facilities.',
      promise: 'No citizen should die purely due to lack of hospital resources.',
      enforcementInstance: 'Supreme Court intervention in 2021 to ensure oxygen supply to states during COVID-19 second wave.',
      implementationMeter: { percentage: 40, label: '40% — Reactive Interventions, No Proactive Resilience' },
      color: '#ffffff'
    },
    modernBuddha: {
      value: 'Triage & Emergency Allocation',
      humanStory: 'Young doctors during the COVID crisis making excruciating triage decisions on oxygen allocation while working 48-hour shifts.',
      name: 'Frontline Medical Residents',
      year: 2021,
      wikiUrl: 'https://en.wikipedia.org/wiki/COVID-19_pandemic_in_India',
      color: '#fbbf24'
    },
    critic: {
      failure: 'Complete collapse of the healthcare supply chain, leaving patients to die in parking lots.',
      failureYear: 2021,
      newsPublisher: 'The Wire',
      newsUrl: 'https://thewire.in/health/india-covid-19-oxygen-crisis-deaths',
      positiveExample: 'Centralized, transparent ICU triage protocols balancing fairness and utilitarian outcomes.',
      positiveCountry: 'Italy',
      mechanism: 'SIAARTI guidelines providing clear ethical algorithms for doctors during peak capacity crises.',
      color: '#f87171'
    },
    dailyDilemma: {
      scenario: 'You have only one oxygen cylinder, and two neighbors are equally critical—one an elderly man, one a young mother.',
      clarity: 'Ethical triage requires choosing the patient with the highest clinical chance of survival, setting aside emotional ties or social status.'
    }
  },
  X2: {
    constitution: {
      article: 'Article 19(2)',
      excerpt: 'Reasonable restrictions on freedom of speech in the interests of public order and preventing incitement to an offence.',
      promise: 'Balancing free expression with the prevention of violence.',
      enforcementInstance: 'Amish Devgan v. Union of India (2020) where Supreme Court distinguished between free speech and hate speech.',
      implementationMeter: { percentage: 30, label: '30% — Selective Enforcement Based on Politics' },
      color: '#ffffff'
    },
    modernBuddha: {
      value: 'Free Speech vs. Hate Speech',
      humanStory: 'Fought against hate speech and communal polarization, co-founding Alt News to debunk dangerous misinformation.',
      name: 'Mohammed Zubair',
      year: 2017,
      wikiUrl: 'https://en.wikipedia.org/wiki/Mohammed_Zubair',
      color: '#fbbf24'
    },
    critic: {
      failure: 'State failure to prosecute leaders giving open calls for genocide at the Haridwar Dharam Sansad.',
      failureYear: 2021,
      newsPublisher: 'Al Jazeera',
      newsUrl: 'https://www.aljazeera.com/news/2021/12/24/india-hindu-event-hate-speech-genocide-muslims',
      positiveExample: 'Strict laws targeting online hate speech and holding social media companies accountable.',
      positiveCountry: 'Germany',
      mechanism: 'NetzDG law enforcing swift removal of illegal hate speech and incitement on platforms.',
      color: '#f87171'
    },
    dailyDilemma: {
      scenario: 'Your popular local leader makes a speech filled with dog-whistles against minorities to rally the neighborhood.',
      clarity: 'You refuse to attend their rallies and openly call out their dog-whistles, because unchecked hate speech precedes physical violence.'
    }
  },
  X3: {
    constitution: {
      article: 'Article 48A',
      excerpt: 'The State shall endeavour to protect and improve the environment and to safeguard the forests and wild life of the country.',
      promise: 'Environmental protection as a directive principle of state policy.',
      enforcementInstance: 'T.N. Godavarman Thirumulpad v. Union of India (1995) resulting in the Supreme Court taking over forest protection.',
      implementationMeter: { percentage: 50, label: '50% — Strong Courts, Weak Executive Will' },
      color: '#ffffff'
    },
    modernBuddha: {
      value: 'Climate Action vs. Poverty',
      humanStory: 'Pioneered barefoot solar engineering, training rural grandmothers to electrify their own off-grid villages sustainably.',
      name: 'Bunker Roy (Barefoot College)',
      year: 1989,
      wikiUrl: 'https://en.wikipedia.org/wiki/Bunker_Roy',
      color: '#fbbf24'
    },
    critic: {
      failure: 'Diluting coal mining regulations and auctioning prime forest land for fossil fuel extraction.',
      failureYear: 2020,
      newsPublisher: 'Scroll.in',
      newsUrl: 'https://scroll.in/article/965000/india-coal-auctions-environment-impact',
      positiveExample: 'Aggressive transition to renewable energy while supporting displaced workers.',
      positiveCountry: 'Costa Rica',
      mechanism: 'Running the grid on 98% renewable energy and paying landowners to protect forests (PES program).',
      color: '#f87171'
    },
    dailyDilemma: {
      scenario: 'You can buy a very cheap plot of land to build a house, but it involves clearing a patch of ancient trees.',
      clarity: 'Environmental ethics demand you walk away from the deal and purchase sustainable, already-cleared land, despite the higher financial cost.'
    }
  },
  X4: {
    constitution: {
      article: 'Disaster Management Act, 2005 / Article 21',
      excerpt: 'State powers to issue binding orders for disaster management, restricting movement to protect public health.',
      promise: 'State intervention to manage mass disasters.',
      enforcementInstance: 'Nationwide lockdown implemented under the NDMA in March 2020.',
      implementationMeter: { percentage: 60, label: '60% — Strong Compliance, Poor Humanitarian Cushion' },
      color: '#ffffff'
    },
    modernBuddha: {
      value: 'Mandatory Lockdowns vs. Livelihoods',
      humanStory: 'Provided extensive relief, transportation, and food to stranded migrant laborers when the sudden lockdown trapped them.',
      name: 'Sonu Sood',
      year: 2020,
      wikiUrl: 'https://en.wikipedia.org/wiki/Sonu_Sood',
      color: '#fbbf24'
    },
    critic: {
      failure: 'Imposing a draconian nationwide lockdown with only 4 hours notice, causing a catastrophic migrant exodus.',
      failureYear: 2020,
      newsPublisher: 'The Hindu',
      newsUrl: 'https://www.thehindu.com/news/national/migrant-workers-crisis-india-lockdown/article31000000.ece',
      positiveExample: 'Managing the pandemic without severe mandatory lockdowns through high social trust.',
      positiveCountry: 'Sweden',
      mechanism: 'Relying on voluntary social distancing, transparent agency advice, and robust social safety nets.',
      color: '#f87171'
    },
    dailyDilemma: {
      scenario: 'You run a small shop and lockdown rules force you to close, but you have debts to pay and can easily sneak customers in the back.',
      clarity: 'You endure the financial hardship and stay closed to stop the viral spread, demanding state support rather than risking community health.'
    }
  },
  X5: {
    constitution: {
      article: 'Article 21 (Extrapolated)',
      excerpt: 'Currently applies only to biological "persons," but philosophical jurisprudence debates future expansions of personhood.',
      promise: 'Legal rights currently restricted to humans, but theoretically expandable to new sentient categories.',
      enforcementInstance: 'High Court of Uttarakhand declaring rivers Ganga and Yamuna as legal persons (2017), showing expanding legal personhood.',
      implementationMeter: { percentage: 10, label: '10% — Non-Existent for AI, Conceptual in Ecology' },
      color: '#ffffff'
    },
    modernBuddha: {
      value: 'AI Moral Status',
      humanStory: 'Philosopher and AI ethics researcher warning about the alignment problem and the need for sentient AI rights in the future.',
      name: 'Nick Bostrom',
      year: 2014,
      wikiUrl: 'https://en.wikipedia.org/wiki/Nick_Bostrom',
      color: '#fbbf24'
    },
    critic: {
      failure: 'Lack of legislative framework regarding AI deployment, leading to unregulated deepfakes and algorithmic bias in India.',
      failureYear: 2023,
      newsPublisher: 'Indian Express',
      newsUrl: 'https://indianexpress.com/article/technology/tech-news-technology/india-ai-regulation-deepfakes-8900000/',
      positiveExample: 'First comprehensive legal framework governing Artificial Intelligence.',
      positiveCountry: 'European Union',
      mechanism: 'EU AI Act categorizing AI systems by risk and enforcing strict transparency and human-rights compliance.',
      color: '#f87171'
    },
    dailyDilemma: {
      scenario: 'Your company uses an AI hiring tool that you discover quietly discriminates against women.',
      clarity: 'You immediately disable the tool, report the bias, and rebuild the hiring pipeline manually, refusing to hide behind "the algorithm did it."'
    }
  },
  X6: {
    constitution: {
      article: 'Article 13 & 44',
      excerpt: 'All laws (including customary laws) inconsistent with fundamental rights are void. State shall endeavor to secure a Uniform Civil Code.',
      promise: 'Constitutional supremacy over oppressive cultural or religious practices.',
      enforcementInstance: 'Shayara Bano v. Union of India (2017) striking down the practice of instant Triple Talaq.',
      implementationMeter: { percentage: 40, label: '40% — Piecemeal Court Reforms, Highly Politicized' },
      color: '#ffffff'
    },
    modernBuddha: {
      value: 'Universal Rights vs. Relativism',
      humanStory: 'Fought against triple talaq and polygamy, securing the historic Supreme Court ban on instant triple talaq.',
      name: 'Shayara Bano',
      year: 2017,
      wikiUrl: 'https://en.wikipedia.org/wiki/Shayara_Bano_v._Union_of_India',
      color: '#fbbf24'
    },
    critic: {
      failure: 'Political appeasement preventing the implementation of a Uniform Civil Code, allowing discriminatory personal laws to persist.',
      failureYear: 2024,
      newsPublisher: 'The Wire',
      newsUrl: 'https://thewire.in/law/uniform-civil-code-india-politics-women-rights',
      positiveExample: 'Secularism and universal civil codes overriding religious personal laws.',
      positiveCountry: 'France',
      mechanism: 'Laïcité (secularism) ensures the state treats all citizens under one universal civil code regardless of religion.',
      color: '#f87171'
    },
    dailyDilemma: {
      scenario: 'Your community wants to host an event strictly barring women from participating due to "tradition".',
      clarity: 'You publicly protest the event and refuse to participate, prioritizing universal human rights and equality over cultural relativism.'
    }
  },
  X7: {
    constitution: {
      article: 'Article 31C',
      excerpt: 'Saving of laws giving effect to certain directive principles (distribution of material resources to subserve the common good).',
      promise: 'State power to redistribute wealth to prevent economic monopolies.',
      enforcementInstance: 'Bank Nationalization (1969) to expand credit to rural and agricultural sectors.',
      implementationMeter: { percentage: 20, label: '20% — Replaced by Privatization and Monopoly' },
      color: '#ffffff'
    },
    modernBuddha: {
      value: 'Wealth Redistribution',
      humanStory: 'Led the Bhoodan (Land Gift) Movement, persuading wealthy landowners to voluntarily give land to the landless.',
      name: 'Vinoba Bhave',
      year: 1951,
      wikiUrl: 'https://en.wikipedia.org/wiki/Vinoba_Bhave',
      color: '#fbbf24'
    },
    critic: {
      failure: 'Massive privatization of public assets and rising crony capitalism, leading to extreme billionaire wealth surges while poverty rose.',
      failureYear: 2021,
      newsPublisher: 'Reuters',
      newsUrl: 'https://www.reuters.com/article/india-wealth-inequality-idUSKBN29T000',
      positiveExample: 'Strong wealth taxes and robust public sovereign wealth funds.',
      positiveCountry: 'Norway',
      mechanism: 'State ownership of critical resources (oil) managed for the public good via the Government Pension Fund Global.',
      color: '#f87171'
    },
    dailyDilemma: {
      scenario: 'You inherit a large property you don\'t need, while local charities struggle for a space to operate.',
      clarity: 'You voluntarily lease the space to the charity at zero cost, actively redistributing your surplus wealth to the community.'
    }
  },
  X8: {
    constitution: {
      article: 'Article 21 (Bioethics Context)',
      excerpt: 'Right to life includes the right to health and dignity, raising questions about bio-engineered inequality.',
      promise: 'Protection of human dignity against unregulated genetic exploitation.',
      enforcementInstance: 'Surrogacy (Regulation) Act, 2021 prohibiting commercial surrogacy to prevent exploitation of women\'s bodies.',
      implementationMeter: { percentage: 30, label: '30% — Laws Slowly Catching Up to Tech' },
      color: '#ffffff'
    },
    modernBuddha: {
      value: 'Genetic Enhancement Fairness',
      humanStory: 'Advocates globally against the commercialization of CRISPR for human embryo editing to prevent genetic castes.',
      name: 'Dr. Françoise Baylis',
      year: 2019,
      wikiUrl: 'https://en.wikipedia.org/wiki/Fran%C3%A7oise_Baylis',
      color: '#fbbf24'
    },
    critic: {
      failure: 'Weak regulatory frameworks around private stem cell clinics and assisted reproductive technologies (ART) commercialization.',
      failureYear: 2022,
      newsPublisher: 'The Hindu',
      newsUrl: 'https://www.thehindu.com/sci-tech/health/india-stem-cell-therapy-regulation/article65000000.ece',
      positiveExample: 'Strict bioethical regulation of human germline editing.',
      positiveCountry: 'United Kingdom',
      mechanism: 'Human Fertilisation and Embryology Authority (HFEA) tightly regulating all genetic research and prohibiting designer embryos.',
      color: '#f87171'
    },
    dailyDilemma: {
      scenario: 'A wealthy friend is traveling abroad to genetically select specific intelligence/athletic traits for their unborn child.',
      clarity: 'You confront the ethics of their choice, warning them that buying genetic advantages creates a permanent, biological caste system.'
    }
  }
};

if (typeof module !== "undefined") {
  module.exports = PERSPECTIVES_DATA;
} else if (typeof window !== "undefined") {
  window.PERSPECTIVES_DATA = PERSPECTIVES_DATA;
}
