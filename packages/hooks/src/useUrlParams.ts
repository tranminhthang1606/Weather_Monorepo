import { ref, onMounted, onUnmounted, Ref } from 'vue';



export interface UrlParams {
  [key: string]: string;
}

export interface UrlParamsResult {
  params: Ref<UrlParams>;
  getParam: <T extends string>(key: string, defaultValue?: T) => T;
  setParams: (newParams: Record<string, string | number | boolean | null | undefined>) => void;
  removeParam: (key: string) => void;
  cleanup: () => void;
}


export function useUrlParams() {

  const params = ref<UrlParams>({});


  const parseUrl = (): void => {
    const urlSearchParams = new URLSearchParams(window.location.search);
    const urlParams: UrlParams = {};

    for (const [key, value] of urlSearchParams.entries()) {
      urlParams[key] = value;
    }

    params.value = urlParams;
  };

  const getParam = <T extends string>(key: string, defaultValue: T = '' as T): T => {
    return (params.value[key] !== undefined ? params.value[key] : defaultValue) as T;
  };


  const setParams = (newParams: Record<string, string | number | boolean | null | undefined>): void => {
    const urlSearchParams = new URLSearchParams(window.location.search);


    for (const [key, value] of Object.entries(newParams)) {
      if (value === null || value === undefined || value === '') {
        urlSearchParams.delete(key);
      } else {
        urlSearchParams.set(key, String(value));
      }
    }

    const newUrl = `${window.location.pathname}${urlSearchParams.toString() ? `?${urlSearchParams.toString()}` : ''}`;
    window.history.pushState({ path: newUrl }, '', newUrl);

    parseUrl();
  };


  const removeParam = (key: string): void => {
    const urlSearchParams = new URLSearchParams(window.location.search);
    urlSearchParams.delete(key);

    const newUrl = `${window.location.pathname}${urlSearchParams.toString() ? `?${urlSearchParams.toString()}` : ''}`;
    window.history.pushState({ path: newUrl }, '', newUrl);

    parseUrl();
  };

  const handlePopState = (): void => {
    parseUrl();
  };


  const cleanup = (): void => {
    window.removeEventListener('popstate', handlePopState);
  };

  onMounted(() => {
    parseUrl();
    window.addEventListener('popstate', handlePopState);
  });

  onUnmounted(() => {
    cleanup();
  });

  return {
    params,
    getParam,
    setParams,
    removeParam,
    cleanup
  } as UrlParamsResult;
}
