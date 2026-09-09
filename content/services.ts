import type { ServiceSlug } from './translations/types';

/** Display order for service cards, the services index and the sitemap. */
export const serviceSlugs: ServiceSlug[] = ['pdr', 'auto-vacuum', 'hail-damage', 'dent-removal'];

/**
 * A representative still per service, taken from the published portfolio so
 * service pages show the workshop's own work rather than stock imagery.
 */
export const serviceImage: Record<ServiceSlug, string> = {
  pdr: 'restored-rear-quarter-panel',
  'auto-vacuum': 'reflection-line-panel-check',
  'hail-damage': 'roof-panel-restored',
  'dent-removal': 'door-crease-dent-white-car',
};

export function isServiceSlug(value: string): value is ServiceSlug {
  return (serviceSlugs as string[]).includes(value);
}
