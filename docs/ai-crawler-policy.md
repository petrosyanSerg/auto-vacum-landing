# AI crawler policy

`app/robots.ts` allows every answer-engine crawler by name. This file records
why, so the decision is a choice rather than a default nobody revisited.

## The decision

Allow. All of them.

## Why

This is a single workshop in Abovyan whose customers are people with a dented
car and a phone. The failure mode that costs the business money is *not being
found*. There is no paywalled content, no proprietary dataset, and no
advertising revenue that an AI answer could divert. Everything on the site is
information the owner would repeat on the phone to anyone who called.

When someone asks an assistant "where can I get a dent fixed without repainting
near Abovyan", the business wants to be the answer. Blocking the crawler that
would produce that answer forfeits it to a competitor for nothing in return.

## Who is named, and what each one is

| Agent | What allowing it does |
| --- | --- |
| `GPTBot` | Lets OpenAI use the pages as training data |
| `OAI-SearchBot` | Puts the site in the ChatGPT Search index |
| `ChatGPT-User` | Lets ChatGPT open a page when a user asks it to |
| `ClaudeBot`, `anthropic-ai` | Anthropic's crawler |
| `Claude-User` | Claude fetching a page on a user's behalf |
| `PerplexityBot`, `Perplexity-User` | Perplexity's index and its live fetches |
| `Google-Extended` | Grounding for Gemini and AI Overviews. Note this is *separate* from `Googlebot`: blocking it does not affect normal Google ranking, and allowing it is what makes the site quotable in AI Overviews |
| `Applebot-Extended` | Apple Intelligence |
| `CCBot` | Common Crawl, the corpus many models are built from |
| `Bingbot`, `YandexBot` | Named explicitly because Bing feeds Copilot, and Yandex is a real search channel in this region |

Any agent not listed still falls under `User-Agent: *`, which is also `Allow: /`.
The named blocks exist so a future restriction on one agent can be written
without disturbing the shared rule.

## What is disallowed, for everyone

- `/_next/` — build output. No reader value, wastes crawl budget.
- `/api/` — the lead-form endpoint. Not a document.

Nothing else. In particular CSS, JavaScript and `/images/` are crawlable, because
blocking them stops a renderer from seeing the page the way a visitor does.

## If the owner ever wants to change this

Reversing the decision for one agent is a two-line edit in `app/robots.ts`: move
its name out of `ANSWER_ENGINE_AGENTS` and give it its own rule with
`disallow: ['/']`. Before doing that, be clear about what is gained — for a
local service business, usually nothing.
