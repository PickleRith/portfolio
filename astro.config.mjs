// @ts-check
import { defineConfig, passthroughImageService } from "astro/config";

import tailwindcss from "@tailwindcss/vite";
import svelte from "@astrojs/svelte";
import react from "@astrojs/react";
import vercel from "@astrojs/vercel";

// https://astro.build/config
export default defineConfig({
	integrations: [svelte({ extensions: [".svelte"] }), react()],
	adapter: vercel(),

	server: {
		port: 4321,
	},

	// Used for canonical URLs and Open Graph tags. Vercel injects
	// VERCEL_PROJECT_PRODUCTION_URL at build time and keeps it pointed at the
	// production domain, so adding a custom domain later needs no code change.
	// Falls back to the dev origin when building locally.
	site: process.env.VERCEL_PROJECT_PRODUCTION_URL
		? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
		: "http://localhost:4321",

	vite: {
		plugins: [tailwindcss()],
	},

	image: {
		service: passthroughImageService(),
	},
});
