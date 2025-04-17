<template>
  <div class="weather-app">
    <div class="bg-white rounded-lg shadow-md p-6">

      <WeatherSearch
        v-model="searchQuery"
        :is-loading="isLoading"
        @search="searchLocation"
      />

      <p v-if="error" class="mt-4 text-red-500">{{ error }}</p>


      <WeatherDetails
        v-if="weather"
        :weather="weather"
        class="mt-6"
      />

      <RecentSearches
        v-if="recentSearches.value.length"
        :searches="recentSearches.value"
        @select="loadRecentSearch"
        @clear="recentSearches.setValue([])"
        class="mt-8"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import WeatherSearch from './WeatherSearch.vue'
import WeatherDetails from './WeatherDetails.vue'
import RecentSearches from './RecentSearches.vue'
import { useWeather, useGeolocation, useLocalStorage } from '@weather-monorepo/hooks'


const { weather, error, isLoading, fetchWeatherByCity, fetchWeatherByCoords } = useWeather()
const { getCurrentPosition } = useGeolocation()
const recentSearches = useLocalStorage('recentSearches', [])


const searchQuery = ref('')


const searchLocation = async () => {
  if (!searchQuery.value.trim()) return

  const data = await fetchWeatherByCity(searchQuery.value)

  if (data) {

    if (!recentSearches.value.includes(searchQuery.value)) {
      recentSearches.setValue([
        searchQuery.value,
        ...recentSearches.value.filter(item => item !== searchQuery.value).slice(0, 4)
      ])
    }
  }
}

const loadRecentSearch = (city) => {
  searchQuery.value = city
  searchLocation()
}


onMounted(async () => {

  try {
    const position = await getCurrentPosition()
    const data = await fetchWeatherByCoords(position.coords.latitude, position.coords.longitude)
    if (data) {
      searchQuery.value = data.name
    }
  } catch (err) {
    console.log('Could not get current location:', err)

    if (!weather.value) {
      searchQuery.value = 'Hanoi'
      searchLocation()
    }
  }
})
</script>
