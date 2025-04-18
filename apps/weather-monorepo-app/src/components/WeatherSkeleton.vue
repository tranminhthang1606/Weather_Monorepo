<template>
  <div class="weather-skeleton animate-pulse">
    <!-- Weather Card Skeleton -->
    <div class="rounded-2xl bg-white/30 backdrop-blur-sm shadow-xl overflow-hidden">
      <div class="p-6 md:p-8">
        <!-- Location & Date Skeleton -->
        <div class="flex flex-col md:flex-row justify-between items-center">
          <div class="text-center md:text-left mb-4 md:mb-0">
            <div class="h-8 bg-white/50 rounded-lg w-48 mb-2"></div>
            <div class="h-4 bg-white/50 rounded-lg w-32"></div>
          </div>
          <div class="h-10 bg-white/50 rounded-lg w-24"></div>
        </div>

        <!-- Main Weather Info Skeleton -->
        <div class="flex flex-col md:flex-row items-center justify-between mt-8 gap-6">
          <div class="flex items-center">
            <div class="w-24 h-24 md:w-32 md:h-32 bg-white/50 rounded-full"></div>
            <div class="ml-2">
              <div class="h-6 bg-white/50 rounded-lg w-32 mb-2"></div>
              <div class="h-4 bg-white/50 rounded-lg w-24"></div>
            </div>
          </div>

          <div class="text-center md:text-right">
            <div class="h-16 bg-white/50 rounded-lg w-32 mb-2"></div>
            <div class="h-5 bg-white/50 rounded-lg w-48"></div>
          </div>
        </div>
      </div>
    </div>


    <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
      <div v-for="i in 4" :key="i" class="bg-white/40 backdrop-blur-sm p-4 rounded-xl shadow-md border border-white/30">
        <div class="flex items-center justify-center mb-2">
          <div class="h-8 w-8 bg-white/50 rounded-full"></div>
        </div>
        <div class="h-4 bg-white/50 rounded-lg w-16 mx-auto mb-2"></div>
        <div class="h-6 bg-white/50 rounded-lg w-20 mx-auto"></div>
      </div>
    </div>


    <div class="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
      <div v-for="i in 2" :key="i" class="bg-white/40 backdrop-blur-sm p-4 rounded-xl shadow-md">
        <div class="flex items-center">
          <div class="h-12 w-12 bg-white/50 rounded-full mr-4"></div>
          <div>
            <div class="h-4 bg-white/50 rounded-lg w-16 mb-2"></div>
            <div class="h-6 bg-white/50 rounded-lg w-24"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
</script>
