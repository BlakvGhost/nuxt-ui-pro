import { consola } from 'consola'
import { colors } from 'consola/utils'
import { createResolver, defineNuxtModule, addImportsDir, hasNuxtModule, addComponentsDir } from '@nuxt/kit'
import { validateLicense } from './license'
import { defu } from 'defu'

import pkg from '../../package.json'

export interface ModuleOptions {
  license?: string
}

export default defineNuxtModule({
  meta: {
    name: 'ui-pro',
    configKey: 'uiPro'
  },
  defaults: {
    license: ''
  },
  setup (_, nuxt) {
    const resolver = createResolver(import.meta.url)
    /**
     * Add Content components & utils only if Nuxt Content is present
     */
    if (hasNuxtModule('@nuxt/content')) {
      // Add auto-imported utils
      addImportsDir(resolver.resolve('runtime/utils'))

      addComponentsDir({
        path: resolver.resolve('runtime/components/content'),
        global: true,
        prefix: '',
        pathPrefix: false
      })

      addComponentsDir({
        path: resolver.resolve('runtime/components/docs'),
        prefix: 'U',
        pathPrefix: false
      })

      // @ts-ignore
      nuxt.options.content = defu(nuxt.options.content, {
        highlight: {
          theme: {
            light: 'material-theme-lighter',
            default: 'material-theme',
            dark: 'material-theme-palenight'
          },
          preload: ['json', 'js', 'ts', 'html', 'css', 'vue', 'diff', 'shell', 'markdown', 'yaml', 'bash', 'ini']
        },
        navigation: {
          fields: ['icon', 'to', 'target']
        }
      })

      // @ts-ignore
      nuxt.hook('tailwindcss:config', function (tailwindConfig) {
        tailwindConfig.content = tailwindConfig.content ?? { files: [] };
        (Array.isArray(tailwindConfig.content) ? tailwindConfig.content : tailwindConfig.content.files).push(resolver.resolve('./runtime/components/**/*.{vue,mjs,ts}'))
      })
    }

    /**
     * License
     */
    const theme = pkg.theme || { env: 'NUXT_UI_PRO_LICENSE', link: 'https://ui.nuxt.com/pro' }
    const key = process.env[theme.env] || (nuxt.options as any).uiPro?.license
    if (nuxt.options.dev || nuxt.options._prepare) {
      if (nuxt.options.dev && !key) {
        consola.box(
          colors.greenBright('Nuxt UI Pro') + '\n\n' +
          `Missing \`${theme.env}\` env variable, please add it to your \`.env\`.` + '\n\n' +
          colors.blueBright(`Purchase Nuxt UI Pro at ${theme.link} to build your app in production.`)
        )
      }
      return
    }
    nuxt.hook('build:before', async () => {
      await validateLicense({ key, theme, dir: nuxt.options.rootDir })
    })
  }
})
