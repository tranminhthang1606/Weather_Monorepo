<template>
  <div class="weather-details">
    <div class="text-center mb-6">
      <h2 class="text-2xl font-bold text-gray-800">{{ weather.name }}, {{ weather.sys.country }}</h2>
      <p class="text-gray-600">{{ formatDate(new Date()) }}</p>
    </div>

    <div class="flex flex-col md:flex-row items-center justify-center gap-6">
      <div class="weather-icon">
        <img
          :src="`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`"
          :alt="weather.weather[0].description"
          class="w-24 h-24"
        />
        <p class="text-center text-gray-700 capitalize">{{ weather.weather[0].description }}</p>
      </div>

      <div class="temperature text-center">
        <div class="text-6xl font-bold text-gray-800">{{ formatTemperature(weather.main.temp) }}</div>
        <p class="text-gray-600">Cảm giác như: {{ formatTemperature(weather.main.feels_like) }}</p>
      </div>
    </div>

    <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
      <div class="bg-gray-100 p-4 rounded-lg text-center">
        <p class="text-gray-500 text-sm">Độ ẩm</p>
        <p class="text-xl font-semibold text-gray-800">{{ weather.main.humidity }}%</p>
      </div>

      <div class="bg-gray-100 p-4 rounded-lg text-center">
        <p class="text-gray-500 text-sm">Gió</p>
        <p class="text-xl font-semibold text-gray-800">{{ formatWindSpeed(weather.wind.speed) }}</p>
      </div>

      <div class="bg-gray-100 p-4 rounded-lg text-center">
        <p class="text-gray-500 text-sm">Áp suất</p>
        <p class="text-xl font-semibold text-gray-800">{{ weather.main.pressure }} hPa</p>
      </div>

      <div class="bg-gray-100 p-4 rounded-lg text-center">
        <p class="text-gray-500 text-sm">Tầm nhìn</p>
        <p class="text-xl font-semibold text-gray-800">{{ formatVisibility(weather.visibility) }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { formatDate, formatTemperature, formatWindSpeed, formatVisibility } from '@weather-monorepo/utils'

defineProps({
  weather: {
    type: Object,
    required: true
  }
})
</script>
