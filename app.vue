<script setup>
import { storeGist } from '~/stores/gistStore'
const gistStore = storeGist()
import { onMounted, ref } from 'vue'
const error = ref(false)
const cloudSync = ref(false)
const settingsModal = ref(false)
import { isLocalStorageAvailable } from '~/composables/utilities'

onMounted(async () => {
  const localStorage = isLocalStorageAvailable()
  if(!localStorage){
    error.value = true
  } else {
    const gist = await gistStore.sync()
    cloudSync.value = !!gist
  }
})


</script>

<template>
  <div class="app-container w-full h-full  text-white p-4" :class="gistStore.backgroundStyles.class" :style="gistStore.backgroundStyles.style">


    <div v-if="error">
      Local storage in not enabled in your browser. You will not be able to save your bookmarks.
    </div>


    <div class="fixed right-2 bottom-2  flex items-center space-x-2">
      <div class="p-2 rounded  z-40 bg-base-700" v-if="cloudSync">
        <icons-cloud :width="20" :height="20" class="text-blue-500" />
      </div>
      <button @click="settingsModal = true" class="flex items-center justify-center p-2 rounded  z-40 bg-base-700 text-base-300 hover:text-fuchsia-600">
        <icons-options :width="20" :height="20" />
      </button>
    </div>


    <div v-if="gistStore?.bookmarks?.length">
      <ul class="bookmark-grid">
        <li class="bg-base bg-opacity-80 backdrop-blur-sm items-center rounded flex" v-for="bookmark in gistStore.bookmarks" :key="bookmark.key">

          <a :href="bookmark.url" target="_blank" class="flex-grow p-4 block">

            <div v-if="bookmark.favicon" class="text-center">
              <div class="bg-base bg-opacity-50 p-2 rounded-full inline-flex">
                <img :src="bookmark.favicon" width="40" class="inline-block">
              </div>
            </div>
            <div class="text-center text-sm" v-if="bookmark.name">
              {{bookmark.name}}
            </div>
          </a>
          <div class="flex-initial bg-base-700 bg-opacity-50 rounded  flex h-full flex-col space-y-2">
            <button class=" p-1 flex items-center justify-center">
              <icons-more-vertical-alt />
            </button>
            <div class="cursor-move  p-1 flex items-center justify-center">
              <icons-drag-drop  />
            </div>
          </div>
        </li>
      </ul>
    </div>



    <modals-the-modal v-if="settingsModal" @close-modal="settingsModal=false" name="settings" />

  </div>
</template>

<style lang="scss">
.bookmark-grid{
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr) );
  grid-gap: 1rem;
}
</style>
