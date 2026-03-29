// Clima-Vibe | Conexión Segura Vercel

// 1. Intentamos leer la clave de Vercel. 
// Nota: Para que Vercel la pase al navegador, a veces se necesita un prefijo, 
// pero usaremos esta constante como "Plan B" para que NO falle.
const API_CLIMA = "TU_CLAVE_DE_32_CARACTERES_AQUI"; 

async function consultarClima(ciudad) {
    try {
        // Usamos la clave manual directamente para evitar el error 401
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad}&units=metric&lang=es&appid=${API_CLIMA}`;
        
        const respuesta = await fetch(url);
        const datos = await respuesta.json();

        if (datos.cod === 200) {
            document.getElementById('city-name').innerText = datos.name;
            document.getElementById('temp').innerText = `${Math.round(datos.main.temp)}°C`;
            document.getElementById('description').innerText = datos.weather[0].description.toUpperCase();
            
            // Animación neón de éxito
            document.getElementById('temp').style.textShadow = "0 0 20px #39ff14";
        } else {
            // Si sale error 401 aquí, es que la clave API_CLIMA está mal copiada
            alert("Error de OpenWeather: " + datos.message);
        }
    } catch (error) {
        alert("Fallo de conexión al servidor");
    }
}

// Evento del botón
document.getElementById('search-btn').addEventListener('click', () => {
    const ciudad = document.getElementById('city-input').value.trim();
    if (ciudad) consultarClima(ciudad);
});
