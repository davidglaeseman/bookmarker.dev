<script setup lang="ts">
import {useAppStore} from "@/stores/useAppStore";
const appStore = useAppStore()
const {isUrlValid } = useHelpers()
const backgroundSizes = [
  {label:"Cover", value:"cover"},
  {label:"Contain", value:"contain"},
  {label:"Auto", value:"auto"},
]

const backgroundRepeats = [
  {label:"No Repeat", value:"no-repeat"},
  {label:"Repeat", value:"repeat"},
  {label:"Repeat Block", value:"repeat-block"},
  {label:"Repeat Inline", value:"repeat-inline"},
  {label:"Repeat X", value:"repeat-x"},
  {label:"Repeat Y", value:"repeat-y"},
  {label:"Space", value:"space"},
  {label:"Round", value:"round"},
]

const backgroundAttachments = [
  {label:"Scroll", value:"scroll"},
  {label:"Fixed", value:"fixed"},
  {label:"Local", value:"local"},
]


const backgroundPositions = [
  {label:"Left Top", value:"left top"},
  {label:"Left Center", value:"left center"},
  {label:"Left Bottom", value:"left bottom"},
  {label:"Right Top", value:"right top"},
  {label:"Right Center", value:"right center"},
  {label:"Right Bottom", value:"right bottom"},
  {label:"Center Top", value:"center top"},
  {label:"Center Center", value:"center center"},
  {label:"Center Bottom", value:"center bottom"},
]


</script>

<template>
    <div class="w-auto md:min-w-xl">

      <the-input
          id="backgroundColor"
          class="mb-4"
          label="Background Color"
          :value="appStore.setting.backgroundColor"
          type="color"
          @update="appStore.handleUpdateBackgroundColor"
      />

      <the-input
          id="textColor"
          class="mb-4"
          label="Text Color"
          :value="appStore.setting.textColor"
          type="color"
          @update="appStore.handleUpdateTextColor"
      />

      <the-input
          id="backgroundImage"
          class="mb-4"
          label="Background Image URL"
          :value="appStore.setting.backgroundImage"
          type="input"
          @update="appStore.handleBackgroundChange"
      />



      <div v-if="isUrlValid(appStore?.setting?.backgroundImage)" class="flex w-full gap-2">
        <div class="w-1/4">
          <the-select
            id="backgroundSize"
            :value="appStore.setting.backgroundSize"
            :options="backgroundSizes"
            label="Size"
            @update="appStore.handleBackgroundSizeChange"
          />
        </div>
        <div class="w-1/4">
          <the-select
              id="backgroundAttachment"
              :value="appStore.setting.backgroundAttachment"
              :options="backgroundAttachments"
              label="Attachment"
              @update="appStore.handleBackgroundAttachmentChange"
          />
        </div>
        <div class="w-1/4">
          <the-select
              id="backgroundRepeat"
              :value="appStore.setting.backgroundRepeat"
              :options="backgroundRepeats"
              label="Repeat"
              @update="appStore.handleBackgroundRepeatChange"
          />
        </div>
        <div class="w-1/4">
          <the-select
              id="handleBackgroundPositionChange"
              :value="appStore.setting.backgroundPosition"
              :options="backgroundPositions"
              label="Position"
              @update="appStore.handleBackgroundPositionChange"
          />
        </div>
      </div>
    </div>
</template>
