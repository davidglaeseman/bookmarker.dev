<script setup>
import {computed, ref} from 'vue'
import { storeGist } from '~/stores/gistStore'
const gistStore = storeGist()
const owner = computed(() => gistStore?.gist?.owner)
const disabled = ref(false)
const locked = ref(true)
const cloudSync = computed(() => gistStore.gist)
const saveSettings = () => {
  console.log('xxx')
}
</script>

<template>
    <div class=" w-[500px]">

      <div v-if="owner" class="mb-4">
        <a :href="owner?.html_url" target="_blank" class="block  p-2  ring-2 ring-base-500 ring-offset-base-300 ring-offset-2 mb-4 rounded-lg">
          <div class="flex w-full space-x-4 items-center">
            <div>
              <img :src="owner?.avatar_url" width="50" class="rounded-full">
            </div>
            <div>
              {{owner?.login}}
            </div>
          </div>
        </a>
      </div>
      <div class="flex space-x-4">

        <div class="px-2 w-1/2 flex-initial">

          <div class="mb-2 text-2xl font-bold text-base-300">
            Settings
          </div>

          <form @submit.prevent="gistStore.saveData('settings')">
            <div class="mb-4">
              <label for="backgroundColor">
                Background Color
              </label>
              <input type="color" id="backgroundColor" v-model="gistStore.settings.backgroundColor" />
            </div>

            <div class="mb-4">
              <label for="backgroundImage">
                Background Image
              </label>
              <input type="text" id="backgroundImage" v-model="gistStore.settings.backgroundImage" />
            </div>
            <button :disabled="!gistStore.settings.backgroundColor && !gistStore.settings.backgroundImage"  class="bg-base px-4 py-2 rounded border-2 border-base-400 disabled:bg-base-700 disabled:border-base-600 disabled:text-base-300"  type="submit">
              Save
            </button>
          </form>


        </div>
        <div class="right-settings w-1/2 flex-grow px-2">

          <div class="mb-2 text-2xl font-bold text-base-300 flex items-center space-x-2">
            <icons-bolt :width="20" :height="20" class="text-yellow-400"  v-if="cloudSync" />
            <div>
              Account Details
            </div>
          </div>




          <form @submit.prevent="gistStore.saveToken()" class="relative" >
            <div class="w-full h-full bg-base-700  bg-opacity-80 absolute flex items-center justify-center " v-if="gistStore?.gist?.url && locked">
              <button @click="locked = !locked" class="flex items-center space-x-2 bg-base py-0.5 rounded px-2">
                <div>Locked</div> <icons-lock class="text-fuchsia-600" :width="15" />
              </button>
            </div>
            <div class="mb-2">
              <label for="gistId">
                Gist ID
              </label>
              <input id="gistId" type="text" v-model="gistStore.gistId">
            </div>
            <div class="mb-4">
              <label for="token">
                Token
              </label>
              <input id="token" type="password" v-model="gistStore.token">
            </div>
            <div v-if="!locked && gistStore?.gist?.url" class="text-xs mb-4">
              Be careful you can delete your token or gist id if you change them now.
            </div>
            <div class="flex w-full space-x-4">
              <button :disabled="disabled || !gistStore.gistId?.length || !gistStore.token?.length" class="bg-base w-full px-4 py-2 rounded border-2 border-base-400 disabled:bg-base-700 disabled:border-base-600 disabled:text-base-300"  type="submit">
                Submit
              </button>
              <button  v-if="!locked && gistStore?.gist?.url" @click="locked = !locked" class="bg-red-500 w-full px-4 py-2 rounded border-2 border-red-600 disabled:bg-base-700 disabled:border-base-600 disabled:text-base-300"  type="button">
                Cancel
              </button>
            </div>
          </form>
        </div>


      </div>
    </div>
</template>
