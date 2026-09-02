import { GoogleGenAI } from '@google/genai';
import { writeFileSync, mkdirSync, existsSync } from 'fs';
import { config } from 'dotenv';

config();
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

const PORTRAIT_STYLE = "Bold flat-color children's picture-book illustration, thick clean outlines, punchy saturated colors, playful rounded shapes, warm cheerful lighting. Character portrait, facing camera, centered, full body visible, friendly expression, simple plain pastel-color background, square framing, no text, no watermark.";

// Pilot batch (style-approved) + full 73-animal sanctuary roster.
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
  // --- Farm ---
  { id: 'wolletje-schaap', prompt: "Wolletje the Sheep: fluffy round white wool, small pink nose, curious and playful, happily prancing in morning dew." },
  { id: 'storm-paard', prompt: "Storm the Horse: a brave brown horse with a flowing mane, galloping energetically, joyful expression." },
  { id: 'pip-varken', prompt: "Pip the Piglet: a small pink piglet with a curly tail, cheerful, happily rolling in soft mud." },
  { id: 'haantje-haan', prompt: "Haantje the Rooster: a proud rooster with a bright red comb, puffed chest, crowing at sunrise." },
  { id: 'daisy-eend', prompt: "Daisy the Duck: a cheerful yellow-orange duck, quacking happily, paddling on a pond." },
  { id: 'knorrie-varken', prompt: "Knorrie the Pig: a mischievous pink pig rolling gleefully in fresh soft mud." },
  { id: 'wollie-schaap', prompt: "Wollie the Lamb: a tiny fluffy white lamb, playful, hopping joyfully through green grass." },
  { id: 'pico-kip', prompt: "Pico the Hen: a cheerful brown hen, clucking happily, pecking seeds in a farmyard." },
  { id: 'flap-konijn', prompt: "Flap the Lop-Eared Rabbit: a soft floppy-eared rabbit, curious, with wiggling whiskers." },
  // --- Safari ---
  { id: 'gigi-giraf', prompt: "Gigi the Giraffe: an elegant tall giraffe with golden-brown patches, gracefully peering over the savanna." },
  { id: 'ollie-olifant', prompt: "Ollie the Elephant: a gentle grey elephant with big kind eyes and large ears, warm and friendly." },
  { id: 'zara-zebra', prompt: "Zara the Zebra: a playful zebra with bold black and white stripes, galloping joyfully." },
  { id: 'mo-meerkat', prompt: "Mo the Meerkat: a small alert meerkat standing upright on its hind legs, watchful and curious." },
  { id: 'charly-cheeta', prompt: "Charly the Cheetah: a sleek spotted cheetah resting proudly on a termite mound, calm smile." },
  { id: 'simba-leeuw', prompt: "A small brave young lion cub character with a fluffy tuft of golden mane, standing proudly, mouth open in a cheerful shout, big round eyes." },
  { id: 'raffi-giraffe', prompt: "Raffi the Young Giraffe: a friendly young giraffe with soft brown patches, curiously peeking over treetops." },
  { id: 'jumbo-olifant', prompt: "Jumbo the Giant Elephant: a big wise elephant spraying a joyful splash of water with its trunk." },
  { id: 'kibo-neushoorn', prompt: "Kibo the White Rhino: a powerful grey rhino with a big horn, surprisingly gentle expression." },
  // --- Sea ---
  { id: 'dolly-dolfijn', prompt: "Dolly the Dolphin: a cheerful grey dolphin mid-flip above sparkling waves, playful smile." },
  { id: 'sammy-zeeschildpad', prompt: "Sammy the Sea Turtle: a calm wise green sea turtle gliding gently through deep blue water." },
  { id: 'willy-walvis', prompt: "Willy the Blue Whale: a majestic giant blue whale, gentle expression, singing beneath the waves." },
  { id: 'kora-zeepaardje', prompt: "Kora the Seahorse: a delicate orange seahorse floating gracefully among swaying coral." },
  { id: 'oscar-orka', prompt: "Oscar the Orca: a sleek black-and-white orca leaping playfully with a big splash." },
  { id: 'sammy-schildpad', prompt: "Sammy the Green Turtle: a calm green sea turtle paddling gracefully with the current." },
  { id: 'finley-haai', prompt: "Finley the Reef Shark: a friendly curious grey reef shark swimming in fast smooth circles, not scary." },
  { id: 'clippy-krab', prompt: "Clippy the Beach Crab: a funny orange crab clapping its claws sideways to the rhythm of waves." },
  // --- Snow ---
  { id: 'barny-ijsbeer', prompt: "Barny the Polar Bear: a big tough white polar bear sliding happily on his belly across ice." },
  { id: 'plons-pinguin', prompt: "Plons the Penguin: a cheerful round penguin waddling happily, organizing a snowball game." },
  { id: 'robbie-zeehond', prompt: "Robbie the Seal: a curious grey seal peeking with big round eyes above an ice hole." },
  { id: 'pip-poolvos', prompt: "Pip the Arctic Fox: a quick clever white arctic fox curled up with its tail over its nose." },
  { id: 'hedwig-sneeuwuil', prompt: "Hedwig the Snowy Owl: a wise white snowy owl with big yellow eyes gazing at the northern lights." },
  { id: 'sven-rendier', prompt: "Sven the Reindeer: a strong brown reindeer with big antlers, bravely walking through snow." },
  { id: 'boris-walrus', prompt: "Boris the Walrus: a friendly big walrus with long white tusks sunbathing on an ice floe." },
  { id: 'nora-narwal', prompt: "Nora the Narwhal: a magical grey narwhal with a long spiral tusk swimming gracefully under polar ice." },
  // --- Jungle ---
  { id: 'pippa-panda', prompt: "Pippa the Panda: a gentle round black-and-white panda rolling happily down a grassy hill." },
  { id: 'paco-papegaai', prompt: "Paco the Parrot: a colorful chatty parrot with bright green and red feathers, singing cheerfully." },
  { id: 'toby-tijger', prompt: "Toby the Tiger: a big gentle orange-striped tiger playfully pouncing on falling leaves." },
  { id: 'koko-aap', prompt: "Koko the Spider Monkey: a playful brown monkey swinging joyfully between vines, hiding a toy." },
  { id: 'charlie-kameleon', prompt: "Charlie the Chameleon: a whimsical green chameleon happily changing colors on a leaf." },
  { id: 'maya-toekan', prompt: "Maya the Toucan: a cheerful toucan with a huge colorful orange beak, catching berries in the air." },
  { id: 'toko-toekan', prompt: "Toko the Toucan: a colorful toucan with a big rainbow beak, singing at sunrise." },
  { id: 'chico-slingeraap', prompt: "Chico the Spider Monkey: a super bendy playful brown monkey swinging with a big grin." },
  { id: 'bongo-gorilla', prompt: "Bongo the Gorilla: a big gentle silverback gorilla proudly beating his chest, kind eyes." },
  { id: 'maya-jaguar', prompt: "Maya the Jaguar: a sleek spotted jaguar mid-leap, about to dive into a jungle river, playful not fierce." },
  { id: 'pepe-gifkikker', prompt: "Pepe the Tree Frog: a small bright red-and-blue tree frog leaping joyfully between big leaves in the rain." },
  { id: 'paco-luiaard', prompt: "Paco the Three-Toed Sloth: a relaxed smiling brown sloth hanging peacefully from a branch." },
  // --- Outback (includes friendly dinosaurs) ---
  { id: 'kiki-kangoeroe', prompt: "Kiki the Kangaroo: an energetic brown kangaroo with a baby joey peeking from her pouch, mid-hop." },
  { id: 'coco-koala', prompt: "Coco the Koala: a sleepy grey koala hugging a eucalyptus branch tightly." },
  { id: 'wally-wombat', prompt: "Wally the Wombat: a chubby cuddly brown wombat waddling through sandy outback dirt." },
  { id: 'daan-dingo', prompt: "Daan the Dingo: a free-spirited sandy-colored dingo alertly listening to the wind." },
  { id: 'ellie-emoe', prompt: "Ellie the Emu: a curious tall emu pecking at something shiny on the ground." },
  { id: 'finn-woestijnvos', prompt: "Finn the Fennec Fox: a playful little fox with huge ears, quickly digging into golden sand." },
  { id: 'rexy-trex', prompt: "Rexy the Young T-Rex: a friendly small cartoon T-Rex stomping around happily with a big cheerful roar, cute not scary." },
  { id: 'trippy-triceratops', prompt: "Trippy the Triceratops: a calm sturdy cartoon triceratops with three horns, contentedly grazing among giant ferns." },
  { id: 'broonty-brachiosaurus', prompt: "Broonty the Long-Neck Dinosaur: a gentle giant long-necked cartoon brachiosaurus peering above the clouds." },
  { id: 'flappie-pterodactylus', prompt: "Flappie the Pterodactyl: a quick friendly cartoon flying pterosaur making a graceful swooping dive." },
  { id: 'steggie-stegosaurus', prompt: "Steggie the Stegosaurus: a calm cartoon stegosaurus with rounded back plates, gently swishing its spiked tail." },
  { id: 'velo-velociraptor', prompt: "Velo the Velociraptor: a quick clever small cartoon raptor dashing nimbly between rocks, friendly not scary." },
  // --- Mountain (includes fantasy creatures) ---
  { id: 'boris-steenbok', prompt: "Boris the Mountain Goat: a sure-footed goat with curved horns leaping confidently between rocky ledges." },
  { id: 'max-marmot', prompt: "Max the Marmot: a chubby friendly marmot whistling happily outside its burrow." },
  { id: 'luna-alpaca', prompt: "Luna the Alpaca: a fluffy gentle alpaca with a soft content expression, standing on a high mountain meadow." },
  { id: 'alex-arend', prompt: "Alex the Golden Eagle: a majestic golden eagle soaring gracefully with wings spread wide." },
  { id: 'saar-sint-bernard', prompt: "Saar the Rescue Dog: a loyal friendly St. Bernard dog with a small rescue barrel, warm-hearted." },
  { id: 'bella-gems', prompt: "Bella the Chamois: a quick nimble mountain chamois hopping playfully across a snowy ledge." },
  { id: 'stella-eenhoorn', prompt: "Stella the Rainbow Unicorn: a magical soft unicorn with a rainbow mane, sprinkling golden sparkles." },
  { id: 'faye-elfje', prompt: "Faye the Forest Fairy: a cheerful tiny forest fairy with delicate wings, reading an old storybook among moss." },
  { id: 'grom-kabouter', prompt: "Grom the Mountain Gnome: a gruff-looking but kind-hearted little gnome wizard, holding tiny tools." },
  { id: 'ignis-feniks', prompt: "Ignis the Phoenix: a noble golden-and-orange phoenix bird glowing warmly, lighting up a dark cave." },
  { id: 'luna-uil', prompt: "Luna the Night Owl: a wise owl with big round eyes reading an old book by candlelight." },
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
  const failed = [];
  for (const animal of ANIMALS) {
    if (only && animal.id !== only) continue;
    const outPath = `${OUT_DIR}/${animal.id}.png`;
    if (existsSync(outPath)) {
      console.log(`skip (exists): ${outPath}`);
      continue;
    }
    console.log(`generating: ${animal.id}...`);
    try {
      const bytes = await generateWithRetry(`${animal.prompt} ${PORTRAIT_STYLE}`);
      writeFileSync(outPath, bytes);
      console.log(`  saved ${outPath}`);
    } catch (err) {
      // A single flaky item (network blip, transient content-safety hiccup)
      // shouldn't sink the rest of a 50+ item batch -- log it and move on.
      console.error(`  GAVE UP on ${animal.id}: ${err.message || err}`);
      failed.push(animal.id);
    }
    await new Promise(r => setTimeout(r, 5000));
  }
  console.log(failed.length ? `done, but failed: ${failed.join(', ')}` : 'done, all succeeded.');
}

main().catch(err => {
  console.error('FATAL:', err);
  process.exit(1);
});
