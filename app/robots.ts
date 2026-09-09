import type { MetadataRoute } from 'next';
import { SITE_URL } from '@/config/business';

/**
 * Crawler policy. See docs/ai-crawler-policy.md for the reasoning behind it.
 *
 * Short version: this is a local workshop that wants to be found and quoted, so
 * every crawler that can put the business in front of a customer is allowed —
 * search crawlers and answer-engine crawlers alike. The only disallow is the
 * Next.js build output and the lead API, neither of which has reader value.
 *
 * The named blocks below carry no extra restriction today. They exist so a
 * future rule for one agent can be written without touching the shared rules,
 * and so the policy is explicit rather than inherited by accident from `*`.
 */

const DISALLOW = ['/_next/', '/api/'];

/** Answer-engine and AI-assistant crawlers, allowed deliberately. */
const ANSWER_ENGINE_AGENTS = [
  'GPTBot', // ChatGPT training
  'OAI-SearchBot', // ChatGPT Search index
  'ChatGPT-User', // ChatGPT browsing on a user's behalf
  'ClaudeBot',
  'Claude-User',
  'anthropic-ai',
  'PerplexityBot',
  'Perplexity-User',
  'Google-Extended', // Gemini / AI Overviews grounding
  'Applebot-Extended',
  'CCBot', // Common Crawl, which many models are built from
  'Bingbot',
  'YandexBot',
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: '*', allow: '/', disallow: DISALLOW },
      ...ANSWER_ENGINE_AGENTS.map((userAgent) => ({
        userAgent,
        allow: '/',
        disallow: DISALLOW,
      })),
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
