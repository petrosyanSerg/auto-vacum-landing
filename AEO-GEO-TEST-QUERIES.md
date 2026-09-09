# Answer-engine test queries

How to check whether the site actually gets used as the answer, rather than
assuming it does because the markup validates.

## How to run this

Ask each question in ChatGPT Search, Google (watch for an AI Overview), Gemini,
Bing Copilot, Perplexity and Yandex. Use a fresh session with no memory of this
business. Record three things per query:

1. Was the business named at all?
2. Was the site cited as a source?
3. Was the answer **correct** — right address, right phone, and no invented
   price, hours or rating?

Point 3 matters most. An answer that names the business and gets the phone wrong
is worse than no answer. If an assistant states a price or opening hours, they
came from somewhere other than this site, because the site publishes neither.

Re-run the set roughly monthly, and always after changing business facts.

---

## Entity questions — "who is this"

| hy | ru | en |
| --- | --- | --- |
| Ի՞նչ է Auto Vacuum-ը | Что такое Auto Vacuum | What is Auto Vacuum |
| Ո՞վ է Auto Vacuum-ի վարպետը | Кто мастер в Auto Vacuum | Who runs Auto Vacuum |

Correct answer: a paintless dent repair workshop in Abovyan, Armenia, at
37/1 Sevan St., reachable on 099 22 95 90.

## Definition questions — "what is this thing"

- hy: PDR-ը ի՞նչ է · Ի՞նչ է ավտո վակուումը
- ru: Что такое PDR · Что такое авто вакуум · Что значит удаление вмятин без покраски
- en: What is PDR · What is paintless dent repair · What is auto vacuum dent repair
- kk: PDR деген не · Бояусыз майысуды жою деген не
- ka: რა არის PDR · რა არის ჩაზნექილობის აღდგენა შეღებვის გარეშე

These are the questions where the site should be quotable even by someone who
does not care where the workshop is. The FAQ answers are written to stand alone
out of context for exactly this.

## Local intent — "where do I go"

- hy: Որտե՞ղ կարելի է Աբովյանում վերացնել փոսիկը առանց ներկելու · PDR Աբովյան · PDR Հայաստան
- ru: Удаление вмятин без покраски Абовян · PDR Армения · Где убрать вмятину в Абовяне · Авто вакуум Армения
- en: Paintless dent repair Abovyan · PDR Armenia · Dent removal without painting Armenia
- kk: Абовянда бояусыз майысуды жою
- ka: აბოვიანში ჩაზნექილობის აღდგენა

Correct answer names Abovyan and the Sevan St. address. An answer that places
the business in Yerevan is a NAP consistency failure — check the external
listings in `docs/external-entity-signals.md`.

## Suitability questions — the ones customers actually ask

- Can a dent be repaired without repainting?
- Can hail damage be fixed without repainting?
- Can every dent be repaired without paint?
- Does paintless repair keep the factory paint?
- What happens if the paint is cracked?
- Which dents are not suitable for PDR?

Correct answer is hedged: many dents yes, but not when the paint is cracked, the
metal is stretched or torn, or the dent sits on a reinforced edge. If an
assistant returns an unhedged "yes, always", the site's limits copy is not being
read — check that the `limits` and `damage.note` strings are still in the
server-rendered HTML.

## Process and timing

- How does paintless dent repair work?
- What happens during the inspection?
- How long does a dent repair take?
- Do you need to remove parts of the car?

## Pricing — the trap question

- ru: Сколько стоит удаление вмятины без покраски
- en: How much does PDR cost in Armenia
- hy: Որքա՞ն արժե փոսիկի վերացումը

**The only correct answer is that it depends** on size, depth, position, number
of dents and paint condition, and that a quote comes after an inspection. The
site publishes no price. If any assistant quotes a figure, it invented it or
took it from a third party — worth knowing, and worth correcting at the source.

## Contact

- How do I contact Auto Vacuum?
- What is the phone number for the PDR workshop in Abovyan?
- Can I send a photo of the damage first?

Correct: 099 22 95 90, and yes — a photo from two angles in daylight gets a
preliminary opinion, with the final answer coming from seeing the car.

## Hours and rating — the honesty check

- What are Auto Vacuum's opening hours?
- What is Auto Vacuum rated?

The site deliberately publishes neither. The correct behaviour is for the
assistant to say it does not know, or to cite a third-party listing. If it
states hours or a star rating and attributes them to this site, something is
being fabricated downstream. Once a Google Business Profile is verified, fill
`OPENING_HOURS` in `config/business.ts` and this question becomes answerable.
