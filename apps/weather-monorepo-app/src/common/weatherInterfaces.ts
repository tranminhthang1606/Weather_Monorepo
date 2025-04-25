// weatherTypes.ts
export type WeatherCode = string;

export interface WeatherOptions {
  units: 'metric' | 'imperial' | 'standard',
  lang: string
}
// Enum cho các loại thời tiết
export enum WeatherType {
  CLEAR = 'clear',
  CLOUDS = 'clouds',
  RAIN = 'rain',
  THUNDERSTORM = 'thunderstorm',
  SNOW = 'snow'
}

// Interface riêng cho style mưa
export interface RainStyle {
  left: string;
  animationDelay: string;
  animationDuration: string;
}

// Interface riêng cho style tuyết
export interface SnowStyle {
  left: string;
  width: string;
  height: string;
  animationDelay: string;
  animationDuration: string;
}

// Interface riêng cho style mây
export interface CloudStyle {
  top: string;
  transform: string;
  opacity: number;
  animationDelay: string;
  animationDuration: string;
}

// Interface riêng cho style tia nắng
export interface SunRayStyle {
  transform: string;
}
