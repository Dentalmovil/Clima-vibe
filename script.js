// Clima-Vibe | Dashboard Corregido 2026

// 1. Configuración de API Keys (Detección automática)
const weatherKey = (typeof WEATHER_API_KEY !== 'undefined') ? WEATHER_API_KEY : "TU_CLAVE_OPENWEATHER_AQUI";
const mapsKey = (typeof MAPS_KEY !== 'undefined') ? MAPS_KEY : "TU_CLAVE_GOOGLE_AIza_AQUI";

// 2. Referencias al HTML
const cityInput = document.getElementById('city-input');
const searchBtn = document.getElementById('search-btn');
const cityNameDisplay = document.getElementById('city-name');
const tempDisplay = document.getElementById('temp');
const descDisplay = document.getElementById('description');

// 3. Función principal
async function consultarClima(ciudad) {
    try {
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad}&units=metric&lang=es&appid=${weatherKey}`;
        
        const respuesta = await fetch(url);
        const datos = await respuesta.json();

        // Si la respuesta es exitosa (Código 200 como vimos en tu captura)
        if (datos.cod === 200) {
            // Nombre de la ciudad
            cityNameDisplay.innerText = datos.name;

            // Temperatura (Redondeada)
            tempDisplay.innerText = `${Math.round(datos.main.temp)}°C`;

            // Descripción en Mayúsculas
            descDisplay.innerText = datos.weather[0].description.toUpperCase();

            // Cambiar color del neón según temperatura (Opcional)
            if(datos.main.temp < 18) {
                tempDisplay.style.color = "#00f7ff"; // Frío: Cian
                tempDisplay.style.textShadow = "0 0 20px #00f7ff";
            } else {
                tempDisplay.style.color = "#39ff14"; // Calor: Verde Neón
                tempDisplay.style.textShadow = "0 0 20px #39ff14";
            }

            console.log("✅ Datos cargados con éxito para " + datos.name);
        } else {
            alert("⚠️ Error: " + datos.message);
        }

    } catch (error) {
        console.error("Fallo en la conexión:", error);
        alert("No se pudo conectar con el servidor.");
    }
}

// 4. Eventos de búsqueda
searchBtn.addEventListener('click', () => {
    const ciudad = cityInput.value.trim();
    if (ciudad) {
        consultarClima(ciudad);
    } else {
        alert("Escribe el nombre de una ciudad.");
    }
});

cityInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') searchBtn.click();
});


