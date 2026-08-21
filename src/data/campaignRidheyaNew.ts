import { RpgPage } from './citoRpgData';

export const RIDHEYA_CORAL_REEF_CAMPAIGN: RpgPage[] = [
  {
    pageNumber: 1,
    title: 'De Noodoproep van de Schildpaddenbaai',
    biome: 'Koraalstrand van Pulau Tioman',
    storyText: `Ridheya stond met haar witte **dierenartskit** op de houten steiger van Pulau Tioman. De warme zeewind blies zachtjes door haar bruine haren en haar ronde bril glansde helder in het felle zonlicht. In haar hand hield ze haar favoriete vergrootglas, waarmee ze kleine schelpjes en zanddiertjes bestudeerde.

Plotseling zag ze bij de vloedlijn een jonge groene **zeeschildpad** die moeizaam over het koraalzand kroop. Het diertje kon bijna niet vooruitkomen, want een aangespoeld visnet zat strak om zijn rechtervoorpoot gewikkeld. 

"Rustig maar, dapper schildpadje, dokter Ridheya is hier om je te helpen," fluisterde ze op geruststellende toon. Behoedzaam knielde ze in het warme zand. Uit haar medische tas haalde ze een stomp verbandknippertje om de strakke nylon draden millimeter voor millimeter los te knippen zonder de schubben te beschadigen.`,
    targetWords: [
      {
        word: 'dierenartskit',
        breakdown: 'dieren + arts + kit',
        dutchMeaning: 'een draagbare tas met medische hulpmiddelen, schaartjes en zalf om dieren in nood te behandelen.',
        englishMeaning: 'Veterinary medical kit'
      },
      {
        word: 'zeeschildpad',
        breakdown: 'zee + schildpad',
        dutchMeaning: 'een groot zeereptiel met peddelvormige flippers en een gestroomlijnd schild dat door tropische oceanen zwemt.',
        englishMeaning: 'Sea turtle'
      },
      {
        word: 'behoedzaam',
        breakdown: 'behoed + zaam',
        dutchMeaning: 'uiterst voorzichtig, aandachtig en rustig te werk gaand om geen pijn of schade te veroorzaken.',
        englishMeaning: 'Cautiously / gently'
      }
    ],
    mysteryQuestion: {
      clueTitle: '🐢 Eerste Hulp Diagnostiek #1',
      question: 'Waarom kon de jonge zeeschildpad zich nauwelijks voortbewegen op het strand?',
      options: [
        'Zijn schild was te zwaar geworden door het zand',
        'Zijn rechtervoorpoot zat strak verstrikt in aangespoelde visnetten',
        'Hij zocht zijn zonnebril tussen de rotsen',
        'Hij had te veel water gedronken'
      ],
      correctIndex: 1,
      explanation: 'De schildpad zat vast in visnetten en Ridheya knipt deze voorzichtig los met haar stompe schaartje.'
    },
    choices: [
      { label: 'Smeer een verzachtende aloë vera zalf op het pootje en noem het schildpadje Sam', nextPage: 2, skillBonus: '+15 Wondverzorging', icon: '🐢' },
      { label: 'Onderzoek met je vergrootglas de sporen van het visnet naar het koraalrif', nextPage: 2, skillBonus: '+15 Spoorzoeken', icon: '🔍' }
    ]
  },
  {
    pageNumber: 2,
    title: 'De Geheime Lagune met Lichtgevend Koraal',
    biome: 'Onderwaterlagune vol Zacht Koraal',
    storyText: `Met haar duikbril en snorkeltas zwom Ridheya samen met de herstelde schildpad Sam de azuurblauwe lagune in. De zeebodem leek wel een magische onderwatertuin vol waaierkoralen. Tussen twee grote rotsformaties ontdekte ze een verborgen **onderwatergrot** waaruit een zacht, betoverend schijnsel kwam.

Binnenin dreef een geschrokken **clownvisje** rusteloos rondom een bleke zeeanemoon. Ridheya boog zich voorover en bekeek de situatie aandachtig door haar duikglas. Een dikke laag drijvend oerwoudpuin en aangespoelde palmbladeren blokkeerde de opening, waardoor er geen zonnestralen meer bij de anemoon konden komen.

"Zonder zonlicht verliest koraal zijn voedingsstoffen en kleur," dacht Ridheya scherp na. Met haar handschoenen verwijderde ze voorzichtig alle rottende takjes en liet ze het heldere, voedzame zeewater weer vrij door de grot stromen.`,
    targetWords: [
      {
        word: 'onderwatergrot',
        breakdown: 'onder + water + grot',
        dutchMeaning: 'een natuurlijke holle ruimte in een rif of rots onder het oppervlak van de zee.',
        englishMeaning: 'Underwater cave'
      },
      {
        word: 'clownvisje',
        breakdown: 'clown + vis + je',
        dutchMeaning: 'een klein oranje tropisch visje met witte banden dat bescherming zoekt tussen giftige tentakels van anemonen.',
        englishMeaning: 'Little clownfish / anemonefish'
      },
      {
        word: 'voedingsstoffen',
        breakdown: 'voeding + s + stoffen',
        dutchMeaning: 'belangrijke bouwstoffen en mineralen die levende wezens en planten nodig hebben om gezond te groeien.',
        englishMeaning: 'Nutrients'
      }
    ],
    mysteryQuestion: {
      clueTitle: '🐠 Koraal Ecologie #2',
      question: 'Wat was de directe oorzaak dat de zeeanemoon in de grot zo bleek en zwak was geworden?',
      options: [
        'Het water in de lagune was te zout',
        'Drijvend oerwoudpuin en bladeren blokkeerden het noodzakelijke zonlicht',
        'De clownvissen maakten te veel lawaai',
        'Er zwommen te veel dolfijnen rond'
      ],
      correctIndex: 1,
      explanation: 'Zonlicht is onmisbaar voor koraal en anemonen; het blokkerende puin maakte het koraal ziek.'
    },
    choices: [
      { label: 'Plant een stekje van zeldzaam blauw sterrenkoraal om het rif te versterken', nextPage: 3, skillBonus: '+15 Koraalherstel', icon: '🪸' },
      { label: 'Volg het vrolijke clownvisje naar de diepere zeegrasweide', nextPage: 3, skillBonus: '+15 Navigatie', icon: '🌊' }
    ]
  },
  {
    pageNumber: 3,
    title: 'De Verdwaalde Spinnerdolfijn in het Zeegras',
    biome: 'Uitgestrekte Zeegrasweide bij de Koraalbank',
    storyText: `Aan de rand van het rif strekte zich een weelderige, zacht deinende **zeegrasweide** uit. Het leek wel een groene onderwaterweide waar zeeschildpadden graasden. Plotseling ving Ridheya een reeks zachte, klikkende noodsignalen op die door het water weerkaatsten.

Dicht bij de bodem zag ze een jonge **spinnerdolfijn** die met zijn staartvin klem zat onder een zware formatie aaneengegroeide oesterschelpen. Het jonge dier probeerde wanhopig naar de oppervlakte te zwemmen om adem te halen door zijn **blaasgat**.

Ridheya wist dat elke seconde telde. Ze zwom snel maar beheerst naar de dolfijn toe. Uit haar duikgordel pakte ze een lichtgewicht hefboompje van drijfhout. Met een slimme hefboombeweging tilde ze de schelpenkrans een paar centimeter op, waarna de baby dolfijn met een krachtige vinbeweging loskwam en samen met Ridheya naar boven schoot voor een diepe teug frisse lucht!`,
    targetWords: [
      {
        word: 'zeegrasweide',
        breakdown: 'zee + gras + weide',
        dutchMeaning: 'een uitgestrekt onderwaterlandschap vol waterplanten dat als kraamkamer en voedselbron dient voor zeedieren.',
        englishMeaning: 'Seagrass meadow'
      },
      {
        word: 'spinnerdolfijn',
        breakdown: 'spinner + dolfijn',
        dutchMeaning: 'een sierlijke dolfijnensoort die bekend staat om acrobatische draaisprongen boven het water.',
        englishMeaning: 'Spinner dolphin'
      },
      {
        word: 'blaasgat',
        breakdown: 'blaas + gat',
        dutchMeaning: 'de ademopening bovenop de kop van een dolfijn of walvis waarmee lucht wordt in- en uitgeblazen.',
        englishMeaning: 'Blowhole'
      }
    ],
    mysteryQuestion: {
      clueTitle: '🐬 Zoogdieren EHBO #3',
      question: 'Waarom was het voor de spinnerdolfijn van levensbelang om snel bevrijd te worden?',
      options: [
        'Dolfijnen zijn zoogdieren die met hun blaasgat regelmatig aan de oppervlakte lucht moeten inademen',
        'Dolfijnen kunnen niet tegen zout water',
        'Hij had dorst en wilde limonade drinken',
        'Zijn vinnen zouden anders oplossen in het zeegras'
      ],
      correctIndex: 0,
      explanation: 'Dolfijnen hebben longen en ademen lucht via hun blaasgat aan het wateroppervlak.'
    },
    choices: [
      { label: 'Onderzoek de staartvin van de dolfijn en breng een waterbestendige beschermfolie aan', nextPage: 4, skillBonus: '+20 Dolfijnenverzorging', icon: '🐬' },
      { label: 'Volg de dolfijnenfamilie naar het geheimzinnige scheepswrak bij de diepe trog', nextPage: 4, skillBonus: '+20 Onderwaterverkenning', icon: '🧭' }
    ]
  },
  {
    pageNumber: 4,
    title: 'Het Gezonken Onderzoeksschip en de Oktopus in Nood',
    biome: 'Historisch Scheepswrak op 15 Meter Diepte',
    storyText: `De jonge dolfijn leidde Ridheya en schildpad Sam naar de rand van het rifplateau. Daar lag de houten romp van een oud **onderzoeksschip** dat tientallen jaren geleden tijdens een storm was gezonken. Het wrak was nu begroeid met kleurrijke buissponzen en zacht koraal.

Bij het roer hoorde Ridheya een dof getik. Met haar waterdichte duiklamp scheen ze door een patrijspoort. Binnenin zat een slimme blauwgeringde **oktopus** vast in een glazen pot die door oude stormwinden was omgevallen en geblokkeerd raakte.

De oktopus keek haar met grote, nieuwsgierige ogen aan en veranderde van kleur om zijn emotie te tonen. Ridheya schoof haar hand voorzichtig door de spleet en draaide de klem zachtjes opzij. De dankbare oktopus gleed soepel naar buiten en spoot een wolkje onschuldige bubbels om haar te bedanken.`,
    targetWords: [
      {
        word: 'onderzoeksschip',
        breakdown: 'onderzoek + s + schip',
        dutchMeaning: 'een speciaal vaartuig dat door mariene biologen wordt gebruikt om de oceaan en zeedieren te bestuderen.',
        englishMeaning: 'Research vessel'
      },
      {
        word: 'patrijspoort',
        breakdown: 'patrijspoort',
        dutchMeaning: 'een rond, waterdicht scheepsraam met dik glas in de romp van een boot.',
        englishMeaning: 'Porthole'
      },
      {
        word: 'emotie',
        dutchMeaning: 'een innerlijk gevoel zoals vreugde, angst, opluchting of nieuwsgierigheid.',
        englishMeaning: 'Emotion / feeling'
      }
    ],
    mysteryQuestion: {
      clueTitle: '🐙 Zeebiologie Inzicht #4',
      question: 'Hoe maakte de oktopus in het scheepswrak zijn gevoelens en toestand kenbaar aan Ridheya?',
      options: [
        'Hij blies op een scheepshoorn',
        'Hij paste zijn huidskleur aan en keek met expressieve ogen',
        'Hij schreef een brief op perkament',
        'Hij zong een liedje onder water'
      ],
      correctIndex: 1,
      explanation: 'Oktopussen gebruiken kleurveranderingen van hun huidcellen om te communiceren en hun toestand te tonen.'
    },
    choices: [
      { label: 'Verzamel eeuwenoude rifkristallen uit de scheepskajuit voor het rifheiligdom', nextPage: 5, skillBonus: '+20 Archeologie', icon: '💎' },
      { label: 'Zwem samen in formatie met de oktopus, Sam en de dolfijn naar de Koraaltempel', nextPage: 5, skillBonus: '+20 Teamgeest', icon: '🤝' }
    ]
  },
  {
    pageNumber: 5,
    title: 'Het Heiligdom van de Koraalkoningin',
    biome: 'Kristalheldere Koraaltempel in het Diepe Rif',
    storyText: `In het hart van het nationale zeepark rezen majestueuze torens van levend kalkkoraal omhoog. Dit was het legendarische heiligdom van de **koraalkoningin**. Het water fonkelde in alle tinten van smaragd, turkoois en goud.

In het midden rustte de reusachtige Moederschildpad, een wijze reus van meer dan honderd jaar oud. Ze bekeek Ridheya met een blik vol warmte en respect. Rondom haar zwommen scholen papegaaivissen, zeepaardjes en manta\'s die allemaal geholpen waren door Ridheya\'s snelle en zorgvuldige medische ingrepen.

"Jij hebt bewezen dat ware geneeskunde begint met geduld, een zuiver hart en liefde voor elk klein wezen," klonk het harmonieuze lied van de zeedieren. De Moederschildpad overhandigde Ridheya met haar flipper een zeldzame **schelpenamulet** gevuld met magisch lichtgevend parelpoeder dat het rif voor altijd gezond zal houden.`,
    targetWords: [
      {
        word: 'heiligdom',
        breakdown: 'heilig + dom',
        dutchMeaning: 'een gewijde, beschermde plek van grote rust en bijzondere natuurwaarde.',
        englishMeaning: 'Sanctuary / shrine'
      },
      {
        word: 'schelpenamulet',
        breakdown: 'schelpen + amulet',
        dutchMeaning: 'een beschermend siervoorwerp gemaakt van glanzende zeeschelpen met helende krachten.',
        englishMeaning: 'Shell amulet / talisman'
      },
      {
        word: 'respect',
        dutchMeaning: 'eerbied en grote waardering voor iemands goede daden of wijsheid.',
        englishMeaning: 'Respect / esteem'
      }
    ],
    mysteryQuestion: {
      clueTitle: '🪸 Didactische Synthese #5',
      question: 'Waarom overhandigt de oude Moederschildpad de schelpenamulet aan dokter Ridheya?',
      options: [
        'Omdat Ridheya het snelste kon zwemmen',
        'Als eerbetoon voor haar onvermoeibare geduld, zachte wondzorg en toewijding aan alle rifdieren',
        'Omdat de amulet te zwaar was voor de schildpad',
        'Omdat ze de weg naar huis zocht'
      ],
      correctIndex: 1,
      explanation: 'Ridheya heeft door haar diergeneeskundige zorg en liefde voor de natuur het hele rif gered.'
    },
    choices: [
      { label: 'Strooi het helende parelpoeder uit over de hele koraalbank', nextPage: 6, skillBonus: '+25 Rifbescherming', icon: '✨' },
      { label: 'Zet de schelpenamulet op je dierenartskit als officieel keurmerk', nextPage: 6, skillBonus: '+25 Medische Ereorde', icon: '🏅' }
    ]
  },
  {
    pageNumber: 6,
    title: 'De Feestelijke Kroning tot Opper-Marienedokter',
    biome: 'Feeststrand van Tioman bij Zonsondergang',
    storyText: `Toen Ridheya weer boven water kwam en het witte zandstrand opliep, ging de tropische zon langzaam onder in een gloed van oranje en dieppaars. Op de steiger stonden haar zus Hemali, hond Kopi en boswachter Amir al vrolijk te zwaaien.

Schildpad Sam en de baby dolfijn deden synchrone vreugdesprongen in de branding. Amir overhandigde Ridheya een prachtig houten certificaat met een gouden lakzegel: *'Officiële Opper-Marienedokter van Pulau Tioman'*.

Ridheya zette haar ronde bril recht, aaide Kopi over zijn zachte oren en glimlachte stralend naar haar zus Hemali. Haar droom om alle dieren in nood te redden was werkelijkheid geworden. Het koraalrif was gered, en een nieuw avontuur in de jungle wachtte alweer op haar!`,
    targetWords: [
      {
        word: 'marienedokter',
        breakdown: 'mariene + dokter',
        dutchMeaning: 'een gespecialiseerde dierenarts die zieke en gewonde zeedieren in de oceaan behandelt.',
        englishMeaning: 'Marine veterinarian'
      },
      {
        word: 'lakzegel',
        breakdown: 'lak + zegel',
        dutchMeaning: 'een officiële stempel van rode was die op een belangrijk diploma of perkament wordt gedrukt.',
        englishMeaning: 'Wax seal'
      },
      {
        word: 'werkelijkheid',
        breakdown: 'werkelijk + heid',
        dutchMeaning: 'dat wat echt gebeurt en waar is; het tegendeel van een verzinsel of droom.',
        englishMeaning: 'Reality'
      }
    ],
    mysteryQuestion: {
      clueTitle: '🌟 Eindoverwinning #6',
      question: 'Welke overkoepelende hoofdgedachte heeft Ridheya bewezen tijdens haar koraalavontuur?',
      options: [
        'Dat mensen beter nooit de zee in kunnen gaan',
        'Dat gerichte wetenschappelijke kennis, observatievermogen en empathie samen elk ecosysteem kunnen herstellen',
        'Dat schildpadden liever op het land blijven',
        'Dat duikbrillen van glas moeten zijn'
      ],
      correctIndex: 1,
      explanation: 'Met kennis, observatie en liefdevolle zorg kan een dierenarts een compleet rif redden.'
    },
    choices: [
      { label: 'Vier het feest op het strand met vers kokoswater en Kopi de hond', nextPage: 1, skillBonus: '👑 Grote Gouden Marienedokter Bokaal!', icon: '🥥' }
    ]
  }
];

export const RIDHEYA_TREEHOUSE_CLINIC_CAMPAIGN: RpgPage[] = [
  {
    pageNumber: 1,
    title: 'De Geheime Boomhuttendokterij in de Oerwoudkruin',
    biome: 'Eeuwenoude Banyanboom in Taman Negara',
    storyText: `Hoog in de reusachtige takken van een eeuwenoude banyanboom in Taman Negara had Ridheya haar eigen **boomhutkliniek** gebouwd. De hut rook heerlijk naar vers geschaafd cederhout en gedroogde eucalyptus. Binnen stonden potjes vol zelfgemaakte kruidenbalsem, steriele verbandrolletjes en een zacht mosbedje voor kleine patiënten.

Aan haar schouderriem hing haar glanzende stethoscoop en haar vergrootglas. Buiten ritselde het bladerdak in de warme bries. Hond Kopi zat waakzaam op het balkon en sloeg een zacht waarschuwingsblafje.

Onder aan de touwladder hoorde Ridheya een aandoenlijk gepiep. Daar zat een klein **boomeekhoorntje** met een bezeerd voorpootje na een mislukte sprong tussen twee mangotakken. Ridheya liet direct het mandje met zachte doeken naar beneden zakken om het diertje veilig omhoog te hijsen.`,
    targetWords: [
      {
        word: 'boomhutkliniek',
        breakdown: 'boomhut + kliniek',
        dutchMeaning: 'een speciaal ingerichte medische behandelplek hoog in een boom voor zieke en gewonde woudbewoners.',
        englishMeaning: 'Treehouse clinic'
      },
      {
        word: 'kruidenbalsem',
        breakdown: 'kruiden + balsem',
        dutchMeaning: 'een zachte, geurige zalf gemaakt van geneeskrachtige plantenbladeren om schrammen te verzachten.',
        englishMeaning: 'Herbal balm'
      },
      {
        word: 'boomeekhoorntje',
        breakdown: 'boom + eekhoorn + tje',
        dutchMeaning: 'een klein behendig knaagdier met een pluimstaart dat in boomtoppen leeft en noten verzamelt.',
        englishMeaning: 'Little tree squirrel'
      }
    ],
    mysteryQuestion: {
      clueTitle: '🐿️ Diagnostiek & Observatie #1',
      question: 'Waarom heeft het jonge boomeekhoorntje de hulp van dokter Ridheya nodig?',
      options: [
        'Hij heeft honger naar pinda\'s',
        'Hij heeft zijn voorpootje bezeerd bij een val uit een mangoboom',
        'Hij is zijn zonnebril kwijtgeraakt in het mos',
        'Hij wil leren blaffen zoals Kopi'
      ],
      correctIndex: 1,
      explanation: 'Het eekhoorntje heeft zijn pootje bezeerd tijdens een sprong en Ridheya hijst hem voorzichtig omhoog.'
    },
    choices: [
      { label: 'Leg het eekhoorntje op het mosbedje en leg een zacht bamboespalkje aan', nextPage: 2, skillBonus: '+15 Eerste Hulp', icon: '🌿' },
      { label: 'Geef het diertje wat zoet papajasap om op krachten te komen', nextPage: 2, skillBonus: '+15 Voedingsleer', icon: '🫐' }
    ]
  },
  {
    pageNumber: 2,
    title: 'Pipit de Vleermuis met de Gescheurde Vleugel',
    biome: 'Schaduwrijk Prieel in de Boomhut',
    storyText: `Terwijl het eekhoorntje tevreden lag te rusten op zijn moskussen, fladderde een kleine **vruchtenvleermuis** wankelend door het open raam naar binnen. Het diertje heette Pipit en was verstrikt geraakt in doornige rotanranken.

Ridheya pakte direct haar loep en onderzocht de vleugel. Tussen de fijne vingerbotjes zat een klein scheurtje in het elastische **vleugelvlies**. "Heel stil blijven liggen, dapper vriendje," sprak Ridheya fluisterzacht om het diertje gerust te stellen.

Met een druppeltje zuiverend kamillewater reinigde ze het wondje zorgvuldig. Vervolgens bracht ze met uiterste precisie een flinterdun, ademend **gaasverbandje** aan met natuurlijke harslijm. Pipit spreidde zijn vleugel voorzichtig uit en slaakte een piepje van pure opluchting!`,
    targetWords: [
      {
        word: 'vruchtenvleermuis',
        breakdown: 'vruchten + vleermuis',
        dutchMeaning: 'een vliegend zoogdier dat leeft van nectar en rijp tropisch fruit en helpt bij het bestuiven van het regenwoud.',
        englishMeaning: 'Fruit bat'
      },
      {
        word: 'vleugelvlies',
        breakdown: 'vleugel + vlies',
        dutchMeaning: 'het dunne, elastische huidmembraan tussen de vingers van een vleermuis waarmee hij kan zweven en vliegen.',
        englishMeaning: 'Wing membrane'
      },
      {
        word: 'gaasverbandje',
        breakdown: 'gaas + verband + je',
        dutchMeaning: 'een luchtig geweven medisch lapje stof dat wonden beschermt tegen vuil en bacteriën.',
        englishMeaning: 'Gauze dressing'
      }
    ],
    mysteryQuestion: {
      clueTitle: '🦇 Vleugelanatomie #2',
      question: 'Hoe zorgt Ridheya ervoor dat het scheurtje in het vleugelvlies van Pipit veilig kan genezen?',
      options: [
        'Ze knipt de hele vleugel af met een schaar',
        'Ze reinigt de wond met kamillewater en plakt een ademend, dun gaasverbandje',
        'Ze plakt er een zware stenen pleister op',
        'Ze legt de vleermuis in een emmer koud water'
      ],
      correctIndex: 1,
      explanation: 'Ridheya ontsmet de wond zacht met kamillewater en brengt een ademend gaasverbandje aan.'
    },
    choices: [
      { label: 'Maak een donker hangnestje van vilt in de rusthoek van de kliniek', nextPage: 3, skillBonus: '+15 Dierenwelzijn', icon: '🛖' },
      { label: 'Meng een versterkend nectardrankje van wilde orchideeën', nextPage: 3, skillBonus: '+15 Kruidengeneeskunde', icon: '🌸' }
    ]
  },
  {
    pageNumber: 3,
    title: 'Het Bibberende Nevelpantertje in de Moessonregen',
    biome: 'Bamboeterras tijdens een Tropische Stortbui',
    storyText: `Buiten begon de lucht plotseling donkerblauw te kleuren en barstte een warme tropische regenbui los. Zware regendruppels roffelden als trommels op de brede palmbladeren. Kopi spitste zijn oren en liep naar de veranda van de boomhut.

Daar zat een kletsnat, bibberend **nevelpantertje** ineengedoken onder een groot bananenblad. Het welpje was tijdens de onweersbui gescheiden geraakt van zijn moeder en rilde van de kou.

Ridheya handelde bliksemsnel: ze wikkelde het welpje in een dikke flanellen handdoek en wreef zijn vachtje zachtjes droog bij het warme kruidenkacheltje. Met haar **stethoscoop** luisterde ze naar de ademhaling: de longetjes klonken zuiver en het hartje klopte snel maar krachtig. Binnen een paar minuten begon het pantertje luid spinnend tegen haar arm aan te kruipen.`,
    targetWords: [
      {
        word: 'nevelpantertje',
        breakdown: 'nevel + panter + tje',
        dutchMeaning: 'een zeldzame en behendige gevlekte boskat uit Zuidoost-Azië die uitstekend in bomen kan klimmen.',
        englishMeaning: 'Clouded leopard cub'
      },
      {
        word: 'stethoscoop',
        dutchMeaning: 'een medisch luisterinstrument waarmee een arts naar het kloppen van het hart en het suizen van de longen luistert.',
        englishMeaning: 'Stethoscope'
      },
      {
        word: 'ademhaling',
        breakdown: 'adem + haling',
        dutchMeaning: 'het proces van lucht inademen voor zuurstof en weer uitademen.',
        englishMeaning: 'Breathing / respiration'
      }
    ],
    mysteryQuestion: {
      clueTitle: '🩺 Klinisch Onderzoek #3',
      question: 'Wat stelt dokter Ridheya vast wanneer ze met haar stethoscoop naar het pantertje luistert?',
      options: [
        'Het dier heeft een ernstige longontsteking',
        'Zijn longetjes klinken zuiver en zijn hartslag is regelmatig en gezond',
        'De stethoscoop werkt niet bij katachtigen',
        'Het pantertje kan praten'
      ],
      correctIndex: 1,
      explanation: 'Het onderzoek toont aan dat het welpje alleen koud was, maar verder gezonde longen en een sterk hartje heeft.'
    },
    choices: [
      { label: 'Geef het pantertje een kommetje lauwe geitenmelk met vitaminen', nextPage: 4, skillBonus: '+20 Welpenzorg', icon: '🥛' },
      { label: 'Luister met Kopi naar het verre gebrul van de moederpanter in het dal', nextPage: 4, skillBonus: '+20 Spoorzoeken', icon: '👂' }
    ]
  },
  {
    pageNumber: 4,
    title: 'De Geheime Receptuur tegen Junglekoorts',
    biome: 'Kruidentuin en Apothekershoek van de Boomhut',
    storyText: `Terwijl de regen langzaam overging in een lichte nevel, klom een bezorgde brillangur-aap de veranda op. Hij droeg zijn kleine jong op de rug, dat gloeide van de **junglekoorts**. Het aapje lag slap in de armen van zijn vader en wilde niet eten.

Ridheya wist dat ze geen tijd mocht verliezen. Ze raadpleegde haar handgeschreven kruidenencyclopedie. "Voor tropische koorts hebben we verse gemberwortel, citroengras en fijngestampte kurkuma nodig," legde ze uit aan Kopi.

Met een stenen vijzel vermaalde ze de geneeskrachtige planten tot een goudgeel siroopje. Met een zacht pipetje gaf ze het jonge aapje een paar druppels. Binnen een half uur zakte de koorts merkbaar, dronk het aapje wat vers kokoswater en greep het vrolijk naar Ridheya\'s ronde bril!`,
    targetWords: [
      {
        word: 'junglekoorts',
        breakdown: 'jungle + koorts',
        dutchMeaning: 'een verhoogde lichaamstemperatuur bij bosdieren veroorzaakt door infecties of tropische muggenbeten.',
        englishMeaning: 'Jungle fever'
      },
      {
        word: 'geneeskrachtige',
        breakdown: 'genees + krachtige',
        dutchMeaning: 'eigenschappen van bepaalde planten en kruiden die ziektes helpen genezen en pijn wegnemen.',
        englishMeaning: 'Medicinal / healing'
      },
      {
        word: 'vijzel',
        dutchMeaning: 'een zware stenen schaal met een stamper om kruiden, zaden en medicijnen fijn te wrijven.',
        englishMeaning: 'Mortar and pestle'
      }
    ],
    mysteryQuestion: {
      clueTitle: '🌿 Farmacie & Plantkunde #4',
      question: 'Hoe bereidt Ridheya het effectieve koortsverlagende drankje voor het jonge aapje?',
      options: [
        'Ze mengt suikerwater met zand',
        'Ze vermaalt gemberwortel, citroengras en kurkuma in een stenen vijzel tot een geneeskrachtig siroopje',
        'Ze belt een pizza koerier',
        'Ze geeft het aapje ijsblokjes'
      ],
      correctIndex: 1,
      explanation: 'Door de natuurlijke ontstekingsremmende kruiden te vermalen in de vijzel maakt ze een effectief drankje.'
    },
    choices: [
      { label: 'Wikkel het aapje in een verkoelend blad van de wilde gemberplant', nextPage: 5, skillBonus: '+20 Natuurtherapie', icon: '🍃' },
      { label: 'Noteer het succesvolle recept in je officiële dierenartsenlogboek', nextPage: 5, skillBonus: '+20 Farmacie', icon: '📝' }
    ]
  },
  {
    pageNumber: 5,
    title: 'De Neushoornvogel met de Gekneusde Vleugel',
    biome: 'Kruin van de Reuzen-Dipterocarpboom',
    storyText: `Hoog boven de boomhut klonk een zware slag van vleugels. Een imposante Maleisische **neushoornvogel** met een prachtige goudgele snavelhoorn landde moeizaam op de leuning. Zijn rechtervleugel hing slap naar beneden na een botsing met een zware liaan.

Ridheya naderde de grote vogel met het volste respect. De vogel boog zijn kop zodat Ridheya de slagpennen en het ellebooggewricht kon betasten. Er was geen breuk, maar wel een pijnlijke **gewrichtskneuzing**.

Ridheya pakte twee lichte spalklatjes van soepel rotanhout en omwikkelde het vleugelgewricht met een elastische vogelspalk. "Over drie dagen is je spier weer helemaal hersteld en vlieg je weer als een koning door het woud," beloofde Ridheya met een glimlach. De vogel klakte zachtjes met zijn snavel als dankbetuiging.`,
    targetWords: [
      {
        word: 'neushoornvogel',
        breakdown: 'neushoorn + vogel',
        dutchMeaning: 'een grote tropische woudvogel met een opvallende gebogen helmhoorn bovenop zijn reusachtige snavel.',
        englishMeaning: 'Hornbill'
      },
      {
        word: 'gewrichtskneuzing',
        breakdown: 'gewricht + s + kneuzing',
        dutchMeaning: 'een pijnlijke beschadiging van spieren en pezen rond een botverbinding zonder dat het bot zelf gebroken is.',
        englishMeaning: 'Joint contusion / sprain'
      },
      {
        word: 'dankbetuiging',
        breakdown: 'dank + betuiging',
        dutchMeaning: 'een gebaar, woord of uiting waarmee iemand laat merken hoe dankbaar hij is voor bewezen hulp.',
        englishMeaning: 'Expression of gratitude'
      }
    ],
    mysteryQuestion: {
      clueTitle: '🦜 Vogelgeneeskunde #5',
      question: 'Welke diagnose stelt dokter Ridheya na het betasten van de vleugel van de neushoornvogel?',
      options: [
        'De vogel heeft een gebroken snavel',
        'Er is geen botbreuk, maar een pijnlijke gewrichtskneuzing die ondersteund moet worden met een soepele spalk',
        'De vogel is te zwaar om te vliegen',
        'De vogel heeft een bril nodig'
      ],
      correctIndex: 1,
      explanation: 'Het bot is intact; een elastische spalk van rotanhout geeft het gekneusde gewricht rust om te herstellen.'
    },
    choices: [
      { label: 'Geef de neushoornvogel wat sappige wilde vijgen ter versterking', nextPage: 6, skillBonus: '+25 Vogelherstel', icon: '🫐' },
      { label: 'Inspecteer samen met Kopi de hele boomhutkliniek voor de officiële inspectie', nextPage: 6, skillBonus: '+25 Organisatie', icon: '🔍' }
    ]
  },
  {
    pageNumber: 6,
    title: 'Het Grote Woudfeest & Het Officiële Keurmerk',
    biome: 'Feestelijke Verlichte Open Plek onder de Regenboog',
    storyText: `Toen de avond viel, verlichtten duizenden vuurvliegjes de takken rond de boomhut als fonkelende lantaarns. Tussen de bamboestengels verscheen de trotse moederpanter, die haar herstelde welpje met diep spinnend gebrul tegen zich aandrukte. Het eekhoorntje sprong weer lenig van tak naar tak en vleermuis Pipit vloog sierlijke rondjes door de lucht.

Boswachter Amir en Hemali arriveerden via de hangbrug. Amir overhandigde Ridheya een handgesneden teakhouten uithangbord: *'Officiële Koninklijke Dierenkliniek van Taman Negara - Hoofdarts Ridheya'*.

Alle dieren van het woud bogen eerbiedig hun kop. Ridheya voelde een golf van trots door haar hart stromen. Haar passie voor dierenverzorging, haar scherpe observatiekracht en haar onwankelbare liefde voor de natuur hadden van de boomhut het veiligste toevluchtsoord van heel Maleisië gemaakt!`,
    targetWords: [
      {
        word: 'toevluchtsoord',
        breakdown: 'toevlucht + s + oord',
        dutchMeaning: 'een veilige, beschermde plek waar dieren en mensen in gevaar rust, zorg en onderdak vinden.',
        englishMeaning: 'Haven / sanctuary / refuge'
      },
      {
        word: 'observatiekracht',
        breakdown: 'observatie + kracht',
        dutchMeaning: 'het vermogen om heel nauwkeurig, geduldig en opmerkzaam details waar te nemen.',
        englishMeaning: 'Power of observation'
      },
      {
        word: 'passie',
        dutchMeaning: 'een diepe, enthousiaste liefde en toewijding voor een vak of activiteit.',
        englishMeaning: 'Passion / dedication'
      }
    ],
    mysteryQuestion: {
      clueTitle: '🏆 Hoofddiploma & Synthese #6',
      question: 'Wat is de voornaamste didactische les die Ridheya leert tijdens haar werk in de boomhutkliniek?',
      options: [
        'Dat wilde dieren liever in kooien worden opgesloten',
        'Dat geduldige observatie, kennis van natuurlijke medicijnen en echte toewijding elk gewond dier weer gezond kunnen maken',
        'Dat regenwouden te lawaaierig zijn voor dokters',
        'Dat boomhutten alleen voor vakanties zijn'
      ],
      correctIndex: 1,
      explanation: 'Ridheya heeft bewezen dat observatievermogen, kruidenkennis en empathie de sleutel zijn tot genezing.'
    },
    choices: [
      { label: 'Hang het teakhouten bordje trots aan de voordeur van de boomhut', nextPage: 1, skillBonus: '👑 Officiële Koninklijke Opperdierenarts Trofee!', icon: '🌟' }
    ]
  }
];
