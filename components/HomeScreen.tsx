"use client";

import { useState, useEffect } from "react";

type Screen = "home" | "prayer" | "qibla" | "doa" | "quran" | "hadith" | "game";

export default function HomeScreen({ onNavigate }: { onNavigate: (screen: Screen) => void }) {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [greeting, setGreeting] = useState("");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    
    const hour = new Date().getHours();
    if (hour < 11) setGreeting("Selamat Pagi");
    else if (hour < 15) setGreeting("Selamat Siang");
    else if (hour < 18) setGreeting("Selamat Sore");
    else setGreeting("Selamat Malam");

    return () => clearInterval(timer);
  }, []);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString("id-ID", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("id-ID", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="p-4 space-y-6">
      {/* Header Card */}
      <div className="bg-gradient-to-br from-emerald-600 to-teal-600 rounded-3xl shadow-xl p-6 text-white">
        <p className="text-lg mb-2">{greeting || "Assalamu'alaikum"} 👋</p>
        <h1 className="text-3xl font-bold mb-4">Assalamu&apos;alaikum</h1>
        <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-4">
          {mounted ? (
            <>
              <p className="text-4xl font-bold mb-1">{formatTime(currentTime)}</p>
              <p className="text-sm opacity-90">{formatDate(currentTime)}</p>
            </>
          ) : (
            <div className="h-16 flex items-center justify-center">
              <p className="text-lg">Memuat...</p>
            </div>
          )}
        </div>
      </div>

      {/* Quick Actions */}
      <div>
        <h2 className="text-xl font-bold text-gray-800 mb-4">Fitur Utama</h2>
        <div className="grid grid-cols-2 gap-4">
          <FeatureCard
            icon="🕌"
            title="Jadwal Sholat"
            description="Waktu sholat hari ini"
            color="from-blue-500 to-blue-600"
            onClick={() => onNavigate("prayer")}
          />
          <FeatureCard
            icon="🧭"
            title="Arah Kiblat"
            description="Temukan arah kiblat"
            color="from-purple-500 to-purple-600"
            onClick={() => onNavigate("qibla")}
          />
          <FeatureCard
            icon="🤲"
            title="Doa Harian"
            description="Kumpulan doa sehari-hari"
            color="from-pink-500 to-pink-600"
            onClick={() => onNavigate("doa")}
          />
          <FeatureCard
            icon="📖"
            title="Al-Quran"
            description="Baca & dengarkan Quran"
            color="from-teal-500 to-cyan-600"
            onClick={() => onNavigate("quran")}
          />
          <FeatureCard
            icon="📜"
            title="Hadits"
            description="Kumpulan hadits shahih"
            color="from-amber-500 to-orange-600"
            onClick={() => onNavigate("hadith")}
          />
          <FeatureCard
            icon="🎮"
            title="Game Quran"
            description="Tebak ayat Al-Quran"
            color="from-emerald-500 to-emerald-600"
            onClick={() => onNavigate("game")}
          />
        </div>
      </div>

      {/* Daily Reminder */}
      <div className="bg-gradient-to-r from-amber-50 to-orange-50 border-l-4 border-amber-500 rounded-xl p-4">
        <div className="flex items-start gap-3">
          <span className="text-2xl">💡</span>
          <div>
            <h3 className="font-bold text-gray-800 mb-1">Reminder Hari Ini</h3>
            <p className="text-sm text-gray-700">
              &quot;Sesungguhnya bersama kesulitan ada kemudahan.&quot; (QS. Al-Insyirah: 6)
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function FeatureCard({
  icon,
  title,
  description,
  color,
  onClick,
}: {
  icon: string;
  title: string;
  description: string;
  color: string;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`bg-gradient-to-br ${color} rounded-2xl p-5 text-white text-left shadow-lg hover:shadow-xl transition-all transform hover:scale-105 active:scale-95`}
    >
      <div className="text-4xl mb-3">{icon}</div>
      <h3 className="font-bold text-lg mb-1">{title}</h3>
      <p className="text-xs opacity-90">{description}</p>
    </button>
  );
}
