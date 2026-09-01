import { GoogleGenAI } from '@google/genai';
import { writeFileSync, mkdirSync, existsSync } from 'fs';
import { config } from 'dotenv';

config();
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

const PORTRAIT_STYLE = "Bold flat-color children's picture-book illustration, thick clean outlines, punchy saturated colors, playful rounded shapes, warm cheerful lighting. Character portrait, facing camera, centered, full body visible, friendly expression, simple plain pastel-color background, square framing, no text, no watermark.";

// Pilot batch -- style-validation only. Extend this list once the look is approved.
const ANIMALS = [
  {
    id: 'bella-koe',
    prompt: "Bella the Cow: a cheerful cartoon dairy cow, black and white patches, big warm eyes, soft pink nose, small curved horns, standing on green grass, gentle and friendly.",
  },
  {
    id: 'leo-leeuw',
    prompt: "Leo the Lion: a proud but goofy young cartoon lion with a fluffy golden-orange mane, big round eyes, sitting regally on a sandy rock, sleepy and warm smile.",
  },
  {
    id: 'octo-octopus',
    prompt: "Octo the Octopus: a smart, curious cartoon octopus, purple and pink gradient skin, big expressive eyes, curling tentacles, floating amid soft bubbles, mischievous grin.",
  },
  {
    id: 'draco-draak',
    prompt: "Draco the baby dragon: a small, warm-hearted cartoon baby dragon, rosy-red and amber scales, tiny round wings, puffing a small cloud of sparkly warm smoke, sitting cross-legged, big affectionate eyes.",
  },
];

const OUT_DIR = 'public/animal-images';

async function generateWithRetry(prompt, maxRetries = 5) {
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      const response = await ai.models.generateContent({ model: 'gemini-2.5-flash-image', contents: prompt });
      const parts = response?.candidates?.[0]?.content?.parts || [];
      const imgPart = parts.find(p => p.inlineData?.data);
      if (!imgPart) throw new Error('no image in response: ' + JSON.stringify(response).slice(0, 300));
      return Buffer.from(imgPart.inlineData.data, 'base64');
    } catch (err) {
      const waitMs = attempt * 60000;
      console.warn(`  attempt ${attempt} failed (${err.message || err}), waiting ${waitMs / 1000}s before retry...`);
      if (attempt === maxRetries) throw err;
      await new Promise(r => setTimeout(r, waitMs));
    }
  }
}

async function main() {
  const only = process.argv[2]; // optional: regenerate just one animal id
  mkdirSync(OUT_DIR, { recursive: true });
  for (const animal of ANIMALS) {
    if (only && animal.id !== only) continue;
    const outPath = `${OUT_DIR}/${animal.id}.png`;
    if (existsSync(outPath)) {
      console.log(`skip (exists): ${outPath}`);
      continue;
    }
    console.log(`generating: ${animal.id}...`);
    const bytes = await generateWithRetry(`${animal.prompt} ${PORTRAIT_STYLE}`);
    writeFileSync(outPath, bytes);
    console.log(`  saved ${outPath}`);
    await new Promise(r => setTimeout(r, 5000));
  }
  console.log('done.');
}

main().catch(err => {
  console.error('FATAL:', err);
  process.exit(1);
});
