import React, { useEffect, useState } from 'react';
import Header from './components/Header';
import WaterCard from './components/WaterCard';
import LightCard from './components/LightCard';
import AlarmPanel from './components/AlarmPanel';
import DeviceStatusPanel from './components/DeviceStatusPanel';
import { supabase } from './lib/supabase';
import { fetchLatestSensorData, fetchDeviceStatuses } from './utils/supabaseQueries';

type Alarm = {
  icon: string;
  title: string;
  detail: string;
  time: string;
};

export default function App() {
  const [water, setWater] = useState<{
    percent: number;
    height: number;
    status: 'KRITIS' | 'PENGISIAN' | 'PENUH';
  } | null>(null);
  const [light, setLight] = useState<{ lux: number; weather: string } | null>(null);
  const [alarms, setAlarms] = useState<Alarm[]>([]);
  const [devices, setDevices] = useState<Array<{ device_id: string; is_online: boolean }>>([]);

  // Map a sensor row to UI state and generate alarms
  const handleSensor = (data: any) => {
    if (!data) return;
    setWater({
      percent: data.water_percent ?? 0,
      height: data.water_cm ?? 0,
      status: data.water_status ?? 'PENGISIAN',
    });
    setLight({ lux: data.light_lux ?? 0, weather: data.weather ?? '' });

    const newAlarms: Alarm[] = [];
    if (data.water_status === 'KRITIS') {
      newAlarms.push({
        icon: '🚨',
        title: 'AIR KRITIS',
        detail: `Level Air: ${data.water_percent ?? '-'}%`,
        time: new Date(data.recorded_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      });
    }
    if (data.weather && data.weather.toLowerCase().includes('hujan')) {
      newAlarms.push({
        icon: '🌧',
        title: 'PERINGATAN HUJAN',
        detail: `Lux: ${data.light_lux ?? '-'} `,
        time: new Date(data.recorded_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      });
    }
    if (data.water_status === 'PENUH') {
      newAlarms.push({
        icon: '⚠',
        title: 'AIR PENUH',
        detail: `Level Air: ${data.water_percent ?? '-'}%`,
        time: new Date(data.recorded_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      });
    }
    setAlarms(prev => [...newAlarms, ...prev]);
  };

  // Initial load
  useEffect(() => {
    fetchLatestSensorData().then(data => {
      if (data) handleSensor(data);
    });
    fetchDeviceStatuses().then(setDevices);
  }, []);

  // Real‑time subscriptions
  useEffect(() => {
    const sensorChannel = supabase
      .channel('public:sensor_data')
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'sensor_data' }, payload => {
        handleSensor(payload.new);
      })
      .subscribe();

    const deviceChannel = supabase
      .channel('public:device_status')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'device_status' }, () => {
        fetchDeviceStatuses().then(setDevices);
      })
      .subscribe();

    return () => {
      supabase.removeChannel(sensorChannel);
      supabase.removeChannel(deviceChannel);
    };
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <Header />
      <main className="p-4 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {water && <WaterCard {...water} />}
        {light && <LightCard {...light} />}
        <AlarmPanel alarms={alarms} />
        <DeviceStatusPanel devices={devices} />
      </main>
    </div>
  );
}
