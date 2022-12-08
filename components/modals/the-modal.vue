<script setup>
import {computed} from 'vue'
const emit = defineEmits(['close-modal'])
const props = defineProps({
  name:{
    type: String,
    default: ''
  }
})
import settings from './settings.vue'
import addBookmark from './add-bookmark.vue'
import editBookmark from './edit-bookmark.vue'

const computedTest = computed(() => {
  if(props.name==='settings'){
    return settings
  } else if(props.name==='add-bookmark'){
    return addBookmark
  } else if(props.name==='edit-bookmark'){
    return editBookmark
  }
  return ''
})


</script>

<template>
    <div class="fixed left-0 top-0 w-full h-full bg-base-700 bg-opacity-30 flex items-center justify-center z-50 backdrop-blur-sm" @click.self="emit('close-modal')">

      <div class="bg-base-700 border-2 border-base-600 ring-8 ring-offset-8 ring-offset-base-800/50 ring-base-800 ring-opacity-40 p-4 rounded-lg">

        <component v-if="computedTest" :is="computedTest" />

      </div>

    </div>
</template>
