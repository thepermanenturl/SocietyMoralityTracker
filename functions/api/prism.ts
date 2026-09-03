// functions/api/prism.ts - Gemini Powered Refractive Optical Prism Endpoint

interface Env {
  GEMINI_API_KEY?: string;
}

const CORS_HEADERS = {
  'Content-Type': 'application/json',
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

export const onRequestOptions = async (): Promise<Response> => {
  return new Response(null, { status: 204, headers: CORS_HEADERS });
};

export const onRequestPost = async (context: {
  request: Request;
  env: Env;
}): Promise<Response> => {
  try {
    const { request, env } = context;
    const body = (await request.json()) as { query?: string };
    const query = body.query?.trim() || '';

    if (!query) {
      return new Response(
        JSON.stringify({ error: 'Query parameter is required.' }),
        { status: 400, headers: CORS_HEADERS }
      );
    }

    const apiKey = env.GEMINI_API_KEY;
    if (!apiKey) {
      return new Response(
        JSON.stringify({
          error: 'GEMINI_API_KEY is not configured on the Worker.',
        }),
        { status: 500, headers: CORS_HEADERS }
      );
    }

    const systemPrompt = `YOU ARE THE REFRACTIVE OPTICAL PRISM SPECTROMETER & SCHEME DIALECTIC ENGINE OF THE 34-NODE AXIOMATIC MORALITY PLATFORM.

Your task is to refract any policy topic, government scheme (e.g. PM-KISAN, Ayushman Bharat, Forest Clearances, Jal Jeevan, DPDP Act), or ethical dilemma into TWO RIGOROUS OPPOSING SUB-TREES (Pole A and Pole B).

For BOTH poles, you must generate structured nodes across:
1. MORALITY & DHARMA: Foundational axioms and dharmic principles justifying this stance (citing nodes from [P1_HARM], [P2_AGENCY], [P3_EQUITY], [A1]-[A6], [D1]-[D8], [E1]-[E12], [R1]-[R3]).
2. PSYCHOLOGY & LIVED EMPATHY: Cognitive biases, emotional resonance, psychological reactance, in-group loyalty, and why individuals passionately hold and defend this view.
3. ACTION IMPERATIVES & PROTESTS: Concrete real-world actions, public protests, court PILs, statutory clauses, or CAG audit accountability demands.

You must respond ONLY with a valid JSON object matching this exact TypeScript schema:
{
  "query": "Topic title",
  "traditional": {
    "title": "Stance title with flag/icon (e.g. 🇮🇳 Civilizational Order & Sovereign Security)",
    "spectrum": "Spectrum label (e.g. Civilizational Continuity / Public Order / Sovereign Stewardship)",
    "rationale": "2-3 sentences explaining the principled traditional/order justification.",
    "moralityNodes": [
      { "id": "A2", "title": "Biocentric Worth & Systems Integrity", "layer": 0, "statement": "Axiom statement", "dharmicPrinciple": "Dharmic order & collective duty" },
      { "id": "R3", "title": "Harmonic Reciprocity", "layer": -1, "statement": "Conduct must strengthen social cohesion", "dharmicPrinciple": "Kartavya (Mutual Duty)" }
    ],
    "psychologyNodes": [
      { "id": "PSY_ORDER", "title": "Need for Certainty & In-Group Trust", "mechanism": "Fear of societal chaos drives cognitive desire for strong institutional guardrails", "livedEmpathy": "Desire to protect family, cultural stability, and national resilience from predatory disruption", "cognitiveBias": "Status Quo Bias / System Justification" }
    ],
    "actionNodes": [
      { "id": "ACT_ORDER", "title": "Statutory Enforcement & Institutional Audits", "actionDirective": "Enforce strict compliance, administrative checks, and CAG audit benchmarks", "protestsOrPolicy": "Policy notifications, anti-fraud CAG audits, and security infrastructure", "linkedBillOrScheme": "PM-KISAN DBT Direct Transfers / BNS 2023" }
    ]
  },
  "progressive": {
    "title": "Stance title with icon (e.g. 🌐 Pluralist Autonomy & Rights)",
    "spectrum": "Spectrum label (e.g. Civil Liberties / Bodily Autonomy / Voluntary Consent)",
    "rationale": "2-3 sentences explaining the principled progressive/pluralist justification.",
    "moralityNodes": [
      { "id": "P2_AGENCY", "title": "Agency & Consent", "layer": -1, "statement": "Sentient beings own their choices; unconsented force breeds trauma", "dharmicPrinciple": "Swatantrata (Inviolable Agency)" },
      { "id": "E1", "title": "Digital Privacy & Data Autonomy", "layer": 2, "statement": "Protection against unconsented state and corporate surveillance", "dharmicPrinciple": "Right to personal boundary" }
    ],
    "psychologyNodes": [
      { "id": "PSY_LIBERTY", "title": "Psychological Reactance & Personal Sovereignty", "mechanism": "Perceived coercion triggers acute psychological resistance and trauma", "livedEmpathy": "Lived indignity of having personal choices or livelihoods controlled without voice", "cognitiveBias": "Psychological Reactance / Loss of Autonomy Saliency" }
    ],
    "actionNodes": [
      { "id": "ACT_PROTEST", "title": "Grassroots Protests & PIL Court Challenges", "actionDirective": "File Supreme Court constitutional challenges and organize decentralized worker protests", "protestsOrPolicy": "Public demonstrations, RTI information campaigns, and open audit litigation", "linkedBillOrScheme": "Gig Workers Social Security Act / DPDP Surveillance Petitions" }
    ]
  },
  "syntheticResolution": "1-2 sentences Socratic golden mean resolving the dialectical tension with proportionality benchmarks.",
  "tensionLevel": 70
}

DO NOT include any markdown formatting, code fences (\`\`\`json), or thinking tags. Return pure raw JSON only.`;

    const payload = {
      systemInstruction: {
        parts: [{ text: systemPrompt }],
      },
      contents: [
        {
          role: 'user',
          parts: [
            {
              text: `Refract this query into its multi-node dual dialectical tree: "${query}"`,
            },
          ],
        },
      ],
      generationConfig: {
        temperature: 0.3,
        responseMimeType: 'application/json',
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

    for (const modelName of candidateModels) {
      try {
        const url = `https://generativelanguage.googleapis.com/v1beta/models/${modelName}:generateContent?key=${encodeURIComponent(
          apiKey.trim()
        )}`;
        const res = await fetch(url, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });

        if (!res.ok) continue;

        const data = (await res.json()) as any;
        const rawJson = data.candidates?.[0]?.content?.parts
          ?.map((p: any) => p.text || '')
          .join('')
          .trim();
        if (rawJson) {
          const parsed = JSON.parse(rawJson);
          return new Response(JSON.stringify(parsed), {
            status: 200,
            headers: CORS_HEADERS,
          });
        }
      } catch (err) {
        continue;
      }
    }

    return new Response(
      JSON.stringify({ error: 'Failed to generate dynamic refraction.' }),
      { status: 500, headers: CORS_HEADERS }
    );
  } catch (e: any) {
    return new Response(JSON.stringify({ error: e.message || String(e) }), {
      status: 500,
      headers: CORS_HEADERS,
    });
  }
};

