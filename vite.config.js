import { defineConfig } from "vite"
import vue from "@vitejs/plugin-vue"
import path from "path"
import { vercelToolbar } from "@vercel/toolbar/plugins/vite"

export default defineConfig({
	plugins: [vue(), vercelToolbar()],
	resolve: {
		alias: {
			"@": path.resolve(__dirname, "./src")
		}
	},
	server: {
		port: 3000,
		open: true
	}
})
