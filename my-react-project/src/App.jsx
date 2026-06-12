import { useState, useEffect } from 'react';

function App() {
  const [weather, setWeather] = useState(null);
  const [city, setCity] = useState("Jakarta");

  const fetchWeather = async () => {
    // Gunakan trim() agar tidak ada spasi kosong di awal/akhir
    const queryCity = city.trim();
    if (!queryCity) return;

    try {
      // URL yang sudah diperbaiki
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${queryCity}&appid=e342e9131a7148139ee57914e0391970&units=metric`
      );
      const data = await response.json();

      console.log(data);
      if (response.ok) {
        setWeather(data);
      } else {
        alert("Kota tidak ditemukan atau API Key belum aktif!");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // Memanggil data saat aplikasi pertama kali dibuka
  useEffect(() => {
    fetchWeather();
  }, []);

  return (
    <div style={{ textAlign: 'center', padding: '20px', fontFamily: 'Arial' }}>
      <h1>Cek Cuaca ☁️</h1>
      
      <input 
        type="text" 
        placeholder="Ketik nama kota..." 
        value={city}
        onChange={(e) => setCity(e.target.value)}
        style={{ padding: '8px', borderRadius: '5px', border: '1px solid #ccc' }}
      />
      <button onClick={fetchWeather} style={{ marginLeft: '10px', padding: '8px' }}>
        Cari
      </button>

      <hr style={{ margin: '20px 0' }} />

      {weather ? (
        <div>
          <h2>{weather.name}, {weather.sys.country}</h2>
          <h1 style={{ fontSize: '50px' }}>{Math.round(weather.main.temp)}°C</h1>
          <p>Kondisi: {weather.weather[0].description}</p>
          <p>Kelembapan: {weather.main.humidity}%</p>
        </div>
      ) : (
        <p>Sedang memuat data...</p>
      )}
    </div>
  );
}

export default App;