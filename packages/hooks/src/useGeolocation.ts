import { ref, Ref } from 'vue';

interface Coordinates {
  latitude: number;
  longitude: number;
}

interface GeolocationResult {
  coords: Ref<Coordinates | null>;
  error: Ref<string | null>;
  isLoading: Ref<boolean>;
  isSupported: () => boolean;
  getCurrentPosition: () => Promise<GeolocationPosition>;
}


export function useGeolocation(): GeolocationResult {
  const coords = ref<Coordinates>({ latitude: 0, longitude: 0 });
  const error = ref<string>('');
  const isLoading = ref<boolean>(false);


  const getCurrentPosition = () => {
    return new Promise<GeolocationPosition>((resolve, reject): void => {
      if (!navigator.geolocation) {
        const err = new Error('Geolocation is not supported by your browser');
        error.value = err.message;
        reject(err);
        return;
      }

      isLoading.value = true;

      navigator.geolocation.getCurrentPosition(
        (position: GeolocationPosition) => {
          coords.value = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          };
          isLoading.value = false;
          resolve(position);
        },
        (err: GeolocationPositionError) => {
          error.value = err.message;
          isLoading.value = false;
          reject(err);
        },
        { enableHighAccuracy: true, timeout: 5000, maximumAge: 0 }
      );
    });
  };


  const isSupported = (): boolean => {
    return !!navigator.geolocation;
  };

  return {
    coords,
    error,
    isLoading,
    isSupported,
    getCurrentPosition
  };
}
