<template>
  <div
    ref="el"
    v-bind="{ ...attrs, ...$attrs }"
    :class="[ui.wrapper, grow ? ui.grow : ui.border, collapsible ? 'hidden lg:flex' : 'flex']"
    :style="{ '--width': width && !grow ? `${width}px` : undefined }"
  >
    <slot />

    <slot name="handle">
      <UDashboardPanelHandle v-if="resizable && !grow" @mousedown="onDrag" />
    </slot>
  </div>

  <ClientOnly>
    <USlideover
      v-if="collapsible && smallerThanLg"
      v-model="isOpen"
      :side="side"
      v-bind="{ ...attrs, ...$attrs }"
      appear
      class="lg:hidden"
    >
      <slot />
    </USlideover>
  </ClientOnly>
</template>

<script setup lang="ts">
import type { PropType } from 'vue'
import { useBreakpoints, breakpointsTailwind } from '@vueuse/core'

const config = {
  wrapper: 'flex-col items-stretch relative w-full',
  border: 'border-b lg:border-b-0 lg:border-r border-gray-200 dark:border-gray-800 lg:w-[--width] flex-shrink-0',
  grow: 'flex-1'
}

defineOptions({
  inheritAttrs: false
})

const props = defineProps({
  id: {
    type: String,
    default: undefined
  },
  modelValue: {
    type: Boolean,
    default: undefined
  },
  collapsible: {
    type: Boolean,
    default: false
  },
  side: {
    type: String as PropType<'left' | 'right'>,
    default: 'left'
  },
  grow: {
    type: Boolean,
    default: false
  },
  resizable: {
    type: [Boolean, Object],
    default: false
  },
  width: {
    type: Number,
    default: undefined
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

const emit = defineEmits(['update:modelValue'])

// @ts-ignore
const id = props.id ? `dashboard:panel:${props.id}` : useId('$dashboard:panel')
const { ui, attrs } = useUI('dashboard.panel', toRef(props, 'ui'), config, toRef(props, 'class'), true)
const { el, width, onDrag, isDragging } = props.resizable ? useResizable(id, { ...(typeof props.resizable === 'object' ? props.resizable : {}), value: props.width }) : { el: undefined, width: toRef(props.width), onDrag: undefined, isDragging: undefined }
const breakpoints = useBreakpoints(breakpointsTailwind)

const { isDashboardSidebarSlidoverOpen } = useUIState()

const smallerThanLg = breakpoints.smaller('lg')

const isOpen = computed({
  get () {
    return props.modelValue !== undefined ? props.modelValue : isDashboardSidebarSlidoverOpen.value
  },
  set (value) {
    props.modelValue !== undefined ? emit('update:modelValue', value) : (isDashboardSidebarSlidoverOpen.value = value)
  }
})

defineExpose({
  width,
  isDragging
})

provide('isOpen', isOpen)
</script>
