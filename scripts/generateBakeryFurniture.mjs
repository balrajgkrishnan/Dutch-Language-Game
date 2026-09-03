import { GoogleGenAI } from '@google/genai';
import { writeFileSync, mkdirSync, existsSync } from 'fs';
import { config } from 'dotenv';

config();
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

const ICON_STYLE = "Bold flat-color children's picture-book illustration, thick clean outlines, punchy saturated colors, playful rounded shapes, warm cheerful lighting. Single centered furniture object, simple plain pastel-color background, square framing, no text, no watermark, no people.";

const ITEMS = [
  { id: 'tafel', prompt: 'A small round wooden cafe table with curved legs.' },
  { id: 'stoel', prompt: 'A cheerful wooden cafe chair with a round seat.' },
  { id: 'kassa', prompt: 'A retro cartoon cash register, cream and brass colored, with round buttons.' },
  { id: 'plant', prompt: 'A cheerful potted plant in a terracotta pot with round green leaves.' },
  { id: 'klok', prompt: 'A round wall clock with a wooden frame and simple black hands.' },
  { id: 'lamp', prompt: 'A warm hanging pendant lamp with a round orange glowing shade.' },
  { id: 'schilderij', prompt: 'A small framed painting of a sliced loaf of bread and wheat stalks, wooden frame.' },
  { id: 'vaas', prompt: 'A round ceramic vase with a few colorful flowers.' },
  { id: 'kleed', prompt: 'A cozy round woven rug with a simple striped pattern.' }
];

const OUT_DIR = 'public/nederlands-wereld/furniture';

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
