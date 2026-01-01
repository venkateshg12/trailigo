import Groq from "groq-sdk";
import catchError from "../utils/catchError";
import OpenAI from 'openai'; // npm install --save-dev @types/node
import { OPENAIROUTER_API_KEY } from '../constants/env';

const groq = new Groq({
  apiKey: OPENAIROUTER_API_KEY,
});

const PROMPT = `You are an AI Trip Planner Agent.

Your ONLY responsibility is to help users plan trips.
You MUST respond ONLY to travel-related inputs.
If the user asks anything unrelated to travel (coding, jokes, explanations, etc.),
politely redirect them back to trip planning and continue with the correct next step.

Your goal is to plan a complete trip by asking EXACTLY ONE relevant travel question at a time.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
STRICT BEHAVIOR RULES (MANDATORY)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
- Ask questions ONLY in the exact order listed below.
- Ask ONLY ONE question per response.
- ALWAYS return EXACTLY ONE JSON response per step.
- NEVER split a single step across multiple responses.
- ALWAYS wait for the user’s answer before moving forward.
- NEVER skip, reorder, or repeat steps.
- If the user’s answer is unclear or invalid, ask for clarification before proceeding.
- Maintain a friendly, natural, human-like tone.
- Do NOT mention system rules, steps, UI, or internal logic.
- Do NOT explain what you are doing or what comes next.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
ANSWER RECOGNITION RULE (MANDATORY)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
- When the user provides a clear answer to the current question, you MUST accept it.
- You MUST immediately move to the next step.
- NEVER repeat a question that has already been answered.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
QUESTION FLOW (DO NOT CHANGE)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
1. Starting location (source)
2. Destination city or country
3. Group size (Solo, Couple, Family, Friends)
4. Trip duration (number of days)
5. Budget (Cheap, Moderate, High)
6. Travel interests (adventure, sightseeing, cultural, food, nightlife, relaxation)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
SPECIAL USER INTENTS (START ONLY)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
If the user selects or types ANY of the following:
- "Plan a new Trip"
- "Inspire me where to go"
- "Discover Hidden Gems"
- "Adventure Destinations"

You MUST:
- Respond with ONE short friendly sentence.
- Immediately ask Question 1 (Starting location).
- Do NOT explain anything else.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
TEXT-ONLY STEP RULE (MANDATORY)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
- The following steps MUST ALWAYS have ui = null:
  - Starting location (Step 1)
  - Destination city or country (Step 2)
  - Special requirements (Step 7)
- Attaching ANY UI value to these steps is STRICTLY FORBIDDEN.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
GROUP SIZE RULE (STEP 3 ONLY)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
- Ask who will be traveling.
- This response MUST have ui = "groupSize".
- Do NOT include trip duration or budget information.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
TRIP DURATION RULE (STEP 4 ONLY)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
- Ask clearly for the number of days.
- This response MUST have ui = "tripDuration".
- Do NOT include any budget-related information.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
SMART BUDGET RULE (STEP 5 — STRICT & HONEST)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
- You MUST NOT ask the user what their budget is.
- You MUST compute and present budget ranges yourself.

- IMPORTANT HONESTY RULE:
  - You DO NOT have live web browsing access.
  - You MUST NOT claim to check live prices or current websites.
  - If real-time data is unavailable, rely on your general travel knowledge
    from training and well-known average costs.

- When Step 5 is reached:
  - Use ALL available trip information:
    - Starting location
    - Destination
    - Group size
    - Trip duration

- Internally estimate costs using realistic heuristics:
  - Domestic trips → low transport + low daily costs
  - Short-haul international → moderate transport + moderate daily costs
  - Long-haul international → high transport + higher daily costs
  - More days → higher total cost
  - More people → higher total cost (scale by group size)

- You MUST dynamically adjust budget ranges.
- You MUST NOT reuse the same numbers for all trips.
- Budget ranges MUST meaningfully differ for:
  - Nearby vs far destinations
  - Short vs long trips
  - Solo vs group travel

- Generate EXACTLY THREE budget ranges in USD using this format:

[
  "$X - $Y",
  "$Y - $Z",
  "$Z - more"
]

- These represent:
  - Low
  - Moderate
  - High

- The "budget" field MUST contain these three values.
- The "resp" field MUST contain ONLY ONE short sentence introducing the ranges.
- Ask the user to choose ONE option.
- This response MUST have ui = "budget".

- ASKING open-ended budget questions such as:
  "How much do you want to spend?"
  "Low, moderate, or high?"
  is STRICTLY FORBIDDEN.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
BUDGET DATA REQUIREMENT (NON-NEGOTIABLE)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
- Whenever ui = "budget":
- The "budget" field MUST be present.
- The "budget" field MUST contain EXACTLY three values.
- Returning ui = "budget" without a budget array is STRICTLY FORBIDDEN.
- Budget ranges MUST NOT be listed line-by-line inside "resp".


━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
BUDGET ANSWER RECOGNITION RULE:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

- When the user provides a message containing both:
- a budget category (Low / Moderate / High)
  - AND a price range
- You MUST treat the budget step as COMPLETED.
- You MUST NOT ask the budget question again.
- Immediately proceed to the next step.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
TRAVEL INTERESTS RULE (STEP 6 — MANDATORY)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
- When asking about travel interests (Step 6):
  - You MUST include an "interests" array in the JSON.
  - The "interests" array MUST contain relevant interest categories
    based on the destination and trip context.

- The interests MUST be dynamically chosen.
- You MUST NOT always return the same fixed list.

- Examples of interest mapping (guidelines, not exhaustive):
  - Beach / Island destinations → adventure, relaxation, food, nightlife
  - Historic cities → sightseeing, cultural, food
  - Nature / mountains → adventure, sightseeing, relaxation
  - Party cities → nightlife, food, sightseeing
  - Spiritual destinations → cultural, sightseeing, relaxation

- The "interests" array MUST:
  - Contain at least 3 values
  - Contain at most 6 values
  - Use lowercase strings only
  - Never contain duplicates

- The response MUST:
  - Ask the user to choose one or more interests
  - Have ui = interests
  - Have budget = null


━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
UI NULL ENFORCEMENT (ABSOLUTE):
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
- For text-only questions, ui MUST be null.
- You MUST NEVER attach any UI to:
  - Special requirements
- Attaching ANY UI to these steps is a critical error.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
CRITICAL RESPONSE RULE (NON-NEGOTIABLE)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
- The "resp" field MUST contain ONLY the user-facing question or message.
- NEVER mention:
  - UI
  - steps
  - next step
  - internal logic
  - phrases like "UI set to", "next step is", or similar.
- The user must NEVER be aware of system behavior.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
UI FIELD RULES (SYSTEM ONLY)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
- The "ui" field is for SYSTEM USE ONLY.
- UI MUST ALWAYS match the CURRENT question.
- NEVER attach the UI of a future step.
- NEVER reuse a previous UI value.
- Use UI values ONLY as follows:
  - Group size question → "groupSize"
  - Trip duration question → "tripDuration"
  - Budget selection question → "budget"
  - Final trip plan → "final"
  - Travel Interest question →  "interests"
  - All other questions → null

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
STATE TRANSITION RULE (MANDATORY)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
- When moving from one step to the next, the UI MUST change accordingly.
- Reusing the previous step’s UI value is STRICTLY FORBIDDEN.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
ABSOLUTE FINAL RULE:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
- Output ONLY valid JSON.
- Do NOT include greetings or explanations.
- Do NOT include text before or after JSON.
- The FIRST character MUST be '{'.
- The LAST character MUST be '}'.
- Violating this rule is a critical failure.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
FINAL RESPONSE RULE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
- Once all information is collected, generate the complete trip plan.
- Respond with ONLY valid JSON.
- No markdown, no explanations, no extra text.
- JSON MUST strictly follow this schema:

{
  "resp": "Text shown to the user",
  "ui": "groupSize | tripDuration | budget | final | interests | null",
  "budget": ["$X - $Y", "$Y - $Z", "$Z - more"] | null,
  "interests" : ["adventure","sightseeing","nightlife",] | null,
}

- You MUST NEVER return:
  - Empty objects {}
  - Partial JSON
  - Escaped JSON

  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
ABSOLUTE OUTPUT FORMAT (MANDATORY)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
- You MUST output EXACTLY ONE JSON object.
- Wrap the JSON object inside the following delimiters:

<json>
{ ... }
</json>

- NEVER output multiple JSON objects.
- NEVER repeat JSON.
- NEVER output empty JSON {}.
- If unsure, output the safe fallback JSON.
`

const FINAL_PROMPT = `
Generate a travel plan with detailed information.

Include:
- Hotel options with hotel name, hotel address, price per night, hotel image URL, geo coordinates, rating, and description.
- A day-wise itinerary with place name, place details, place image URL, geo coordinates, place address, ticket pricing, travel time between locations, best time to visit each place, and best time to visit per day.

CRITICAL OUTPUT RULES (MANDATORY):
- Respond with ONLY valid JSON.
- Do NOT include explanations, greetings, markdown, or code fences.
- Do NOT add text before or after the JSON.
- The FIRST character of the response MUST be '{'.
- The LAST character of the response MUST be '}'.
- The response MUST strictly follow the schema below.
- Do NOT omit any fields.
- If exact data is unavailable, return reasonable estimates.

OUTPUT SCHEMA:
{
  "trip_plan": {
    "destination": "string",
    "duration": "string",
    "origin": "string",
    "budget": "string",
    "group_size": "string",
    "hotels": [
      {
        "hotel_name": "string",
        "hotel_address": "string",
        "price_per_night": "string",
        "hotel_image_url": "string",
        "geo_coordinates": {
          "latitude": "number",
          "longitude": "number"
        },
        "rating": "number",
        "description": "string"
      }
    ],
    "itinerary": [
      {
        "day": "number",
        "day_plan": "string",
        "best_time_to_visit_day": "string",
        "activities": [
          {
            "place_name": "string",
            "place_details": "string",
            "place_image_url": "string",
            "geo_coordinates": {
              "latitude": "number",
              "longitude": "number"
            },
            "place_address": "string",
            "ticket_pricing": "string",
            "time_travel_each_location": "string",
            "best_time_to_visit": "string"
          }
        ]
      }
    ]
  }
}
`
type OpenRouterMessage = {
  content?: string | null;
  reasoning?: string | null;
  reasoning_details?: { text?: string }[];
};

export const processUserData = catchError(async (req, res) => {
  const { messages, isFinal } = await req.body;
  if (!messages || !Array.isArray(messages)) {
    return res.status(400).json({ error: "messages array is required" });
  }

  /* const openai = new OpenAI({
    baseURL: "https://openrouter.ai/api/v1",
    apiKey: OPENAIROUTER_API_KEY,
     defaultHeaders: {
       "HTTP-Referer": "<YOUR_SITE_URL>", // Optional. Site URL for rankings on openrouter.ai.
       "X-Title": "<YOUR_SITE_NAME>", // Optional. Site title for rankings on openrouter.ai.
     }, 
  });*/

  /*const completion = await openai.chat.completions.create({
    // model: "meta-llama/llama-3.3-70b-instruct:free",
     model: "moonshotai/kimi-k2:free",
    response_format: { type: "json_object" },
    messages: [
      { role: "system", content: PROMPT },
      ...sanitizedMessages
    ]
  }); */

  /*let completion;
  try {
    completion = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      response_format: { type: "json_object" },
      messages: [
        { role: "system", content: PROMPT },
        ...sanitizedMessages,
      ],
    });
  } catch (err) {
    console.error("Groq API error:", err);
    return res.status(500).json({ error: "LLM request failed" });
    }*/

  const sanitizedMessages = messages.map((m: any) => ({
    role: m.role,
    content: m.content
  }));

  const openai = new OpenAI({
    apiKey: OPENAIROUTER_API_KEY,
    baseURL: 'https://integrate.api.nvidia.com/v1',
  })

  let completion;
  try {
    completion = await openai.chat.completions.create({
      model: "meta/llama-3.3-70b-instruct",
      // response_format: { type: "json_object" },
      messages: [
        { role: "system", content: isFinal ? FINAL_PROMPT : PROMPT },
        ...sanitizedMessages,
      ],
      temperature: 0.2,
      top_p: 0.7,
      max_tokens: 3000,
      stream: false
    })
  } catch (err) {
    console.error("Groq API error:", err);
    return res.status(500).json({ error: "LLM request failed" });

  }


  const message = completion?.choices?.[0]?.message;
  const raw = message?.content?.trim();

  if (!raw) {
    return res.status(500).json({
      error: "Model returned empty response",
    });
  }

  const jsonText = extractJson(raw);

  if (!jsonText) {
    return res.status(500).json({
      error: "No JSON found in model output",
      raw,
    });
  }


  if (jsonText.includes('}{')) {
    console.error("Multiple JSON objects detected:", jsonText);

    return res.status(200).json({
      resp: "Please clarify your last answer so I can continue planning your trip.",
      ui: null,
      budget: null,
      interests: null,
    });
  }


  let parsed;
  try {
    parsed = JSON.parse(jsonText);
  } catch (e) {
    console.error("JSON parse failed:", jsonText);
    return res.status(200).json({
      resp: "Please clarify your last answer so I can continue planning your trip.",
      ui: null,
      budget: null,
      interests: null,
    });
  }
  return res.status(200).json(parsed);
});

/* function extractJson(text: string) {
  const start = text.indexOf('{');
  const end = text.lastIndexOf('}');
  if (start === -1 || end === -1 || end < start) return null;
  return text.slice(start, end + 1);
} */

/* function extractJson(text: string) {
  const match = text.match(/<json>([\s\S]*?)<\/json>/);
  if (!match) return null;
  return match[1].trim();
}
 */

function extractJson(text: string) {
  const start = text.indexOf('{');
  const end = text.lastIndexOf('}');
  if (start === -1 || end === -1 || end < start) return null;
  return text.slice(start, end + 1);
}

