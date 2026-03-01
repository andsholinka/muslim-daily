"use client";

import { useState, useEffect, useRef } from "react";

interface Surah {
  number: number;
  name: string;
  englishName: string;
  numberOfAyahs: number;
  revelationType: string;
}

interface Ayah {
  number: number;
  text: string;
  numberInSurah: number;
  audio: string;
}

const juzList = Array.from({ length: 30 }, (_, i) => ({
  number: i + 1,
  name: `Juz ${i + 1}`,
}));

export default function QuranScreen() {
  const [mode, setMode] = useState<"menu" | "surah-list" | "juz-list" | "reading">("menu");
  const [surahList, setSurahList] = useState<Surah[]>([]);
  const [selectedSurah, setSelectedSurah] = useState<Surah | null>(null);
  const [selectedJuz, setSelectedJuz] = useState<number | null>(null);
  const [ayahs, setAyahs] = useState<Ayah[]>([]);
  const [loading, setLoading] = useState(false);
  const [currentAudio, setCurrentAudio] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    fetchSurahList();
  }, []);

  const fetchSurahList = async () => {
    try {
      const response = await fetch("https://api.alquran.cloud/v1/surah");
      const data = await response.json();
      setSurahList(data.data);
    } catch (error) {
      console.error("Error fetching surah list:", error);
    }
  };

  const fetchSurah = async (surahNumber: number) => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://api.alquran.cloud/v1/surah/${surahNumber}/ar.alafasy`
      );
      const data = await response.json();
      setAyahs(data.data.ayahs);
      setMode("reading");
    } catch (error) {
      console.error("Error fetching surah:", error);
    }
    setLoading(false);
  };

  const fetchJuz = async (juzNumber: number) => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://api.alquran.cloud/v1/juz/${juzNumber}/ar.alafasy`
      );
      const data = await response.json();
      const allAyahs = Object.values(data.data.ayahs).flat() as Ayah[];
      setAyahs(allAyahs);
      setMode("reading");
    } catch (error) {
      console.error("Error fetching juz:", error);
    }
    setLoading(false);
  };

  const playAudio = (ayahNumber: number, audioUrl: string) => {
    if (currentAudio === ayahNumber) {
      audioRef.current?.pause();
      setCurrentAudio(null);
    } else {
      if (audioRef.current) {
        audioRef.current.src = audioUrl;
        audioRef.current.play();
        setCurrentAudio(ayahNumber);
      }
    }
  };

  const handleAudioEnded = () => {
    setCurrentAudio(null);
  };

  const filteredSurahList = surahList.filter(
    (surah) =>
      surah.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      surah.englishName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Menu Screen
  if (mode === "menu") {
    return (
      <div className="p-4 space-y-6">
        <div className="bg-gradient-to-br from-teal-600 to-cyan-600 rounded-3xl shadow-xl p-6 text-white">
          <h1 className="text-2xl font-bold mb-2">Al-Quran Digital</h1>
          <p className="text-sm opacity-90">Baca dan dengarkan Al-Quran dengan mudah</p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <button
            onClick={() => setMode("surah-list")}
            className="bg-gradient-to-br from-teal-500 to-cyan-500 hover:from-teal-600 hover:to-cyan-600 rounded-2xl p-6 text-white text-left shadow-lg transition-all transform hover:scale-105 active:scale-95"
          >
            <div className="text-4xl mb-3">📚</div>
            <h3 className="font-bold text-lg mb-1">Pilih Surah</h3>
            <p className="text-xs opacity-90">114 Surah</p>
          </button>

          <button
            onClick={() => setMode("juz-list")}
            className="bg-gradient-to-br from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 rounded-2xl p-6 text-white text-left shadow-lg transition-all transform hover:scale-105 active:scale-95"
          >
            <div className="text-4xl mb-3">📑</div>
            <h3 className="font-bold text-lg mb-1">Pilih Juz</h3>
            <p className="text-xs opacity-90">30 Juz</p>
          </button>
        </div>

        <div className="bg-gradient-to-r from-teal-50 to-cyan-50 border-l-4 border-teal-500 rounded-xl p-4">
          <div className="flex items-start gap-3">
            <span className="text-2xl">💡</span>
            <div>
              <h3 className="font-bold text-gray-800 mb-1">Fitur</h3>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>• Teks Arab dengan tajwid</li>
                <li>• Audio qari Mishary Rashid Alafasy</li>
                <li>• Navigasi per surah atau juz</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Surah List Screen
  if (mode === "surah-list") {
    return (
      <div className="p-4 space-y-4">
        <div className="bg-gradient-to-br from-teal-600 to-cyan-600 rounded-3xl shadow-xl p-6 text-white">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl font-bold">Daftar Surah</h1>
            <button
              onClick={() => setMode("menu")}
              className="bg-white/20 backdrop-blur-sm rounded-full p-2 hover:bg-white/30 transition-colors"
            >
              <span className="text-xl">←</span>
            </button>
          </div>
          <input
            type="text"
            placeholder="Cari surah..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-white/20 backdrop-blur-sm rounded-xl px-4 py-3 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50"
          />
        </div>

        <div className="space-y-2">
          {filteredSurahList.map((surah) => (
            <button
              key={surah.number}
              onClick={() => {
                setSelectedSurah(surah);
                fetchSurah(surah.number);
              }}
              className="w-full bg-white rounded-xl shadow-md p-4 hover:shadow-lg transition-all text-left"
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-gradient-to-br from-teal-500 to-cyan-500 rounded-lg flex items-center justify-center text-white font-bold">
                  {surah.number}
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-gray-800">{surah.englishName}</h3>
                  <p className="text-sm text-gray-600">
                    {surah.revelationType} • {surah.numberOfAyahs} Ayat
                  </p>
                </div>
                <div className="arabic-text text-xl text-teal-700 font-bold">
                  {surah.name}
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    );
  }

  // Juz List Screen
  if (mode === "juz-list") {
    return (
      <div className="p-4 space-y-4">
        <div className="bg-gradient-to-br from-cyan-600 to-blue-600 rounded-3xl shadow-xl p-6 text-white">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold">Daftar Juz</h1>
            <button
              onClick={() => setMode("menu")}
              className="bg-white/20 backdrop-blur-sm rounded-full p-2 hover:bg-white/30 transition-colors"
            >
              <span className="text-xl">←</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-3">
          {juzList.map((juz) => (
            <button
              key={juz.number}
              onClick={() => {
                setSelectedJuz(juz.number);
                fetchJuz(juz.number);
              }}
              className="bg-gradient-to-br from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 rounded-xl p-6 text-white shadow-lg transition-all transform hover:scale-105 active:scale-95"
            >
              <div className="text-3xl mb-2">📑</div>
              <p className="font-bold text-lg">{juz.number}</p>
            </button>
          ))}
        </div>
      </div>
    );
  }

  // Reading Screen
  if (mode === "reading") {
    return (
      <div className="p-4 space-y-4">
        <div className="bg-gradient-to-br from-teal-600 to-cyan-600 rounded-3xl shadow-xl p-6 text-white sticky top-0 z-10">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl font-bold">
                {selectedSurah
                  ? `${selectedSurah.englishName} (${selectedSurah.name})`
                  : `Juz ${selectedJuz}`}
              </h1>
              <p className="text-sm opacity-90">
                {ayahs.length} Ayat
              </p>
            </div>
            <button
              onClick={() => {
                setMode("menu");
                setAyahs([]);
                setSelectedSurah(null);
                setSelectedJuz(null);
                audioRef.current?.pause();
                setCurrentAudio(null);
              }}
              className="bg-white/20 backdrop-blur-sm rounded-full p-2 hover:bg-white/30 transition-colors"
            >
              <span className="text-xl">✕</span>
            </button>
          </div>
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-12">
            <div className="animate-spin text-6xl mb-4">⏳</div>
            <p className="text-gray-600">Memuat ayat...</p>
          </div>
        ) : (
          <div className="space-y-4 pb-6">
            {ayahs.map((ayah) => (
              <div
                key={ayah.number}
                className="bg-white rounded-2xl shadow-md p-5"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="w-8 h-8 bg-gradient-to-br from-teal-500 to-cyan-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
                    {ayah.numberInSurah}
                  </div>
                  <button
                    onClick={() => playAudio(ayah.number, ayah.audio)}
                    className={`${
                      currentAudio === ayah.number
                        ? "bg-teal-600"
                        : "bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-600 hover:to-cyan-600"
                    } text-white px-4 py-2 rounded-lg transition-all transform hover:scale-105 active:scale-95 flex items-center gap-2`}
                  >
                    <span>{currentAudio === ayah.number ? "⏸️" : "▶️"}</span>
                    <span className="text-sm">
                      {currentAudio === ayah.number ? "Pause" : "Play"}
                    </span>
                  </button>
                </div>
                <p className="arabic-text text-2xl text-gray-800 leading-loose text-right">
                  {ayah.text}
                </p>
              </div>
            ))}
          </div>
        )}

        <audio ref={audioRef} onEnded={handleAudioEnded} />
      </div>
    );
  }

  return null;
}
