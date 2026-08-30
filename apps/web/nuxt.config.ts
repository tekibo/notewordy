import tailwindcss from '@tailwindcss/vite'
import { resolve } from 'node:path'
import { electrobunViteAliases } from '../desktop/.hutch/devkit/api/config/electrobun-vite'

const devkitRoot = resolve(__dirname, '../desktop/.hutch/devkit')

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  css: ['~/assets/css/tailwind.css'],
  devtools: { enabled: false },

  app: {
    baseURL: "./",
    cdnURL: "./"
  },

  ssr: false,
  router: {
    options: {
      hashMode: true
    }
  },

  nitro: {
    preset: 'static',
    output: {
      publicDir: resolve(__dirname, '../desktop/dist-web')
    }
  },

  vite: {
    plugins: [
      tailwindcss(),
    ],
    resolve: {
      alias: electrobunViteAliases(devkitRoot),
    },
    optimizeDeps: {
      include: [
        'reka-ui',
        'class-variance-authority',
        '@iconify/vue',
        'clsx',
        'tailwind-merge',
        'lucide-vue-next',
        '@number-flow/vue',
      ]
    }
  },

  modules: [
    'shadcn-nuxt',
    '@vueuse/nuxt',
    '@nuxtjs/color-mode',
    '@nuxt/image',
  ],
  colorMode: {
    classSuffix: ''
  },
  shadcn: {
    prefix: '',
    componentDir: '@/components/ui'
  },
})
