export function formatDate(date: Date, locale: string = 'vi-VN'): string {
  const options: Intl.DateTimeFormatOptions = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  };
  return date.toLocaleDateString(locale, options);
}


export function formatTemperature(temp: number, unit: string = 'C'): string {
  return `${Math.round(temp)}°${unit}`;
}

export function formatWindSpeed(speed: number): string {
  return `${Math.round(speed * 3.6)} km/h`;
}


export function formatVisibility(meters: number): string {
  return `${(meters / 1000).toFixed(1)} km`;
}


export function formatWindDirection(degrees: number): string {
  const directions = ['Bắc', 'Đông Bắc', 'Đông', 'Đông Nam', 'Nam', 'Tây Nam', 'Tây', 'Tây Bắc'];
  return directions[Math.round(degrees / 45) % 8];
}


export function formatTime(timestamp: number, format: string = 'full'): string {
  const date = new Date(timestamp * 1000);

  switch (format) {
    case 'date':
      return date.toLocaleDateString('vi-VN');
    case 'time':
      return date.toLocaleTimeString('vi-VN');
    case 'day':
      return date.toLocaleDateString('vi-VN', { weekday: 'short' });
    case 'full':
    default:
      return date.toLocaleString('vi-VN');
  }
}
