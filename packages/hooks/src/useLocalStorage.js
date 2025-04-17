import { ref, watch } from 'vue'

/**
 * Hook để quản lý dữ liệu trong localStorage
 * @param {string} key - Khóa để lưu trong localStorage
 * @param {any} initialValue - Giá trị ban đầu
 * @returns {Object} - State và methods để thao tác với localStorage
 */
export function useLocalStorage(key, initialValue = null) {
  // Tạo state với giá trị từ localStorage hoặc initialValue
  const getValue = () => {
    try {
      const item = localStorage.getItem(key)
      return item ? JSON.parse(item) : initialValue
    } catch (error) {
      console.error(`Error reading localStorage key "${key}":`, error)
      return initialValue
    }
  }

  const storedValue = ref(getValue())

  // Hàm cập nhật giá trị trong localStorage
  const setValue = (value) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue.value) : value
      storedValue.value = valueToStore
      localStorage.setItem(key, JSON.stringify(valueToStore))
    } catch (error) {
      console.error(`Error setting localStorage key "${key}":`, error)
    }
  }

  const removeValue = () => {
    try {
      localStorage.removeItem(key)
      storedValue.value = initialValue
    } catch (error) {
      console.error(`Error removing localStorage key "${key}":`, error)
    }
  }

  watch(storedValue, (newValue) => {
    if (newValue === null || newValue === undefined) {
      removeValue()
    } else {
      localStorage.setItem(key, JSON.stringify(newValue))
    }
  }, { deep: true })

  return {
    value: storedValue,
    setValue,
    removeValue
  }
}
