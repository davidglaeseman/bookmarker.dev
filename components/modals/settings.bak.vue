<script setup>

import {onMounted, ref, computed} from 'vue'
import {setLocalStorage, getLocalStorage, fetchGist} from '~/composables/utilities'
const disabled = ref(false)
const token = ref(null)
const gistId = ref(null)
const activeGist = ref(null)
const errorMessage = ref(null)
const owner = computed(() => activeGist?.value?.owner)
const saveToken = async () => {
  await getGistData()
  setLocalStorage({key:'token', value: token.value})
  setLocalStorage({key:'gistId', value: gistId.value})
}

const getGistData = async () => {
  disabled.value = true
  activeGist.value = await fetchGist({gistId: gistId.value, token: token.value}).catch((error)=>{
    errorMessage.value = error
    disabled.value = false
    return Promise.reject(error)
  })
  disabled.value = false
}

onMounted(async ()=> {
  token.value = getLocalStorage('token')
  gistId.value = getLocalStorage('gistId')
  if(!gistId.value || !token.value){
    return false
  }

  await getGistData()

})
</script>

<template>
    <div class="flex space-x-4">

      <div class="bg-red-500">
        left-settings

        <div>
          Background Color
        </div>
        <div>
          Background Image
        </div>

      </div>
      <div class="right-settings p-4">
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

        <div v-if="errorMessage">
          {{errorMessage}}
        </div>


        <form @submit.prevent="saveToken()">
          <div class="mb-2">
            <label for="gistId">
              Gist ID
            </label>
            <input id="gistId" type="text" v-model="gistId">
          </div>
          <div class="mb-4">
            <label for="token">
              Token
            </label>
            <input id="token" type="password" v-model="token">
          </div>
          <div class="text-right">
            <button :disabled="disabled || !gistId?.length || !token?.length" class="bg-base px-4 py-2 rounded border-2 border-base-400 disabled:bg-base-700 disabled:border-base-600 disabled:text-base-300"  type="submit">
              Save
            </button>
          </div>
        </form>
      </div>


    </div>
</template>
