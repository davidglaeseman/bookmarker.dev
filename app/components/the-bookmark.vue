<script setup lang="ts">
import type {Bookmark} from "~/stores/useAppStore";
defineProps<{
  bookmark: Bookmark;
  size: number;
}>()
const emit = defineEmits<{
  (e: 'edit-bookmark', value: Bookmark): void
}>()
</script>

<template>
  <div class="flex flex-col relative  rounded-md border border-transparent hover:border-white">
    <a class="w-full inline-flex grow items-center text-center  p-2 justify-center min-h-[90px]" :href="bookmark.url" target="_blank">
      <div>
        <div v-if="bookmark.favicon" class="flex items-center justify-center mb-2"><img  class="inline-block max-h-[50px]"  :src="bookmark.favicon"></div>
        <div class="text-sm  p-0.5">
          {{bookmark.name}}
        </div>
      </div>
    </a>
    <div class="flex gap-2 items-center">
      <div class="grow">
        <button class="cursor-pointer text-zinc-200 hover:text-black  hover:bg-white rounded-bl-md flex p-0.5" :aria-label="`Edit ${bookmark.name} Bookmark`" @click="emit('edit-bookmark', bookmark)">
          <icon name="mdi:dots-vertical" />
        </button>
      </div>
      <div v-if="size > 1">
        <button class="cursor-move flex p-0.5 | handle">
          <icon name="mdi:cursor-move" />
        </button>
      </div>
    </div>
  </div>
</template>
