// Clima-Vibe Logic

// 1. Configuración de API Key
// Reemplaza el texto entre comillas con tu clave real de OpenWeather
const MI_CLAVE_MANUAL = "TU_API_KEY_AQUÍ"; 

const apiKey = (typeof WEATHER_API_KEY !== 'undefined') ? WEATHER_API_KEY : MI_CLAVE_MANUAL;

// 2. Elementos UI
const cityInput = document.getElementById('city-input');
const searchBtn = document.getElementById('search-btn');
const cityNameDisplay = document.getElementById('city-name');
const tempDisplay = document.getElementById('temp');
const descDisplay = document.getElementById('description');

// 3. Función de consulta
async function consultarClima(ciudad) {
    if (!apiKey || apiKey === "TU_API_KEY_AQUÍ") {
        alert("⚠️ Error: No has configurado la API KEY en script.js");
        return;
    }

    try {
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad}&units=metric&lang=es&appid=${apiKey}`;
        
        const respuesta = await fetch(url);
        
        if (!respuesta.ok) {
            throw new Error("Ciudad no encontrada");
        }

        const datos = await respuesta.json();

        // Inyectar datos
        cityNameDisplay.innerText = datos.name;
        tempDisplay.innerText = `${Math.round(datos.main.temp)}°C`;
        descDisplay.innerText = datos.weather[0].description;

    } catch (error) {
        console.error("Error:", error);
        alert("⚠️ Hubo un problema al obtener el clima. Verifica el nombre de la ciudad.");
    }
}

// 4. Listeners
searchBtn.addEventListener('click', () => {
    const ciudad = cityInput.value.trim();
    if (ciudad) consultarClima(ciudad);
});

cityInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') searchBtn.click();
});


