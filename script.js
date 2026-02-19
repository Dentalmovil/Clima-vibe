// script.js

// 1. Intentamos obtener la llave de Vercel. 
// Si no la encuentra, intentamos usar la del archivo local (secrets.js)
let API_KEY;

try {
    // Si secrets.js existe (local), usará esa.
    API_KEY = config.WEATHER_API_KEY; 
} catch (e) {
    // Si secrets.js NO existe (Vercel), usará esta cadena que Vercel reemplazará
    API_KEY = "WEATHER_API_KEY_PLACEHOLDER"; 
}

// IMPORTANTE: En Vercel, las variables de entorno se manejan distinto en el frontend.
// Para proyectos simples, lo más directo es que tu función de búsqueda sea así:
async function obtenerClima(ciudad) {
    // Si estás en Vercel, usa la variable que configuraste
    const finalKey = (API_KEY === "WEATHER_API_KEY_PLACEHOLDER") ? 'TU_CLAVE_REAL_AQUI' : API_KEY;
    
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad}&appid=${finalKey}&units=metric&lang=es`;
    // ... resto de tu fetch
}

// 2. Función principal para obtener el clima
async function consultarClima(ciudad) {
    try {
        // La variable WEATHER_API_KEY se toma automáticamente de tu archivo secrets.js
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad}&units=metric&lang=es&appid=${WEATHER_API_KEY}`;
        
        const respuesta = await fetch(url);
        const datos = await respuesta.json();

        // Si la ciudad no existe
        if (datos.cod === "404") {
            alert("Ciudad no encontrada. Revisa que esté bien escrita.");
            return;
        }

        // 3. Inyectar los datos en el HTML
        cityNameDisplay.innerText = datos.name;
        tempDisplay.innerText = Math.round(datos.main.temp); // Redondea el número (ej: 25.4 -> 25)
        descDisplay.innerText = datos.weather[0].description;

    } catch (error) {
        console.error("Hubo un error en la petición:", error);
    }
}

// 4. Evento para que el botón funcione al hacer clic
searchBtn.addEventListener('click', () => {
    const ciudad = cityInput.value.trim(); // .trim() quita espacios vacíos
    if (ciudad) {
        consultarClima(ciudad);
    } else {
        alert("Por favor, escribe el nombre de una ciudad.");
    }
});

// 5. Extra: Permitir buscar al presionar la tecla "Enter"
cityInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        searchBtn.click();
    }
});
// script.js

// 1. Conectamos con los elementos del HTML
const cityInput = document.getElementById('city-input');
const searchBtn = document.getElementById('search-btn');
const cityNameDisplay = document.getElementById('city-name');
const tempDisplay = document.getElementById('temp');
const descDisplay = document.getElementById('description');

// 2. Función para obtener datos de la API
async function consultarClima(ciudad) {
    try {
        // La variable WEATHER_API_KEY se carga desde tu archivo secrets.js
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad}&units=metric&lang=es&appid=${WEATHER_API_KEY}`;
        
        const respuesta = await fetch(url);
        const datos = await respuesta.json();

        // Validamos si la ciudad existe
        if (datos.cod === "404") {
            alert("⚠️ Ciudad no encontrada. Intenta con otro nombre.");
            return;
        }

        // 3. Mostramos la información en la pantalla
        cityNameDisplay.innerText = datos.name;
        tempDisplay.innerText = Math.round(datos.main.temp); // Redondeamos la temperatura
        descDisplay.innerText = datos.weather[0].description;

    } catch (error) {
        console.error("Hubo un error:", error);
    }
}

// 4. Escuchamos el clic del botón
searchBtn.addEventListener('click', () => {
    const ciudad = cityInput.value.trim();
    if (ciudad) {
        consultarClima(ciudad);
    }
});

// 5. Extra: buscar también al presionar la tecla "Enter"
cityInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        searchBtn.click();
    }
});

