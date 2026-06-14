import React, { useEffect, useState } from 'react';
import Header from './components/Header';
import WaterCard from './components/WaterCard';
import LightCard from './components/LightCard';
import AlarmPanel from './components/AlarmPanel';
import DeviceStatusPanel from './components/DeviceStatusPanel';
import { supabase } from './lib/supabase';
import { fetchSensorHistory, fetchDeviceStatuses } from './utils/supabaseQueries';

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
  }>({ percent: 0, height: 0, status: 'PENGISIAN' });
  
  const [light, setLight] = useState<{ lux: number; weather: string }>({ lux: 0, weather: 'TIDAK DIKETAHUI' });
  const [alarms, setAlarms] = useState<Alarm[]>([]);
  const [devices, setDevices] = useState<Array<{ device_id: string; is_online: boolean }>>([
    { device_id: 'NODE_CAHAYA_01', is_online: false }
  ]);

  const generateAlarms = (data: any): Alarm[] => {
    const newAlarms: Alarm[] = [];
    if (data.water_status === 'KRITIS') {
      newAlarms.push({
        icon: '🚨',
        title: 'AIR KRITIS',
        detail: `Level Air: ${data.water_percent ?? '-'}%`,
        time: new Date(data.recorded_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      });
    }
    if (data.weather && (data.weather.toLowerCase().includes('hujan') || data.weather.toLowerCase().includes('mendung'))) {
      newAlarms.push({
        icon: '🌧',
        title: 'PERINGATAN CUACA BURUK',
        detail: `Status: ${data.weather} (Lux: ${data.light_lux ?? '-'})`,
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
    return newAlarms;
  };

  const handleSensor = (data: any) => {
    if (!data) return;
    // Update live states
    setWater({
      percent: data.water_percent ?? water.percent,
      height: data.water_cm ?? water.height,
      status: (data.water_status as 'KRITIS' | 'PENGISIAN' | 'PENUH') ?? water.status,
    });
    setLight({ 
      lux: data.light_lux ?? light.lux, 
      weather: data.weather ?? light.weather 
    });

    // Replace the alarms list with the CURRENT state's alarms (so it disappears if conditions are normal)
    setAlarms(generateAlarms(data));
  };

  useEffect(() => {
    // Initial fetch
    fetchSensorHistory(1).then(history => {
      if (history && history.length > 0) {
        const latest = history[0];
        setWater({
          percent: latest.water_percent ?? 0,
          height: latest.water_cm ?? 0,
          status: (latest.water_status as 'KRITIS' | 'PENGISIAN' | 'PENUH') ?? 'PENGISIAN',
        });
        setLight({ lux: latest.light_lux ?? 0, weather: latest.weather ?? 'TIDAK DIKETAHUI' });

        // Set alarms only for the current latest state
        setAlarms(generateAlarms(latest));
      }
    });

    fetchDeviceStatuses().then(setDevices);
  }, []);

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

  const waterAlarms = alarms.filter(a => a.title.includes('AIR'));
  const lightAlarms = alarms.filter(a => a.title.includes('HUJAN') || a.title.includes('CAHAYA') || a.title.includes('CUACA'));

  return (
    <div className="min-h-screen relative overflow-hidden transition-colors duration-500">
      {/* Background Animated Blobs for Glassmorphism */}
      <div className="absolute top-0 -left-4 w-72 h-72 bg-blue-300 dark:bg-blue-900 rounded-full mix-blend-multiply dark:mix-blend-lighten filter blur-3xl opacity-70 animate-blob pointer-events-none"></div>
      <div className="absolute top-0 -right-4 w-72 h-72 bg-cyan-300 dark:bg-teal-900 rounded-full mix-blend-multiply dark:mix-blend-lighten filter blur-3xl opacity-70 animate-blob animation-delay-2000 pointer-events-none"></div>
      <div className="absolute -bottom-8 left-20 w-72 h-72 bg-indigo-300 dark:bg-indigo-900 rounded-full mix-blend-multiply dark:mix-blend-lighten filter blur-3xl opacity-70 animate-blob animation-delay-4000 pointer-events-none"></div>

      <div className="relative z-10 min-h-screen pb-10">
        <Header />
        <main className="p-6 max-w-6xl mx-auto grid gap-6 md:grid-cols-2">
          
          {/* Kolom Kiri: Sensor Air */}
          <div className="flex flex-col gap-6">
            {water && <WaterCard {...water} />}
            <AlarmPanel title="Peringatan Air" icon="🌊" alarms={waterAlarms} />
          </div>

          {/* Kolom Kanan: Sensor Cahaya */}
          <div className="flex flex-col gap-6">
            {light && <LightCard {...light} />}
            <AlarmPanel title="Peringatan Cuaca" icon="🌦" alarms={lightAlarms} />
          </div>

          {/* Kolom Bawah: Hardware Status */}
          <div className="md:col-span-2">
            <DeviceStatusPanel devices={devices} />
          </div>

        </main>
      </div>
    </div>
  );
}
