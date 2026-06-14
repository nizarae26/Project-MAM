// src/utils/supabaseQueries.ts
import { supabase } from '../lib/supabase';

// Types mirroring the Supabase tables
export type SensorData = {
  id: number;
  device_id: string;
  recorded_at: string; // ISO timestamp
  water_percent: number | null;
  water_cm: number | null;
  water_status: string | null;
  light_lux: number | null;
  weather: string | null;
};

export type DeviceStatus = {
  device_id: string;
  last_seen: string; // ISO timestamp
  is_online: boolean;
  battery_v?: number | null;
};

/** Fetch the most recent sensor record */
export async function fetchLatestSensorData(): Promise<SensorData | null> {
  const { data, error } = await supabase
    .from('sensor_data')
    .select('*')
    .order('recorded_at', { ascending: false })
    .limit(1)
    .single();
  if (error) {
    console.error('Supabase fetchLatestSensorData error:', error);
    return null;
  }
  return data;
}

/** Fetch the last N sensor records for charting */
export async function fetchSensorHistory(limit = 24): Promise<SensorData[]> {
  const { data, error } = await supabase
    .from('sensor_data')
    .select('*')
    .order('recorded_at', { ascending: false })
    .limit(limit);
  if (error) {
    console.error('Supabase fetchSensorHistory error:', error);
    return [];
  }
  // Return in chronological order (oldest → newest) for chart libraries
  return data.reverse();
}

/** Fetch current status of all devices */
export async function fetchDeviceStatuses(): Promise<DeviceStatus[]> {
  const { data, error } = await supabase.from('device_status').select('*');
  if (error) {
    console.error('Supabase fetchDeviceStatuses error:', error);
    return [];
  }
  return data;
}
