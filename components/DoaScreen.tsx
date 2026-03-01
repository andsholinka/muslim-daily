"use client";

import { useState } from "react";

interface Doa {
  id: number;
  title: string;
  arabic: string;
  latin: string;
  translation: string;
  category: string;
}

const doaList: Doa[] = [
  {
    id: 1,
    title: "Doa Sebelum Makan",
    arabic: "بِسْمِ اللهِ وَعَلَى بَرَكَةِ اللهِ",
    latin: "Bismillahi wa 'ala barakatillah",
    translation: "Dengan menyebut nama Allah dan atas berkah Allah",
    category: "Makan",
  },
  {
    id: 2,
    title: "Doa Sesudah Makan",
    arabic: "الْحَمْدُ لِلَّهِ الَّذِي أَطْعَمَنَا وَسَقَانَا وَجَعَلَنَا مُسْلِمِينَ",
    latin: "Alhamdu lillahil ladzi ath'amana wa saqona wa ja'alana muslimin",
    translation: "Segala puji bagi Allah yang telah memberi kami makan dan minum serta menjadikan kami muslim",
    category: "Makan",
  },
  {
    id: 3,
    title: "Doa Sebelum Tidur",
    arabic: "بِاسْمِكَ اللَّهُمَّ أَمُوتُ وَأَحْيَا",
    latin: "Bismika Allahumma amutu wa ahya",
    translation: "Dengan nama-Mu ya Allah, aku mati dan aku hidup",
    category: "Tidur",
  },
  {
    id: 4,
    title: "Doa Bangun Tidur",
    arabic: "الْحَمْدُ لِلَّهِ الَّذِي أَحْيَانَا بَعْدَ مَا أَمَاتَنَا وَإِلَيْهِ النُّشُورُ",
    latin: "Alhamdu lillahil ladzi ahyana ba'da ma amatana wa ilaihin nusyur",
    translation: "Segala puji bagi Allah yang telah menghidupkan kami sesudah kami mati dan kepada-Nya kami akan kembali",
    category: "Tidur",
  },
  {
    id: 5,
    title: "Doa Masuk Kamar Mandi",
    arabic: "اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنَ الْخُبُثِ وَالْخَبَائِثِ",
    latin: "Allahumma inni a'udzu bika minal khubutsi wal khaba'its",
    translation: "Ya Allah, aku berlindung kepada-Mu dari godaan setan laki-laki dan perempuan",
    category: "Kamar Mandi",
  },
  {
    id: 6,
    title: "Doa Keluar Kamar Mandi",
    arabic: "غُفْرَانَكَ",
    latin: "Ghufranaka",
    translation: "Aku mohon ampunan-Mu",
    category: "Kamar Mandi",
  },
  {
    id: 7,
    title: "Doa Keluar Rumah",
    arabic: "بِسْمِ اللهِ تَوَكَّلْتُ عَلَى اللهِ لاَ حَوْلَ وَلاَ قُوَّةَ إِلاَّ بِاللهِ",
    latin: "Bismillahi tawakkaltu 'alallahi la hawla wa la quwwata illa billah",
    translation: "Dengan nama Allah, aku bertawakal kepada Allah, tiada daya dan kekuatan kecuali dengan pertolongan Allah",
    category: "Perjalanan",
  },
  {
    id: 8,
    title: "Doa Masuk Rumah",
    arabic: "اللَّهُمَّ إِنِّي أَسْأَلُكَ خَيْرَ الْمَوْلِجِ وَخَيْرَ الْمَخْرَجِ",
    latin: "Allahumma inni as'aluka khairal mauliji wa khairal makhraji",
    translation: "Ya Allah, aku mohon kepada-Mu kebaikan tempat masuk dan kebaikan tempat keluar",
    category: "Perjalanan",
  },
  {
    id: 9,
    title: "Doa Naik Kendaraan",
    arabic: "سُبْحَانَ الَّذِي سَخَّرَ لَنَا هَذَا وَمَا كُنَّا لَهُ مُقْرِنِينَ",
    latin: "Subhanalladzii sakhkhara lana hadza wa ma kunna lahu muqrinin",
    translation: "Maha Suci Allah yang telah menundukkan semua ini bagi kami padahal kami sebelumnya tidak mampu menguasainya",
    category: "Perjalanan",
  },
  {
    id: 10,
    title: "Doa Belajar",
    arabic: "رَبِّ زِدْنِي عِلْمًا وَارْزُقْنِي فَهْمًا",
    latin: "Rabbi zidni 'ilman warzuqni fahman",
    translation: "Ya Allah, tambahkanlah kepadaku ilmu dan berikanlah aku pengertian",
    category: "Belajar",
  },
];

export default function DoaScreen() {
  const [selectedCategory, setSelectedCategory] = useState("Semua");
  const [searchQuery, setSearchQuery] = useState("");

  const categories = ["Semua", "Makan", "Tidur", "Kamar Mandi", "Perjalanan", "Belajar"];

  const filteredDoas = doaList.filter((doa) => {
    const matchCategory = selectedCategory === "Semua" || doa.category === selectedCategory;
    const matchSearch = doa.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                       doa.latin.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCategory && matchSearch;
  });

  return (
    <div className="p-4 space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-br from-pink-600 to-rose-600 rounded-3xl shadow-xl p-6 text-white">
        <h1 className="text-2xl font-bold mb-2">Doa Harian</h1>
        <p className="text-sm opacity-90">Kumpulan doa sehari-hari</p>
      </div>

      {/* Search */}
      <div className="relative">
        <input
          type="text"
          placeholder="Cari doa..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full bg-white rounded-2xl shadow-md px-5 py-4 pl-12 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500"
        />
        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-xl">🔍</span>
      </div>

      {/* Category Filter */}
      <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-4 py-2 rounded-full font-medium whitespace-nowrap transition-all ${
              selectedCategory === category
                ? "bg-pink-600 text-white shadow-lg"
                : "bg-white text-gray-700 hover:bg-gray-100"
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Doa List */}
      <div className="space-y-4">
        {filteredDoas.map((doa) => (
          <DoaCard key={doa.id} doa={doa} />
        ))}
        {filteredDoas.length === 0 && (
          <div className="text-center py-12">
            <p className="text-4xl mb-3">🔍</p>
            <p className="text-gray-600">Doa tidak ditemukan</p>
          </div>
        )}
      </div>
    </div>
  );
}

function DoaCard({ doa }: { doa: Doa }) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="bg-white rounded-2xl shadow-md overflow-hidden">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full p-5 text-left hover:bg-gray-50 transition-colors"
      >
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-2xl">🤲</span>
              <h3 className="font-bold text-gray-800 text-lg">{doa.title}</h3>
            </div>
            <span className="inline-block bg-pink-100 text-pink-700 text-xs font-medium px-3 py-1 rounded-full">
              {doa.category}
            </span>
          </div>
          <span className={`text-2xl transition-transform ${isExpanded ? "rotate-180" : ""}`}>
            ⌄
          </span>
        </div>
      </button>

      {isExpanded && (
        <div className="px-5 pb-5 space-y-4 border-t border-gray-100 pt-4">
          {/* Arabic */}
          <div>
            <p className="text-sm text-gray-600 mb-2 font-medium">Arab:</p>
            <p className="arabic-text text-2xl text-gray-800 leading-loose">
              {doa.arabic}
            </p>
          </div>

          {/* Latin */}
          <div>
            <p className="text-sm text-gray-600 mb-2 font-medium">Latin:</p>
            <p className="text-gray-800 italic">{doa.latin}</p>
          </div>

          {/* Translation */}
          <div>
            <p className="text-sm text-gray-600 mb-2 font-medium">Artinya:</p>
            <p className="text-gray-800">{doa.translation}</p>
          </div>
        </div>
      )}
    </div>
  );
}
