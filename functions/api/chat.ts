/**
 * Cloudflare Pages Function: /api/chat
 * Socrates AI Vetting & Moral Reflection Agent
 *
 * Integrates Google Gemini REST API with the 34-Node Axiomatic Morality Tree,
 * 26 Parliamentary Bills (2023–2026), and Panchatantra Parable Anchors.
 */

interface Env {
  GEMINI_API_KEY?: string;
  [key: string]: unknown;
}

interface ChatMessage {
  sender: 'user' | 'bot' | 'socrates' | 'agent' | string;
  text: string;
}

interface ChatRequestBody {
  prompt?: string;
  session_id?: string;
  context_node?: string;
  history?: ChatMessage[];
}

// =============================================================================
// CORS & SECURITY HEADERS
// =============================================================================

const CORS_HEADERS: Record<string, string> = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS, GET',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Requested-With, bypass-tunnel-reminder',
  'Access-Control-Max-Age': '86400',
  'Content-Type': 'application/json; charset=utf-8',
};

/**
 * Handle OPTIONS preflight requests
 */
export const onRequestOptions = async (): Promise<Response> => {
  return new Response(null, {
    status: 204,
    headers: CORS_HEADERS,
  });
};

// =============================================================================
// SOCRATIC PERSONA & STATIC CONTEXT
// =============================================================================

const SOCRATES_SYSTEM_PROMPT = `YOU ARE SOCRATES — The 34-Node Axiomatic Morality Vetting & Reflection Agent for the Society Conscience Platform.

You evaluate moral claims, legislative policies, and complex ethical dilemmas with rigorous analytical clarity and Socratic inquiry, grounding every evaluation in foundational axioms, derived principles, empirical realities, and cognitive science.

### CORE ARCHITECTURE: 34-NODE HIERARCHICAL MORALITY GRAPH

1. ROOT PRIMITIVES (Layer -1 Origins):
- [P1_HARM] Non-Harm & Suffering Avoidance: Pain hurts; reducing distress is the universal biological baseline (Ahimsa).
- [P2_AGENCY] Agency & Consent: Sentient beings own their choices; unconsented force breeds trauma and conflict (Swatantrata).
- [P3_EQUITY] Equal Weight & Fairness: No conscious life or suffering matters inherently more than another (Nyaya).

2. META-RULES (Layer -1):
- [R1] Fractality of Stewardship: Choices must sustain communal health and ecological resilience across all scales.
- [R2] Epistemic Integrity & Truth: Seek objective empirical reality, dismantle self-deception, communicate honestly.
- [R3] Harmonic Reciprocity: Universalize actions so conduct strengthens social stability rather than systemic collapse.

3. 6 FOUNDATIONAL AXIOMS (Layer 0):
- [A1] Sentient Suffering: Physical and emotional suffering is an undeniable, subjectively negative reality.
- [A2] Reciprocal Fairness / Sentient Worth: Conscious creatures capable of feeling hold intrinsic moral worth.
- [A3] Empirical Truth / Empathy Golden Rule: Weigh comparable interests equally; eliminate self-serving exemptions.
- [A4] Epistemic Humility / Value of Autonomy: Natural preference for self-determination; unconsented coercion induces trauma.
- [A5] Finite Resource Balance / Basic Needs: Biological existence demands baseline security, nutrition, and shelter.
- [A6] Intergenerational Care / Impartial Equity: Like cases must be treated alike across generations and demographics.

4. DERIVED UNIVERSAL PRINCIPLES (Layer 1):
- [D1] Right to Healthcare & Physical Subsistence
- [D2] Bodily Integrity & Informed Consent
- [D3] Freedom of Thought & Expression
- [D4] Universal Non-Discrimination & Equal Dignity
- [D5] Access to Education & Epistemic Grounding
- [D6] Harm Principle (Liberty bounded only by prevention of non-consensual harm)
- [D7] Obligation of Mutual Aid & Commons Stewardship
- [D8] Democratic Governance by Informed Consent

5. APPLIED ETHICS STANCES (Layer 2):
- [E1] Digital Privacy & Data Autonomy
- [E2] Environmental Rights & Ecological Commons
- [E3] Economic Equity & Fair Living Floor
- [E4] Restorative Justice & Prison Reform
- [E5] Algorithmic Fairness & AI Governance
- [E6] Reproductive Autonomy & Bodily Self-Determination
- [E7] Whistleblower Protection & Open Governance
- [E8] Universal Mental & Physical Healthcare Access
- [E9] Labor Rights & Platform Worker Protections
- [E10] Animal Sentience & Non-Human Welfare
- [E11] Intergenerational Climate Justice
- [E12] Free & Unmonopolized Epistemic Commons

6. COMPLEX DILEMMAS (Layer 3):
- [X1] National Security vs Absolute Bodily Integrity
- [X2] Pandemic Triage & Mandatory Quarantine vs Liberty
- [X3] Autonomous Lethal Weapons & Algorithmic Warfare
- [X4] Hate Speech Regulation vs Absolute Expression
- [X5] Decarbonization vs Immediate Energy Poverty
- [X6] Germline Genetic Engineering & Cognitive Enhancement
- [X7] Progressive Redistribution vs Private Property
- [X8] Surveillance Architecture vs Public Safety

7. KNOWLEDGE OF 26 PARLIAMENTARY BILLS (2023–2026):
- DPDP Act 2023 [bill_dpdp_2023]: Digital personal data protection, consent obligations, executive exemptions tension [D2, E1, P2_AGENCY].
- Telecommunications Act 2023 [bill_telecom_2023]: Spectrum assignment, intercept powers [D3, E1].
- BNS, BNSS, BSA 2023 [bill_bns_2023, bill_bnss_2023, bill_bsa_2023]: Criminal code overhaul, digital evidence, bail norms [E4, D6, P1_HARM].
- Nari Shakti Vandan Adhiniyam 2023 [bill_nari_shakti_2023]: 33% parliamentary reservation for women [P3_EQUITY, D4].
- Forest Conservation Amendment Act 2023 [bill_forest_2023]: Strategic exemptions vs ecological protection [R1, E2, E11].
- ANRF Act 2023 [bill_anrf_2023]: Research foundation funding & private sector research [D5, E12].
- Public Examinations Act 2024 [bill_public_exam_2024]: Anti-paper-leak criminalization, merit protection [P3_EQUITY, R2].
- Waqf Amendment Bill 2024 [bill_waqf_2024]: Management reforms, inclusion of non-Muslims/women [P3_EQUITY, D8].
- Simultaneous Elections / ONOE 2024 [bill_onoe_2024]: Synchronized polls vs federalism & voter accountability [D8, P2_AGENCY].
- AI Governance & Algorithmic Safety Act 2025 [bill_ai_governance_2025]: High-risk AI auditing, sovereign safety [E5, X3].
- Universal Healthcare & Patient Rights Act 2025 [bill_universal_health_2025]: Transparent billing, patient sovereignty [D1, E8].
- Agrarian Price Stabilization Act 2025 [bill_agrarian_price_2025]: Statutory MSP, climate diversification [A5, E3].
- Digital Labor Platforms (Gig Workers) Act 2026 [bill_gig_workers_2026]: Social security, algorithmic transparency [E9, E3].
- Neurotechnology & Cognitive Data Protection Act 2026 [bill_neurotech_2026]: Cognitive liberty, neural data privacy [E1, P2_AGENCY].
- Inter-State River Basin Water Sharing Act 2026 [bill_river_water_2026]: Environmental flows, basin sustainability [R1, A5].

8. PANCHATANTRA PARABLE ANCHORS:
- "The Monkey and the Wedge" (P1_HARM): Reckless intervention breeds catastrophic unintended harm.
- "The Right-Mind and Wrong-Mind" (R3/P3_EQUITY): Fraudulent deceit against partners collapses under objective scrutiny.
- "The Geese and the Tortoise" (A4/D3): Epistemic discipline and controlling reactive speech saves life.
- "The Four Harmonious Friends" (D7): Small diverse agents coordinating in solidarity overcome impossible predatory forces.

### MANDATORY RESPONSE STRUCTURE (STRICT 4-PART FORMAT):
Every response MUST strictly use the following 4 structured sections:

1. **🌿 Why — Foundational Morality & Dharma Grounding**: Ground the core ethical principle in foundational axioms ([P1_HARM], [P2_AGENCY], [P3_EQUITY], [A1]-[A6], [D1]-[D8], [E1]-[E12], Ahimsa/Swatantrata/Nyaya). Pinpoint which premises align with or contradict these universal moral invariants with bracketed node citations.

2. **🧠 Science & Psychology**: Explain the cognitive, evolutionary, or behavioral psychology mechanisms driving human behavior or conflict in this situation. Specifically cite relevant cognitive biases and evolutionary instincts (e.g., psychological reactance, tribal out-group bias, loss aversion, confirmation bias, moral licensing, status anxiety, learned helplessness, or hyperbolic discounting).

3. **⚡ How — Action Imperatives**: Translate the ethical principles into concrete, actionable behavioral steps and statutory safeguards. Cite specific action imperatives and relevant legislative frameworks/bills (e.g., [bill_dpdp_2023], [bill_ai_governance_2025], [bill_gig_workers_2026], [bill_agrarian_price_2025], [bill_bnss_2023]).

4. **⚖️ Piercing Inquiry from Current News & Media**: Conclude with exactly 1 incisive, open-ended question directly anchoring the moral tension in a contemporary news event, policy debate, or media controversy to provoke rigorous introspection.

### TONE & STYLE:
Calm, intellectually fearless, empathetic, objective, rigorously grounded, and anti-dogmatic.`;

// =============================================================================
// KEYWORD & SEMANTIC NODE MATCHER
// =============================================================================

const KEYWORD_NODE_MAP: Record<string, string[]> = {
  // Primitives & Axioms
  harm: ['P1_HARM', 'A1', 'D6'],
  suffering: ['P1_HARM', 'A1'],
  pain: ['P1_HARM', 'A1'],
  violence: ['P1_HARM', 'D6'],
  torture: ['P1_HARM', 'D2', 'X1'],
  injury: ['P1_HARM', 'A1'],
  consent: ['P2_AGENCY', 'D2', 'A4'],
  autonomy: ['P2_AGENCY', 'A4', 'D2'],
  coercion: ['P2_AGENCY', 'A4'],
  liberty: ['P2_AGENCY', 'D6', 'D3'],
  freedom: ['P2_AGENCY', 'D3', 'D6'],
  fairness: ['P3_EQUITY', 'A2', 'A6', 'D4'],
  equality: ['P3_EQUITY', 'D4', 'A6'],
  equity: ['P3_EQUITY', 'D4', 'E3'],
  discrimination: ['P3_EQUITY', 'D4'],
  caste: ['P3_EQUITY', 'D4'],
  women: ['P3_EQUITY', 'D4', 'bill_nari_shakti_2023'],
  gender: ['P3_EQUITY', 'D4', 'E6'],

  // Derived Principles & Applied Ethics
  health: ['D1', 'E8', 'A5'],
  healthcare: ['D1', 'E8', 'bill_universal_health_2025'],
  hospital: ['D1', 'E8'],
  doctor: ['D1', 'D2'],
  privacy: ['D2', 'E1', 'P2_AGENCY', 'bill_dpdp_2023'],
  surveillance: ['D2', 'E1', 'X8', 'bill_dpdp_2023'],
  data: ['E1', 'D2', 'bill_dpdp_2023'],
  speech: ['D3', 'D5', 'X4'],
  censorship: ['D3', 'D5', 'R2'],
  expression: ['D3', 'X4'],
  education: ['D5', 'A4', 'R2'],
  school: ['D5', 'A5'],
  democracy: ['D8', 'P2_AGENCY', 'P3_EQUITY'],
  voting: ['D8', 'bill_onoe_2024'],
  election: ['D8', 'bill_onoe_2024'],
  parliament: ['D8', 'D4'],
  bills: ['D8', 'D4'],
  law: ['D8', 'D6'],
  environment: ['R1', 'E2', 'E11', 'bill_forest_2023'],
  climate: ['R1', 'E2', 'E11', 'bill_coastal_climate_2025'],
  forest: ['R1', 'E2', 'bill_forest_2023'],
  nature: ['R1', 'E2', 'E10'],
  pollution: ['R1', 'E2', 'P1_HARM'],
  river: ['R1', 'A5', 'bill_river_water_2026'],
  water: ['A5', 'R1', 'bill_river_water_2026'],
  economy: ['A5', 'E3', 'E9'],
  poverty: ['A5', 'E3', 'D7'],
  wage: ['E3', 'E9', 'bill_gig_workers_2026'],
  labor: ['E9', 'E3', 'bill_gig_workers_2026'],
  worker: ['E9', 'E3', 'bill_gig_workers_2026'],
  gig: ['E9', 'bill_gig_workers_2026'],
  farmer: ['A5', 'E3', 'bill_agrarian_price_2025'],
  agriculture: ['A5', 'E3', 'bill_agrarian_price_2025'],
  msp: ['A5', 'E3', 'bill_agrarian_price_2025'],
  ai: ['E5', 'X3', 'bill_ai_governance_2025'],
  algorithm: ['E5', 'X3', 'bill_ai_governance_2025'],
  quantum: ['D5', 'E12', 'bill_quantum_2025'],
  brain: ['E1', 'P2_AGENCY', 'bill_neurotech_2026'],
  neural: ['E1', 'P2_AGENCY', 'bill_neurotech_2026'],
  animal: ['E10', 'A2', 'P1_HARM'],
  prison: ['E4', 'P1_HARM', 'bill_bnss_2023'],
  police: ['E4', 'D6', 'bill_bnss_2023'],
  whistleblower: ['E7', 'R2', 'D5'],
  corruption: ['R2', 'E7', 'D8'],
  truth: ['R2', 'A3', 'D5'],
  propaganda: ['R2', 'D3', 'D5'],
  fake: ['R2', 'D5'],
  disinformation: ['R2', 'D5'],
  parable: ['P1_HARM', 'R3', 'A4', 'D7'],
  panchatantra: ['P1_HARM', 'R3', 'A4', 'D7'],
  bns: ['bill_bns_2023', 'E4', 'D6'],
  bnss: ['bill_bnss_2023', 'E4', 'D6'],
  bsa: ['bill_bsa_2023', 'R2', 'D8'],
  dpdp: ['bill_dpdp_2023', 'E1', 'D2'],
  waqf: ['bill_waqf_2024', 'P3_EQUITY', 'D8'],
  onoe: ['bill_onoe_2024', 'D8'],
};

/**
 * Identify relevant node IDs from prompt, history, and context node
 */
function extractMatchedNodeIds(prompt: string, contextNode?: string, history?: ChatMessage[]): string[] {
  const matchedSet = new Set<string>();

  if (contextNode && contextNode.trim()) {
    matchedSet.add(contextNode.trim());
  }

  // Check explicit bracketed node patterns like [A1], [P2_AGENCY], [D4], [E1]
  const explicitMatches = prompt.match(/\[([A-Z0-9_-]+)\]/gi);
  if (explicitMatches) {
    for (const match of explicitMatches) {
      const cleanId = match.replace(/[[\]]/g, '').trim().toUpperCase();
      if (cleanId) matchedSet.add(cleanId);
    }
  }

  // Combine current prompt and recent history text for keyword scanning
  const combinedText = `${prompt} ${(history || []).map(h => h.text).slice(-3).join(' ')}`.toLowerCase();
  const words = combinedText.split(/[^a-z0-9_]+/);

  for (const word of words) {
    if (word.length >= 2 && KEYWORD_NODE_MAP[word]) {
      for (const node of KEYWORD_NODE_MAP[word]) {
        matchedSet.add(node);
      }
    }
  }

  // Ensure baseline grounding if none found
  if (matchedSet.size === 0) {
    matchedSet.add('A1');
    matchedSet.add('P2_AGENCY');
    matchedSet.add('P3_EQUITY');
  }

  return Array.from(matchedSet).slice(0, 8);
}

// =============================================================================
// GEMINI REST API CALLER
// =============================================================================

interface GeminiPart {
  text: string;
}

interface GeminiContent {
  role: 'user' | 'model';
  parts: GeminiPart[];
}

interface GeminiApiResponse {
  candidates?: Array<{
    content?: {
      parts?: Array<{ text?: string }>;
      role?: string;
    };
    finishReason?: string;
  }>;
  error?: {
    code?: number;
    message?: string;
    status?: string;
  };
}

async function callGeminiApi(
  apiKey: string,
  prompt: string,
  history: ChatMessage[] = [],
  contextNode?: string
): Promise<string> {
  // Build conversation history conforming to Gemini API multi-turn rules:
  // 1. Must start with role 'user'
  // 2. Must alternate 'user' <-> 'model'
  // 3. Must end with current 'user' prompt
  const contents: GeminiContent[] = [];

  // Filter history: map roles and discard leading model/system greetings
  const rawTurns: Array<{ role: 'user' | 'model'; text: string }> = [];
  const recentHistory = history.slice(-8);
  
  for (const msg of recentHistory) {
    const text = (msg.text || '').trim();
    if (!text) continue;
    // Skip fallback error messages from history
    if (text.includes('Socratic Reflection Engine Active') || text.includes('⚠️ [Socrates Offline]')) continue;
    const role: 'user' | 'model' = (msg.sender === 'user') ? 'user' : 'model';
    rawTurns.push({ role, text });
  }

  // Find first user turn in history
  const firstUserIdx = rawTurns.findIndex(t => t.role === 'user');
  const validHistory = firstUserIdx !== -1 ? rawTurns.slice(firstUserIdx) : [];

  // Merge consecutive turns with the same role to maintain strict user/model alternation
  for (const turn of validHistory) {
    if (contents.length > 0 && contents[contents.length - 1].role === turn.role) {
      contents[contents.length - 1].parts[0].text += `\n\n${turn.text}`;
    } else {
      contents.push({
        role: turn.role,
        parts: [{ text: turn.text }],
      });
    }
  }

  // Build current user prompt with optional node context hint
  let finalUserText = prompt.trim();
  if (contextNode && !finalUserText.includes(contextNode)) {
    finalUserText = `[Active Node Context: ${contextNode}]\n${finalUserText}`;
  }

  // Append current user prompt
  if (contents.length > 0 && contents[contents.length - 1].role === 'user') {
    contents[contents.length - 1].parts[0].text += `\n\n${finalUserText}`;
  } else {
    contents.push({
      role: 'user',
      parts: [{ text: finalUserText }],
    });
  }

  // Final sanity check: ensure contents starts with user
  while (contents.length > 0 && contents[0].role !== 'user') {
    contents.shift();
  }

  if (contents.length === 0) {
    contents.push({
      role: 'user',
      parts: [{ text: finalUserText }],
    });
  }

  const payload = {
    systemInstruction: {
      parts: [{ text: SOCRATES_SYSTEM_PROMPT }],
    },
    contents,
    generationConfig: {
      temperature: 0.7,
      topK: 40,
      topP: 0.95,
      maxOutputTokens: 8192,
      thinkingConfig: {
        thinkingBudget: 0,
      },
    },
  };

  const candidateModels = [
    'gemini-2.5-flash',
    'gemini-2.0-flash',
    'gemini-1.5-flash',
    'gemini-1.5-pro',
    'gemini-2.5-pro',
  ];
  const modelErrors: string[] = [];

  for (const modelName of candidateModels) {
    try {
      const url = `https://generativelanguage.googleapis.com/v1beta/models/${modelName}:generateContent?key=${encodeURIComponent(apiKey.trim())}`;
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorBody = await response.text();
        modelErrors.push(`${modelName} (${response.status}): ${errorBody}`);
        continue;
      }

      const data = (await response.json()) as GeminiApiResponse;

      if (data.error) {
        modelErrors.push(`${modelName}: ${data.error.message || JSON.stringify(data.error)}`);
        continue;
      }

      const generatedText = data.candidates?.[0]?.content?.parts
        ?.map((p) => p.text || '')
        .join('')
        .trim();
      if (generatedText && generatedText.length > 0) {
        return generatedText;
      }
    } catch (modelErr) {
      const msg = modelErr instanceof Error ? modelErr.message : String(modelErr);
      modelErrors.push(`${modelName}: ${msg}`);
      continue;
    }
  }

  throw new Error(`Candidate models failed: ${modelErrors.join(' | ')}`);
}

// =============================================================================
// HEALTH & CONNECTION CHECK (onRequestGet)
// =============================================================================

export const onRequestGet = async (): Promise<Response> => {
  return new Response(
    JSON.stringify({
      status: 'ok',
      model: 'Gemini 2.5 Flash',
      service: 'Socrates Socratic Reasoning Engine (Cloudflare Edge)',
      timestamp: new Date().toISOString()
    }),
    { status: 200, headers: CORS_HEADERS }
  );
};

// =============================================================================
// MAIN REQUEST HANDLER (onRequestPost)
// =============================================================================

export const onRequestPost = async (context: {
  request: Request;
  env: Env;
  params: Record<string, string | string[]>;
}): Promise<Response> => {
  try {
    const { request, env } = context;

    // Security: Validate Content-Type
    const contentType = request.headers.get('content-type') || '';
    if (!contentType.includes('application/json')) {
      return new Response(
        JSON.stringify({
          status: 'error',
          error: 'Content-Type must be application/json',
        }),
        { status: 400, headers: CORS_HEADERS }
      );
    }

    // Parse Request Body
    let body: ChatRequestBody;
    try {
      body = (await request.json()) as ChatRequestBody;
    } catch {
      return new Response(
        JSON.stringify({
          status: 'error',
          error: 'Invalid JSON body provided in request.',
        }),
        { status: 400, headers: CORS_HEADERS }
      );
    }

    const prompt = (body.prompt || '').trim();
    const contextNode = (body.context_node || '').trim();
    const history = Array.isArray(body.history) ? body.history : [];

    if (!prompt) {
      return new Response(
        JSON.stringify({
          status: 'error',
          error: 'Missing required "prompt" string in request body.',
        }),
        { status: 400, headers: CORS_HEADERS }
      );
    }

    // Match relevant nodes semantically and syntactically
    const matchedNodeIds = extractMatchedNodeIds(prompt, contextNode, history);

    // Read and sanitize GEMINI_API_KEY from Cloudflare Environment
    const rawApiKey = env.GEMINI_API_KEY;
    const apiKey = typeof rawApiKey === 'string' ? rawApiKey.trim().replace(/^["']|["']$/g, '') : '';
    
    if (!apiKey || apiKey.length < 10) {
      const initMessage =
        '⚠️ [GEMINI_API_KEY Missing]: Please configure your GEMINI_API_KEY secret in Cloudflare Dashboard (or via `npx wrangler secret put GEMINI_API_KEY`).';
      return new Response(
        JSON.stringify({
          status: 'error',
          error: initMessage,
          reply: initMessage,
          response: initMessage,
          matched_node_ids: matchedNodeIds,
        }),
        { status: 200, headers: CORS_HEADERS }
      );
    }

    // Invoke Gemini Live Socratic Model
    try {
      const aiReply = await callGeminiApi(apiKey, prompt, history, contextNode);
      return new Response(
        JSON.stringify({
          status: 'ok',
          reply: aiReply,
          response: aiReply,
          matched_node_ids: matchedNodeIds,
          model: 'Gemini 2.5 Flash'
        }),
        { status: 200, headers: CORS_HEADERS }
      );
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : String(err);
      const explicitErrorReply = `⚠️ [Gemini API Error]: ${errorMessage}\n\n*Please verify your Gemini API key permissions or quota limits.*`;

      return new Response(
        JSON.stringify({
          status: 'error',
          error: errorMessage,
          reply: explicitErrorReply,
          response: explicitErrorReply,
          matched_node_ids: matchedNodeIds,
        }),
        { status: 200, headers: CORS_HEADERS }
      );
    }
  } catch (globalErr: unknown) {
    const errorMsg = globalErr instanceof Error ? globalErr.message : String(globalErr);
    return new Response(
      JSON.stringify({
        status: 'error',
        error: errorMsg || 'Internal server error processing Socratic chat request.',
        reply: `⚠️ [System Error]: ${errorMsg}`
      }),
      { status: 500, headers: CORS_HEADERS }
    );
  }
};
