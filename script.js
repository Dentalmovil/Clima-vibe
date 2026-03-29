// Clima-Vibe | Versión Final Segura

// --- CONFIGURACIÓN DE LLAVES ---
// 1. Aquí va la de OpenWeather (32 caracteres, letras y números)
const weatherKey = (typeof WEATHER_API_KEY !== 'undefined') ? WEATHER_API_KEY : "TU_API_KEY_DE_OPENWEATHER_AQUI";

// 2. Aquí va la de Google (Empieza por AIza...)
const mapsKey = (typeof MAPS_KEY !== 'undefined') ? MAPS_KEY : "TU_API_KEY_DE_GOOGLE_AQUI";


// --- ELEMENTOS DE LA INTERFAZ ---
const cityInput = document.getElementById('city-input');
const searchBtn = document.getElementById('search-btn');
const cityNameDisplay = document.getElementById('city-name');
const tempDisplay = document.getElementById('temp');
const descDisplay = document.getElementById('description');

// --- FUNCIÓN PRINCIPAL ---
async function consultarClima(ciudad) {
    try {
        // Validación de la clave antes de disparar
        if (weatherKey.includes("AIza")) {
            alert("⚠️ Estás usando una clave de Google en lugar de la de OpenWeather.");
            return;
        }

        const url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad}&units=metric&lang=es&appid=${weatherKey}`;
        
        const respuesta = await fetch(url);
        const datos = await respuesta.json();

        if (datos.cod === 200) {
            cityNameDisplay.innerText = datos.name;
            tempDisplay.innerText = `${Math.round(datos.main.temp)}°C`;
            descDisplay.innerText = datos.weather[0].description.toUpperCase();
            
            // Estilo neón dinámico
            tempDisplay.style.textShadow = datos.main.temp < 15 ? "0 0 20px #00f7ff" : "0 0 20px #39ff14";
        } else {
            // Esto te dirá si la clave sigue siendo inválida
            alert("Respuesta de OpenWeather: " + datos.message);
        }
    } catch (error) {
        alert("Hubo un problema al conectar con el servidor.");
    }
}

// --- EVENTOS ---
searchBtn.addEventListener('click', () => {
    const ciudad = cityInput.value.trim();
    if (ciudad) consultarClima(ciudad);
});

cityInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') searchBtn.click();
});
