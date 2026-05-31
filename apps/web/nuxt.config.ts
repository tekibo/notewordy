import tailwindcss from '@tailwindcss/vite'

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
      dir: 'dist-nuxt'
    }
  },

  vite: {
    plugins: [
      tailwindcss(),
    ],
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
