export interface UrlParams {
  [key: string]: string | number | boolean | null | undefined;
}


export function updateUrlParams(params: UrlParams, replace: boolean = false): void {
  if (typeof window === 'undefined') return; // Kiểm tra nếu đang chạy trên server

  const url = new URL(window.location.href);


  Object.entries(params).forEach(([key, value]) => {
    if (value === null || value === undefined || value === '') {
      url.searchParams.delete(key);
    } else {
      url.searchParams.set(key, String(value));
    }
  });


  if (replace) {
    window.history.replaceState({}, '', url);
  } else {
    window.history.pushState({}, '', url);
  }
}

export function getUrlParam(key: string, defaultValue: string = ''): string {
  if (typeof window === 'undefined') return defaultValue;

  const url = new URL(window.location.href);
  return url.searchParams.get(key) || defaultValue;
}


export function getAllUrlParams(): UrlParams {
  if (typeof window === 'undefined') return {};

  const url = new URL(window.location.href);
  const params: UrlParams = {};

  for (const [key, value] of url.searchParams.entries()) {
    params[key] = value;
  }

  return params;
}


export function clearUrlParams(): void {
  if (typeof window === 'undefined') return;

  const url = new URL(window.location.href);
  url.search = '';
  window.history.replaceState({}, '', url);
}
