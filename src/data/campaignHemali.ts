import { RpgPage } from './citoRpgData';

export const HEMALI_12_PAGES_CAMPAIGN: RpgPage[] = [
  {
    pageNumber: 1,
    title: 'De Flikkerende Sterrenkaart van Kinabalu',
    biome: 'Sterrenobservatorium op de Bergtop',
    storyText: `Hemali sloeg haar met goud afgezette expeditiejas dicht tegen de gure bergwarmte. Haar saffieren amulet pulseerde zachtjes met een helderblauw licht. Op de eikenhouten leestafel lag een **astronomisch** perkament uitgerold, waarop de baan van de kometen stond gegraveerd. 

Plotseling begon het midden van het perkament te vonken. Er verscheen een geheimzinnig citaat: *'Alleen wie de logica van de signaalwoorden doorgrondt, kan het verloren **astrolabium** der Tijdwachters lokaliseren.'* Hemali voelde **desondanks** geen greintje vrees. Met haar schrandere glimlach doopte zij haar ganzenveer in de inkt om de tekst nauwkeurig te ontleden.`,
    targetWords: [
      {
        word: 'astrolabium',
        dutchMeaning: 'een historisch instrument waarmee astronomen en zeevaarders de stand van hemellichamen berekenden.',
        englishMeaning: 'Astrolabe'
      },
      {
        word: 'desondanks',
        dutchMeaning: 'toch, alhoewel er sprake is van een belemmering of gevaar.',
        englishMeaning: 'Nevertheless / despite that'
      },
      {
        word: 'astronomisch',
        dutchMeaning: 'betrekking hebbend op de sterrenkunde en het heelal.',
        englishMeaning: 'Astronomical / celestial'
      }
    ],
    mysteryQuestion: {
      clueTitle: '📜 Cito Signaalwoorden #1',
      question: 'Welk tekstverband wordt aangeduid met het woord "desondanks" in de tweede alinea?',
      options: [
        'Een chronologische opsomming van feiten',
        'Een tegenstelling: ondanks de geheimzinnige waarschuwing voelde Hemali geen angst',
        'Een oorzaak-gevolgrelatie over het weer',
        'Een vergelijking tussen twee pennen'
      ],
      correctIndex: 1,
      explanation: '"Desondanks" markeert een tegenstelling: hoewel het perkament een waarschuwing gaf, bleef Hemali onbevreesd.'
    },
    choices: [
      { label: 'Activeer het saffieren amulet voor een teleportatiesprong naar het Nevelplateau', nextPage: 2, skillBonus: '+15 Teleportatiekracht', icon: '✨' },
      { label: 'Raadpleeg eerst de astrale uil Tycho over de oude runen', nextPage: 2, skillBonus: '+15 Wijsheid', icon: '🦉' }
    ]
  },
  {
    pageNumber: 2,
    title: 'De Teleportatiesprong naar het Nevelplateau',
    biome: 'Zwevend Marmeren Plateau in de Wolken',
    storyText: `Een flits van azuurblauw licht verlichtte de nachtelijke hemel. In een fractie van een seconde had Hemali zich geteleporteerd naar het zwevende **nevelplateau**. Rondom haar zweefden eeuwenoude pilaren van wit marmer boven het wolkendek.

**Daardoor** dat zij haar val perfect had gecalculeerd, landde zij geruisloos op een grote runensteen. Voor haar rees een gigantische zonnewijzer op die werd aangedreven door kristallen tandwielen. Echter, het centrale tandwiel ontbrak, **waardoor** de tijdmechanismen van het universum haperden.`,
    targetWords: [
      {
        word: 'nevelplateau',
        breakdown: 'nevel + plateau',
        dutchMeaning: 'een hooggelegen, vlakke rotsvlakte omringd door dichte wolken en mist.',
        englishMeaning: 'Mist plateau / celestial terrace'
      },
      {
        word: 'daardoor',
        dutchMeaning: 'om die specifieke reden, als logisch gevolg van het voorgaande.',
        englishMeaning: 'As a result / therefore'
      },
      {
        word: 'waardoor',
        dutchMeaning: 'met het gevolg dat; verbindt een oorzaak aan het effect.',
        englishMeaning: 'Whereby / causing which'
      }
    ],
    mysteryQuestion: {
      clueTitle: '🧠 Causaliteit & Gevolgen #2',
      question: 'Waarom haperden de tijdmechanismen op het nevelplateau?',
      options: [
        'Omdat het te hard waaide op de berg',
        'Omdat het centrale kristallen tandwiel ontbrak in het aandrijfsysteem',
        'Omdat Hemali te laat was geland',
        'Omdat de zonnewijzer van hout was gemaakt'
      ],
      correctIndex: 1,
      explanation: 'De tekst stelt uitdrukkelijk dat het ontbreken van het centrale tandwiel de storing in het mechanisme veroorzaakte.'
    },
    choices: [
      { label: 'Onderzoek de ingegraveerde inscripties rond de zonnewijzer', nextPage: 3, skillBonus: '+15 Runenkunde', icon: '🔍' },
      { label: 'Roep met een mentale klankgolf naar de wijze olifant Raja', nextPage: 3, skillBonus: '+15 Telepathie', icon: '🐘' }
    ]
  },
  {
    pageNumber: 3,
    title: 'Het Raadsel van de Schaduwwijzer',
    biome: 'Zonnewijzer van Graniet & Saffier',
    storyText: `De inscriptie op de rand van de granieten wijzerplaat bevatte een filosofisch raadsel. Het luidde: *'Wie haastig oordeelt, tast in het duister. **Bovendien** verliest men de essentie van het betoog wanneer bijzaken voor hoofdzaken worden aangezien.'*

Hemali bestudeerde de schaduwlijn. **Hetgeen** zij waarnam, was een minuscuul sleutelgat verborgen achter het cijfer negen. Om de sleutel tevoorschijn te toveren, moest zij het signaalwoord van opsomming in de inscriptie identificeren en uitspreken in zuiver Nederlands.`,
    targetWords: [
      {
        word: 'bovendien',
        dutchMeaning: 'daarbovenop, ook nog eens (signaalwoord van opsomming).',
        englishMeaning: 'Furthermore / moreover'
      },
      {
        word: 'hetgeen',
        dutchMeaning: 'datgene wat, wat (betrekkelijk voornaamwoord).',
        englishMeaning: 'Which / that which'
      },
      {
        word: 'essentie',
        dutchMeaning: 'het allerbelangrijkste van een zaak of betoog; de kern.',
        englishMeaning: 'Essence / core substance'
      }
    ],
    mysteryQuestion: {
      clueTitle: '📖 Cito Grammatica & Functie #3',
      question: 'Wat is de taalkundige functie van het woord "Bovendien" in de inscriptie?',
      options: [
        'Het drukt een voorwaarde uit',
        'Het voegt een argument toe in een opsomming van waarschuwingen',
        'Het geeft een tegenstelling aan met de zon',
        'Het wijst een plaats in het bos aan'
      ],
      correctIndex: 1,
      explanation: '"Bovendien" is een signaalwoord van opsomming: het voegt een tweede belangrijk argument toe.'
    },
    choices: [
      { label: 'Spreek het signaalwoord "Bovendien" hardop uit met je toverstaf', nextPage: 4, skillBonus: '+15 Uitspraak & Magie', icon: '🪄' },
      { label: 'Gebruik het saffieren amulet om het sleutelgat te scannen', nextPage: 4, skillBonus: '+15 Detectivelogica', icon: '💎' }
    ]
  },
  {
    pageNumber: 4,
    title: 'De Telepathische Boodschap van Olifant Raja',
    biome: 'Bamboevallei onder het Plateau',
    storyText: `Zodra het woord weerklonk, opende een verborgen compartiment zich met een zachte klik. Er verscheen een zilveren spiegel. Opeens weerklonk de diepe, sonore stem van de wijze olifant Raja in Hemali’s gedachten.

*“Gegroet, schrandere Hemali,”* sprak Raja telepathisch. *“De storm der vergetelheid nadert. **Nochtans** bezit jij de intellectuele scherpte om de vier elementaire tandwielen te herenigen. Zoek babygiraf Appel in het bamboebos; **deze** bewaart het tandwiel van het Noorderlicht.”* Hemali knikte vol ontzag naar haar mentale leermeester.`,
    targetWords: [
      {
        word: 'nochtans',
        dutchMeaning: 'echter, niettemin, toch (formeel signaalwoord van tegenstelling).',
        englishMeaning: 'Nevertheless / nonetheless'
      },
      {
        word: 'telepathisch',
        breakdown: 'tele + pathisch',
        dutchMeaning: 'gedachten en gevoelens overbrengen op afstand zonder woorden uit te spreken.',
        englishMeaning: 'Telepathic'
      },
      {
        word: 'sonore',
        dutchMeaning: 'diep, warm en welluidend van klank.',
        englishMeaning: 'Sonorous / resonant'
      }
    ],
    mysteryQuestion: {
      clueTitle: '🐘 Verwijswoorden Cito #4',
      question: 'Naar wie of wat verwijst het woord "deze" in de zin: "Zoek babygiraf Appel in het bamboebos; deze bewaart het tandwiel..."?',
      options: [
        'Naar de wijze olifant Raja',
        'Naar het bamboebos',
        'Naar babygiraf Appel',
        'Naar het saffieren amulet'
      ],
      correctIndex: 2,
      explanation: '"Deze" fungeert hier als aanwijzend voornaamwoord dat terugslaat op de zojuist genoemde babygiraf Appel.'
    },
    choices: [
      { label: 'Teleporteer direct naar het bamboebos om Appel te begroeten', nextPage: 5, skillBonus: '+15 Vriendschap', icon: '🦒' },
      { label: 'Laat uil Tycho vooruitvliegen om de omgeving te inspecteren', nextPage: 5, skillBonus: '+15 Strategie', icon: '🦉' }
    ]
  },
  {
    pageNumber: 5,
    title: 'De Ontmoeting met Girafje Appel',
    biome: 'Gouden Acaciabos & Bamboehaag',
    storyText: `Tussen de geurige acaciastruiken trof Hemali het jonge girafje aan. Haar unieke vacht met appelvormige vlekjes glansde in het maanlicht. Het diertje knabbelde rustig op zoete blaadjes, **hoewel** er in de verte onweerswolken samenpakten.

Aan Appels halsband hing een schitterend kristallen tandwiel met het zegel van het Noorderlicht. Appel boog haar lange ranke nek en drukte haar snuitje teder tegen Hemali’s wang. Hemali haalde een kom met verse kokosnectar uit haar expeditietas, **waarmee** zij het diertje versterkte voor de komende beproeving.`,
    targetWords: [
      {
        word: 'acaciastruiken',
        breakdown: 'acacia + struiken',
        dutchMeaning: 'tropische struiken met voedzame bladeren en zoete bloesem.',
        englishMeaning: 'Acacia shrubs'
      },
      {
        word: 'waarmee',
        dutchMeaning: 'met welk middel of instrument; verbindt de handeling met het voorwerp.',
        englishMeaning: 'With which / whereby'
      },
      {
        word: 'beproeving',
        breakdown: 'be + proeving',
        dutchMeaning: 'een zware test van moed, kennis of uithoudingsvermogen.',
        englishMeaning: 'Trial / ordeal'
      }
    ],
    mysteryQuestion: {
      clueTitle: '🧠 Tekstbegrip #5',
      question: 'Wat droeg babygiraf Appel aan haar halsband volgens de tekst?',
      options: [
        'Een gouden belletje dat rinkelt in de wind',
        'Een schitterend kristallen tandwiel met het zegel van het Noorderlicht',
        'Een sleutel van roestig ijzer',
        'Een briefje van haar ouders'
      ],
      correctIndex: 1,
      explanation: 'De tekst vermeldt expliciet dat het kristallen tandwiel aan Appels halsband hing.'
    },
    choices: [
      { label: 'Bevestig het tandwiel veilig in je magische expeditielogboek', nextPage: 6, skillBonus: '+15 Inventarisbeheer', icon: '📖' },
      { label: 'Reis samen met Appel naar de Geheime Bibliotheek van Caelum', nextPage: 6, skillBonus: '+15 Karavaanleiding', icon: '🏛️' }
    ]
  },
  {
    pageNumber: 6,
    title: 'De Zwevende Bibliotheek van Caelum',
    biome: 'Gewelf vol Vliegende Boeken & Zuilen',
    storyText: `De vrienden bereikten de legendarische bibliotheek van Caelum. Duizenden oude perkamenten en boeken vlogen geruisloos door de lucht als magische vogels. In het centrum waakte een sfinxachtige bewaarder van graniet.

*“Wie binnentreedt,”* galmde de bewaarder, *“moet aantonen dat zij complexe bijzinnen kan ontleden. **Enerzijds** vraagt de wetenschap om strakke logica, **anderzijds** vereist de poëzie pure verbeeldingskracht.”* Hemali knikte zelfverzekerd: de harmonie tussen rede en verbeelding was immers haar grootste troef!`,
    targetWords: [
      {
        word: 'enerzijds',
        dutchMeaning: 'aan de ene kant (vormt een paar met anderzijds om twee kanten te belichten).',
        englishMeaning: 'On the one hand'
      },
      {
        word: 'anderzijds',
        dutchMeaning: 'aan de andere kant; stelt de tegenoverliggende zijde vast.',
        englishMeaning: 'On the other hand'
      },
      {
        word: 'verbeeldingskracht',
        breakdown: 'verbeelding + s + kracht',
        dutchMeaning: 'het vermogen om creatieve ideeën en werelden in gedachten te scheppen.',
        englishMeaning: 'Imagination / imaginative power'
      }
    ],
    mysteryQuestion: {
      clueTitle: '📜 Cito Stijlfiguren #6',
      question: 'Welk tekstueel verband legt de uitspraak "Enerzijds... anderzijds"?',
      options: [
        'Een opsomming van drie gelijke getallen',
        'Het tegenover elkaar stellen en nuanceren van twee noodzakelijke eigenschappen (logica én fantasie)',
        'Een verklaring waarom boeken kunnen vliegen',
        'Een waarschuwing tegen vuur'
      ],
      correctIndex: 1,
      explanation: '"Enerzijds... anderzijds" nuanceert twee complementaire kanten: wetenschappelijke logica en creatieve verbeelding.'
    },
    choices: [
      { label: 'Draag een klassiek Nederlands gedicht voor om de granieten sfinx te eren', nextPage: 7, skillBonus: '+15 Poëziekracht', icon: '📜' },
      { label: 'Los het wiskundige geometrie-raadsel op van de zwevende boeken', nextPage: 7, skillBonus: '+15 Intellect', icon: '📐' }
    ]
  },
  {
    pageNumber: 7,
    title: 'Het Geheim van de Vier Elementaire Tandwielen',
    biome: 'Sanctuarium van de Tijdwachters',
    storyText: `De stenen deuren zwaaiden open. In het sanctuarium zweefden de vier ontbrekende onderdelen: het tandwiel van Water, Vuur, Aarde en Kosmos. 

De inscriptie luidde: *'De poort naar het centrale astrolabium opent slechts, **mits** de ontdekkingsreiziger de elementen in de juiste volgorde van oorzaak en gevolg plaatst. **Tenzij** deze voorwaarde wordt vervuld, zal de tijdspoort verzegeld blijven.'* Hemali pakte haar ganzenveer en bracht de chronologische volgorde foutloos in kaart.`,
    targetWords: [
      {
        word: 'mits',
        dutchMeaning: 'op voorwaarde dat, alleen wanneer (voorwaardelijk signaalwoord).',
        englishMeaning: 'Provided that / on the condition that'
      },
      {
        word: 'tenzij',
        dutchMeaning: 'behalve als, in het geval dat niet (beperkend signaalwoord).',
        englishMeaning: 'Unless'
      },
      {
        word: 'sanctuarium',
        dutchMeaning: 'een heilige, beschermde en geheime ruimte.',
        englishMeaning: 'Sanctuary / sacred chamber'
      }
    ],
    mysteryQuestion: {
      clueTitle: '💡 Cito Voorwaarden #7',
      question: 'Wat is het verschil tussen "mits" en "tenzij" volgens de logica van de tekst?',
      options: [
        'Er is geen enkel verschil; het zijn synoniemen van "en".',
        '"Mits" noemt de positieve voorwaarde (alleen als), terwijl "tenzij" het uitzonderingsgeval noemt (behalve als).',
        '"Mits" betekent altijd "nooit".',
        '"Tenzij" slaat alleen op de tijd in de ochtend.'
      ],
      correctIndex: 1,
      explanation: '"Mits" stelt een verplichte voorwaarde (mits je de volgorde juist hebt), "tenzij" noemt de uitzondering.'
    },
    choices: [
      { label: 'Plaats de tandwielen: Aarde (1), Water (2), Vuur (3), Kosmos (4)', nextPage: 8, skillBonus: '+15 Logische Deductie', icon: '⚙️' },
      { label: 'Laat Raja telepathisch controleren of de resonantie zuiver is', nextPage: 8, skillBonus: '+15 Resonantie', icon: '🐘' }
    ]
  },
  {
    pageNumber: 8,
    title: 'De Kosmische Moesson & De Schaduwstorm',
    biome: 'Buitenkant van de Hemeltempel',
    storyText: `Buiten stak een hevige kosmische moesson op. Paarse bliksemscheuten flitsten tussen de nevels door. Grote rukwinden teisterden de stenen balustrades, **desalniettemin** bleven Hemali, Raja en Appel roerloos op hun post.

Hemali hief haar saffieren toverstaf en riep een **beschermkoepel** van zuivere energie op. De storm beukte tegen het azuren schild, maar kon de harmonie binnenin niet verstoren. Hemali’s kalmte en vastberadenheid gaven haar vrienden onwankelbaar vertrouwen.`,
    targetWords: [
      {
        word: 'desalniettemin',
        dutchMeaning: 'ondanks dat, niettemin (formeel signaalwoord van tegenstelling).',
        englishMeaning: 'Nonetheless / nevertheless'
      },
      {
        word: 'beschermkoepel',
        breakdown: 'bescherm + koepel',
        dutchMeaning: 'een halfronde energetische barrière die beschermt tegen storm en gevaar.',
        englishMeaning: 'Protective dome / energy shield'
      },
      {
        word: 'onwankelbaar',
        breakdown: 'on + wankel + baar',
        dutchMeaning: 'zo stevig en standvastig dat het door niets omver te werpen is.',
        englishMeaning: 'Unshakeable / steadfast'
      }
    ],
    mysteryQuestion: {
      clueTitle: '🧠 Tekstinterpretatie #8',
      question: 'Waarom kon de zware kosmische moesson de vrienden niet deren?',
      options: [
        'Omdat ze allemaal in slaap waren gevallen',
        'Omdat Hemali een ondoordringbare beschermkoepel had opgeroepen en standvastig bleef',
        'Omdat de storm plotseling van richting veranderde naar zee',
        'Omdat de stenen tempel ondergronds lag'
      ],
      correctIndex: 1,
      explanation: 'Hemali’s energetische beschermkoepel en haar standvastige houding weerstonden de zware storm.'
    },
    choices: [
      { label: 'Leid de bliksemenergie af naar het aardedraad van het astrolabium', nextPage: 9, skillBonus: '+15 Energiebeheersing', icon: '⚡' },
      { label: 'Zing met Raja een kalmerende melodie om de wolken te bedaren', nextPage: 9, skillBonus: '+15 Natuurharmonie', icon: '🎶' }
    ]
  },
  {
    pageNumber: 9,
    title: 'Het Herstel van het Grote Astrolabium',
    biome: 'Het Hart van het Hemelobservatorium',
    storyText: `Toen de storm ging liggen, straalde de centrale kamer in volle glorie. Hemali plaatste het laatste saffieren kristal in het hart van het grote astrolabium. **Zodoende** sloten alle gouden raderen naadloos op elkaar aan.

Met een melodieuze klank begon het reusachtige instrument te wentelen. De banen van de planeten werden geprojecteerd op de gewelven als glinsterende lichtsporen. De tijdstromen in het rijk vloeiden weer gelijkmatig en vredig. Girafje Appel danste vrolijk in het rond, terwijl de wijze Raja een diepe trompetstoot van vreugde liet horen!`,
    targetWords: [
      {
        word: 'zodoende',
        dutchMeaning: 'op die manier, daardoor (geeft aan hoe het resultaat bereikt werd).',
        englishMeaning: 'Thus / in doing so'
      },
      {
        word: 'wentelen',
        dutchMeaning: 'soepel en regelmatig om een as ronddraaien.',
        englishMeaning: 'Revolving / rotating smoothly'
      },
      {
        word: 'naadloos',
        breakdown: 'naad + loos',
        dutchMeaning: 'zo perfect passend dat er geen enkele opening of fout te zien is.',
        englishMeaning: 'Seamlessly'
      }
    ],
    mysteryQuestion: {
      clueTitle: '🔍 Oorzaak & Gevolg #9',
      question: 'Wat was het directe gevolg van het plaatsen van het saffieren kristal?',
      options: [
        'Het astrolabium begon soepel te wentelen en herstelde de harmonieuze tijdstromen',
        'Alle lichten vielen uit in de hele tempel',
        'De saffieren toverstaf brak in tweeën',
        'De sfinx sloot de deuren voorgoed'
      ],
      correctIndex: 0,
      explanation: 'Door het plaatsen van het kristal sloten de raderen naadloos aan en begon het astrolabium perfect te functioneren.'
    },
    choices: [
      { label: 'Bestudeer de toekomstige sterrenkaarten over het Drijvende Nevelkasteel', nextPage: 10, skillBonus: '+15 Voorspellingskracht', icon: '🌌' },
      { label: 'Deel het succes met de Tijdwachters via de spiegel van de waarheid', nextPage: 10, skillBonus: '+15 Communicatie', icon: '🪞' }
    ]
  },
  {
    pageNumber: 10,
    title: 'De Verschijning van de Tijdwachters',
    biome: 'Astraal Lichtgewelf',
    storyText: `Boven het wentelende astrolabium manifesteerden zich de doorschijnende gedaanten van de Oude Tijdwachters. Hun gewaden waren geweven van puur sterrenlicht.

De oudste Tijdwachter trad naar voren: *“Hemali, gij hebt niet slechts raadsels opgelost, maar bewezen dat taalvaardigheid, logische argumentatie en empathie de pilaren der beschaving vormen. **Hetgeen** velen voor onmogelijk hielden, hebt gij met vlag en wimpel volbracht.”* Zij overhandigden haar de Gouden Schrijverscalamus, een ganzenveer die nooit zonder inkt raakt.`,
    targetWords: [
      {
        word: 'manifesteerden',
        dutchMeaning: 'zichzelf zichtbaar en tastbaar maken.',
        englishMeaning: 'Manifested / appeared'
      },
      {
        word: 'beschaving',
        breakdown: 'be + schaving',
        dutchMeaning: 'een hoogontwikkelde maatschappij gebaseerd op cultuur, rechtvaardigheid en kennis.',
        englishMeaning: 'Civilization'
      },
      {
        word: 'schrijverscalamus',
        dutchMeaning: 'een ceremoniële ganzenveer van geleerden en kroniekschrijvers.',
        englishMeaning: 'Scholar’s writing quill'
      }
    ],
    mysteryQuestion: {
      clueTitle: '👑 Cito Hoofdgedachte #10',
      question: 'Wat prijzen de Tijdwachters vooral in Hemali?',
      options: [
        'Haar vermogen om heel hard te rennen',
        'Haar beheersing van taalvaardigheid, logische argumentatie en empathie',
        'Haar gouden schoenen',
        'Dat ze nooit boeken leest'
      ],
      correctIndex: 1,
      explanation: 'De Tijdwachters benadrukken dat haar taalbeheersing, logica en medeleven de ware sleutels tot succes zijn.'
    },
    choices: [
      { label: 'Schrijf de kroniek van de Tijdwachters in het grote universiteitsboek', nextPage: 11, skillBonus: '+20 Kroniekschrijver', icon: '✍️' },
      { label: 'Bereid je voor op de hereniging met je zus Ridheya', nextPage: 11, skillBonus: '+20 Zusterband', icon: '👑' }
    ]
  },
  {
    pageNumber: 11,
    title: 'De Kroniek van Kosmische Harmonie',
    biome: 'Grote Zaal der Wijsheid',
    storyText: `Met haar nieuwe Gouden Schrijverscalamus noteerde Hemali de belangrijkste didactische lessen van haar tocht. Zij schreef over de kracht van signaalwoorden van tegenstelling (*desondanks*, *nochtans*), de noodzaak van heldere verwijswoorden (*hetgeen*, *waarmee*), en de schoonheid van logische gevolgtrekkingen.

Raja en Appel keken met grote trots over haar schouder mee. *“Jouw geschriften zullen generaties jonge lezers inspireren,”* sprak Raja met zijn diepe stem. *“Nu is het tijd om samen met Ridheya de krachten te bundelen voor het allergrootste avontuur!”*`,
    targetWords: [
      {
        word: 'didactisch',
        dutchMeaning: 'geschikt om anderen iets waardevols te leren of te onderwijzen.',
        englishMeaning: 'Didactic / educational'
      },
      {
        word: 'gevolgtrekking',
        breakdown: 'gevolg + trekking',
        dutchMeaning: 'een logische conclusie die voortvloeit uit eerdere argumenten.',
        englishMeaning: 'Logical deduction / inference'
      },
      {
        word: 'generaties',
        dutchMeaning: 'groepen mensen of lezers van dezelfde leeftijdstijdperken.',
        englishMeaning: 'Generations'
      }
    ],
    mysteryQuestion: {
      clueTitle: '📖 Cito Tekstdoel #11',
      question: 'Wat is het hoofddoel van Hemali bij het schrijven van haar kroniek?',
      options: [
        'Een grap uithalen met de wachters',
        'Haar opgedane kennis en taallessen vastleggen om toekomstige lezers te onderwijzen en te inspireren',
        'Zoveel mogelijk papier verspillen',
        'Haar handschrift verbergen'
      ],
      correctIndex: 1,
      explanation: 'Haar kroniek heeft een didactisch doel: het vastleggen en delen van taal- en denkvaardigheden.'
    },
    choices: [
      { label: 'Aanvaard de Opper-Mage van de Wijsheid Laureaat & Certificaat', nextPage: 12, skillBonus: '+25 Doorstroomtoets Uitmuntendheid', icon: '🎓' }
    ]
  },
  {
    pageNumber: 12,
    title: 'De Kroning tot Opper-Mage der Wijsheid',
    biome: 'Zonovergoten Hemelkoepel van Kinabalu',
    storyText: `Op het hoogste terras van de bergtop werd Hemali feestelijk gehuldigd. Haar saffieren amulet straalde in perfecte harmonie met de opkomende ochtendzon. Girafje Appel droeg een krans van gouden acaciabloemen en de wijze olifant Raja boog zijn majestueuze hoofd.

Hemali glimlachte met haar kenmerkende schrandere blik. Zij had bewezen dat geen Cito-vraagstuk of magische barrière ondoordringbaar is voor wie met toewijding, scherpe grammatica en een warm hart te werk gaat. Met een elegante teleportatiezwaai zette zij koers naar haar dappere zusje Ridheya. Het volgende hoofdstuk wacht!`,
    targetWords: [
      {
        word: 'gehuldigd',
        dutchMeaning: 'openlijk geprezen en geëerd voor buitengewone prestaties.',
        englishMeaning: 'Honored / celebrated'
      },
      {
        word: 'toewijding',
        breakdown: 'toe + wijding',
        dutchMeaning: 'met volle inzet, passie en zorgvuldigheid werken aan een doel.',
        englishMeaning: 'Dedication / devotion'
      },
      {
        word: 'ondoordringbaar',
        breakdown: 'on + door + dring + baar',
        dutchMeaning: 'waar je niet doorheen kunt komen; onmogelijk te passeren.',
        englishMeaning: 'Impenetrable / insurmountable'
      }
    ],
    mysteryQuestion: {
      clueTitle: '🏆 Cito Eindevaluatie #12',
      question: 'Welke overkoepelende boodschap vormt de apotheose van Hemali’s 12-delige queeste?',
      options: [
        'Dat magie altijd belangrijker is dan hard studeren',
        'Dat toewijding, scherpe taalbeheersing, logica en medeleven elke belemmering overwinnen',
        'Dat teleportatie alleen werkt als je geen huiswerk maakt',
        'Dat sterrenkaarten overbodig zijn'
      ],
      correctIndex: 1,
      explanation: 'De queeste toont aan dat toewijding, taalvaardigheid en empathie de ware sleutels tot overwinning zijn.'
    },
    choices: [
      { label: 'Voltooi de Campagne & Sla je Meesterscore op in het Rapport', nextPage: 1, skillBonus: '👑 Doorstroomtoets 1F-2F Excellentie!', icon: '🌟' }
    ]
  }
];
