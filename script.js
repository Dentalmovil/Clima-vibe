// Clima-Vibe | Configuración de APIs con MAPS_KEY

// 1. Detección de claves (Local vs Producción)
const weatherKey = (typeof WEATHER_API_KEY !== 'undefined') ? WEATHER_API_KEY : "TU_KEY_OPENWEATHER_AQUI";
const mapsKey = (typeof MAPS_KEY !== 'undefined') ? MAPS_KEY : "TU_KEY_GOOGLE_AIza_AQUI";

// 2. Elementos del Dashboard
const cityInput = document.getElementById('city-input');
const searchBtn = document.getElementById('search-btn');
const cityNameDisplay = document.getElementById('city-name');
const tempDisplay = document.getElementById('temp');
const descDisplay = document.getElementById('description');

// 3. Función para obtener el clima
async function consultarClima(ciudad) {
    try {
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad}&units=metric&lang=es&appid=${weatherKey}`;
        const respuesta = await fetch(url);
        const datos = await respuesta.json();

        if (datos.cod === "404") {
            alert("📍 Ciudad no encontrada. Intenta de nuevo.");
            return;
        }

        // Inyectar datos en el HTML
        cityNameDisplay.innerText = datos.name;
        tempDisplay.innerText = `${Math.round(datos.main.temp)}°C`;
        descDisplay.innerText = datos.weather[0].description.toUpperCase();

        // Aquí podrías usar mapsKey para cargar un mapa estático si quisieras
        console.log("Clave de Google Maps lista para usar:", mapsKey ? "OK" : "Falta");

    } catch (error) {
        console.error("Error en la conexión:", error);
    }
}

// 4. Eventos
searchBtn.addEventListener('click', () => {
    const ciudad = cityInput.value.trim();
    if (ciudad) consultarClima(ciudad);
});

cityInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') searchBtn.click();
});


