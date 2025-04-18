import { ref, onMounted, onUnmounted } from 'vue'

/**
 * Composable để quản lý các tham số URL
 * @returns {Object} Các phương thức và trạng thái để làm việc với URL params
 */
export function useUrlParams() {
  // Lưu trữ các tham số URL hiện tại
  const params = ref({})

  // Phân tích URL để lấy các tham số
  const parseUrl = () => {
    const urlSearchParams = new URLSearchParams(window.location.search)
    const urlParams = {}

    for (const [key, value] of urlSearchParams.entries()) {
      urlParams[key] = value
    }

    params.value = urlParams
  }

  // Lấy giá trị của một tham số cụ thể, với giá trị mặc định nếu không tồn tại
  const getParam = (key, defaultValue = '') => {
    return params.value[key] !== undefined ? params.value[key] : defaultValue
  }

  // Cập nhật hoặc thêm các tham số vào URL
  const setParams = (newParams) => {
    const urlSearchParams = new URLSearchParams(window.location.search)

    // Cập nhật hoặc thêm các tham số mới
    for (const [key, value] of Object.entries(newParams)) {
      if (value === null || value === undefined || value === '') {
        urlSearchParams.delete(key)
      } else {
        urlSearchParams.set(key, value)
      }
    }

    // Cập nhật URL mà không làm mới trang
    const newUrl = `${window.location.pathname}${urlSearchParams.toString() ? `?${urlSearchParams.toString()}` : ''}`
    window.history.pushState({ path: newUrl }, '', newUrl)

    // Cập nhật trạng thái local
    parseUrl()
  }

  // Xóa một tham số khỏi URL
  const removeParam = (key) => {
    const urlSearchParams = new URLSearchParams(window.location.search)
    urlSearchParams.delete(key)

    // Cập nhật URL mà không làm mới trang
    const newUrl = `${window.location.pathname}${urlSearchParams.toString() ? `?${urlSearchParams.toString()}` : ''}`
    window.history.pushState({ path: newUrl }, '', newUrl)

    // Cập nhật trạng thái local
    parseUrl()
  }

  // Xử lý sự kiện khi người dùng điều hướng (back/forward)
  const handlePopState = () => {
    parseUrl()
  }

  // Dọn dẹp các event listener
  const cleanup = () => {
    window.removeEventListener('popstate', handlePopState)
  }

  // Khởi tạo khi component được mount
  onMounted(() => {
    parseUrl()
    window.addEventListener('popstate', handlePopState)
  })

  // Dọn dẹp khi component bị unmount
  onUnmounted(() => {
    cleanup()
  })

  return {
    params,
    getParam,
    setParams,
    removeParam,
    cleanup
  }
}
