import { ref, Ref } from 'vue'
import { getWeatherByCity, getWeatherByCoords, getForecastByCity } from '@weather-monorepo/api'

interface WeatherCondition {
  id: number;
  main: string;
  description: string;
  icon: string;
}

interface WeatherMain {
  temp: number;
  feels_like: number;
  temp_min: number;
  temp_max: number;
  pressure: number;
  humidity: number;
}

interface WeatherWind {
  speed: number;
  deg: number;
  gust?: number;
}

interface WeatherSys {
  type: number;
  id: number;
  country: string;
  sunrise: number;
  sunset: number;
}

interface WeatherData {
  id: number;
  name: string;
  dt: number;
  timezone: number;
  visibility: number;
  base: string;
  cod: number;
  coord: {
    lon: number;
    lat: number;
  };
  weather: WeatherCondition[];
  main: WeatherMain;
  wind: WeatherWind;
  sys: WeatherSys;
  clouds?: {
    all: number;
  };
  rain?: {
    '1h'?: number;
    '3h'?: number;
  };
  snow?: {
    '1h'?: number;
    '3h'?: number;
  };
}

// Định nghĩa interface cho dữ liệu dự báo
interface ForecastItem {
  dt: number;
  main: WeatherMain;
  weather: WeatherCondition[];
  clouds: {
    all: number;
  };
  wind: WeatherWind;
  visibility: number;
  pop: number;
  sys: {
    pod: string;
  };
  dt_txt: string;
  rain?: {
    '3h': number;
  };
  snow?: {
    '3h': number;
  };
}

interface ForecastData {
  cod: string;
  message: number;
  cnt: number;
  list: ForecastItem[];
  city: {
    id: number;
    name: string;
    coord: {
      lat: number;
      lon: number;
    };
    country: string;
    population: number;
    timezone: number;
    sunrise: number;
    sunset: number;
  };
}

// Định nghĩa interface cho kết quả trả về của hook
interface WeatherHookResult {
  weather: Ref<WeatherData | null>;
  forecast: Ref<ForecastData | null>;
  error: Ref<string>;
  isLoading: Ref<boolean>;
  fetchWeatherByCity: (city: string) => Promise<WeatherData | null>;
  fetchWeatherByCoords: (lat: number, lon: number) => Promise<WeatherData | null>;
  fetchForecast: (city: string) => Promise<ForecastData | null>;
}


export function useWeather(): WeatherHookResult {
  const weather = ref<WeatherData | null>(null);
  const forecast = ref<ForecastData | null>(null);
  const error = ref<string>('');
  const isLoading = ref<boolean>(false);


  const fetchWeatherByCity = async (city: string): Promise<WeatherData | null> => {
    if (!city.trim()) {
      error.value = 'Vui lòng nhập tên thành phố';
      return null;
    }

    error.value = '';
    isLoading.value = true;

    try {
      const data = await getWeatherByCity(city);
      weather.value = data;
      return data;
    } catch (err: any) {
      console.error('Error in useWeather:', err);
      error.value = err.message;
      return null;
    } finally {
      isLoading.value = false;
    }
  };

  /**
   * Lấy dữ liệu thời tiết theo tọa độ
   * @param {number} lat - Vĩ độ
   * @param {number} lon - Kinh độ
   * @returns {Promise<WeatherData | null>} Dữ liệu thời tiết hoặc null nếu có lỗi
   */
  const fetchWeatherByCoords = async (lat: number, lon: number): Promise<WeatherData | null> => {
    error.value = '';
    isLoading.value = true;

    try {
      const data = await getWeatherByCoords(lat, lon);
      weather.value = data;
      return data;
    } catch (err: any) {
      console.error('Error in useWeather:', err);
      error.value = err.message;
      return null;
    } finally {
      isLoading.value = false;
    }
  };


  const fetchForecast = async (city: string): Promise<ForecastData | null> => {
    if (!city.trim()) {
      error.value = 'Vui lòng nhập tên thành phố';
      return null;
    }

    error.value = '';
    isLoading.value = true;

    try {
      const data = await getForecastByCity(city);
      forecast.value = data;
      return data;
    } catch (err: any) {
      console.error('Error in useWeather:', err);
      error.value = err.message;
      return null;
    } finally {
      isLoading.value = false;
    }
  };

  return {
    weather,
    forecast,
    error,
    isLoading,
    fetchWeatherByCity,
    fetchWeatherByCoords,
    fetchForecast
  };
}
