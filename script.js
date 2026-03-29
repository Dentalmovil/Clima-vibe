// Clima-Vibe - script.js

// 1. Configuración de la API Key
// Intentamos leer de 'secrets.js' (local) o de una variable de entorno (producción)
const apiKey = typeof WEATHER_API_KEY !== 'undefined' ? WEATHER_API_KEY : 'TU_CLAVE_AQUÍ_SI_NO_USAS_SECRETS';

// 2. Referencias a los elementos del HTML
const cityInput = document.getElementById('city-input');
const searchBtn = document.getElementById('search-btn');
const cityNameDisplay = document.getElementById('city-name');
const tempDisplay = document.getElementById('temp');
const descDisplay = document.getElementById('description');

// 3. Función principal para obtener el clima
async function consultarClima(ciudad) {
    try {
        console.log(`%c Buscando clima para: ${ciudad}... `, 'color: #00f7ff; background: #222; font-weight: bold;');
        
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad}&units=metric&lang=es&appid=${apiKey}`;

        const respuesta = await fetch(url);
        const datos = await respuesta.json();

        if (datos.cod === "404") {
            alert("⚠️ Ciudad no encontrada. Revisa el nombre.");
            return;
        }

        // 4. Inyectar datos con formato
        cityNameDisplay.innerText = datos.name;
        tempDisplay.innerText = `${Math.round(datos.main.temp)}°C`;
        descDisplay.innerText = datos.weather[0].description.toUpperCase();

        // Log de éxito estilo Neón
        console.log("%c Datos recibidos con éxito ✅", "color: #39ff14; font-weight: bold;");

    } catch (error) {
        console.error("Error en la conexión:", error);
        alert("Hubo un problema al conectar con el servidor.");
    }
}

// 5. Eventos (Click y Enter)
searchBtn.addEventListener('click', () => {
    const ciudad = cityInput.value.trim();
    if (ciudad) {
        consultarClima(ciudad);
    } else {
        alert("Escribe una ciudad primero.");
    }
});

cityInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        searchBtn.click();
    }
});


