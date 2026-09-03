export interface PlacementQuestion {
  id: string;
  curriculumLevel: 'Groep 3-4 (M3-E4)' | 'Groep 5-6 (M5-E6)';
  skillTested: string;
  contextHeader?: string;
  passage: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  wordHelp?: {
    word: string;
    breakdown?: string;
    dutchMeaning: string;
    englishMeaning: string;
  }[];
}

export const TWENTY_CITO_PLACEMENT_QUESTIONS: PlacementQuestion[] = [
  // =========================================================================
  // --- GROEP 3-4 (RIDHEYA: AVI M3-E4) - 10 VRAGEN ---
  // =========================================================================
  {
    id: 'cito_r_1',
    curriculumLevel: 'Groep 3-4 (M3-E4)',
    skillTested: 'Samengestelde woorden & Context raden',
    contextHeader: '🩺 Dierenarts Ridheya in Maleisië',
    passage: 'Ridheya ritst haar rode **dierenartstas** open. Ze ziet een magere **zwerfhond** met een bezeerd pootje onder een mangokraam liggen. "Geen zorgen vriendje," zegt Ridheya zachtjes.',
    question: 'Wat is een "zwerfhond" volgens deze tekst?',
    options: [
      'Een hond die in een groot paleis slaapt',
      'Een hond zonder vast huis die op straat rondloopt',
      'Een hond die kan vliegen als een vogel',
      'Een speelgoedhondje van plastic'
    ],
    correctIndex: 1,
    explanation: 'Zwerfhond is een samenstelling van zwerf + hond: een hond die op straat rondzwerft.',
    wordHelp: [
      {
        word: 'zwerfhond',
        breakdown: 'zwerf + hond',
        dutchMeaning: 'een hond die geen baasje heeft en op straat leeft.',
        englishMeaning: 'Stray dog / street dog'
      },
      {
        word: 'dierenartstas',
        breakdown: 'dierenarts + tas',
        dutchMeaning: 'een tas met medische spullen voor het behandelen van dieren.',
        englishMeaning: 'Veterinarian bag'
      }
    ]
  },
  {
    id: 'cito_r_2',
    curriculumLevel: 'Groep 3-4 (M3-E4)',
    skillTested: 'Voegwoorden & Oorzaak (want/omdat)',
    contextHeader: '🐦 Het gewonde vogeltje in de vallei',
    passage: 'Een kleine blauwe **zonnepapegaai** werd per ongeluk geraakt door een **steentje**. Ridheya pakt snel het zachte verbandgaas, **want** de tere vleugel moet recht blijven om te genezen.',
    question: 'Waarom pakt Ridheya snel het verbandgaas?',
    options: [
      'Omdat ze honger heeft en fruit wil plukken',
      'Omdat de tere vleugel van de vogel recht moet blijven om goed te genezen',
      'Omdat ze wil gaan slapen onder de boom',
      'Omdat het buiten koud aan het vriezen is'
    ],
    correctIndex: 1,
    explanation: 'Het voegwoord "want" legt de reden uit: ze pakt verbandgaas zodat de vleugel recht blijft.',
    wordHelp: [
      {
        word: 'zonnepapegaai',
        breakdown: 'zon + ne + papegaai',
        dutchMeaning: 'een felgekleurde tropische vogel met gouden veren.',
        englishMeaning: 'Sun parakeet'
      },
      {
        word: 'steentje',
        breakdown: 'steen + tje',
        dutchMeaning: 'een klein keitje.',
        englishMeaning: 'Little pebble'
      }
    ]
  },
  {
    id: 'cito_r_3',
    curriculumLevel: 'Groep 3-4 (M3-E4)',
    skillTested: 'Verwijswoorden (hij / ze / deze)',
    contextHeader: '🚲 Amir en de bakfiets',
    passage: 'Amir stopt met zijn rode bakfiets vol verse papaja’s en bananenbladeren. **Hij** helpt Ridheya om een zacht bedje voor het gewonde hertje te maken.',
    question: 'Naar wie verwijst het woord "**Hij**" in de tweede zin?',
    options: [
      'Het gewonde hertje',
      'De rode bakfiets',
      'Amir de vriendelijke jongen',
      'Ridheya'
    ],
    correctIndex: 2,
    explanation: '"Hij" vervangt de mannelijke persoon uit de vorige zin: Amir.',
    wordHelp: [
      {
        word: 'bakfiets',
        breakdown: 'bak + fiets',
        dutchMeaning: 'een stevige fiets met een grote laadbak voorop.',
        englishMeaning: 'Cargo bike'
      }
    ]
  },
  {
    id: 'cito_r_4',
    curriculumLevel: 'Groep 3-4 (M3-E4)',
    skillTested: 'Hoofdgedachte in een korte tekst',
    contextHeader: '🌺 De Tuinkliniek van Mei-Ling',
    passage: 'In de lommerrijke tuin van Mei-Ling krijgen alle zieke oerwouddieren vers water, zachte kussens en geneeskrachtige zalfjes. Samen met dierenarts Ridheya en fietskoerier Amir zorgt Mei-Ling dat elk gewond dier in de vallei weer vrolijk en gezond rondhuppelt.',
    question: 'Wat is de **hoofdgedachte** van dit stukje tekst?',
    options: [
      'In het oerwoud groeien alleen maar bomen.',
      'De drie vrienden werken samen in een tuinkliniek om alle gewonde dieren te genezen.',
      'Amir houdt niet van fietsen door de vallei.',
      'Ridheya wil alleen maar slapen in de tuin.'
    ],
    correctIndex: 1,
    explanation: 'De kern is de samenwerking van het drietal in de tuinkliniek om de dieren te genezen.',
    wordHelp: [
      {
        word: 'tuinkliniek',
        breakdown: 'tuin + kliniek',
        dutchMeaning: 'een veilige tuin waar gewonde dieren worden verzorgd.',
        englishMeaning: 'Garden rescue clinic'
      }
    ]
  },
  {
    id: 'cito_r_5',
    curriculumLevel: 'Groep 3-4 (M3-E4)',
    skillTested: 'Begrijpend Lezen & Details Vinden',
    contextHeader: '🩺 Het Onderzoek met de Stethoscoop',
    passage: 'Ridheya zet haar glanzende stethoscoop op de borstkas van Kopi de hond. Ze luistert heel stil. **Boem-boem, boem-boem**. Zijn hartje klopt rustig en regelmatig. Ridheya knikt opgelucht naar Mei-Ling.',
    question: 'Hoe weet Ridheya dat het hondje niet meer bang is?',
    options: [
      'Omdat de hond begint te blaffen tegen de bomen',
      'Omdat zijn hartje via de stethoscoop rustig en regelmatig klopt',
      'Omdat het hondje wegrent naar de rivier',
      'Omdat Mei-Ling een pleister op haar duim plakt'
    ],
    correctIndex: 1,
    explanation: 'Ridheya hoort met haar stethoscoop dat zijn hartje rustig en regelmatig klopt.',
    wordHelp: [
      {
        word: 'stethoscoop',
        breakdown: 'stetho + scoop',
        dutchMeaning: 'een medisch instrument om naar het hart en de ademhaling te luisteren.',
        englishMeaning: 'Stethoscope'
      }
    ]
  },
  {
    id: 'cito_r_6',
    curriculumLevel: 'Groep 3-4 (M3-E4)',
    skillTested: 'Samengestelde woorden ontleden (wonder + zalf)',
    contextHeader: '🌿 De Natuurlijke Wonderzalf',
    passage: 'Mei-Ling plukt verse aloë vera en mengt dit met kokosolie tot een zachte **wonderzalf**. Ridheya smeert het voorzichtig op het pootje, **zodat** het wondje snel en pijnloos dichtgroeit.',
    question: 'Wat is "wonderzalf" volgens deze zin?',
    options: [
      'Een koude ijscoupe met tropisch fruit',
      'Een speciale genezende zalf die wonden helpt herstellen',
      'Verf om een houten bord mee te schilderen',
      'Zeep om de vloer mee schoon te maken'
    ],
    correctIndex: 1,
    explanation: 'Wonderzalf is samengesteld uit wonder + zalf: een weldadige zalf die wonden verzorgt.',
    wordHelp: [
      {
        word: 'wonderzalf',
        breakdown: 'wonder + zalf',
        dutchMeaning: 'een zalf die wonden heel snel en zacht geneest.',
        englishMeaning: 'Miracle healing ointment'
      },
      {
        word: 'zodat',
        dutchMeaning: 'geeft het doel aan (met als resultaat dat).',
        englishMeaning: 'So that'
      }
    ]
  },
  {
    id: 'cito_r_7',
    curriculumLevel: 'Groep 3-4 (M3-E4)',
    skillTested: 'Tijdsvolgorde & Signaalwoorden (eerst, daarna, tenslotte)',
    contextHeader: '🩹 Het Drie-Stappenplan van Dierenarts Ridheya',
    passage: '**Eerst** spoelt Ridheya het zand van het bezeerde pootje met schoon bronwater. **Daarna** smeert ze verzachtende wonderzalf op de snee. **Tenslotte** wikkelt ze een schoon verbandje om het pootje.',
    question: 'Wat doet Ridheya als **tweede stap** (daarna)?',
    options: [
      'Ze wikkelt meteen het schone verbandje eromheen',
      'Ze smeert verzachtende wonderzalf op de snee',
      'Ze spoelt het zand weg met bronwater',
      'Ze fietst met Amir naar de markt'
    ],
    correctIndex: 1,
    explanation: 'Het signaalwoord "Daarna" geeft de tweede stap aan: het smeren van de verzachtende zalf.',
    wordHelp: [
      {
        word: 'daarna',
        dutchMeaning: 'vervolgens, na de eerste stap.',
        englishMeaning: 'After that / next'
      },
      {
        word: 'tenslotte',
        breakdown: 'ten + slotte',
        dutchMeaning: 'als allerlaatste stap.',
        englishMeaning: 'Finally / lastly'
      }
    ]
  },
  {
    id: 'cito_r_8',
    curriculumLevel: 'Groep 3-4 (M3-E4)',
    skillTested: 'Emoties & Woordbetekenis (dankbaar / opgelucht)',
    contextHeader: '🎉 De Blije Zwerfhond Kopi',
    passage: 'Als Kopi een kommetje rijst met vis opheeft, geeft hij Ridheya een zacht likje over haar hand. Ridheya voelt zich intens **dankbaar** dat ze het diertje op tijd heeft kunnen redden.',
    question: 'Wat betekent het als Ridheya zich "**dankbaar**" voelt?',
    options: [
      'Ze is heel boos op de fiets van Amir',
      'Ze is blij en voelt warme vreugde over de goede afloop',
      'Ze heeft heel veel slaap gekregen',
      'Ze wil snel wegrennen uit het park'
    ],
    correctIndex: 1,
    explanation: 'Dankbaar betekent dat je blij en voldaan bent met de hulp en het mooie resultaat.',
    wordHelp: [
      {
        word: 'dankbaar',
        breakdown: 'dank + baar',
        dutchMeaning: 'vol dankbaarheid en vreugde.',
        englishMeaning: 'Grateful / thankful'
      }
    ]
  },
  {
    id: 'cito_r_9',
    curriculumLevel: 'Groep 3-4 (M3-E4)',
    skillTested: 'Instructies & Recepttekst Begrijpen',
    contextHeader: '🍵 De Kalmerende Kruidenthee van Mei-Ling',
    passage: 'Om een geschrokken dier rustig te maken, meng je **twee** theelepels kamillebloemen met **één** druppel honing in lauw water. Roer het mengsel drie keer met een houten stokje.',
    question: 'Hoeveel theelepels kamillebloemen heb je nodig volgens het recept?',
    options: [
      'Tien eetlepels',
      'Twee theelepels',
      'Vier druppels',
      'Geen enkele'
    ],
    correctIndex: 1,
    explanation: 'De tekst vermeldt letterlijk: "meng je twee theelepels kamillebloemen".',
    wordHelp: [
      {
        word: 'kamillebloemen',
        breakdown: 'kamille + bloemen',
        dutchMeaning: 'witte bloempjes met een rustgevende geur.',
        englishMeaning: 'Chamomile flowers'
      }
    ]
  },
  {
    id: 'cito_r_10',
    curriculumLevel: 'Groep 3-4 (M3-E4)',
    skillTested: 'Samenvatten & Oorzaak-Gevolg (omdat / daardoor)',
    contextHeader: '🌟 Het Dierenfeest bij de Rivier',
    passage: 'Omdat Ridheya en haar vrienden de hele dag klaarstonden met water en medicijnen, zijn alle gewonde dieren uit de vallei weer beter. Ze drinken samen vrolijk bij de glinsterende oase.',
    question: 'Waarom kunnen alle dieren weer vrolijk spelen bij de rivier?',
    options: [
      'Omdat het keihard heeft geregend',
      'Omdat Ridheya en haar vrienden hen met water en medicijnen hebben genezen',
      'Omdat de dieren naar de grote stad zijn verhuisd',
      'Omdat ze allemaal verstoppertje spelen'
    ],
    correctIndex: 1,
    explanation: 'De tekst noemt direct de reden: de goede zorg en medicijnen van Ridheya en haar vrienden.',
    wordHelp: [
      {
        word: 'glinsterende',
        dutchMeaning: 'mooi fonkelend in het zonlicht.',
        englishMeaning: 'Glittering / sparkling'
      }
    ]
  },

  // =========================================================================
  // --- GROEP 5-6 (HEMALI: CITO M5-E6 & DOORSTROOMTOETS) - 10 VRAGEN ---
  // =========================================================================
  {
    id: 'cito_h_1',
    curriculumLevel: 'Groep 5-6 (M5-E6)',
    skillTested: 'Signaalwoorden van tegenstelling (desondanks / nochtans)',
    contextHeader: '✨ Teleportatie naar de Nevelberg',
    passage: 'De nachtjungle rond de bergtop was pikdonker en gehuld in een dichte nevel. Hemali voelde **desondanks** geen enkele aarzeling toen haar saffieren amulet begon te gloeien voor de teleportatiesprong.',
    question: 'Wat betekent het woord "**desondanks**" in deze tekst?',
    options: [
      'Als direct gevolg van de duisternis',
      'Toch / ondanks dat het donker en mistig was',
      'Vrijwel onmiddellijk daarna',
      'Helemaal niet meer mogelijk'
    ],
    correctIndex: 1,
    explanation: '"Desondanks" drukt een tegenstelling uit: alhoewel het donker en gevaarlijk leek, aarzelde ze toch niet.',
    wordHelp: [
      {
        word: 'desondanks',
        dutchMeaning: 'toch, alhoewel er een belemmering is.',
        englishMeaning: 'Nevertheless / despite that'
      },
      {
        word: 'teleportatie',
        dutchMeaning: 'het bliksemsnel verplaatsen van de ene plek naar de andere.',
        englishMeaning: 'Teleportation'
      }
    ]
  },
  {
    id: 'cito_h_2',
    curriculumLevel: 'Groep 5-6 (M5-E6)',
    skillTested: 'Signaalwoorden van gevolg (daardoor / doordat)',
    contextHeader: '🐒 Het Raadsel van het Betoverde Aapje',
    passage: 'Hemali ontdekte dat het aapje niet kwaadaardig was, maar gevangen zat in een slaapwandelende maanbetovering. **Daardoor** begreep zij direct dat ze geen wapens, maar de juiste Nederlandse rijmspreuk nodig had om hem te verlossen.',
    question: 'Welk verband drukt het woord "**Daardoor**" uit?',
    options: [
      'Een opsomming van magische kruiden',
      'Een logisch gevolg van haar ontdekking over de maanbetovering',
      'Een tegenstelling met wat de olifant zei',
      'Een tijdsbepaling in de vroege ochtend'
    ],
    correctIndex: 1,
    explanation: '"Daardoor" koppelt het inzicht (oorzaak) aan haar slimme besluit om een rijmspreuk te gebruiken (gevolg).',
    wordHelp: [
      {
        word: 'daardoor',
        dutchMeaning: 'om die reden, als gevolg daarvan.',
        englishMeaning: 'As a result / therefore'
      }
    ]
  },
  {
    id: 'cito_h_3',
    curriculumLevel: 'Groep 5-6 (M5-E6)',
    skillTested: 'Complexe verwijswoorden (deze / waarmee)',
    contextHeader: '🐘 De Wijze Olifant Raja & Girafje Appel',
    passage: 'De wijze olifant Raja wees met zijn slurf naar een jong gevlekt diertje. **Waarmee** Hemali de kleine babygiraf kon voeden, was een schaal met gouden acaciabladeren. **Deze** dronk het diertje echter niet, maar knabbelde er gretig op los.',
    question: 'Waar verwijst het woord "**Deze**" in de laatste zin naar?',
    options: [
      'De wijze olifant Raja',
      'De schaal met gouden acaciabladeren',
      'De kleine babygiraf (Appel)',
      'Het tovernotitieboek'
    ],
    correctIndex: 1,
    explanation: '"Deze" staat vooraan de zin en is het lijdend voorwerp van "dronk" -- het diertje (het onderwerp) dronk "deze" niet. "Deze" verwijst dus terug naar de schaal met acaciabladeren, niet naar de giraffe zelf.',
    wordHelp: [
      {
        word: 'acaciabladeren',
        breakdown: 'acacia + bladeren',
        dutchMeaning: 'de zoete blaadjes van een tropische acaciaboom.',
        englishMeaning: 'Acacia leaves'
      }
    ]
  },
  {
    id: 'cito_h_4',
    curriculumLevel: 'Groep 5-6 (M5-E6)',
    skillTested: 'Hoofdgedachte & Cito Doorstroomtoets Vraagstelling',
    passage: 'Echte ontdekkingsreizigers veroveren geen natuurgebieden, maar leren luisteren naar de bewoners van het oerwoud. Door vriendschap te sluiten met wijze dieren en raadsels met taalbeheersing op te lossen, bewees Hemali dat medeleven en scherpzinnigheid de allergrootste krachten zijn.',
    question: 'Wat is de **hoofdgedachte** van deze alinea?',
    options: [
      'Olifanten eten uitsluitend acaciabladeren in het wild.',
      'Een ware ontdekkingsreiziger overwint door te luisteren, vriendschap te sluiten en wijsheid te tonen.',
      'Teleportatie werkt alleen wanneer de maan vol is.',
      'Giraffen kunnen beter vliegen dan uilen in de nacht.'
    ],
    correctIndex: 1,
    explanation: 'De kernboodschap is dat luisteren, medeleven en wijsheid kenmerkend zijn voor een ware ontdekkingsreiziger.',
    wordHelp: [
      {
        word: 'scherpzinnigheid',
        breakdown: 'scherp + zinnig + heid',
        dutchMeaning: 'het vermogen om snel en helder na te denken en logische verbanden te zien.',
        englishMeaning: 'Sagacity / sharp intelligence'
      }
    ]
  },
  {
    id: 'cito_h_5',
    curriculumLevel: 'Groep 5-6 (M5-E6)',
    skillTested: 'Signaalwoorden van opsomming (bovendien / tevens)',
    contextHeader: '📜 Het Oude Perkament van de Tempel',
    passage: 'De tempelwachters hadden een waarschuwing in het graniet gebeiteld. Het pad naar de bergtop was steil en bezaaid met losse keien. **Bovendien** veranderde de stand van de sterren elk uur, waardoor gewone kompassen nutteloos werden.',
    question: 'Welke functie heeft het woord "**Bovendien**" in deze tekst?',
    options: [
      'Het geeft een tegenstelling aan met de stenen',
      'Het voegt een extra moeilijkheid of argument toe aan de opsomming',
      'Het legt uit waarom het pad naar beneden loopt',
      'Het verklaart hoe laat het precies is'
    ],
    correctIndex: 1,
    explanation: '"Bovendien" is een signaalwoord van opsomming dat een extra belemmering toevoegt.',
    wordHelp: [
      {
        word: 'bovendien',
        dutchMeaning: 'daarbovenop, ook nog eens.',
        englishMeaning: 'Furthermore / moreover'
      }
    ]
  },
  {
    id: 'cito_h_6',
    curriculumLevel: 'Groep 5-6 (M5-E6)',
    skillTested: 'Betrekkelijke voornaamwoorden (hetgeen / welk)',
    contextHeader: '🐘 De Telepathische Boodschap van Raja',
    passage: 'Raja sloot zijn ogen en stuurde een warme gedachte naar Hemali, **hetgeen** haar met hernieuwde moed vervulde. Zonder te twijfelen stapte zij op de gloeiende runensteen.',
    question: 'Waar verwijst het woord "**hetgeen**" naar?',
    options: [
      'De gloeiende runensteen',
      'Het feit dat Raja haar een warme gedachte stuurde',
      'Haar saffieren toverstaf',
      'De losse keien op het bergpad'
    ],
    correctIndex: 1,
    explanation: '"Hetgeen" slaat terug op de gehele voorafgaande handeling: het sturen van de gedachte door Raja.',
    wordHelp: [
      {
        word: 'hetgeen',
        dutchMeaning: 'wat, datgene wat net genoemd is.',
        englishMeaning: 'Which / that which'
      }
    ]
  },
  {
    id: 'cito_h_7',
    curriculumLevel: 'Groep 5-6 (M5-E6)',
    skillTested: 'Conclusies trekken uit formele tekst (Cito Doorstroomtoets)',
    contextHeader: '🦒 De Moessonstorm & De Redding van Appel',
    passage: 'Girafje Appel rilde niet meer van de kou, maar dronk rustig van de verse kokosmelk. Haar unieke appelvormige vlekjes kleurden weer warm goudbruin in de opkomende ochtendzon. Hemali noteerde in haar logboek dat het herstel voorspoedig verliep.',
    question: 'Welke conclusie kun je met zekerheid trekken uit deze passage?',
    options: [
      'Appel is bang voor de zon geworden',
      'De toestand van het babygirafje is aanzienlijk verbeterd door Hemali’s goede verzorging',
      'Hemali is haar logboek kwijtgeraakt in de moessonstorm',
      'Raja heeft alle kokosmelk zelf opgedronken'
    ],
    correctIndex: 1,
    explanation: 'Dat Appel niet meer rilt, rustig drinkt en haar vlekjes weer warm kleuren toont aan dat haar toestand sterk verbeterd is.',
    wordHelp: [
      {
        word: 'voorspoedig',
        breakdown: 'voor + spoedig',
        dutchMeaning: 'zeer gunstig en vlot verlopend.',
        englishMeaning: 'Prosperous / favorable / smooth'
      }
    ]
  },
  {
    id: 'cito_h_8',
    curriculumLevel: 'Groep 5-6 (M5-E6)',
    skillTested: 'Tekstdoel & Toon van de Auteur',
    contextHeader: '👑 Het Zegel van Harmonie',
    passage: 'Wie de taal van de natuur begrijpt en signaalwoorden met logica weet te ontcijferen, kan elke betovering doorbreken. Taal is geen verzameling losse regels, maar een sleutel tot vriendschap tussen mens en dier.',
    question: 'Wat is het belangrijkste **doel** van de schrijver met deze uitspraak?',
    options: [
      'Uitleggen hoe je een stethoscoop moet repareren',
      'De lezer inspireren dat taalvaardigheid en logica waardevolle instrumenten zijn voor begrip en verbinding',
      'Waarschuwen voor stormen in de jungle',
      'Bewijzen dat runenstenen gevaarlijk zijn'
    ],
    correctIndex: 1,
    explanation: 'De schrijver wil de lezer inspireren dat taalbegrip en logica de sleutel zijn tot empathie, vriendschap en probleemoplossing.',
    wordHelp: [
      {
        word: 'harmonie',
        dutchMeaning: 'een toestand waarin alles mooi en vredig met elkaar samenwerkt.',
        englishMeaning: 'Harmony / peace'
      }
    ]
  },
  {
    id: 'cito_h_9',
    curriculumLevel: 'Groep 5-6 (M5-E6)',
    skillTested: 'Signaalwoorden van voorwaarde & beperking (mits / tenzij)',
    contextHeader: '🏛️ De Eeuwige Portaalspreuk',
    passage: 'De massieve bronzen tempeldeuren zullen alleen openen voor reizigers die de waarheid spreken, **mits** zij ook het verloren gouden tandwiel in het slot plaatsen. Zonder dat tandwiel blijft de poort gesloten.',
    question: 'Wat betekent het woord "**mits**" in deze zinsconstructie?',
    options: [
      'Omdat iedereen altijd binnen mag',
      'Op voorwaarde dat (alleen als)',
      'Hoewel niemand het tandwiel bezit',
      'Nadat de deuren vanzelf zijn omgevallen'
    ],
    correctIndex: 1,
    explanation: '"Mits" stelt een strikte voorwaarde: de deuren gaan alleen open óp voorwaarde dat het tandwiel geplaatst is.',
    wordHelp: [
      {
        word: 'mits',
        dutchMeaning: 'op voorwaarde dat, alleen als.',
        englishMeaning: 'Provided that / on the condition that'
      }
    ]
  },
  {
    id: 'cito_h_10',
    curriculumLevel: 'Groep 5-6 (M5-E6)',
    skillTested: 'Vergelijking & Tegenstelling (enerzijds... anderzijds)',
    contextHeader: '🌌 De Kosmische Tijdwijzer',
    passage: '**Enerzijds** vroeg het astrolabium om diep wiskundig inzicht in de stand van de planeten, **anderzijds** vereiste het pure empathie om de zang van de oerwouduil te vertalen naar taal.',
    question: 'Welk tekstverband wordt met "**Enerzijds... anderzijds**" aangeduid?',
    options: [
      'Een chronologische tijdsvolgorde van gebeurtenissen',
      'Twee verschillende kanten of eigenschappen die met elkaar worden vergeleken en samengebracht',
      'Een waarschuwing tegen wilde dieren',
      'Een conclusie dat wiskunde overbodig is'
    ],
    correctIndex: 1,
    explanation: '"Enerzijds... anderzijds" belicht twee facetten (intellect én empathie) die elkaar aanvullen en contrasteren.',
    wordHelp: [
      {
        word: 'astrolabium',
        dutchMeaning: 'een historisch instrument om de positie van sterren en planeten te meten.',
        englishMeaning: 'Astrolabe'
      }
    ]
  }
];
