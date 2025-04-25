import { Ref } from 'vue';

export interface UrlParams {
  city?: string;
  units?: string;
  lang?: string;

  [key: string]: string | undefined;
}
export interface UrlParamsHook {
  params: Ref<UrlParams>;
  setParams: (params: UrlParams) => void;
  getParam: (key: string, defaultValue?: string) => string | undefined;
  cleanup: () => void;
}
