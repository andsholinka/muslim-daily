"use client";

import { useState, useEffect } from "react";

interface PrayerTime {
  name: string;
  time: string;
  icon: string;
}

interface PrayerTimesData {
  Fajr: string;
  Dhuhr: string;
  Asr: string;
  Maghrib: string;
  Isha: string;
}

export default function PrayerTimesScreen() {
  const [location, setLocation] = useState("Memuat lokasi...");
  const [currentPrayer, setCurrentPrayer] = useState("");
  const [nextPrayer, setNextPrayer] = useState("");
  const [timeUntilNext, setTimeUntilNext] = useState("");
  const [prayerTimes, setPrayerTimes] = useState<PrayerTime[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [locationPermission, setLocationPermission] = useState<"prompt" | "granted" | "denied">("prompt");

  const fetchPrayerTimes = async (latitude: number, longitude: number) => {
    try {
      setLoading(true);
      setError("");

      // Fetch prayer times dari Aladhan API
      const response = await fetch(
        `https://api.aladhan.com/v1/timings?latitude=${latitude}&longitude=${longitude}&method=20`
      );
      
      if (!response.ok) throw new Error("Gagal mengambil data jadwal sholat");
      
      const data = await response.json();
      const timings: PrayerTimesData = data.data.timings;
      
      // Format prayer times
      const times: PrayerTime[] = [
        { name: "Subuh", time: timings.Fajr, icon: "🌅" },
        { name: "Dzuhur", time: timings.Dhuhr, icon: "☀️" },
        { name: "Ashar", time: timings.Asr, icon: "🌤️" },
        { name: "Maghrib", time: timings.Maghrib, icon: "🌆" },
        { name: "Isya", time: timings.Isha, icon: "🌙" },
      ];
      
      setPrayerTimes(times);

      // Fetch location name
      try {
        const geoResponse = await fetch(
          `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=id`
        );
        const geoData = await geoResponse.json();
        setLocation(`${geoData.city || geoData.locality || "Lokasi Anda"}, ${geoData.countryName || ""}`);
      } catch {
        setLocation("Lokasi Anda");
      }

      setLoading(false);
    } catch (err) {
      setError("Gagal memuat jadwal sholat. Silakan coba lagi.");
      setLoading(false);
    }
  };

  const requestLocation = () => {
    if (!navigator.geolocation) {
      setError("Browser Anda tidak mendukung geolocation");
      setLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocationPermission("granted");
        fetchPrayerTimes(position.coords.latitude, position.coords.longitude);
      },
      (err) => {
        setLocationPermission("denied");
        setError("Akses lokasi ditolak. Silakan izinkan akses lokasi untuk melihat jadwal sholat yang akurat.");
        setLoading(false);
      }
    );
  };

  useEffect(() => {
    requestLocation();
  }, []);

  useEffect(() => {
    if (prayerTimes.length === 0) return;

    const updateCurrentPrayer = () => {
      const now = new Date();
      const currentTime = now.getHours() * 60 + now.getMinutes();

      // Convert prayer times to minutes
      const times = prayerTimes.map(prayer => {
        const [hours, minutes] = prayer.time.split(':').map(Number);
        return { name: prayer.name, minutes: hours * 60 + minutes };
      });

      // Find current and next prayer
      let current = "Isya";
      let next = "Subuh";
      
      for (let i = 0; i < times.length; i++) {
        if (currentTime >= times[i].minutes) {
          current = times[i].name;
          next = i < times.length - 1 ? times[i + 1].name : "Subuh";
        }
      }

      setCurrentPrayer(current);
      setNextPrayer(next);

      // Calculate time until next prayer
      const nextPrayerTime = times.find(t => t.name === next);
      if (nextPrayerTime) {
        let diff = nextPrayerTime.minutes - currentTime;
        if (diff < 0) diff += 24 * 60; // Next day

        const hours = Math.floor(diff / 60);
        const minutes = diff % 60;
        
        if (hours > 0) {
          setTimeUntilNext(`${hours} jam ${minutes} menit`);
        } else {
          setTimeUntilNext(`${minutes} menit`);
        }
      }
    };

    updateCurrentPrayer();
    const timer = setInterval(updateCurrentPrayer, 60000); // Update every minute

    return () => clearInterval(timer);
  }, [prayerTimes]);

  // Loading state
  if (loading) {
    return (
      <div className="p-4 space-y-6">
        <div className="bg-gradient-to-br from-blue-600 to-indigo-600 rounded-3xl shadow-xl p-6 text-white">
          <h1 className="text-2xl font-bold mb-4">Jadwal Sholat</h1>
          <div className="flex flex-col items-center justify-center py-8">
            <div className="animate-spin text-6xl mb-4">⏳</div>
            <p className="text-lg">Memuat jadwal sholat...</p>
            <p className="text-sm opacity-90 mt-2">Mohon izinkan akses lokasi</p>
          </div>
        </div>
      </div>
    );
  }

  // Permission denied state
  if (locationPermission === "denied" || error) {
    return (
      <div className="p-4 space-y-6">
        <div className="bg-gradient-to-br from-blue-600 to-indigo-600 rounded-3xl shadow-xl p-6 text-white">
          <h1 className="text-2xl font-bold mb-2">Jadwal Sholat</h1>
        </div>

        <div className="bg-white rounded-3xl shadow-xl p-8 text-center">
          <div className="text-6xl mb-4">📍</div>
          <h2 className="text-xl font-bold text-gray-800 mb-3">
            Akses Lokasi Diperlukan
          </h2>
          <p className="text-gray-600 mb-6">
            Untuk menampilkan jadwal sholat yang akurat sesuai lokasi Anda, kami memerlukan izin akses lokasi.
          </p>
          <button
            onClick={requestLocation}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-6 rounded-xl transition-all transform hover:scale-105 active:scale-95"
          >
            Izinkan Akses Lokasi
          </button>
        </div>

        {error && (
          <div className="bg-red-50 border-l-4 border-red-500 rounded-xl p-4">
            <div className="flex items-start gap-3">
              <span className="text-2xl">⚠️</span>
              <div>
                <h3 className="font-bold text-gray-800 mb-1">Error</h3>
                <p className="text-sm text-gray-700">{error}</p>
              </div>
            </div>
          </div>
        )}

        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border-l-4 border-blue-500 rounded-xl p-4">
          <div className="flex items-start gap-3">
            <span className="text-2xl">💡</span>
            <div>
              <h3 className="font-bold text-gray-800 mb-1">Tips</h3>
              <p className="text-sm text-gray-700">
                Jika tombol tidak berfungsi, periksa pengaturan browser Anda dan pastikan izin lokasi diaktifkan untuk website ini.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-br from-blue-600 to-indigo-600 rounded-3xl shadow-xl p-6 text-white">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-2xl font-bold mb-1">Jadwal Sholat</h1>
            <p className="text-sm opacity-90 flex items-center gap-1">
              📍 {location}
            </p>
          </div>
          <button 
            onClick={requestLocation}
            className="bg-white/20 backdrop-blur-sm rounded-full p-3 hover:bg-white/30 transition-colors"
            title="Refresh lokasi"
          >
            <span className="text-xl">🔄</span>
          </button>
        </div>

        {nextPrayer && (
          <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-4">
            <p className="text-sm opacity-90 mb-1">Waktu Sholat Berikutnya</p>
            <p className="text-3xl font-bold mb-1">{nextPrayer}</p>
            <p className="text-lg">{timeUntilNext} lagi</p>
          </div>
        )}
      </div>

      {/* Prayer Times List */}
      <div className="space-y-3">
        {prayerTimes.map((prayer, index) => (
          <div
            key={index}
            className={`bg-white rounded-2xl shadow-md p-4 transition-all ${
              prayer.name === nextPrayer
                ? "ring-2 ring-blue-500 shadow-lg"
                : ""
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="text-3xl">{prayer.icon}</div>
                <div>
                  <h3 className="font-bold text-gray-800 text-lg">
                    {prayer.name}
                  </h3>
                  {prayer.name === currentPrayer && (
                    <span className="text-xs text-green-600 font-medium">
                      ● Waktu sekarang
                    </span>
                  )}
                  {prayer.name === nextPrayer && (
                    <span className="text-xs text-blue-600 font-medium">
                      ⏰ Berikutnya
                    </span>
                  )}
                </div>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-gray-800">
                  {prayer.time}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Info Card */}
      <div className="bg-gradient-to-r from-emerald-50 to-teal-50 border-l-4 border-emerald-500 rounded-xl p-4">
        <div className="flex items-start gap-3">
          <span className="text-2xl">ℹ️</span>
          <div>
            <h3 className="font-bold text-gray-800 mb-1">Catatan</h3>
            <p className="text-sm text-gray-700">
              Jadwal sholat berdasarkan lokasi GPS Anda menggunakan metode perhitungan Kementerian Agama Indonesia. Klik tombol refresh untuk memperbarui lokasi.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
