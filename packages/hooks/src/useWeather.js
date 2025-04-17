import { ref } from 'vue'
import { getWeatherByCity, getWeatherByCoords, getForecastByCity } from '@weather-monorepo/api'


export function useWeather() {
  const weather = ref(null)
  const forecast = ref(null)
  const error = ref('')
  const isLoading = ref(false)


  const fetchWeatherByCity = async (city) => {
    if (!city.trim()) {
      error.value = 'Vui lòng nhập tên thành phố'
      return null
    }

    error.value = ''
    isLoading.value = true

    try {
      const data = await getWeatherByCity(city)
      weather.value = data
      return data
    } catch (err) {
      console.error('Error in useWeather:', err)
      error.value = err.message
      return null
    } finally {
      isLoading.value = false
    }
  }


  const fetchWeatherByCoords = async (lat, lon) => {
    error.value = ''
    isLoading.value = true

    try {
      const data = await getWeatherByCoords(lat, lon)
      weather.value = data
      return data
    } catch (err) {
      console.error('Error in useWeather:', err)
      error.value = err.message
      return null
    } finally {
      isLoading.value = false
    }
  }


  const fetchForecast = async (city) => {
    if (!city.trim()) {
      error.value = 'Vui lòng nhập tên thành phố'
      return null
    }

    error.value = ''
    isLoading.value = true

    try {
      const data = await getForecastByCity(city)
      forecast.value = data
      return data
    } catch (err) {
      console.error('Error in useWeather:', err)
      error.value = err.message
      return null
    } finally {
      isLoading.value = false
    }
  }

  return {
    weather,
    forecast,
    error,
    isLoading,
    fetchWeatherByCity,
    fetchWeatherByCoords,
    fetchForecast
  }
}
