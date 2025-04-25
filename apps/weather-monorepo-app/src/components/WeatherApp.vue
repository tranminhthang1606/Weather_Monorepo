<template>
  <div
    class="weather-app min-h-screen p-4 md:p-8 flex flex-col items-center justify-center transition-all duration-1000 w-full"
    :class="backgroundClass"
  >
    <div
      class="w-full max-w-4xl backdrop-blur-md bg-white/20 rounded-3xl shadow-2xl overflow-hidden border border-white/30">
      <div class="relative overflow-hidden">
        <div class="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 opacity-90"></div>
        <div class="relative p-6 md:p-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <div class="text-center md:text-left">
            <h1 class="text-3xl md:text-4xl font-bold text-white flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path d="M5.5 16a3.5 3.5 0 01-.369-6.98 4 4 0 117.753-1.977A4.5 4.5 0 1113.5 16h-8z" />
              </svg>
              Weather App
            </h1>
            <p class="text-white/80 mt-1">Dự báo thời tiết chính xác mọi lúc, mọi nơi</p>
          </div>
        </div>
      </div>


      <div class="p-6 md:p-8 bg-white/30 backdrop-blur-md">

        <WeatherSearch
          v-model="searchQuery"
          :is-loading="isLoading"
          @search="searchLocation"
        />


        <div v-if="error" class="mt-6 p-4 bg-red-100/80 backdrop-blur-sm border border-red-200 rounded-xl">
          <p class="text-red-600 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                    clip-rule="evenodd" />
            </svg>
            {{ error }}
          </p>
        </div>


        <WeatherSkeleton v-if="isLoading && !weather" class="mt-6" />


        <transition
          enter-active-class="transition duration-500 ease-out"
          enter-from-class="transform opacity-0 scale-95"
          enter-to-class="transform opacity-100 scale-100"
          leave-active-class="transition duration-300 ease-in"
          leave-from-class="transform opacity-100 scale-100"
          leave-to-class="transform opacity-0 scale-95"
        >
          <WeatherDetails
            v-if="weather && !isLoading"
            :weather="weather"
            class="mt-6"
          />
        </transition>


        <transition
          enter-active-class="transition duration-500 ease-out"
          enter-from-class="transform opacity-0 translate-y-4"
          enter-to-class="transform opacity-100 translate-y-0"
        >
          <RecentSearches
            v-if="recentSearches.value.length"
            :searches="recentSearches.value"
            @select="loadRecentSearch"
            @clear="recentSearches.setValue([])"
            class="mt-8"
          />
        </transition>
      </div>


    </div>

  </div>
</template>
<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, watch } from 'vue';
import WeatherSearch from './WeatherSearch.vue';
import WeatherDetails from './WeatherDetails.vue';
import RecentSearches from './RecentSearches.vue';
import {
  useWeather,
  useGeolocation,
  useLocalStorage,
  useUrlParams
} from '@weather-monorepo/hooks';
import WeatherSkeleton from '@/components/WeatherSkeleton.vue';
import { WeatherOptions} from '@/common/weatherInterfaces';
import { UrlParams, UrlParamsHook } from '@/common/urlInterfaces';
import { GeolocationHook, LocalStorageHook } from '@/common/hookInterface';

const backgroundClass = computed<string>(() => {
  const hour = new Date().getHours();

  if (weather.value) {
    const weatherCode = weather.value.weather[0].icon;

    // Thời tiết mưa
    if (weatherCode.startsWith('09') || weatherCode.startsWith('10')) {
      return 'bg-gradient-to-br from-gray-700 via-gray-800 to-gray-900';
    }

    // Thời tiết có tuyết
    if (weatherCode.startsWith('13')) {
      return 'bg-gradient-to-br from-blue-100 via-blue-300 to-blue-500';
    }

    // Thời tiết có sấm sét
    if (weatherCode.startsWith('11')) {
      return 'bg-gradient-to-br from-gray-800 via-purple-900 to-gray-900';
    }

    // Thời tiết nhiều mây
    if (weatherCode.startsWith('02') || weatherCode.startsWith('03') || weatherCode.startsWith('04')) {
      if (hour >= 6 && hour < 18) {
        return 'bg-gradient-to-br from-blue-300 via-gray-300 to-blue-400';
      } else {
        return 'bg-gradient-to-br from-gray-700 via-gray-800 to-gray-900';
      }
    }
  }

  if (hour >= 5 && hour < 8) {
    // Bình minh
    return 'bg-gradient-to-br from-orange-300 via-purple-300 to-blue-400';
  } else if (hour >= 8 && hour < 16) {
    // Ban ngày
    return 'bg-gradient-to-br from-blue-400 via-blue-300 to-blue-500';
  } else if (hour >= 16 && hour < 19) {
    // Hoàng hôn
    return 'bg-gradient-to-br from-orange-400 via-pink-400 to-purple-600';
  } else {
    // Ban đêm
    return 'bg-gradient-to-br from-gray-900 via-purple-900 to-blue-900';
  }
});

const { params, setParams, getParam, cleanup } = useUrlParams() as UrlParamsHook;

// Sử dụng type assertion với as const để đảm bảo kiểu dữ liệu chính xác
const initialOptions: WeatherOptions = {
  units: getParam('units', 'metric') as WeatherOptions['units'],
  lang: getParam('lang', 'vi') as WeatherOptions['lang']
};

const {
  weather,
  error,
  isLoading,
  options: weatherOptions,
  updateOptions,
  fetchWeatherByCity,
  fetchWeatherByCoords
} = useWeather(initialOptions);

const { getCurrentPosition } = useGeolocation() as GeolocationHook;
const recentSearches = useLocalStorage('recentSearches', []) as LocalStorageHook<string[]>;

const searchQuery = ref<string>(getParam('city', ''));

const searchLocation = async (): Promise<void> => {
  if (!searchQuery.value.trim()) return;

  setParams({
    city: searchQuery.value,
    units: weatherOptions?.units,
    lang: weatherOptions?.lang
  });

  const data = await fetchWeatherByCity(searchQuery.value);

  // Chỉ kiểm tra data một lần
  if (data && !recentSearches.value.includes(searchQuery.value)) {
    recentSearches.setValue([
      searchQuery.value,
      ...recentSearches.value.filter(item => item !== searchQuery.value).slice(0, 4)
    ]);
  }
};

const loadRecentSearch = (city: string): void => {
  searchQuery.value = city;
  searchLocation();
};

watch(() => params.value, (newParams: UrlParams) => {
  // Tạo một đối tượng với kiểu rõ ràng
  const updates: Partial<WeatherOptions> = {};
  let needsRefresh = false;

  if (newParams.city && newParams.city !== searchQuery.value) {
    searchQuery.value = newParams.city;
    needsRefresh = true;
  }

  if (newParams.units && weatherOptions && newParams.units !== weatherOptions.units) {
    updates.units = newParams.units as WeatherOptions['units'];
  }

  if (newParams.lang && weatherOptions && newParams.lang !== weatherOptions.lang) {
    updates.lang = newParams.lang as WeatherOptions['lang'];
  }

  if (Object.keys(updates).length > 0) {
    updateOptions(updates);
    needsRefresh = true;
  }

  if (needsRefresh && searchQuery.value) {
    fetchWeatherByCity(searchQuery.value);
  }
}, { deep: true });

onMounted(async () => {
  const cityFromUrl = getParam('city');

  if (cityFromUrl) {
    searchQuery.value = cityFromUrl;
    await fetchWeatherByCity(cityFromUrl);
  } else {
    try {
      const position = await getCurrentPosition();
      const data = await fetchWeatherByCoords(position.coords.latitude, position.coords.longitude);

      if (data) {
        searchQuery.value = data.name;

        // Đảm bảo weatherOptions không null trước khi sử dụng
        if (weatherOptions) {
          setParams({
            city: data.name,
            units: weatherOptions.units,
            lang: weatherOptions.lang
          });
        }
      }
    } catch (err) {
      console.log('Could not get current location:', err);

      if (!weather.value) {
        searchQuery.value = 'Hanoi';
        searchLocation();
      }
    }
  }
});

onUnmounted(() => {
  cleanup();
});
</script>
