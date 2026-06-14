#include <WiFi.h> // Ubah ke <ESP8266WiFi.h> jika menggunakan ESP8266/NodeMCU
#include <HTTPClient.h> // Ubah ke <ESP8266HTTPClient.h> jika menggunakan ESP8266
#include <ArduinoJson.h>

// Konfigurasi WiFi
const char* ssid = "NAMA_WIFI_ANDA";
const char* password = "PASSWORD_WIFI_ANDA";

// Konfigurasi Supabase (Berdasarkan file .env Anda)
// Perhatikan penambahan "/rest/v1/sensor_data" di akhir URL untuk mengakses tabel sensor_data
const char* supabase_url = "https://rinbotznowvnwoblqlvp.supabase.co/rest/v1/sensor_data";
const char* supabase_key = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJpbmJvdHpub3d2bndvYmxxbHZwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODEzNjM3NjIsImV4cCI6MjA5NjkzOTc2Mn0.3N-SdetDqpnPU2ZX2PwXoi9etGFgTptcvZzve1WauIc";

void setup() {
  Serial.begin(115200);

  // Mulai koneksi WiFi
  Serial.print("Menghubungkan ke WiFi");
  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  Serial.println("\nWiFi Terhubung!");
}

void loop() {
  // Simulasi pembacaan dari sensor cahaya (Silakan ganti dengan logika sensor analog/digital asli Anda)
  int luxValue = 20360; 
  String weatherStatus = "BERAWAN";

  Serial.println("--- Data Masuk dari Arduino Nano ---");
  Serial.println("Intensitas Cahaya : " + String(luxValue) + " Lux");
  Serial.println("Status Terbaca    : " + weatherStatus);

  // Cek jika WiFi masih terhubung
  if (WiFi.status() == WL_CONNECTED) {
    sendDataToSupabase(luxValue, weatherStatus);
  } else {
    Serial.println("Error: Koneksi WiFi terputus");
  }

  // Tunggu 10 detik sebelum mengirim data berikutnya (Supaya tidak membanjiri database)
  delay(10000); 
}

void sendDataToSupabase(int lux, String weather) {
  HTTPClient http;

  // Siapkan URL API Supabase
  http.begin(supabase_url);

  // Tambahkan Headers yang diwajibkan oleh Supabase
  http.addHeader("Content-Type", "application/json");
  http.addHeader("apikey", supabase_key);
  http.addHeader("Authorization", String("Bearer ") + String(supabase_key));
  
  // Prefer: return=representation akan membuat Supabase mengembalikan data yang baru di-insert (berguna untuk konfirmasi)
  http.addHeader("Prefer", "return=representation"); 

  // Buat isi data JSON menggunakan ArduinoJson
  StaticJsonDocument<200> doc;
  doc["device_id"] = "NODE_CAHAYA_01"; // Identifikasi asal alat ini
  doc["light_lux"] = lux;
  doc["weather"] = weather;

  String requestBody;
  serializeJson(doc, requestBody);

  // Lakukan request HTTP POST
  Serial.println("Mengirim data ke Supabase...");
  int httpResponseCode = http.POST(requestBody);

  // Evaluasi Respons
  if (httpResponseCode > 0) {
    Serial.print("HTTP Response Code: ");
    Serial.println(httpResponseCode);
    
    // 201 artinya Created (Berhasil di-insert ke dalam tabel)
    if (httpResponseCode == 201) {
      Serial.println("✅ Data berhasil dikirim dan disimpan!");
    } else {
      String responseBody = http.getString();
      Serial.println("⚠️ Data dikirim tapi mungkin ada kendala (misal RLS Policy):");
      Serial.println(responseBody);
    }
  } else {
    Serial.print("❌ Error pada pengiriman HTTP: ");
    Serial.println(http.errorToString(httpResponseCode));
  }

  http.end(); // Bebaskan resource koneksi
}
