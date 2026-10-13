import { fileURLToPath } from 'node:url'

const modulesPaywallUi = fileURLToPath(new URL('./modules/paywall/ui/components', import.meta.url))
const modulesDir = fileURLToPath(new URL('./modules', import.meta.url))
const coreDir = fileURLToPath(new URL('./core', import.meta.url))

export default defineNuxtConfig({
  srcDir: 'app',
  serverDir: fileURLToPath(new URL('./server', import.meta.url)),
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: ['@pinia/nuxt', '@nuxtjs/tailwindcss'],
  css: ['~/assets/css/tokens.css'],
  components: [
    { path: '~/components', pathPrefix: false },
    { path: modulesPaywallUi, pathPrefix: false },
  ],
  tailwindcss: {
    cssPath: '~/assets/css/tokens.css',
    configPath: 'tailwind.config.ts',
  },
  hooks: {
    'tailwindcss:config'(config) {
      const extra = [
        `${modulesDir}/**/*.{vue,js,ts}`,
        `${coreDir}/**/*.{vue,js,ts}`,
      ]
      if (Array.isArray(config.content)) {
        config.content.push(...extra)
        return
      }
      config.content ??= { files: [] }
      config.content.files ??= []
      config.content.files.push(...extra)
    },
  },
  alias: {
    modules: modulesDir,
    core: coreDir,
  },
  runtimeConfig: {
    databaseUrl: process.env.DATABASE_URL ?? '',
  },
  vite: {
    optimizeDeps: {
      include: ['valibot'],
    },
  },
  app: {
    head: {
      title: 'Лукоморье — полный доступ',
      htmlAttrs: { lang: 'ru' },
      meta: [
        { name: 'viewport', content: 'width=device-width, initial-scale=1, viewport-fit=cover' },
        { name: 'theme-color', content: '#FFF6E8' },
      ],
      link: [
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Nunito:wght@600;700;800&display=swap',
        },
      ],
    },
  },
})
