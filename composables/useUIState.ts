import { createSharedComposable } from '@vueuse/core'

const _useUIState = () => {
  const isHeaderDialogOpen = ref(false)
  const isDocsSearchModalOpen = ref(false)

  function toggleDocsSearch () {
    if (isHeaderDialogOpen.value) {
      isHeaderDialogOpen.value = false

      setTimeout(() => {
        isDocsSearchModalOpen.value = !isDocsSearchModalOpen.value
      }, 0)

      return
    }

    isDocsSearchModalOpen.value = !isDocsSearchModalOpen.value
  }

  return {
    isHeaderDialogOpen,
    isDocsSearchModalOpen,
    toggleDocsSearch
  }
}

export const useUIState = createSharedComposable(_useUIState)
