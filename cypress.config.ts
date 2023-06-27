import { defineConfig } from 'cypress'
import { loadEnv } from 'vite'

// Allow `loadEnv` to use default `prefixes`, since we didn't set `vite.config.envPrefix`.
const mode = process.env.NODE_ENV ?? ''
const envDir = process.cwd()
const env = loadEnv(mode, envDir)

export default defineConfig({
  e2e: {
    specPattern: 'cypress/e2e/**/*.{cy,spec}.{js,jsx,ts,tsx}',
    baseUrl: 'http://localhost:4173/japan/',
  },
  env,
})
