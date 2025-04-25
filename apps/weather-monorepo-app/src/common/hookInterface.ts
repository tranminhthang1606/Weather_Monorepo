export interface GeolocationHook {
  getCurrentPosition: () => Promise<GeolocationPosition>;
  error: any;
  isLoading: boolean;
}

export interface LocalStorageHook<T> {
  value: T;
  setValue: (value: T) => void;
}
