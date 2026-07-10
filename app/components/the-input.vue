<script setup lang="ts">
defineProps<{
  label: string;
  id: string;
  value: string | undefined | null
  type: 'input' | 'color'
  required?: boolean;
  help?: string;
}>()
const emit = defineEmits<{
  (e: 'update', value: string): void
}>()
</script>

<template>
  <div>
    <div class="flex gap items-center">
      <label :for="id" class="grow">
        {{label}}
      </label>
      <div v-if="help" class="text-xs bg-red-500 text-white p-0.5">
        {{help}}
      </div>
    </div>
    <input
        :id="id"
        :required="required"
        :value="value"
        :type="type"
        class="w-full p-2 bg-zinc-800 text-zinc-400 h-10 outline-1 outline-zinc-500 focus:outline-zinc-300 focus:text-white"
        @input="(e: Event) => emit('update', (e.target as HTMLInputElement).value)"
    >
  </div>
</template>
