"use client";

import { useState, useEffect, useRef } from "react";

interface QuranVerse {
  id: number;
  surah: string;
  ayah: number;
  arabic: string;
  translation: string;
  audioUrl: string;
}

const quranVerses: QuranVerse[] = [
  {
    id: 1,
    surah: "Al-Fatihah",
    ayah: 1,
    arabic: "بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ",
    translation: "Dengan nama Allah Yang Maha Pengasih, Maha Penyayang",
    audioUrl: "https://cdn.islamic.network/quran/audio/128/ar.alafasy/1.mp3"
  },
  {
    id: 2,
    surah: "Al-Fatihah",
    ayah: 2,
    arabic: "الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ",
    translation: "Segala puji bagi Allah, Tuhan seluruh alam",
    audioUrl: "https://cdn.islamic.network/quran/audio/128/ar.alafasy/2.mp3"
  },
  {
    id: 3,
    surah: "Al-Ikhlas",
    ayah: 1,
    arabic: "قُلْ هُوَ اللَّهُ أَحَدٌ",
    translation: "Katakanlah (Muhammad), 'Dialah Allah, Yang Maha Esa'",
    audioUrl: "https://cdn.islamic.network/quran/audio/128/ar.alafasy/6221.mp3"
  },
  {
    id: 4,
    surah: "Al-Ikhlas",
    ayah: 2,
    arabic: "اللَّهُ الصَّمَدُ",
    translation: "Allah tempat meminta segala sesuatu",
    audioUrl: "https://cdn.islamic.network/quran/audio/128/ar.alafasy/6222.mp3"
  },
  {
    id: 5,
    surah: "An-Nas",
    ayah: 1,
    arabic: "قُلْ أَعُوذُ بِرَبِّ النَّاسِ",
    translation: "Katakanlah, 'Aku berlindung kepada Tuhan manusia'",
    audioUrl: "https://cdn.islamic.network/quran/audio/128/ar.alafasy/6231.mp3"
  }
];

export default function QuranGameScreen() {
  const [currentVerse, setCurrentVerse] = useState<QuranVerse | null>(null);
  const [options, setOptions] = useState<QuranVerse[]>([]);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [streak, setStreak] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const savedHighScore = localStorage.getItem("quranGameHighScore");
    if (savedHighScore) {
      setHighScore(parseInt(savedHighScore));
    }
  }, []);

  const startNewRound = () => {
    const randomVerse = quranVerses[Math.floor(Math.random() * quranVerses.length)];
    setCurrentVerse(randomVerse);

    const wrongOptions = quranVerses
      .filter(v => v.id !== randomVerse.id)
      .sort(() => Math.random() - 0.5)
      .slice(0, 3);

    const allOptions = [randomVerse, ...wrongOptions].sort(() => Math.random() - 0.5);
    setOptions(allOptions);
    setShowResult(false);
    setIsPlaying(false);
  };

  const startGame = () => {
    setGameStarted(true);
    setScore(0);
    setStreak(0);
    startNewRound();
  };

  const playAudio = () => {
    if (audioRef.current && currentVerse) {
      audioRef.current.src = currentVerse.audioUrl;
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  const handleAnswer = (selectedVerse: QuranVerse) => {
    if (showResult) return;

    const correct = selectedVerse.id === currentVerse?.id;
    setIsCorrect(correct);
    setShowResult(true);

    if (correct) {
      const newScore = score + 10;
      const newStreak = streak + 1;
      setScore(newScore);
      setStreak(newStreak);
      
      if (newScore > highScore) {
        setHighScore(newScore);
        localStorage.setItem("quranGameHighScore", newScore.toString());
      }
    } else {
      setStreak(0);
    }
  };

  const nextRound = () => {
    startNewRound();
  };

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.onended = () => setIsPlaying(false);
    }
  }, []);

  if (!gameStarted) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-md w-full">
          <div className="text-center mb-6">
            <div className="text-6xl mb-4">📖</div>
            <h1 className="text-3xl font-bold text-emerald-700 mb-2">
              Tebak Ayat Al-Quran
            </h1>
            <p className="text-gray-600 mb-4">
              Dengarkan bacaan qari dan tebak ayat yang benar
            </p>
            
            {highScore > 0 && (
              <div className="bg-gradient-to-r from-amber-50 to-yellow-50 border-2 border-amber-300 rounded-2xl p-4 mb-4">
                <p className="text-sm text-amber-700 mb-1">Skor Tertinggi</p>
                <p className="text-3xl font-bold text-amber-600">🏆 {highScore}</p>
              </div>
            )}
          </div>

          <button
            onClick={startGame}
            className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-bold py-4 px-8 rounded-xl text-lg transition-all transform hover:scale-105 active:scale-95 shadow-lg"
          >
            Mulai Bermain
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-br from-emerald-600 to-teal-600 rounded-3xl shadow-xl p-5 text-white">
        <div className="flex justify-between items-start mb-3">
          <div>
            <p className="text-sm opacity-90 mb-1">Skor Saat Ini</p>
            <p className="text-3xl font-bold">{score}</p>
          </div>
          <div className="text-right">
            <p className="text-sm opacity-90 mb-1">Tertinggi</p>
            <p className="text-2xl font-bold">🏆 {highScore}</p>
          </div>
        </div>
        
        {streak > 0 && (
          <div className="bg-white/20 backdrop-blur-sm rounded-xl px-3 py-2 inline-block">
            <p className="text-sm">🔥 Streak: {streak}x</p>
          </div>
        )}
      </div>

      {/* Audio Player */}
      <div className="bg-white rounded-2xl shadow-lg p-5">
        <p className="text-center text-gray-700 mb-4 font-medium">
          Dengarkan bacaan ayat berikut:
        </p>
        <button
          onClick={playAudio}
          disabled={isPlaying}
          className={`w-full ${
            isPlaying 
              ? "bg-gray-400" 
              : "bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700"
          } text-white font-bold py-4 px-6 rounded-xl text-lg transition-all transform hover:scale-105 active:scale-95 flex items-center justify-center gap-3 disabled:transform-none disabled:cursor-not-allowed shadow-md`}
        >
          <span className="text-2xl">{isPlaying ? "🔊" : "▶️"}</span>
          {isPlaying ? "Memutar..." : "Putar Audio"}
        </button>
        <audio ref={audioRef} />
      </div>

      {/* Options */}
      <div className="space-y-3">
        <p className="text-center text-gray-700 font-medium">
          Pilih ayat yang sesuai:
        </p>
        {options.map((verse) => (
          <button
            key={verse.id}
            onClick={() => handleAnswer(verse)}
            disabled={showResult}
            className={`w-full bg-white rounded-xl shadow-md p-4 text-left transition-all transform hover:scale-102 active:scale-98 disabled:cursor-not-allowed ${
              showResult && verse.id === currentVerse?.id
                ? "ring-4 ring-green-500 bg-green-50"
                : showResult && verse.id !== currentVerse?.id
                ? "opacity-50"
                : "hover:shadow-lg"
            }`}
          >
            <p className="arabic-text text-xl mb-2 text-gray-800 leading-loose">
              {verse.arabic}
            </p>
            <p className="text-sm text-gray-600">{verse.translation}</p>
            <p className="text-xs text-emerald-600 mt-2 font-medium">
              {verse.surah} : {verse.ayah}
            </p>
          </button>
        ))}
      </div>

      {/* Result */}
      {showResult && (
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <div className="text-center mb-4">
            <div className="text-6xl mb-3">
              {isCorrect ? "✅" : "❌"}
            </div>
            <p className={`text-2xl font-bold ${isCorrect ? "text-green-600" : "text-red-600"}`}>
              {isCorrect ? "Benar!" : "Salah!"}
            </p>
            {isCorrect && (
              <p className="text-gray-600 mt-2">+10 poin</p>
            )}
          </div>
          
          <div className="flex gap-3">
            <button
              onClick={nextRound}
              className="flex-1 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-bold py-3 px-6 rounded-xl transition-all transform hover:scale-105 active:scale-95"
            >
              Lanjut
            </button>
            <button
              onClick={startGame}
              className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold py-3 px-6 rounded-xl transition-all"
            >
              Main Lagi
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
