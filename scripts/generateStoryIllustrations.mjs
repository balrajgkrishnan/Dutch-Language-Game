import { GoogleGenAI } from '@google/genai';
import { writeFileSync, mkdirSync, existsSync } from 'fs';
import { config } from 'dotenv';

config();
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

const STYLE = "Bold flat-color children's picture book illustration, thick clean linework, punchy saturated colors, playful rounded shapes, warm lighting.";

const RIDHEYA = "Ridheya: a young girl explorer, about 8 years old, shoulder-length wavy brown hair, round wire-frame glasses, warm brown eyes, freckles, wearing a khaki explorer vest over a white shirt, olive cargo shorts, brown lace-up boots, a small round amulet necklace.";
const HEMALI = "Hemali: an older girl, about 11 years old, long straight dark hair, warm brown eyes, confident smile, wearing a khaki reporter's vest with a press badge, carrying a large magnifying glass and a small notebook.";
const MAX_MONKEY = "Max, a friendly cartoon monkey wearing small round reading glasses and holding a tiny book.";
const PROF_OLLIE = "Professor Ollie, a wise cartoon owl wearing tiny round spectacles.";

const stories = [
  {
    id: 'vlinder-tuin',
    paragraphs: [
      `A sunny farm garden with ten colorful butterflies fluttering among purple lavender flowers. ${RIDHEYA} and ${MAX_MONKEY} are planting lavender together, both smiling.`,
      `Close-up: a small yellow butterfly lands softly on the tip of ${RIDHEYA}'s nose, she is giggling with delight, purple lavender flowers blurred in the background.`,
      `${MAX_MONKEY} gently places a drop of sugar water on a green leaf for the little yellow butterfly, ${RIDHEYA} watches happily beside him in the sunny garden.`,
    ],
  },
  {
    id: 'pinguin-ijs',
    paragraphs: [
      `Pip, a small round penguin with a soft white belly, stands proudly atop a big sparkling iceberg, other penguin friends below cheering her on, icy blue sky.`,
      `Pip the penguin slides on her belly down a steep icy slope, arms out, huge joyful expression, snow spraying behind her, "wheee" energy.`,
      `Pip the penguin splashes happily into clear blue water and catches a shiny silver fish in her beak, bubbles all around, underwater sunlight rays.`,
    ],
  },
  {
    id: 'lost-elephant',
    paragraphs: [
      `Ella, a small baby elephant with big ears, happily chasing a fluttering orange butterfly across a warm golden savanna, then pausing looking around worried, her herd nowhere in sight.`,
      `Ella the baby elephant standing bravely beside a tall acacia tree, trunk raised high in the air sniffing for water, golden savanna grass around her.`,
      `Ella the baby elephant trumpeting happily beside a cool blue waterhole, reunited with her elephant mother, splashing water, warm sunset savanna.`,
    ],
  },
  {
    id: 'ocean-coral-rescue',
    paragraphs: [
      `Sami, a friendly sea turtle, swimming calmly over a magical coral reef that looks like a fairytale castle of pink and gold coral, blue underwater light.`,
      `Sami the sea turtle gently pushing aside strands of green seagrass with her flipper, freeing a small trapped yellow fish, coral reef background.`,
      `A small yellow fish dancing a joyful circle around Sami the sea turtle underwater, leading her toward a lush green seagrass meadow, sunbeams through water.`,
    ],
  },
  {
    id: 'zebra-stripes',
    paragraphs: [
      `Early morning golden savanna, a herd of striped zebras grazing, with one zebra standing out completely white with no stripes at all. ${HEMALI} stands nearby holding her magnifying glass, looking surprised, ${PROF_OLLIE} perched on a branch nearby.`,
      `${PROF_OLLIE} perched thoughtfully on a fence post, feathers smoothed, looking wise and scientific, ${HEMALI} listening attentively beside him on the savanna.`,
      `${HEMALI} kneeling down examining the ground with her large magnifying glass, discovering powdery white chalky clay marks on a small dusty hill, savanna background.`,
      `${HEMALI} gently pouring water from a canteen onto the white zebra's flank, revealing beautiful black stripes emerging underneath, zebra looking relieved, triumphant expression on Hemali's face.`,
    ],
  },
  {
    id: 'regenwoud-communicatie',
    paragraphs: [
      `Deep lush Amazon rainforest canopy, ${HEMALI} standing in wonder looking up at giant trees, notebook in hand, dappled sunlight through leaves, a small colorful chameleon visible on a branch.`,
      `Cross-section illustration style: giant rainforest tree roots underground connected by a glowing golden fungal network, tiny chemical warning signals traveling between trees, ${HEMALI} observing from above ground with her notebook.`,
      `A colorful chameleon changing color on a branch while a bird calls out an alarm nearby, monkeys in the canopy above reacting, lush rainforest scene, harmonious warm lighting.`,
    ],
  },
];

const OUT_DIR = 'public/story-images';

async function generateWithRetry(prompt, maxRetries = 5) {
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      const response = await ai.models.generateContent({ model: 'gemini-2.5-flash-image', contents: prompt });
      const parts = response?.candidates?.[0]?.content?.parts || [];
      const imgPart = parts.find(p => p.inlineData?.data);
      if (!imgPart) throw new Error('no image in response: ' + JSON.stringify(response).slice(0, 300));
      return Buffer.from(imgPart.inlineData.data, 'base64');
    } catch (err) {
      const waitMs = attempt * 60000; // 60s, 120s, 180s... -- prior 20/40/60s backoff wasn't enough
      console.warn(`  attempt ${attempt} failed (${err.message || err}), waiting ${waitMs / 1000}s before retry...`);
      if (attempt === maxRetries) throw err;
      await new Promise(r => setTimeout(r, waitMs));
    }
  }
}

async function main() {
  const only = process.argv[2]; // optional: generate just one story id, for spot-fixing
  for (const story of stories) {
    if (only && story.id !== only) continue;
    const dir = `${OUT_DIR}/${story.id}`;
    mkdirSync(dir, { recursive: true });
    for (let i = 0; i < story.paragraphs.length; i++) {
      const outPath = `${dir}/paragraph-${i + 1}.png`;
      if (existsSync(outPath)) {
        console.log(`skip (exists): ${outPath}`);
        continue;
      }
      console.log(`generating: ${story.id} paragraph ${i + 1}/${story.paragraphs.length}...`);
      const prompt = `${story.paragraphs[i]} ${STYLE}`;
      const bytes = await generateWithRetry(prompt);
      writeFileSync(outPath, bytes);
      console.log(`  saved ${outPath}`);
      await new Promise(r => setTimeout(r, 5000)); // pace requests to avoid rate limiting
    }
  }
  console.log('done.');
}

main().catch(err => {
  console.error('FATAL:', err);
  process.exit(1);
});
