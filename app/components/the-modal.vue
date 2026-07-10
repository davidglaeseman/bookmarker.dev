<script setup lang="ts">
import { ref, watch } from 'vue'
import { useMagicKeys } from '@vueuse/core'
const props = defineProps<{
  open: boolean;
  title: string;
}>()
const emit = defineEmits<{
  (e: 'close'): void
}>()
const hot = ref<boolean>(false)
const { escape } = useMagicKeys()

if (escape) {
  watch(escape, (v) => {
    if(v && props.open) {
      emit('close')
    }
  })
}

</script>

<template>
    <div v-if="open"  :class="[hot ? '' : 'cursor-pointer ']" class="fixed left-0 top-0 w-full h-full [-webkit-backdrop-filter:blur(0.25rem)]  backdrop-blur-xs z-20 flex items-center justify-center" @click.self="emit('close')">
      <div class="max-w-[500px] w-[calc(100vw-2rem)]" @mouseenter="hot = true" @mouseleave="hot=false">
        <div class="flex items-center">
          <div class="grow">
            <div v-if="title" class="text-2xl bg-black text-white inline-block py-2 px-4">{{title}}</div>
          </div>
          <div>
            <button class="bg-black/40 hover:bg-black text-white cursor-pointer flex p-1" @click="emit('close')">
              <icon name="lucide:x" :size="25" />
            </button>
          </div>
        </div>
        <div  class="bg-black text-white  p-4">
          <slot />
        </div>
      </div>
    </div>
</template>
