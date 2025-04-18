
import {defineConfig, loadEnv} from 'vite'
import vue from '@vitejs/plugin-vue'
import {resolve} from 'path'

export default defineConfig(({mode}) => {
  const env = {
    ...loadEnv(mode, process.cwd(), ''),
    ...loadEnv(mode, resolve(__dirname, '../../'), '')
  }

  return {
    root: __dirname,
    cacheDir: '../../node_modules/.vite/apps/weather-monorepo-app',
    preview: {
      port: 4300,
      host: 'localhost',
    },
    plugins: [vue()],
    resolve: {
      alias: {
        '@': resolve(__dirname, './src'),
        '@weather-monorepo/api': resolve(__dirname, '../../packages/api/src'),
        '@weather-monorepo/utils': resolve(__dirname, '../../packages/utils/src'),
        '@weather-monorepo/hooks': resolve(__dirname, '../../packages/hooks/src')
      }
    },
    server: {
      port: 4200,
      host: true,
      proxy: {
        '/api': {
          target: 'https://api.openweathermap.org',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, '')
        }
      }
    },
    define: {
      'process.env': env
    },
    css: {
      postcss: {
        plugins: [
          require('@tailwindcss/postcss')(),
          require('autoprefixer')(),
        ],
      },
    },
    build: {
      outDir: './dist',
      emptyOutDir: true,
      reportCompressedSize: true,
      commonjsOptions: {
        transformMixedEsModules: true,
      },
    },
    test: {
      watch: false,
      globals: true,
      environment: 'jsdom',
      include: ['{src,tests}/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
      reporters: ['default'],
      coverage: {
        reportsDirectory: './test-output/vitest/coverage',
        provider: 'v8' as const,
      },
    },
  }
});
