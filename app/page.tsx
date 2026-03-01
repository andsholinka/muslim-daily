"use client";

import { useState, useEffect } from "react";
import HomeScreen from "@/components/HomeScreen";
import PrayerTimesScreen from "@/components/PrayerTimesScreen";
import QiblaScreen from "@/components/QiblaScreen";
import DoaScreen from "@/components/DoaScreen";
import QuranScreen from "@/components/QuranScreen";
import HadithScreen from "@/components/HadithScreen";
import QuranGameScreen from "@/components/QuranGameScreen";

type Screen = "home" | "prayer" | "qibla" | "doa" | "quran" | "hadith" | "game";

export default function Home() {
  const [currentScreen, setCurrentScreen] = useState<Screen>("home");

  return (
    <div className="min-h-screen pb-20">
      {/* Content */}
      <div className="max-w-md mx-auto">
        {currentScreen === "home" && <HomeScreen onNavigate={setCurrentScreen} />}
        {currentScreen === "prayer" && <PrayerTimesScreen />}
        {currentScreen === "qibla" && <QiblaScreen />}
        {currentScreen === "doa" && <DoaScreen />}
        {currentScreen === "quran" && <QuranScreen />}
        {currentScreen === "hadith" && <HadithScreen />}
        {currentScreen === "game" && <QuranGameScreen />}
      </div>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg">
        <div className="max-w-md mx-auto flex justify-around items-center h-16">
          <NavButton
            icon="🏠"
            label="Beranda"
            active={currentScreen === "home"}
            onClick={() => setCurrentScreen("home")}
          />
          <NavButton
            icon="🕌"
            label="Sholat"
            active={currentScreen === "prayer"}
            onClick={() => setCurrentScreen("prayer")}
          />
          <NavButton
            icon="📖"
            label="Quran"
            active={currentScreen === "quran"}
            onClick={() => setCurrentScreen("quran")}
          />
          <NavButton
            icon="📜"
            label="Hadits"
            active={currentScreen === "hadith"}
            onClick={() => setCurrentScreen("hadith")}
          />
          <NavButton
            icon="🤲"
            label="Doa"
            active={currentScreen === "doa"}
            onClick={() => setCurrentScreen("doa")}
          />
        </div>
      </nav>
    </div>
  );
}

function NavButton({
  icon,
  label,
  active,
  onClick,
}: {
  icon: string;
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`flex flex-col items-center justify-center gap-1 px-3 py-2 transition-all ${
        active ? "text-emerald-600" : "text-gray-500"
      }`}
    >
      <span className="text-2xl">{icon}</span>
      <span className="text-xs font-medium">{label}</span>
    </button>
  );
}
