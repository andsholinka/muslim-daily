"use client";

import { useState, useEffect } from "react";

export default function QiblaScreen() {
  const [heading, setHeading] = useState(0);
  const [qiblaDirection, setQiblaDirection] = useState(295); // Default ke arah Mekah dari Jakarta
  const [hasPermission, setHasPermission] = useState(false);
  const [location, setLocation] = useState({ lat: 0, lng: 0 });
  const [error, setError] = useState("");

  useEffect(() => {
    // Request geolocation
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const lat = position.coords.latitude;
          const lng = position.coords.longitude;
          setLocation({ lat, lng });
          
          // Hitung arah kiblat (Kaaba: 21.4225, 39.8262)
          const qibla = calculateQiblaDirection(lat, lng);
          setQiblaDirection(qibla);
        },
        (err) => {
          setError("Tidak dapat mengakses lokasi. Menggunakan lokasi default (Jakarta).");
        }
      );
    }

    // Request device orientation
    if (typeof DeviceOrientationEvent !== "undefined" && typeof (DeviceOrientationEvent as any).requestPermission === "function") {
      // iOS 13+ requires permission
      setHasPermission(false);
    } else if ("ondeviceorientationabsolute" in window) {
      setHasPermission(true);
      window.addEventListener("deviceorientationabsolute", handleOrientation as any);
    } else if ("ondeviceorientation" in window) {
      setHasPermission(true);
      window.addEventListener("deviceorientation", handleOrientation);
    }

    return () => {
      window.removeEventListener("deviceorientationabsolute", handleOrientation as any);
      window.removeEventListener("deviceorientation", handleOrientation);
    };
  }, []);

  const calculateQiblaDirection = (lat: number, lng: number) => {
    // Koordinat Kaaba
    const kaabaLat = 21.4225;
    const kaabaLng = 39.8262;

    const latRad = (lat * Math.PI) / 180;
    const lngRad = (lng * Math.PI) / 180;
    const kaabaLatRad = (kaabaLat * Math.PI) / 180;
    const kaabaLngRad = (kaabaLng * Math.PI) / 180;

    const dLng = kaabaLngRad - lngRad;

    const y = Math.sin(dLng) * Math.cos(kaabaLatRad);
    const x =
      Math.cos(latRad) * Math.sin(kaabaLatRad) -
      Math.sin(latRad) * Math.cos(kaabaLatRad) * Math.cos(dLng);

    let bearing = Math.atan2(y, x);
    bearing = (bearing * 180) / Math.PI;
    bearing = (bearing + 360) % 360;

    return bearing;
  };

  const handleOrientation = (event: DeviceOrientationEvent) => {
    const alpha = event.alpha || 0;
    setHeading(360 - alpha);
  };

  const requestPermission = async () => {
    if (typeof (DeviceOrientationEvent as any).requestPermission === "function") {
      try {
        const permission = await (DeviceOrientationEvent as any).requestPermission();
        if (permission === "granted") {
          setHasPermission(true);
          window.addEventListener("deviceorientationabsolute", handleOrientation as any);
        }
      } catch (err) {
        setError("Izin kompas ditolak");
      }
    }
  };

  const compassRotation = heading - qiblaDirection;

  return (
    <div className="p-4 space-y-6 min-h-screen">
      {/* Header */}
      <div className="bg-gradient-to-br from-purple-600 to-indigo-600 rounded-3xl shadow-xl p-6 text-white">
        <h1 className="text-2xl font-bold mb-2">Arah Kiblat</h1>
        <p className="text-sm opacity-90">Arahkan ponsel ke arah panah hijau</p>
      </div>

      {/* Compass */}
      <div className="bg-white rounded-3xl shadow-xl p-8">
        <div className="relative w-full aspect-square max-w-sm mx-auto">
          {/* Compass Background */}
          <div
            className="absolute inset-0 rounded-full border-8 border-gray-200 bg-gradient-to-br from-gray-50 to-gray-100"
            style={{
              transform: `rotate(${-heading}deg)`,
              transition: "transform 0.1s ease-out",
            }}
          >
            {/* Cardinal Directions */}
            <div className="absolute top-2 left-1/2 -translate-x-1/2 font-bold text-red-600 text-xl">
              N
            </div>
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 font-bold text-gray-600">
              S
            </div>
            <div className="absolute left-2 top-1/2 -translate-y-1/2 font-bold text-gray-600">
              W
            </div>
            <div className="absolute right-2 top-1/2 -translate-y-1/2 font-bold text-gray-600">
              E
            </div>

            {/* Degree Marks */}
            {[...Array(36)].map((_, i) => {
              const angle = i * 10;
              return (
                <div
                  key={i}
                  className="absolute top-1/2 left-1/2 w-0.5 h-3 bg-gray-400 origin-bottom"
                  style={{
                    transform: `translate(-50%, -100%) translateY(-${
                      50 - 1.5
                    }%) rotate(${angle}deg)`,
                  }}
                />
              );
            })}
          </div>

          {/* Qibla Arrow */}
          <div
            className="absolute inset-0 flex items-center justify-center"
            style={{
              transform: `rotate(${qiblaDirection - heading}deg)`,
              transition: "transform 0.1s ease-out",
            }}
          >
            <div className="text-8xl drop-shadow-lg">
              ☪️
            </div>
          </div>

          {/* Center Dot */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-purple-600 rounded-full border-2 border-white shadow-lg" />
        </div>

        {/* Direction Info */}
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600 mb-2">Arah Kiblat</p>
          <p className="text-4xl font-bold text-purple-600">
            {Math.round(qiblaDirection)}°
          </p>
          <p className="text-sm text-gray-500 mt-2">
            Kompas: {Math.round(heading)}°
          </p>
        </div>
      </div>

      {/* Permission Request */}
      {!hasPermission && typeof (DeviceOrientationEvent as any).requestPermission === "function" && (
        <button
          onClick={requestPermission}
          className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-4 px-6 rounded-2xl shadow-lg transition-all transform hover:scale-105 active:scale-95"
        >
          Aktifkan Kompas
        </button>
      )}

      {/* Error Message */}
      {error && (
        <div className="bg-amber-50 border-l-4 border-amber-500 rounded-xl p-4">
          <div className="flex items-start gap-3">
            <span className="text-2xl">⚠️</span>
            <div>
              <h3 className="font-bold text-gray-800 mb-1">Perhatian</h3>
              <p className="text-sm text-gray-700">{error}</p>
            </div>
          </div>
        </div>
      )}

      {/* Instructions */}
      <div className="bg-gradient-to-r from-purple-50 to-indigo-50 border-l-4 border-purple-500 rounded-xl p-4">
        <div className="flex items-start gap-3">
          <span className="text-2xl">💡</span>
          <div>
            <h3 className="font-bold text-gray-800 mb-1">Cara Menggunakan</h3>
            <ul className="text-sm text-gray-700 space-y-1">
              <li>• Pegang ponsel secara horizontal (datar)</li>
              <li>• Putar badan hingga simbol ☪️ mengarah ke atas</li>
              <li>• Arah tersebut adalah arah kiblat</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
