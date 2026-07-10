<script setup lang="ts">
defineProps<{
  options: {label: string; value: string}[];
  value: string | undefined | null;
  id: string;
  label: string;
}>()
const emit = defineEmits<{
  (e: 'update', value: string): void
}>()
</script>

<template>
    <div>
      <div>
        <label :for="id">
          {{label}}
        </label>
      </div>
      <select
          :id="id"
          class="w-full bg-zinc-800 text-zinc-300 px-2 py-1"
          :value="value"
          @input="(e: Event) => emit('update', (e.target as HTMLInputElement).value)"
      >
        <option v-for="(option, optionIndex) in options" :key="`option-${optionIndex}`" :value="option.value">
          {{option.label}}
        </option>
      </select>
    </div>
</template>
