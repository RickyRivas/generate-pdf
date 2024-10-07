import * as universal from '../entries/pages/_page.js';
import * as server from '../entries/pages/_page.server.js';

export const index = 2;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_page.svelte.js')).default;
export { universal };
export const universal_id = "src/routes/+page.js";
export { server };
export const server_id = "src/routes/+page.server.js";
export const imports = ["_app/immutable/nodes/2.CAPnicR8.js","_app/immutable/chunks/scheduler.BTvvG7U3.js","_app/immutable/chunks/index.YW6Nmxmu.js","_app/immutable/chunks/each.D6YF6ztN.js","_app/immutable/chunks/SEO.BPDsY-WK.js","_app/immutable/chunks/stores.D72pKZtp.js","_app/immutable/chunks/entry.DnUYEtZG.js","_app/immutable/chunks/forms.3bJQ-KX5.js"];
export const stylesheets = [];
export const fonts = [];
