import { ref } from 'vue'


export function useGeolocation() {
  const coords = ref(null)
  const error = ref(null)
  const isLoading = ref(false)


  const getCurrentPosition = () => {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        const err = new Error('Geolocation is not supported by your browser')
        error.value = err.message
        reject(err)
        return
      }

      isLoading.value = true

      navigator.geolocation.getCurrentPosition(
        (position) => {
          coords.value = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          }
          isLoading.value = false
          resolve(position)
        },
        (err) => {
          error.value = err.message
          isLoading.value = false
          reject(err)
        },
        { enableHighAccuracy: true, timeout: 5000, maximumAge: 0 }
      )
    })
  }


  const isSupported = () => {
    return !!navigator.geolocation
  }

  return {
    coords,
    error,
    isLoading,
    isSupported,
    getCurrentPosition
  }
}
