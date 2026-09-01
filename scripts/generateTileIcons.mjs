import { GoogleGenAI } from '@google/genai';
import { writeFileSync, mkdirSync, existsSync } from 'fs';
import { config } from 'dotenv';

config();
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

const ICON_STYLE = "Bold flat-color children's app icon illustration, thick clean outlines, punchy saturated colors, playful rounded shapes, warm cheerful lighting. Single centered subject/object, simple plain soft-gradient background, square framing, no text, no letters, no watermark.";

const TILES = [
  { id: 'verb-zones', prompt: 'A glowing golden lightning bolt bursting out of an open magical spellbook.' },
  { id: 'dictionary', prompt: 'A friendly open book with a big round magnifying glass resting on its pages.' },
  { id: 'spelling-factory', prompt: 'A whimsical candy-colored factory machine with gears, stamping out colorful wooden alphabet letter blocks.' },
  { id: 'test-mode', prompt: 'A clipboard with a checklist, a big green checkmark, and a small gold star badge.' },
  { id: 'arcade', prompt: 'A colorful game joystick controller surrounded by a few floating party balloons.' },
  { id: 'boss-arena', prompt: 'A crossed toy sword and shield with a small spark/lightning emblem in the center, heroic and playful not scary.' },
  { id: 'tamagotchi', prompt: 'A cute round pastel virtual pet egg-creature with big sparkly eyes and a small heart above it.' },
  { id: 'expedition', prompt: 'A cheerful red toy tractor driving through a golden wheat field.' },
  { id: 'sanctuary', prompt: 'A friendly cartoon lion cub face peeking out from behind green jungle leaves.' },
  { id: 'map', prompt: 'An old-fashioned treasure map scroll with a golden compass resting on top.' },
  { id: 'rpg-adventure', prompt: 'A glowing magical scroll with sparkling stars and a golden astrolabe compass floating above it.' },
  { id: 'badges', prompt: 'A shiny gold medal hanging from a colorful ribbon, with a small sparkle.' },
  { id: 'scoreboard', prompt: 'A colorful bar chart with a small trophy and a gold star on top of the tallest bar.' },
];

const OUT_DIR = 'public/tile-icons';

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
  for (const tile of TILES) {
    if (only && tile.id !== only) continue;
    const outPath = `${OUT_DIR}/${tile.id}.png`;
    if (existsSync(outPath)) {
      console.log(`skip (exists): ${outPath}`);
      continue;
    }
    console.log(`generating: ${tile.id}...`);
    const bytes = await generateWithRetry(`${tile.prompt} ${ICON_STYLE}`);
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
