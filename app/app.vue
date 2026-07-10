<script setup lang="ts">
import draggable from 'vuedraggable'
import {useAppStore, type Bookmark} from "~/stores/useAppStore";
const {getOppositeColor, loadStorageValue, reOrderStorageBookmarks} = useHelpers()
const appStore = useAppStore()
const drag = ref<boolean>(false)
const backgroundColor = computed(() => appStore.setting.backgroundColor)
const backgroundImage = computed(() => appStore.setting.backgroundImage ? `url('${appStore.setting.backgroundImage}')` : '')
const backgroundSize = computed(() => appStore.setting.backgroundSize)
const backgroundRepeat = computed(() => appStore.setting.backgroundRepeat)
const backgroundAttachment = computed(() => appStore.setting.backgroundAttachment)
const backgroundPosition = computed(() => appStore.setting.backgroundPosition)
const textColor = computed(() => appStore.setting.textColor ?? '#fff')
const logoBgColor = computed(()=> getOppositeColor(appStore.setting.backgroundColor))
const activeBookmark = ref<null | Bookmark>(null)
const log = () => {
  const newOrder = appStore.bookmarks.map((bm, index) => ({
    ...bm,
    key: index
  }))
  reOrderStorageBookmarks(newOrder)
}
onMounted(()=>{
  const {bookmarks, settings} = loadStorageValue()
  if(settings){
    appStore.setting = settings
  }
  if(bookmarks){
    appStore.bookmarks = bookmarks
  }
})
useHead({
  title:"bookmarker.dev | free simple bookmarks"
})
</script>
<template>
  <div class="application">


    <div class="p-4 max-h-[calc(100dvh-60px)] overflow-x-hidden overflow-y-auto">
      <draggable
          v-model="appStore.bookmarks"
          item-key="url"
          handle=".handle"
          ghost-class="ghost"
          class="bookmark-grid mb-6"
          @change="log"
          @start="drag=true"
          @end="drag=false"
      >
        <template #item="{element}">
          <the-bookmark
              :key="`bookmark-${element.key}`"
              :size="appStore.bookmarks?.length"
              :bookmark="element"
              @edit-bookmark="(value: Bookmark) => activeBookmark = value"
          />
        </template>
      </draggable>
      <button class="flex items-center justify-center bg-black/50 min-h-[110px] rounded-md cursor-pointer hover:ring-2 hover:ring-green-500 p-2" @click="activeBookmark = {name:'', url:'', favicon:'', key: appStore.bookmarks.length, new: true}">
        <div>
          <div>
            <icon name="lucide:plus" :size="30" />
          </div>
          <div class="text-xs">
            Add Bookmark
          </div>
        </div>
      </button>
    </div>

    <button class="fixed left-2 bottom-2 z-30  bg-black  ring-4 ring-black/30 flex p-1 rounded-full cursor-pointer items-center justify-center" @click="appStore.settingsModalOpen = !appStore.settingsModalOpen">
      <icon name="lucide:cog" :size="30" :class="[appStore.settingsModalOpen ? 'rotate-90 text-white' : 'text-zinc-400 hover:text-zinc-200', 'transition-all']" />
    </button>
    <div class="fixed right-2 bottom-2 py-0.5 px-1 text-xs font-black" :style="`background-color:${logoBgColor};color:${backgroundColor};`">
      bookmarker.dev
    </div>

    <teleport to="body">
      <the-modal title="Settings" :open="appStore.settingsModalOpen" @close="appStore.settingsModalOpen = false">
        <global-settings />
      </the-modal>
      <the-modal  :title="activeBookmark?.new ? 'Add Bookmark' : 'Edit Bookmark'" :open="activeBookmark !== null" @close="activeBookmark = null">
        <edit-bookmark :bookmark="activeBookmark" @close="activeBookmark = null" />
      </the-modal>
    </teleport>
  </div>
</template>

<style scoped>
.sortable-chosen{
  background: rgb(0 0 0 / 0.8);
  border-radius: 0.5rem;
}
.ghost{
  background: rgb(255 255 255 / 0.34);
}
.application {
  height: 100%;
  background-color: v-bind(backgroundColor);
  background-image: v-bind(backgroundImage);
  background-size: v-bind(backgroundSize);
  background-repeat: v-bind(backgroundRepeat);
  background-attachment: v-bind(backgroundAttachment);
  background-position: v-bind(backgroundPosition);
  color: v-bind(textColor);
}
</style>
