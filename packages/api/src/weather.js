

const API_KEY = process.env.VITE_OPENWEATHER_API_KEY
const BASE_URL = process.env.VITE_API_BASE_URL || 'https://api.openweathermap.org/data/2.5'
const UNITS = process.env.VITE_API_UNITS || 'metric'
const LANG = process.env.VITE_API_LANG || 'vi'

export async function getWeatherByCity(city) {
  if (!city || !city.trim()) {
    throw new Error('Vui lòng nhập tên thành phố')
  }

  try {
    const response = await fetch(
      `${BASE_URL}/weather?q=${city}&units=${UNITS}&lang=${LANG}&appid=${API_KEY}`
    )

    if (!response.ok) {
      if (response.status === 404) {
        throw new Error('Không tìm thấy thành phố. Vui lòng kiểm tra lại.')
      }
      throw new Error('Có lỗi xảy ra khi tìm kiếm thời tiết.')
    }

    return await response.json()
  } catch (error) {
    console.error('Error fetching weather by city:', error)
    throw error
  }
}


export async function getWeatherByCoords(lat, lon) {
  if (!lat || !lon) {
    throw new Error('Vui lòng cung cấp tọa độ hợp lệ')
  }

  try {
    const response = await fetch(
      `${BASE_URL}/weather?lat=${lat}&lon=${lon}&units=${UNITS}&lang=${LANG}&appid=${API_KEY}`
    )

    if (!response.ok) {
      throw new Error('Không thể lấy thời tiết cho vị trí này.')
    }

    return await response.json()
  } catch (error) {
    console.error('Error fetching weather by coordinates:', error)
    throw error
  }
}


export async function getForecastByCity(city) {
  if (!city || !city.trim()) {
    throw new Error('Vui lòng nhập tên thành phố')
  }

  try {
    const response = await fetch(
      `${BASE_URL}/forecast?q=${city}&units=${UNITS}&lang=${LANG}&appid=${API_KEY}`
    )

    if (!response.ok) {
      if (response.status === 404) {
        throw new Error('Không tìm thấy thành phố. Vui lòng kiểm tra lại.')
      }
      throw new Error('Có lỗi xảy ra khi tìm kiếm dự báo thời tiết.')
    }

    return await response.json()
  } catch (error) {
    console.error('Error fetching forecast by city:', error)
    throw error
  }
}
