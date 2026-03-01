"use client";

import { useState } from "react";

interface Hadith {
  number: number;
  arab: string;
  id: string;
}

interface HadithBook {
  id: string;
  name: string;
  icon: string;
  hadiths: Hadith[];
}

// Data hadits lokal (sample dari berbagai kitab)
const hadithData: HadithBook[] = [
  {
    id: "bukhari",
    name: "Shahih Bukhari",
    icon: "📘",
    hadiths: [
      {
        number: 1,
        arab: "إِنَّمَا الأَعْمَالُ بِالنِّيَّاتِ، وَإِنَّمَا لِكُلِّ امْرِئٍ مَا نَوَى",
        id: "Sesungguhnya setiap amalan tergantung pada niatnya, dan sesungguhnya setiap orang akan mendapatkan apa yang diniatkannya."
      },
      {
        number: 2,
        arab: "بُنِيَ الإِسْلاَمُ عَلَى خَمْسٍ: شَهَادَةِ أَنْ لاَ إِلَهَ إِلاَّ اللَّهُ وَأَنَّ مُحَمَّدًا رَسُولُ اللَّهِ، وَإِقَامِ الصَّلاَةِ، وَإِيتَاءِ الزَّكَاةِ، وَالحَجِّ، وَصَوْمِ رَمَضَانَ",
        id: "Islam dibangun atas lima perkara: bersaksi bahwa tidak ada tuhan selain Allah dan Muhammad adalah utusan Allah, mendirikan shalat, menunaikan zakat, haji, dan puasa Ramadhan."
      },
      {
        number: 3,
        arab: "الإِيمَانُ بِضْعٌ وَسَبْعُونَ شُعْبَةً، فَأَفْضَلُهَا قَوْلُ لاَ إِلَهَ إِلاَّ اللَّهُ، وَأَدْنَاهَا إِمَاطَةُ الأَذَى عَنِ الطَّرِيقِ",
        id: "Iman itu memiliki tujuh puluh cabang lebih, yang paling utama adalah ucapan La ilaha illallah, dan yang paling rendah adalah menyingkirkan gangguan dari jalan."
      },
      {
        number: 4,
        arab: "مَنْ كَانَ يُؤْمِنُ بِاللَّهِ وَالْيَوْمِ الآخِرِ فَلْيَقُلْ خَيْرًا أَوْ لِيَصْمُتْ",
        id: "Barangsiapa yang beriman kepada Allah dan hari akhir, hendaklah ia berkata baik atau diam."
      },
      {
        number: 5,
        arab: "الْمُسْلِمُ مَنْ سَلِمَ الْمُسْلِمُونَ مِنْ لِسَانِهِ وَيَدِهِ",
        id: "Seorang muslim adalah orang yang kaum muslimin selamat dari gangguan lisan dan tangannya."
      }
    ]
  },
  {
    id: "muslim",
    name: "Shahih Muslim",
    icon: "📕",
    hadiths: [
      {
        number: 1,
        arab: "الطَّهُورُ شَطْرُ الإِيمَانِ، وَالْحَمْدُ لِلَّهِ تَمْلأُ الْمِيزَانَ",
        id: "Bersuci adalah separuh dari iman, dan Alhamdulillah memenuhi timbangan."
      },
      {
        number: 2,
        arab: "مَنْ غَشَّنَا فَلَيْسَ مِنَّا",
        id: "Barangsiapa menipu kami, maka dia bukan termasuk golongan kami."
      },
      {
        number: 3,
        arab: "الدِّينُ النَّصِيحَةُ",
        id: "Agama adalah nasihat."
      },
      {
        number: 4,
        arab: "لاَ يُؤْمِنُ أَحَدُكُمْ حَتَّى يُحِبَّ لأَخِيهِ مَا يُحِبُّ لِنَفْسِهِ",
        id: "Tidak beriman salah seorang dari kalian hingga ia mencintai untuk saudaranya apa yang ia cintai untuk dirinya sendiri."
      },
      {
        number: 5,
        arab: "مَنْ صَلَّى الْبَرْدَيْنِ دَخَلَ الْجَنَّةَ",
        id: "Barangsiapa yang shalat dua waktu yang sejuk (Subuh dan Ashar), maka ia masuk surga."
      }
    ]
  },
  {
    id: "abu-dawud",
    name: "Sunan Abu Dawud",
    icon: "📗",
    hadiths: [
      {
        number: 1,
        arab: "إِنَّ اللَّهَ طَيِّبٌ لاَ يَقْبَلُ إِلاَّ طَيِّبًا",
        id: "Sesungguhnya Allah itu baik, tidak menerima kecuali yang baik."
      },
      {
        number: 2,
        arab: "مَنْ حَسَّنَ إِسْلاَمَهُ لَمْ يُؤَاخَذْ بِمَا عَمِلَ فِي الْجَاهِلِيَّةِ",
        id: "Barangsiapa yang bagus keislamannya, maka tidak akan dituntut atas apa yang ia lakukan di masa jahiliyah."
      },
      {
        number: 3,
        arab: "خَيْرُ الأُمُورِ أَوْسَاطُهَا",
        id: "Sebaik-baik perkara adalah yang pertengahan."
      },
      {
        number: 4,
        arab: "الْمُؤْمِنُ مِرْآةُ الْمُؤْمِنِ",
        id: "Seorang mukmin adalah cermin bagi mukmin lainnya."
      },
      {
        number: 5,
        arab: "مَنْ تَوَاضَعَ لِلَّهِ رَفَعَهُ اللَّهُ",
        id: "Barangsiapa yang merendah diri karena Allah, maka Allah akan mengangkatnya."
      }
    ]
  },
  {
    id: "tirmidzi",
    name: "Sunan Tirmidzi",
    icon: "📙",
    hadiths: [
      {
        number: 1,
        arab: "حُسْنُ الْخُلُقِ وَحُسْنُ الْجِوَارِ يَعْمُرَانِ الدِّيَارَ وَيَزِيدَانِ فِي الأَعْمَارِ",
        id: "Akhlak yang baik dan bertetangga yang baik memakmurkan negeri dan menambah umur."
      },
      {
        number: 2,
        arab: "أَثْقَلُ شَيْءٍ فِي الْمِيزَانِ الْخُلُقُ الْحَسَنُ",
        id: "Sesuatu yang paling berat dalam timbangan adalah akhlak yang baik."
      },
      {
        number: 3,
        arab: "الْمُؤْمِنُ غِرٌّ كَرِيمٌ، وَالْفَاجِرُ خِبٌّ لَئِيمٌ",
        id: "Orang mukmin itu jujur dan mulia, sedangkan orang jahat itu licik dan hina."
      },
      {
        number: 4,
        arab: "مَا مِنْ شَيْءٍ أَثْقَلُ فِي مِيزَانِ الْمُؤْمِنِ يَوْمَ الْقِيَامَةِ مِنْ خُلُقٍ حَسَنٍ",
        id: "Tidak ada sesuatu yang lebih berat dalam timbangan seorang mukmin pada hari kiamat selain akhlak yang baik."
      },
      {
        number: 5,
        arab: "إِنَّ مِنْ أَحَبِّكُمْ إِلَيَّ وَأَقْرَبِكُمْ مِنِّي مَجْلِسًا يَوْمَ الْقِيَامَةِ أَحَاسِنَكُمْ أَخْلاَقًا",
        id: "Sesungguhnya orang yang paling aku cintai dan paling dekat tempat duduknya denganku pada hari kiamat adalah yang paling baik akhlaknya di antara kalian."
      }
    ]
  },
  {
    id: "nasai",
    name: "Sunan Nasai",
    icon: "📔",
    hadiths: [
      {
        number: 1,
        arab: "مَنْ صَلَّى عَلَيَّ صَلاَةً وَاحِدَةً صَلَّى اللَّهُ عَلَيْهِ عَشْرَ صَلَوَاتٍ",
        id: "Barangsiapa yang bershalawat kepadaku satu kali, maka Allah akan bershalawat kepadanya sepuluh kali."
      },
      {
        number: 2,
        arab: "الصَّلاَةُ خَيْرٌ مَوْضُوعٌ، فَمَنْ اسْتَطَاعَ أَنْ يَسْتَكْثِرَ فَلْيَسْتَكْثِرْ",
        id: "Shalat adalah kebaikan yang ditetapkan, maka barangsiapa yang mampu memperbanyaknya, hendaklah ia memperbanyaknya."
      },
      {
        number: 3,
        arab: "أَفْضَلُ الأَعْمَالِ الصَّلاَةُ لِوَقْتِهَا",
        id: "Sebaik-baik amalan adalah shalat pada waktunya."
      },
      {
        number: 4,
        arab: "مَنْ قَرَأَ حَرْفًا مِنْ كِتَابِ اللَّهِ فَلَهُ بِهِ حَسَنَةٌ",
        id: "Barangsiapa yang membaca satu huruf dari Kitabullah, maka baginya satu kebaikan."
      },
      {
        number: 5,
        arab: "خَيْرُكُمْ مَنْ تَعَلَّمَ الْقُرْآنَ وَعَلَّمَهُ",
        id: "Sebaik-baik kalian adalah yang mempelajari Al-Quran dan mengajarkannya."
      }
    ]
  }
];

export default function HadithScreen() {
  const [mode, setMode] = useState<"menu" | "list" | "detail">("menu");
  const [selectedBook, setSelectedBook] = useState<HadithBook | null>(null);
  const [selectedHadith, setSelectedHadith] = useState<Hadith | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const handleBookSelect = (book: HadithBook) => {
    setSelectedBook(book);
    setMode("list");
  };

  const filteredBooks = hadithData.filter((book) =>
    book.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Menu Screen
  if (mode === "menu") {
    return (
      <div className="p-4 space-y-6">
        <div className="bg-gradient-to-br from-amber-600 to-orange-600 rounded-3xl shadow-xl p-6 text-white">
          <h1 className="text-2xl font-bold mb-2">Kumpulan Hadits</h1>
          <p className="text-sm opacity-90">Hadits shahih dari berbagai kitab</p>
        </div>

        <div className="relative">
          <input
            type="text"
            placeholder="Cari kitab hadits..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-white rounded-2xl shadow-md px-5 py-4 pl-12 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-500"
          />
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-xl">🔍</span>
        </div>

        <div>
          <h2 className="text-lg font-bold text-gray-800 mb-3">Pilih Kitab Hadits</h2>
          <div className="space-y-3">
            {filteredBooks.map((book) => (
              <button
                key={book.id}
                onClick={() => handleBookSelect(book)}
                className="w-full bg-white rounded-2xl shadow-md p-5 hover:shadow-lg transition-all text-left transform hover:scale-102 active:scale-98"
              >
                <div className="flex items-center gap-4">
                  <div className="text-4xl">{book.icon}</div>
                  <div className="flex-1">
                    <h3 className="font-bold text-gray-800 text-lg">{book.name}</h3>
                    <p className="text-sm text-gray-600">{book.hadiths.length} Hadits (Sample)</p>
                  </div>
                  <span className="text-2xl text-gray-400">→</span>
                </div>
              </button>
            ))}
          </div>
        </div>

        <div className="bg-gradient-to-r from-amber-50 to-orange-50 border-l-4 border-amber-500 rounded-xl p-4">
          <div className="flex items-start gap-3">
            <span className="text-2xl">💡</span>
            <div>
              <h3 className="font-bold text-gray-800 mb-1">Tentang Hadits</h3>
              <p className="text-sm text-gray-700">
                Hadits adalah perkataan, perbuatan, dan ketetapan Nabi Muhammad ﷺ yang menjadi sumber hukum Islam setelah Al-Quran.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // List Screen
  if (mode === "list" && selectedBook) {
    return (
      <div className="p-4 space-y-4">
        <div className="bg-gradient-to-br from-amber-600 to-orange-600 rounded-3xl shadow-xl p-6 text-white">
          <div className="flex items-center justify-between mb-3">
            <div>
              <h1 className="text-2xl font-bold">{selectedBook.name}</h1>
              <p className="text-sm opacity-90">{selectedBook.hadiths.length} Hadits</p>
            </div>
            <button
              onClick={() => {
                setMode("menu");
                setSelectedBook(null);
              }}
              className="bg-white/20 backdrop-blur-sm rounded-full p-2 hover:bg-white/30 transition-colors"
            >
              <span className="text-xl">←</span>
            </button>
          </div>
        </div>

        <div className="space-y-3">
          {selectedBook.hadiths.map((hadith) => (
            <button
              key={hadith.number}
              onClick={() => {
                setSelectedHadith(hadith);
                setMode("detail");
              }}
              className="w-full bg-white rounded-2xl shadow-md p-5 hover:shadow-lg transition-all text-left"
            >
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-amber-500 to-orange-500 rounded-lg flex items-center justify-center text-white font-bold flex-shrink-0">
                  {hadith.number}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-gray-700 line-clamp-3">{hadith.id}</p>
                </div>
                <span className="text-xl text-gray-400">→</span>
              </div>
            </button>
          ))}
        </div>
      </div>
    );
  }

  // Detail Screen
  if (mode === "detail" && selectedHadith && selectedBook) {
    const currentIndex = selectedBook.hadiths.findIndex(h => h.number === selectedHadith.number);
    
    return (
      <div className="p-4 space-y-4">
        <div className="bg-gradient-to-br from-amber-600 to-orange-600 rounded-3xl shadow-xl p-6 text-white">
          <div className="flex items-center justify-between mb-3">
            <div>
              <h1 className="text-xl font-bold">{selectedBook.name}</h1>
              <p className="text-sm opacity-90">Hadits No. {selectedHadith.number}</p>
            </div>
            <button
              onClick={() => setMode("list")}
              className="bg-white/20 backdrop-blur-sm rounded-full p-2 hover:bg-white/30 transition-colors"
            >
              <span className="text-xl">←</span>
            </button>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6 space-y-6">
          {/* Arabic Text */}
          <div>
            <h3 className="text-sm font-bold text-gray-600 mb-3">Teks Arab:</h3>
            <p className="arabic-text text-2xl text-gray-800 leading-loose text-right">
              {selectedHadith.arab}
            </p>
          </div>

          {/* Divider */}
          <div className="border-t border-gray-200"></div>

          {/* Indonesian Translation */}
          <div>
            <h3 className="text-sm font-bold text-gray-600 mb-3">Terjemahan:</h3>
            <p className="text-gray-800 leading-relaxed">{selectedHadith.id}</p>
          </div>
        </div>

        {/* Navigation Buttons */}
        <div className="flex gap-3">
          <button
            onClick={() => {
              if (currentIndex > 0) {
                setSelectedHadith(selectedBook.hadiths[currentIndex - 1]);
              }
            }}
            disabled={currentIndex === 0}
            className="flex-1 bg-white rounded-xl shadow-md py-3 px-4 font-bold text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg transition-all"
          >
            ← Sebelumnya
          </button>
          <button
            onClick={() => {
              if (currentIndex < selectedBook.hadiths.length - 1) {
                setSelectedHadith(selectedBook.hadiths[currentIndex + 1]);
              }
            }}
            disabled={currentIndex === selectedBook.hadiths.length - 1}
            className="flex-1 bg-white rounded-xl shadow-md py-3 px-4 font-bold text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg transition-all"
          >
            Selanjutnya →
          </button>
        </div>

        <div className="bg-gradient-to-r from-amber-50 to-orange-50 border-l-4 border-amber-500 rounded-xl p-4">
          <div className="flex items-start gap-3">
            <span className="text-2xl">📌</span>
            <div>
              <h3 className="font-bold text-gray-800 mb-1">Catatan</h3>
              <p className="text-sm text-gray-700">
                Hadits ini bersumber dari kitab {selectedBook.name}. Ini adalah data sample untuk demonstrasi. Silakan konsultasikan dengan ulama untuk pemahaman yang lebih mendalam.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return null;
}
