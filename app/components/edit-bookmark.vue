<script setup lang="ts">
import {type Bookmark, useAppStore} from "@/stores/useAppStore";
const {setStorageBookmarks, deleteStorageBookmark, isUrlValid} = useHelpers()
const appStore = useAppStore()
const props = defineProps<{
  bookmark: null | Bookmark
}>()
const emit = defineEmits<{
  (e: 'close'): void
}>()
const invalidUrl = ref<boolean>(false)
const disabled = ref<boolean>(false)
const name = ref<string>(props?.bookmark?.name ?? '')
const url = ref<string>(props?.bookmark?.url ?? '')
const favicon = ref<string>(props?.bookmark?.favicon ?? '')
const saved = ref<boolean>(false)
const confirmDelete = ref<boolean>(false)

const saveBookmark = () => {
  saved.value = false
  disabled.value = true
  const updated = setStorageBookmarks({
    name: name.value,
    url: url.value,
    favicon: favicon.value,
    key: props?.bookmark?.key ?? appStore?.bookmarks?.length,
  }, props?.bookmark?.new ?? false)
  if(updated){
    appStore.bookmarks = updated
    saved.value = true
    setTimeout(()=>{
      saved.value = false
      disabled.value = false
    },1000)
  } else{
    disabled.value = false
  }
}

const deleteBookmark = () => {
  if(!props?.bookmark){
    return
  }
  const updated = deleteStorageBookmark(props.bookmark)
  if(updated){
    appStore.bookmarks = updated
  }
  emit('close')

}

</script>

<template>
    <form class=" relative p-1" @submit.prevent="saveBookmark">
      <div v-if="confirmDelete" class="absolute left-0 top-0 bg-black w-full h-full z-20 text-white flex items-center p-2">
        <div class="w-full text-center">
          <div class="mb-2">
            Are you sure you want to delete this?
          </div>
          <div class="flex w-full  items-center justify-center gap-2">
            <button class="bg-red-600 block cursor-pointer py-1 px-2" @click="deleteBookmark">
              Yes
            </button>
            <button class="bg-zinc-500 cursor-pointer block py-1 px-2" @click="confirmDelete = false">
              No
            </button>
          </div>
        </div>
      </div>

      <the-input
          id="name"
          class="mb-4"
          label="name"
          :value="name"
          type="input"
          required
          @update="(value: string) => name=value"
      />


      <the-input
          id="url"
          class="mb-4"
          label="url"
          :value="url"
          type="input"
          :help="invalidUrl ? 'Invalid URL' : ''"
          required
          @update="(value: string) => {
            url = value.toLowerCase()
            if(value?.length === 0){
              invalidUrl = false
            } else if(isUrlValid(value)){
              invalidUrl = false
            } else {
              invalidUrl = true
            }
          }"
      />

      <the-input
          id="favicon"
          class="mb-4"
          label="favicon"
          :value="favicon"
          type="input"
          @update="(value: string) => favicon = value.toLowerCase()"
      />

      <div class="flex gap-2">
        <div class="grow flex gap-2 items-center">
          <button v-if="!bookmark?.new" type="button" class="bg-red-600 hover:bg-red-700 py-1 px-2" @click="confirmDelete=true">
            Delete
          </button>
          <div v-if="saved" class="bg-green-500 text-center w-full p-1">
            Bookmark Saved
          </div>
        </div>
        <div>
          <button :disabled="disabled" :class="disabled ? 'bg-zinc-700 text-zinc-400 cursor-not-allowed' : 'bg-zinc-600 text-white cursor-pointer'" class="py-1 px-2" type="submit">
            Save
          </button>
        </div>
      </div>


    </form>
</template>
