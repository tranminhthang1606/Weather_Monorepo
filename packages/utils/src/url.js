
export function updateUrlParams(params, replace = false) {
  if (typeof window === 'undefined') return; // Kiểm tra nếu đang chạy trên server

  const url = new URL(window.location.href);

  // Cập nhật hoặc thêm mới các params
  Object.entries(params).forEach(([key, value]) => {
    if (value === null || value === undefined || value === '') {
      url.searchParams.delete(key);
    } else {
      url.searchParams.set(key, value);
    }
  });

  // Cập nhật URL mà không reload trang
  if (replace) {
    window.history.replaceState({}, '', url);
  } else {
    window.history.pushState({}, '', url);
  }
}

export function getUrlParam(key, defaultValue = '') {
  if (typeof window === 'undefined') return defaultValue;

  const url = new URL(window.location.href);
  return url.searchParams.get(key) || defaultValue;
}


export function getAllUrlParams() {
  if (typeof window === 'undefined') return {};

  const url = new URL(window.location.href);
  const params = {};

  for (const [key, value] of url.searchParams.entries()) {
    params[key] = value;
  }

  return params;
}


export function clearUrlParams() {
  if (typeof window === 'undefined') return;

  const url = new URL(window.location.href);
  url.search = '';
  window.history.replaceState({}, '', url);
}
