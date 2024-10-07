export const manifest = (() => {
function __memo(fn) {
	let value;
	return () => value ??= (value = fn());
}

return {
	appDir: "_app",
	appPath: "_app",
	assets: new Set(["admin/config.yml","admin/index.html","arcform.jpg","contactform.html","contactside.jpg","favicon.png","footlight.TTF","img01.jpg","og.jpg","sidebar.jpg","subscribecta.jpg","uploads/contactside.jpg","uploads/thumb.jpg"]),
	mimeTypes: {".yml":"text/yaml",".html":"text/html",".jpg":"image/jpeg",".png":"image/png",".TTF":"font/ttf"},
	_: {
		client: {"start":"_app/immutable/entry/start.C9ndr1G0.js","app":"_app/immutable/entry/app.B5nHspgs.js","imports":["_app/immutable/entry/start.C9ndr1G0.js","_app/immutable/chunks/entry.DnUYEtZG.js","_app/immutable/chunks/scheduler.BTvvG7U3.js","_app/immutable/entry/app.B5nHspgs.js","_app/immutable/chunks/scheduler.BTvvG7U3.js","_app/immutable/chunks/index.YW6Nmxmu.js"],"stylesheets":[],"fonts":[],"uses_env_dynamic_public":false},
		nodes: [
			__memo(() => import('./nodes/0.js')),
			__memo(() => import('./nodes/1.js')),
			__memo(() => import('./nodes/2.js')),
			__memo(() => import('./nodes/3.js'))
		],
		routes: [
			{
				id: "/",
				pattern: /^\/$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 2 },
				endpoint: null
			},
			{
				id: "/api/gen-pdf",
				pattern: /^\/api\/gen-pdf\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('./entries/endpoints/api/gen-pdf/_server.js'))
			},
			{
				id: "/sitemap.xml",
				pattern: /^\/sitemap\.xml\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('./entries/endpoints/sitemap.xml/_server.js'))
			},
			{
				id: "/subdocuments",
				pattern: /^\/subdocuments\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 3 },
				endpoint: null
			}
		],
		matchers: async () => {
			
			return {  };
		},
		server_assets: {}
	}
}
})();
