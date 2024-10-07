import * as server from '../entries/pages/_layout.server.js';

export const index = 0;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_layout.svelte.js')).default;
export { server };
export const server_id = "src/routes/+layout.server.js";
export const imports = ["_app/immutable/nodes/0.DxSWIAw1.js","_app/immutable/chunks/scheduler.BTvvG7U3.js","_app/immutable/chunks/index.YW6Nmxmu.js","_app/immutable/chunks/each.D6YF6ztN.js","_app/immutable/chunks/stores.D72pKZtp.js","_app/immutable/chunks/entry.DnUYEtZG.js","_app/immutable/chunks/forms.3bJQ-KX5.js"];
export const stylesheets = ["_app/immutable/assets/0.C-aMlyEF.css"];
export const fonts = [];
