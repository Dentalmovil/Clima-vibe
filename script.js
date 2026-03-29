const searchBtn = document.getElementById('searchBtn');
const cityInput = document.getElementById('cityInput');
const weatherResult = document.getElementById('weatherResult');

// Esta es la parte clave para Vercel
const API_KEY = "208c740c448626de8fd29d85a518b453"; 

searchBtn.addEventListener('click', () => {
    const city = cityInput.value;
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric&lang=es`)
        .then(response => response.json())
        .then(data => {
            weatherResult.innerHTML = `
                <h2 class="neon-text">${data.name}</h2>
                <p>Temperatura: ${data.main.temp}°C</p>
                <p>Clima: ${data.weather[0].description}</p>
            `;
        })
        .catch(err => alert("Ciudad no encontrada"));
});
