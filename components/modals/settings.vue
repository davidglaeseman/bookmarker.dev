<script setup>
import {computed, ref} from 'vue'
import { storeGist } from '~/stores/gistStore'
const gistStore = storeGist()
const owner = computed(() => gistStore?.gist?.owner)
const disabled = ref(false)
</script>

<template>
    <div class="flex space-x-4 w-[500px]">

      <div class="px-2 flex-initial">

        <div class="mb-6 text-2xl font-bold text-base-300">
          Settings
        </div>

        <div class="mb-4">
          <label for="backgroundColor">
            Background Color
          </label>
          <input type="color" id="backgroundColor" v-model="gistStore.settings.backgroundColor" />
        </div>

        <div>
          <label for="backgroundImage">
            Background Image
          </label>
          <input type="text" id="backgroundImage" v-model="gistStore.settings.backgroundImage" />
        </div>


      </div>
      <div class="right-settings flex-grow px-2">

        <div class="mb-6 text-2xl font-bold text-base-300">
          Account Details
        </div>

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


        <form @submit.prevent="saveToken()">
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
          <div class="text-right">
            <button :disabled="disabled || !gistStore.gistId?.length || !gistStore.token?.length" class="bg-base px-4 py-2 rounded border-2 border-base-400 disabled:bg-base-700 disabled:border-base-600 disabled:text-base-300"  type="submit">
              Save
            </button>
          </div>
        </form>
      </div>


    </div>
</template>
