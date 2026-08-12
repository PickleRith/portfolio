// @ts-check
import { defineConfig, passthroughImageService } from "astro/config";

import tailwindcss from "@tailwindcss/vite";
import svelte from "@astrojs/svelte";
import react from "@astrojs/react";

// https://astro.build/config
export default defineConfig({
	integrations: [svelte({ extensions: [".svelte"] }), react()],

	server: {
		port: 4321,
	},

	// TODO: replace with your real domain once you pick a host.
	// Used for canonical URLs and Open Graph tags.
	site: "https://rithvikgurajala.com",

	vite: {
		plugins: [tailwindcss()],
	},

	image: {
		service: passthroughImageService(),
	},
});
