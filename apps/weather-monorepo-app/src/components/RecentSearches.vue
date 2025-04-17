<template>
  <div class="recent-searches">
    <div class="flex items-center justify-between mb-3">
      <h3 class="text-lg font-medium text-gray-700">Tìm kiếm gần đây</h3>
      <button
        @click="$emit('clear')"
        class="text-sm text-red-500 hover:text-red-700"
      >
        Xóa lịch sử
      </button>
    </div>

    <div class="flex flex-wrap gap-2">
      <button
        v-for="(search, index) in searches"
        :key="index"
        @click="$emit('select', search)"
        class="px-3 py-1 bg-gray-200 text-gray-700 rounded-full text-sm hover:bg-gray-300"
      >
        {{ search }}
      </button>
    </div>
  </div>
</template>

<script setup>
defineProps({
  searches: {
    type: Array,
    default: () => []
  }
})

defineEmits(['select', 'clear'])
</script>
