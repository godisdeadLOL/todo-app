// @ts-check
import { defineConfig } from "astro/config"

import react from "@astrojs/react"

import icon from "astro-icon"

// https://astro.build/config
export default defineConfig({
	integrations: [
		react(),
		icon({
			include: {
				lucide: ["*"],
			},
		}),
	],
	vite: {
		resolve: {
			alias: {
				"@": new URL("./src", import.meta.url).pathname,
			},
		},
		css: {
			preprocessorOptions: {
				scss: {
					additionalData: `@import "@/styles/_colors.scss"; @import "@/styles/_variables.scss"; @import "@/styles/_mixins.scss";`,
					silenceDeprecations: ["import", "global-builtin"],
				},
			},
		},
	},
})
