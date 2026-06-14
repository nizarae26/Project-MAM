const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Kredensial Supabase tidak ditemukan di .env');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function testInsert() {
  console.log('⏳ Mencoba koneksi ke Supabase...');
  
  const { data, error } = await supabase
    .from('sensor_data')
    .insert([
      { 
        device_id: 'NODE_CAHAYA_01', 
        light_lux: 1500, 
        weather: 'HUJAN LEBAT', // Akan memicu Peringatan Hujan
        water_percent: 5,
        water_cm: 2.1,
        water_status: 'KRITIS' // Akan memicu Peringatan Air Kritis
      }
    ])
    .select();

  if (error) {
    console.error('❌ Gagal menambahkan data:', error.message);
    if (error.message.includes('row-level security')) {
      console.log('\n=============================================');
      console.log('⚠️ PERHATIAN: Masalah Row Level Security (RLS)');
      console.log('=============================================');
      console.log('Supabase memblokir akses karena fitur keamanan RLS menyala.');
      console.log('Cara mematikannya dari Dashboard Supabase Anda:');
      console.log('1. Buka project Supabase Anda -> masuk menu "Authentication" -> "Policies" (atau "Table Editor" -> sensor_data).');
      console.log('2. Matikan (Disable) RLS pada tabel `sensor_data` dan `device_status`.');
      console.log('   ATAU buat Policy baru (Create Policy) yang mengizinkan "Enable all operations for anon" untuk semua baris.');
    }
  } else {
    console.log('✅ Berhasil! Data yang baru saja masuk:', data);
    console.log('\nSilakan cek browser Anda (aplikasi web), angkanya seharusnya langsung berubah secara otomatis!');
  }
}

testInsert();
