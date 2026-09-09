import type { Dictionary } from './types';

/** English. */
export const en: Dictionary = {
  meta: {
    siteName: 'Auto Vacuum',
    titleSuffix: 'Auto Vacuum · Abovyan',
    defaultDescription:
      'Paintless dent repair in Armenia — vacuum and PDR. Hail, impacts and minor accidents. 37/1 Sevan St., Abovyan. Call 099 22 95 90.',
    ogImageAlt: 'Auto Vacuum — paintless dent repair, Abovyan, Armenia',
  },

  nav: {
    home: 'Home',
    services: 'Services',
    works: 'Work',
    process: 'How we work',
    faq: 'Questions',
    location: 'Location',
    contact: 'Contact',
    openMenu: 'Open menu',
    closeMenu: 'Close menu',
    menuLabel: 'Menu',
    languageLabel: 'Language',
    currentLanguage: 'Current language',
    skipToContent: 'Skip to content',
    breadcrumb: 'Breadcrumb',
  },

  common: {
    call: 'Call',
    callWithNumber: 'Call 099 22 95 90',
    callAria: 'Call 099 22 95 90',
    phoneLabel: 'Phone',
    directions: 'Get directions',
    onTheMap: 'Map',
    instagram: 'Instagram',
    youtube: 'YouTube',
    before: 'Before',
    after: 'After',
    watchOnYoutube: 'Watch on YouTube',
    playVideo: 'Play video',
    all: 'All',
    filterLabel: 'Show',
    address: 'Address',
    openingHours: 'Opening hours',
    hoursUnknown: 'Call to confirm the time.',
    sourceNote:
      'Every photo here is a frame from our own videos. The full videos are on YouTube and Instagram.',
    readMore: 'Read more',
    backHome: 'Back to the home page',
    damageState: { before: 'The damage', after: 'After the repair', process: 'During the work' },
  },

  hero: {
    eyebrow: 'PDR · Vacuum dent repair',
    h1: 'We take dents out of car bodies without repainting',
    lead:
      'Dents from hail, impacts and minor accidents can often be worked out without paint or filler, keeping the factory finish on the panel.',
    primaryCta: 'Call 099 22 95 90',
    secondaryCta: 'How to find us',
    dragHint: 'Drag the line',
    comparisonLabel: 'Before and after — roof panel',
    comparisonCaption:
      'Watch the line of light on the roof. Over a dent the line bends; on a corrected panel it runs straight again.',
    locationLine: '37/1 Sevan St., Abovyan',
    scrollCue: 'See the work',
  },

  trust: {
    label: 'Why us',
    items: [
      {
        title: 'The factory paint stays',
        body:
          'The dent is worked from behind, pushing the metal back where it belongs. No paint, no filler — when the damage allows it.',
      },
      {
        title: 'Vacuum or rods',
        body:
          'We pick the method from where the dent is, how deep it is and how the panel can be reached. Sometimes both together.',
      },
      {
        title: 'You can see the work',
        body:
          'Every example on this site is a frame from our own videos. Watch them in full and judge for yourself.',
      },
      {
        title: 'Abovyan, 37/1 Sevan St.',
        body:
          'Bring the car in for a look, or send a photo first to get a rough idea before you drive over.',
      },
    ],
  },

  proof: {
    label: 'Proof',
    title: 'Before and after',
    lead:
      'A dent shows itself in a reflection, not in a direct look. That is the technician’s main instrument: a straight line laid across the panel.',
    lineNote: 'Straight line = flat panel. Broken line = dent.',
    videoTitle: 'Videos of the work',
    videoLead:
      'The videos are ours, filmed in the workshop. They show both the damage and the result.',
    channelCta: 'All videos on YouTube',
  },

  servicesSection: {
    label: 'Services',
    title: 'What we do',
    lead:
      'We work on body dents without repainting. We do not offer paintwork or full collision repair.',
    cardCta: 'Read more',
    allCta: 'All services',
    metaTitle: 'Services — paintless dent repair',
    metaDescription:
      'PDR, auto vacuum, hail damage repair, and dents on doors, fenders, hoods and roofs in Abovyan, Armenia. Call 099 22 95 90.',
    h1: 'Services',
    pageLead:
      'Four service lines, one principle: put the metal back where it was, without repainting, whenever the damage allows it.',
  },

  process: {
    label: 'Process',
    title: 'How a job runs',
    lead: 'Five steps, from the first look to handing the car back.',
    steps: [
      {
        title: 'Inspection',
        body: 'We read the panel under light and from several angles to find the real edges of the dent.',
      },
      {
        title: 'Assessment',
        body:
          'We tell you whether it can be done without paint, how long it takes and what it costs. If the method does not suit, we say so.',
      },
      {
        title: 'Access',
        body:
          'Where needed we remove a trim panel, a headlight or a wheel arch liner to reach the dent from behind.',
      },
      {
        title: 'Correction',
        body:
          'We pull with vacuum or push with rods, in small steps, checking the reflection after every one.',
      },
      {
        title: 'Final check',
        body:
          'We level the edges, check by hand and by the light line, and show you the result before the car goes back.',
      },
    ],
    note:
      'Time depends on how many dents there are and where they sit. We give an exact figure after the inspection.',
  },

  why: {
    label: 'Why paintless',
    title: 'What you keep when the paint stays',
    lead:
      'Factory paint is applied on a production line, under conditions a workshop cannot reproduce. If it can be kept, it is worth keeping.',
    points: [
      {
        title: 'The original finish stays put',
        body: 'No new paint, no shade difference in sunlight, no blend edge onto the next panel.',
      },
      {
        title: 'No filler is added',
        body: 'The metal returns to its own shape. Under a thickness gauge the panel reads as it did before.',
      },
      {
        title: 'Usually faster',
        body:
          'There is no drying and sanding stage. Small jobs often finish the same day, depending on the damage.',
      },
      {
        title: 'The car’s history stays clean',
        body:
          'At resale a repainted panel shows up on a thickness gauge. An unpainted one raises no questions.',
      },
    ],
  },

  damage: {
    label: 'Damage types',
    title: 'The dents we work on',
    lead: 'If your case is not on this list, call anyway. Looking costs nothing.',
    items: [
      {
        title: 'Hail damage',
        body: 'Many small dents across the roof, hood and trunk with the paint still intact.',
      },
      { title: 'Door dent', body: 'Side impacts, car park dents, and creases along the door edge.' },
      {
        title: 'Fender dent',
        body: 'Front and rear fenders, including the area around the wheel arch.',
      },
      { title: 'Hood dent', body: 'From a fallen object, or from someone leaning on the hood.' },
      {
        title: 'Roof dent',
        body: 'Hail or a fallen branch. We check access through the headliner.',
      },
      {
        title: 'Parking damage',
        body: 'Round dents left by a neighbouring door, a trolley or a bicycle.',
      },
      { title: 'Impact dent', body: 'A stone, a ball or an accidental knock — a single point dent.' },
      {
        title: 'Minor accident',
        body: 'A low speed collision with no cracked paint and no structural damage.',
      },
    ],
    note:
      'If the paint is cracked or flaking, PDR alone will not be enough. We say so straight away, at the inspection.',
  },

  works: {
    label: 'Work',
    title: 'Real jobs',
    lead: 'Frames from our own videos, unedited.',
    allCta: 'All work',
    metaTitle: 'Work — dent repair examples',
    metaDescription:
      'Real Auto Vacuum jobs: roof, door, fender, hood. Frames from videos filmed in the workshop. 37/1 Sevan St., Abovyan, Armenia.',
    h1: 'Work',
    pageLead:
      'Every published example is below. Each one is a frame from one of our videos, with a link to the full video beside it.',
    empty: 'Nothing of this type has been published yet.',
    categories: {
      hail: 'Hail',
      door: 'Door',
      fender: 'Fender',
      hood: 'Hood',
      roof: 'Roof',
      parking: 'Parking',
      impact: 'Impact',
      restoration: 'Body restoration',
    },
    items: {
      'roof-hail-before': {
        title: 'Roof panel before the work',
        note: 'The reflection ripples across the roof — several dents close together.',
      },
      'roof-hail-after': {
        title: 'The same roof after the repair',
        note: 'The reflection runs straight again along the whole length of the panel.',
      },
      'silver-quarter-marked': {
        title: 'Rear quarter with the dents marked',
        note: 'The dents are circled in marker before the work starts.',
      },
      'silver-quarter-finished': {
        title: 'Rear quarter after the repair',
        note: 'The panel line is continuous and the paint is the original one.',
      },
      'white-sill-crease': {
        title: 'White car — a long crease below the door',
        note: 'A drawn-out crease with the paint still unbroken.',
      },
      'white-fender-finished': {
        title: 'Front fender after the work',
        note: 'The workshop address is visible in the frame — Sevan 37.',
      },
      'yellow-quarter-impact': {
        title: 'Yellow fender — impact dent',
        note: 'The video shows the dent close up and from a distance at the same time.',
      },
      'fender-metal-strip': {
        title: 'Fender removed — metal restoration',
        note: 'In harder cases the panel comes off so it can be reached from behind.',
      },
      'dark-wing-finished': {
        title: 'Dark car — front fender after the work',
        note: 'A wet surface shows it clearly: there is no ripple left.',
      },
      'reflection-check': {
        title: 'Reading the reflection on a panel',
        note: 'This is how the technician finds the edges of a dent.',
      },
      'dent-mapping': {
        title: 'Marking the edges of a dent',
        note: 'Before any tool goes on, the centre and edges of the dent are located.',
      },
    },
  },

  faq: {
    label: 'Questions',
    title: 'Frequently asked questions',
    lead: 'Short, direct answers. If your question is not here, call us.',
    metaTitle: 'Questions and answers — PDR and auto vacuum',
    metaDescription:
      'What PDR is, what auto vacuum is, whether a dent can be removed without painting, and what it costs. Answers from Auto Vacuum, Abovyan, Armenia.',
    h1: 'Questions and answers',
    pageLead: 'The things people ask most often on the phone.',
    items: [
      {
        q: 'What is PDR',
        a:
          'PDR stands for paintless dent repair. The technician reaches the back of the panel and works the metal back into shape in small steps. No paint, no filler and no sanding are involved.',
      },
      {
        q: 'What is auto vacuum',
        a:
          'Auto vacuum is the version of PDR where the dent is pulled from the outside with a vacuum or glue puller. It is used when the back of the panel is closed or hard to reach.',
      },
      {
        q: 'Can a dent be removed without painting',
        a:
          'In many cases yes, as long as the paint has not cracked or flaked. That is exactly what we check at the inspection. If the paint is damaged we will tell you honestly that PDR alone is not enough.',
      },
      {
        q: 'Will the factory paint survive',
        a:
          'Yes — that is the whole point of the method. We do not touch the paint: the metal goes back into place and the finish stays on it.',
      },
      {
        q: 'Do you repair hail damage',
        a:
          'Yes. Hail usually leaves many small dents on the roof, hood and trunk without breaking the paint. That is the case the method handles best.',
      },
      {
        q: 'Can every dent be fixed this way',
        a:
          'No. When the paint is cracked, the metal is stretched or torn, or the dent sits on a reinforced edge, PDR alone is not enough. We say so at the inspection, not halfway through the job.',
      },
      {
        q: 'How long does it take',
        a:
          'It depends on how many dents there are, how deep they are and where they sit. One small dent often finishes the same day; hail damage can take longer. We give an exact figure after the inspection.',
      },
      {
        q: 'How much does it cost',
        a:
          'There is no fixed price list, because the price depends on the size, depth, position and number of dents. We quote after the inspection, before any work starts. On the phone we can only give a rough idea.',
      },
      {
        q: 'Can I send a photo first',
        a:
          'Yes, and it helps. Send the dent from two angles — close up and from two or three metres, in daylight. A photo gets you a preliminary opinion only; the final answer comes from seeing the car.',
      },
      {
        q: 'Do I have to bring the car in',
        a:
          'For a final assessment, yes. The true depth of a dent only shows in a reflection, and that does not always come through in a photo.',
      },
      {
        q: 'Do you work on doors, fenders, hoods and roofs',
        a:
          'Yes, all of them. Access differs by panel: sometimes a trim piece or a headlight has to come off to reach the back.',
      },
      {
        q: 'Where are you located',
        a: '37/1 Sevan Street, 8th microdistrict, Abovyan, Armenia. Phone: 099 22 95 90.',
      },
    ],
  },

  location: {
    label: 'Location',
    title: 'Where to find us',
    lead: 'Abovyan, 8th microdistrict. Call before you set off to make sure we are in.',
    mapLoadCta: 'Show the map',
    mapLoadNote: 'The map only loads when you tap it, so the page stays fast.',
    mapTitle: 'Auto Vacuum location on the map',
    provider: { google: 'Google Maps', yandex: 'Yandex Maps' },
  },

  finalCta: {
    label: 'Contact',
    title: 'Got a dent? Call us.',
    lead: 'Tell us where the dent is and what caused it. We sort out the rest in person.',
    or: 'or',
  },

  contact: {
    metaTitle: 'Contact — 099 22 95 90, Abovyan, 37/1 Sevan St.',
    metaDescription:
      'Call 099 22 95 90 or send a photo of the dent for a preliminary assessment. Auto Vacuum, 37/1 Sevan St., Abovyan, Armenia.',
    h1: 'Contact',
    pageLead: 'The fastest route is a phone call. The technician answers it himself.',
    channelsTitle: 'Direct contact',
    formTitle: 'Send a photo of the dent',
    formLead: 'Two photos are enough: one close up, one from two or three metres, in daylight.',
    photoLabel: 'Photo',
    photoHint: 'JPG, PNG, WebP or HEIC. Up to 8 MB, four files maximum.',
    photoChoose: 'Choose a photo',
    photoChange: 'Replace',
    photoRemove: 'Remove',
    descriptionLabel: 'Description',
    descriptionHint: 'Which panel, what caused it, and whether the paint has cracked.',
    phoneFieldLabel: 'Your phone number',
    phoneFieldHint: 'So we can call you back.',
    submit: 'Send',
    sending: 'Sending…',
    disclaimer:
      'An opinion from a photo is preliminary, not a final diagnosis. The exact answer comes after we see the car in person.',
    disabledTitle: 'This form is not switched on yet',
    disabledBody:
      'No destination has been configured to receive photos, so this form will not send anything. For now, send the photo on Instagram or simply call.',
    successTitle: 'Sent',
    successBody: 'We have the photo and will reply as soon as we can.',
    errorTitle: 'Could not send',
    errorBody: 'Try again, or send the photo on Instagram.',
    errors: {
      noFile: 'Choose at least one photo.',
      tooLarge: 'That file is larger than 8 MB.',
      badType: 'Only JPG, PNG, WebP and HEIC files are accepted.',
      tooManyFiles: 'Four photos maximum.',
    },
  },

  footer: {
    tagline: 'Paintless dent repair. 37/1 Sevan St., Abovyan, Armenia.',
    servicesTitle: 'Services',
    siteTitle: 'Site',
    contactTitle: 'Contact',
    languagesTitle: 'Language',
    rights: 'All rights reserved.',
    builtNote: 'The photos and videos belong to the workshop.',
  },

  services: {
    pdr: {
      name: 'PDR — paintless',
      summary: 'The dent is worked from behind, and the factory paint stays where it is.',
      h1: 'PDR — paintless dent repair',
      metaTitle: 'PDR — paintless dent repair in Abovyan, Armenia',
      metaDescription:
        'PDR: dent repair with no repainting and no filler, keeping the factory paint. 37/1 Sevan St., Abovyan. Call 099 22 95 90.',
      body: [
        'PDR — paintless dent repair — means working a dent out from behind the panel. The technician reaches the back of the dent with shaped rods and returns the metal to its form in small, controlled movements.',
        'The guide throughout is the reflection. A straight line laid across the panel bends over the dent; when the line runs straight again, the panel is flat.',
        'The point of the method is the factory paint. It was applied on a production line, under conditions no workshop can reproduce. If the finish is intact, it is worth keeping.',
      ],
      suitedFor: [
        'The paint is intact, with no cracks or flaking',
        'The dent sits on a flat or gently curved area',
        'The back of the panel is reachable, or can be opened up',
        'A dent from hail, a car park or a light knock',
      ],
      limits:
        'When the paint is cracked, the metal stretched or torn, or the dent sits on a reinforced edge, PDR alone is not enough. In that case we say so at the inspection and do not start the job.',
      faq: [
        {
          q: 'Will the dent disappear completely',
          a:
            'In most cases it becomes unnoticeable in normal light. Every case differs: the result depends on how stretched the metal is and where the dent sits. We tell you what to expect after the inspection.',
        },
        {
          q: 'Does a panel have to come off',
          a:
            'Sometimes. Reaching the back can mean removing a door trim, a headlight or part of the headliner. That is part of the job and is agreed beforehand.',
        },
      ],
    },

    'auto-vacuum': {
      name: 'Auto vacuum',
      summary: 'The dent is pulled from the outside, for panels you cannot get behind.',
      h1: 'Auto vacuum — vacuum dent repair',
      metaTitle: 'Auto vacuum — vacuum dent repair in Abovyan, Armenia',
      metaDescription:
        'Auto vacuum: pulling a dent out with a vacuum puller, without repainting. 37/1 Sevan St., Abovyan. Call 099 22 95 90.',
      body: [
        'Auto vacuum is the version of PDR used when the back of a panel is closed or hard to reach. A vacuum or glue puller is fixed over the centre of the dent and the metal is drawn outwards.',
        'The work goes in stages — several small pulls rather than one hard one. That keeps the metal from stretching further and brings the panel shape back more accurately.',
        'The puller sits on the paint and comes off without a trace when the finish is intact. That is why the state of the paint is the first thing we check.',
      ],
      suitedFor: [
        'Closed panels with no access from behind',
        'Round, medium-depth dents on flat areas',
        'Car park and hail dents',
        'Cases where stripping the panel is best avoided',
      ],
      limits:
        'Sharp creases, dents close to an edge and cracked paint do not respond to vacuum. In those cases we either switch to rods or tell you the method does not suit.',
      faq: [
        {
          q: 'Will the vacuum damage the paint',
          a:
            'Not when the finish is intact. The puller is released with a dedicated solvent and the surface is cleaned afterwards. If the paint is already cracked, we warn you first.',
        },
        {
          q: 'How is it different from working with rods',
          a:
            'With rods the technician pushes the dent from inside; with vacuum it is pulled from outside. The choice comes down to which side can be reached. Often both are used on the same dent.',
        },
      ],
    },

    'hail-damage': {
      name: 'Hail damage',
      summary: 'Many small dents across the roof, hood and trunk.',
      h1: 'Hail damage repair',
      metaTitle: 'Hail damage repair without repainting — Abovyan, Armenia',
      metaDescription:
        'Repairing hail dents without repainting: roof, hood, trunk. 37/1 Sevan St., Abovyan. Call 099 22 95 90.',
      body: [
        'Hail usually leaves dozens of small dents on the horizontal panels — roof, hood and trunk. The paint most often survives intact, and that is what makes the method possible.',
        'The job starts with a count: how many dents there are and where. They are marked up, then worked one by one, starting with the deepest.',
        'Hail is the longest kind of job because of the number of dents, not their difficulty. We give a timeframe once the count is done.',
      ],
      suitedFor: [
        'Many small dents with the paint undamaged',
        'Roof, hood, trunk and mirror caps',
        'Before or after an insurance inspection',
        'Before a sale, to bring the body back',
      ],
      limits:
        'Large hail can crack the paint or stretch the metal along a panel edge. We separate those areas out and mention them first.',
      faq: [
        {
          q: 'Will every dent come out',
          a:
            'That is the aim, but every panel is its own case. Dents on edges and over reinforcements can stay partly visible. We show you which ones before starting.',
        },
        {
          q: 'How long does it take',
          a:
            'It depends on the count. Several dozen dents can take more than a day. We give an exact figure once the count is done.',
        },
      ],
    },

    'dent-removal': {
      name: 'Door, fender, hood, roof',
      summary: 'A single dent on one panel — the job we are asked for most.',
      h1: 'Dent repair on doors, fenders, hoods and roofs',
      metaTitle: 'Door, fender, hood and roof dent repair — Abovyan, Armenia',
      metaDescription:
        'Repairing single dents on doors, fenders, hoods and roofs without repainting. 37/1 Sevan St., Abovyan. Call 099 22 95 90.',
      body: [
        'The most common job is one dent on one panel — from a car park, a neighbouring door, a stone or an accidental knock.',
        'Access differs by panel. A door means taking off the trim; a fender sometimes means a headlight or an arch liner; a roof means the edge of the headliner.',
        'We check access at the inspection and tell you what has to be opened up before the work begins.',
      ],
      suitedFor: [
        'A single dent on a door, fender, hood or roof',
        'Car park dents and light knocks',
        'Creases, as long as the paint is intact',
        'Before a sale, or before returning a leased car',
      ],
      limits:
        'Dents on reinforced edges, under seals and on double-metal sections do not always respond. We say so at the inspection.',
      faq: [
        {
          q: 'Is removing a door trim risky',
          a:
            'Not with the right tool. Clips come out and go back in; a damaged clip gets replaced.',
        },
        {
          q: 'Is a hood dent harder',
          a:
            'Often yes, because there is a reinforcing frame under the hood that limits access. We check that on the spot with the hood open.',
        },
      ],
    },
  },
};
