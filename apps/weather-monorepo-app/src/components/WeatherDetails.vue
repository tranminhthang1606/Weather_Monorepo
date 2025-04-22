<template>
  <div class="weather-details">

    <div class="relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 shadow-xl">
      <WeatherAnimation :weather-code="weather.weather[0].icon" />

      <div class="absolute inset-0 opacity-20">
        <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
          <defs>
            <pattern id="weather-pattern" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M0 20 L40 20 M20 0 L20 40" stroke="white" stroke-width="0.5" fill="none" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#weather-pattern)" />
        </svg>
      </div>


      <div class="absolute -right-10 -top-10 opacity-20">
        <img
          :src="`https://openweathermap.org/img/wn/${weather.weather[0].icon}@4x.png`"
          class="w-64 h-64"
          alt=""
        />
      </div>


      <div class="relative p-6 md:p-8 text-white">
        <div class="flex flex-col md:flex-row justify-between items-center">

          <div class="text-center md:text-left mb-4 md:mb-0">
            <h2 class="text-3xl md:text-4xl font-bold">{{ weather.name }}, {{ weather.sys.country }}</h2>
            <p class="text-white/80 mt-1">{{ formatDate(new Date()) }}</p>
            <div class="mt-2 inline-flex items-center px-3 py-1 rounded-full bg-white/20 backdrop-blur-sm">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clip-rule="evenodd" />
              </svg>
              <span>{{ formatTime(weather.dt, 'time') }}</span>
            </div>
          </div>


        </div>


        <div class="flex flex-col md:flex-row items-center justify-between mt-8 gap-6">
          <div class="flex items-center">
            <img
              :src="`https://openweathermap.org/img/wn/${weather.weather[0].icon}@4x.png`"
              :alt="weather.weather[0].description"
              class="w-24 h-24 md:w-32 md:h-32"
            />
            <div class="ml-2">
              <p class="text-xl md:text-2xl capitalize">{{ weather.weather[0].description }}</p>
              <div class="flex items-center mt-1">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clip-rule="evenodd" />
                </svg>
                <span>{{ weather.name }}, {{ weather.sys.country }}</span>
              </div>
            </div>
          </div>

          <div class="temperature text-center md:text-right">
            <div class="text-6xl md:text-7xl font-bold">{{ formatTemperature(weather.main.temp) }}</div>
            <p class="text-xl">Cảm giác như: {{ formatTemperature(weather.main.feels_like) }}</p>
          </div>
        </div>
      </div>
    </div>


    <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
      <div class="bg-white/40 backdrop-blur-sm p-4 rounded-xl shadow-md border border-white/30 transform hover:scale-105 transition-transform duration-300">
        <div class="flex items-center justify-center mb-2">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
          </svg>
        </div>
        <p class="text-center text-gray-600 text-sm">Độ ẩm</p>
        <p class="text-center text-2xl font-semibold text-gray-800">{{ weather.main.humidity }}%</p>
      </div>

      <div class="bg-white/40 backdrop-blur-sm p-4 rounded-xl shadow-md border border-white/30 transform hover:scale-105 transition-transform duration-300">
        <div class="flex items-center justify-center mb-2">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <p class="text-center text-gray-600 text-sm">Gió</p>
        <p class="text-center text-2xl font-semibold text-gray-800">{{ formatWindSpeed(weather.wind.speed) }}</p>
      </div>

      <div class="bg-white/40 backdrop-blur-sm p-4 rounded-xl shadow-md border border-white/30 transform hover:scale-105 transition-transform duration-300">
        <div class="flex items-center justify-center mb-2">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
          </svg>
        </div>
        <p class="text-center text-gray-600 text-sm">Áp suất</p>
        <p class="text-center text-2xl font-semibold text-gray-800">{{ weather.main.pressure }} hPa</p>
      </div>

      <div class="bg-white/40 backdrop-blur-sm p-4 rounded-xl shadow-md border border-white/30 transform hover:scale-105 transition-transform duration-300">
        <div class="flex items-center justify-center mb-2">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
          </svg>
        </div>
        <p class="text-center text-gray-600 text-sm">Tầm nhìn</p>
        <p class="text-center text-2xl font-semibold text-gray-800">{{ formatVisibility(weather.visibility) }}</p>
      </div>
    </div>


    <div class="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
      <div class="bg-gradient-to-r from-yellow-400 to-orange-500 p-4 rounded-xl shadow-md text-white flex items-center">
        <div class="p-3 bg-white/20 rounded-full mr-4">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
          </svg>
        </div>
        <div>
          <p class="text-sm opacity-80">Bình minh</p>
          <p class="text-xl font-semibold">{{ formatTime(weather.sys.sunrise, 'time') }}</p>
        </div>
      </div>

      <div class="bg-gradient-to-r from-blue-800 to-indigo-900 p-4 rounded-xl shadow-md text-white flex items-center">
        <div class="p-3 bg-white/20 rounded-full mr-4">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
          </svg>
        </div>
        <div>
          <p class="text-sm opacity-80">Hoàng hôn</p>
          <p class="text-xl font-semibold">{{ formatTime(weather.sys.sunset, 'time') }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { formatDate, formatTemperature, formatWindSpeed, formatVisibility, formatTime } from '@weather-monorepo/utils'
import WeatherAnimation from "@/components/WeatherAnimation.vue";

defineProps({
  weather: {
    type: Object,
    required: true
  }
})

</script>
