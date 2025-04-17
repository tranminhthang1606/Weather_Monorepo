<template>
  <div class="min-h-screen bg-gray-100">
    <header class="bg-white shadow-sm p-4">
      <div class="container mx-auto">
        <h1 class="text-2xl font-bold text-gray-800">Weather App</h1>
      </div>
    </header>

    <main class="container mx-auto p-4">
      <WeatherApp />
    </main>

    <footer class="bg-white shadow-sm p-4 mt-8 fixed bottom-0 w-full">
      <div class="container mx-auto text-center text-gray-600">
        <p>&copy; 2025 Weather App. Powered by OpenWeather API.</p>
      </div>
    </footer>
  </div>
</template>

<script setup>
import WeatherApp from '../components/WeatherApp.vue'
</script>
