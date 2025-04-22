import { Ref, ref, watch } from 'vue';

export interface LocalStorageResult<T> {
  value: Ref<T>;
  setValue: (value: T | ((prevValue: T) => T)) => void;
  removeValue: () => void;
}

export function useLocalStorage<T>(key: string, initialValue: T = null as unknown as T): LocalStorageResult<T> {


  type SetterFunction = (prevValue: T) => T;


  const getValue = (): T => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(`Error reading localStorage key "${key}":`, error);
      return initialValue;
    }
  };

  const storedValue = ref<T>(getValue());


  const setValue = (value: T | SetterFunction) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue.value) : value;
      storedValue.value = valueToStore;
      localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error(`Error setting localStorage key "${key}":`, error);
    }
  };

  const removeValue = ():void => {
    try {
      localStorage.removeItem(key);
      storedValue.value = initialValue;
    } catch (error) {
      console.error(`Error removing localStorage key "${key}":`, error);
    }
  };

  watch(storedValue, (newValue) => {
    if (newValue === null || newValue === undefined) {
      removeValue();
    } else {
      localStorage.setItem(key, JSON.stringify(newValue));
    }
  }, { deep: true });

  return {
    value: storedValue,
    setValue,
    removeValue
  } as LocalStorageResult<T>;
}
