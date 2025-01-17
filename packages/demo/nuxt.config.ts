import { NuxtConfig } from '@nuxt/types'

const isDev = process.env.NODE_ENV === 'development'
const useEmulators = false // manually change if emulators needed

const config: NuxtConfig = {
  server: {
    host: '0.0.0.0',
  },
  head: {
    title: 'nuxt-firebase-demo',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },

  publicRuntimeConfig: (env) => ({
    firebase:
      env.FIRE_ENV && env.FIRE_ENV === 'development'
        ? {
            apiKey: 'testAIzaSyDa-YwgWTp2GDyVYEfv-XLb62100_HoEvU',
            authDomain: 'testnuxt-fire-demo.firebaseapp.com',
            projectId: 'testnuxt-fire-demo',
            storageBucket: 'testnuxt-fire-demo.appspot.com',
            messagingSenderId: 'test807370470428',
            appId: 'test1:807370470428:web:26da98c86c3fd352',
            measurementId: 'testG-XT6PVC1D4X',
          }
        : {
            apiKey: 'AIzaSyDa-YwgWTp2GDyVYEfv-XLb62100_HoEvU',
            authDomain: 'nuxt-fire-demo.firebaseapp.com',
            projectId: 'nuxt-fire-demo',
            storageBucket: 'nuxt-fire-demo.appspot.com',
            messagingSenderId: '807370470428',
            appId: '1:807370470428:web:26da98c86c3fd352',
            measurementId: 'G-XT6PVC1D4X',
          },
  }),

  components: true,

  buildModules: ['@nuxt/typescript-build', '@nuxtjs/tailwindcss'],

  firebase: {
    lazy: false,
    config: {
      apiKey: 'AIzaSyDa-YwgWTp2GDyVYEfv-XLb62100_HoEvU',
      authDomain: 'nuxt-fire-demo.firebaseapp.com',
      projectId: 'nuxt-fire-demo',
      storageBucket: 'nuxt-fire-demo.appspot.com',
      messagingSenderId: '807370470428',
      appId: '1:807370470428:web:26da98c86c3fd352',
      measurementId: 'G-XT6PVC1D4X',
    },
    onFirebaseHosting: false,
    terminateDatabasesAfterGenerate: true,
    services: {
      auth: {
        initialize: {
          onAuthStateChangedAction: 'onAuthStateChanged',
        },
        ssr: true,
        emulatorPort: isDev && useEmulators ? 9099 : undefined,
        disableEmulatorWarnings: false,
      },
      firestore: {
        memoryOnly: false,
        enablePersistence: true,
        emulatorPort: isDev && useEmulators ? 8080 : undefined,
      },
      functions: {
        emulatorPort: isDev && useEmulators ? 12345 : undefined,
      },
      storage: {
        emulatorPort: isDev && useEmulators ? 9199 : undefined,
        emulatorHost: 'localhost',
      },
      database: {
        emulatorPort: isDev && useEmulators ? 9000 : undefined,
      },
      performance: true,
      analytics: true,
      remoteConfig: {
        settings: {
          fetchTimeoutMillis: 60000,
          minimumFetchIntervalMillis: 43200000,
        },
        defaultConfig: {
          welcome_message: 'Welcome',
        },
      },
      // breaks the app with 'app.$fire.firestore.collection is not a function':
      appCheck: true,
      messaging: {
        createServiceWorker: true,
        actions: [
          {
            action: 'goToLupasGithub',
            url: 'https://github.com/lupas',
          },
          {
            action: 'goToModuleGithub',
            url: 'https://github.com/nuxt-community/firebase-module',
          },
        ],
        fcmPublicVapidKey:
          'BL_xoiuOe5vbb2vJkCNnuswn03NwCsyCkJUgRbuQA5tpg7J4E4z50MO8b-wrrad6fcysYAaFjHqU7D9o0oCWL8w',
      },
    },
  },

  modules: ['@nuxtjs/pwa', '@nuxtjs/firebase'],
  // plugins: ['~/plugins/lazyMode'],

  build: {
	  parallel: true,
	  cache: true,
  },

  /*
   ** Nuxt.js Middleware
   */
  router: {
    middleware: ['testMiddleware'],
  },

  pwa: {
    workbox: {
      importScripts: ['/firebase-auth-sw.js'],
      // by default the workbox module will not install the service worker in dev environment to avoid conflicts with HMR
      // only set this true for testing and remember to always clear your browser cache in development
      dev: process.env.NODE_ENV === 'development',
    },
  },
}
export default config
