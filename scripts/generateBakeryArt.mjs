import { GoogleGenAI } from '@google/genai';
import { writeFileSync, mkdirSync, existsSync } from 'fs';
import { config } from 'dotenv';

config();
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

const ICON_STYLE = "Bold flat-color children's picture-book illustration, thick clean outlines, punchy saturated colors, playful rounded shapes, warm cheerful lighting. Single centered subject, simple plain pastel-color background, square framing, no text, no watermark.";

const ITEMS = [
  { id: 'deeg', prompt: 'A round lump of pale bread dough on a wooden board, a little flour dusted on top.' },
  { id: 'brood', prompt: 'A golden-brown loaf of fresh baked bread, steam rising gently.' },
  { id: 'bloem', prompt: 'A small burlap sack of white flour, slightly open, with flour dusting around it.' },
  { id: 'boter', prompt: 'A block of yellow butter on a small dish.' },
  { id: 'melk', prompt: 'A glass bottle of white milk with a red-and-white striped straw.' },
  { id: 'suiker', prompt: 'A small glass jar filled with white sugar, a wooden spoon resting in it.' },
  { id: 'taart', prompt: 'A round layered cake with pink frosting and a cherry on top.' },
  { id: 'koek', prompt: 'A stack of three round chocolate-chip cookies.' },
  { id: 'mand', prompt: 'A woven wicker basket lined with a checkered cloth.' },
  { id: 'zak', prompt: 'A small brown paper bakery bag, folded at the top.' },
  { id: 'lepel', prompt: 'A wooden mixing spoon with a bit of batter on it.' },
  { id: 'oven', prompt: 'A cheerful red vintage-style bakery oven with a round window and a warm glow inside.' }
];

const BACKGROUND_PROMPT = "A cozy cartoon bakery shop interior, warm wooden counter, shelves with bread and pastries in the background, checkered floor, soft warm lighting, wide scene suitable as a game background, bold flat-color children's picture-book illustration style, thick clean outlines, punchy saturated colors, no text, no watermark, no characters.";

const OUT_DIR = 'public/nederlands-wereld';

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
  const only = process.argv[2];
  mkdirSync(OUT_DIR, { recursive: true });
  const failed = [];

  if (!only || only === 'bakery-background') {
    const outPath = `${OUT_DIR}/bakery-background.png`;
    if (existsSync(outPath)) {
      console.log(`skip (exists): ${outPath}`);
    } else {
      console.log('generating: bakery-background...');
      try {
        const bytes = await generateWithRetry(BACKGROUND_PROMPT);
        writeFileSync(outPath, bytes);
        console.log(`  saved ${outPath}`);
      } catch (err) {
        console.error(`  GAVE UP on bakery-background: ${err.message || err}`);
        failed.push('bakery-background');
      }
      await new Promise(r => setTimeout(r, 5000));
    }
  }

  for (const item of ITEMS) {
    if (only && only !== item.id) continue;
    const outPath = `${OUT_DIR}/${item.id}.png`;
    if (existsSync(outPath)) {
      console.log(`skip (exists): ${outPath}`);
      continue;
    }
    console.log(`generating: ${item.id}...`);
    try {
      const bytes = await generateWithRetry(`${item.prompt} ${ICON_STYLE}`);
      writeFileSync(outPath, bytes);
      console.log(`  saved ${outPath}`);
    } catch (err) {
      console.error(`  GAVE UP on ${item.id}: ${err.message || err}`);
      failed.push(item.id);
    }
    await new Promise(r => setTimeout(r, 5000));
  }
  console.log(failed.length ? `done, but failed: ${failed.join(', ')}` : 'done, all succeeded.');
}

main().catch(err => {
  console.error('FATAL:', err);
  process.exit(1);
});
