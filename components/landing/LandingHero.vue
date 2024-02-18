<template>
  <div :class="ui.wrapper" v-bind="attrs">
    <slot name="top" />

    <UContainer :class="[ui.container, orientation === 'vertical' ? 'flex flex-col' : 'grid lg:grid-cols-2 lg:items-center']">
      <div :class="[ui.base, orientation === 'vertical' && 'text-center']">
        <div v-if="$slots.headline" :class="ui.headline">
          <slot name="headline" />
        </div>

        <h1 :class="ui.title">
          <slot name="title">
            {{ title }}
          </slot>
        </h1>

        <p v-if="description || $slots.description" :class="ui.description">
          <slot name="description">
            {{ description }}
          </slot>
        </p>

        <div v-if="links?.length || $slots.links" :class="[ui.links, orientation === 'vertical' && 'justify-center']">
          <slot name="links">
            <UButton v-for="(link, index) in links" :key="index" v-bind="link" @click="link.click" />
          </slot>
        </div>
      </div>

      <slot />
    </UContainer>

    <slot name="bottom" />
  </div>
</template>

<script setup lang="ts">
import type { PropType } from 'vue'
import type { Button } from '#ui/types'

const config = {
  wrapper: 'py-24 sm:py-32 md:py-40 relative',
  container: 'gap-16 sm:gap-y-24',
  base: '',
  headline: 'mb-10',
  title: 'text-5xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-7xl',
  description: 'mt-6 text-lg tracking-tight text-gray-600 dark:text-gray-300',
  links: 'mt-10 flex flex-wrap gap-x-6 gap-y-3'
}

defineOptions({
  inheritAttrs: false
})

const props = defineProps({
  title: {
    type: String,
    default: undefined
  },
  description: {
    type: String,
    default: undefined
  },
  links: {
    type: Array as PropType<(Button & { click?: Function })[]>,
    default: () => []
  },
  orientation: {
    type: String as PropType<'vertical' | 'horizontal'>,
    default: 'vertical'
  },
  class: {
    type: [String, Object, Array] as PropType<any>,
    default: undefined
  },
  ui: {
    type: Object as PropType<Partial<typeof config>>,
    default: () => ({})
  }
})

const { ui, attrs } = useUI('landing.hero', toRef(props, 'ui'), config, toRef(props, 'class'), true)
</script>
