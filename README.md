[![nuxt-ui-social-card.png](https://volta.s3.fr-par.scw.cloud/nuxt_ui_social_card_1_e2d930d18f.png)](https://ui.nuxt.com/pro)

# Nuxt UI Pro

Welcome to the Pro version of [Nuxt UI](https://ui.nuxt.com).

- [Minimal Starter](https://github.com/nuxt-ui-pro/starter)
- [Documentation](https://ui.nuxt.com/pro/getting-started)

## Installation

```bash
# npm
npm install @nuxt/ui-pro
# yarn
yarn add @nuxt/ui-pro
# pnpm
pnpm add @nuxt/ui-pro
```

Note that `@nuxt/ui-pro` will also install [`@nuxt/ui`](https://ui.nuxt.com) as dependency to your project.

Next, add it to your `nuxt.config.ts` in the `extends` property:

```ts
export default defineNuxtConfig({
  extends: ['@nuxt/ui-pro'],
  modules: ['@nuxt/ui']
})
```

Start your development server, you should now be able to use all the components, composables and utils from Nuxt UI Pro 🚀

## License Key

Once you've purchased [Nuxt UI Pro](https://ui.nuxt.com/pro/purchase), you will receive an email with a license key to activate. Visit https://ui.nuxt.com/pro/activate to activate your license with your GitHub username and license key.

Then, use your license key in your `.env` file:

```
# .env
NUXT_UI_PRO_LICENSE=<your-license-key>
```

If you have multiple projects on your machine, you can also add it to your `~/.nuxtrc`:

```
uiPro.license=<your-token>
```

## Documentation

As we are in early stages, the docs is not ready yet, but you can have a look at the [components/ directory](./components).

Also, we have open source projects using it in production:
- [Nuxt.com](https://github.com/nuxt/nuxt.com)
- [Nuxt Image](https://github.com/nuxt/image/tree/main/docs)
- [Vue Email](https://github.com/Dave136/vue-email/tree/main/docs)
- [Unhead](https://github.com/unjs/unhead/tree/main/docs)
- [Oku](https://github.com/oku-ui/docs)

When using the [Nuxt Devtools](https://devtools.nuxt.com), you can see the list of components injected by Nuxt UI Pro in the "Components' tab:

![nuxt-ui-pro-devtools](https://github.com/nuxt/ui-pro/assets/904724/4ec2862e-91a0-4ae1-9458-264983d39b6e)

## License

*In progress. You cannot repackage Nuxt UI Pro or copy/paste the components into premium templates, UI libraries or open source projects.*
