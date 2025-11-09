
export type AqiLevel = 'Good' | 'Moderate' | 'Unhealthy for Sensitive Groups' | 'Unhealthy' | 'Very Unhealthy' | 'Hazardous';

export interface Pollutant {
  name: 'PM2.5' | 'PM10' | 'O3' | 'NO2' | 'SO2' | 'CO';
  value: number;
}

export interface Forecast {
  day: string;
  aqi: number;
}

export interface FeatureImportance {
  feature: string;
  importance: number;
}

export interface AqiData {
  city: string;
  currentAqi: number;
  level: AqiLevel;
  pollutants: Pollutant[];
  forecast: Forecast[];
  featureImportance: FeatureImportance[];
}
