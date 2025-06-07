// climaSinAuto.js - API del clima SIN AUTOMATIC FUNCTIONS - VERSIÓN COMPACTA

// Función principal para obtener datos del clima - ACTUALIZADA
function getSimpleWeather() {
    const cityInput = document.getElementById('city-input');
    const output = document.getElementById('weather-output');
    
    if (!cityInput || !output) {
        console.error('Elementos del clima no encontrados');
        return;
    }
    
    const city = cityInput.value.trim();
    
    if (!city) {
        output.innerHTML = '<div class="weather-error">🌡️ Bitte geben Sie eine Stadt ein!</div>';
        return;
    }
    
    output.innerHTML = '<div class="weather-loading">🛰️ Lade Wetterdaten...</div>';
    
    // Llamar a la API del clima
    fetchWeatherData(city)
        .then(function(data) {
            displayWeatherData(data, city);
        })
        .catch(function(error) {
            displayWeatherError();
        });
}

// Función para obtener datos de la API wttr.in
function fetchWeatherData(city) {
    const encodedCity = encodeURIComponent(city);
    const url = `https://wttr.in/${encodedCity}?format=j1`;
    
    return fetch(url)
        .then(function(response) {
            if (!response.ok) {
                throw new Error('Stadt nicht gefunden');
            }
            return response.json();
        });
}

// Función para mostrar los datos del clima
function displayWeatherData(data, cityName) {
    const output = document.getElementById('weather-output');
    if (!output) return;
    
    const current = data.current_condition[0];
    const areaName = data.nearest_area[0].areaName[0].value;
    
    const weatherHTML = createWeatherHTML(current, areaName);
    output.innerHTML = weatherHTML;
}

// Función para crear el HTML del clima - ACTUALIZADA PARA DISEÑO COMPACTO
function createWeatherHTML(current, areaName) {
    const weatherEmoji = getWeatherEmoji(current.weatherCode);
    const temperature = current.temp_C;
    const description = current.weatherDesc[0].value;
    const humidity = current.humidity;
    const windSpeed = current.windspeedKmph;
    
    const html = `
        <div class="weather-compact">
            <div class="weather-main">
                <div class="weather-emoji">${weatherEmoji}</div>
                <div class="weather-temp">${temperature}°C</div>
            </div>
            
            <div class="weather-details">
                <h3 class="weather-city">🌍 ${areaName}</h3>
                <p class="weather-description">✨ ${description}</p>
                <div class="weather-stats">
                    <span class="humidity">Feuchtigkeit: ${humidity}%</span><br>
                    <span class="wind">Wind: ${windSpeed} km/h</span>
                </div>
            </div>
        </div>
    `;
    
    return html;
}

// Función para mostrar errores del clima - ACTUALIZADA
function displayWeatherError() {
    const output = document.getElementById('weather-output');
    if (!output) return;
    
    const errorHTML = `
        <div class="weather-error">
            🚨 Fehler: Stadt nicht gefunden oder Verbindungsproblem
        </div>
    `;
    
    output.innerHTML = errorHTML;
}

// Función para obtener emoji según el código del clima
function getWeatherEmoji(code) {
    const codeStr = String(code);
    
    if (codeStr === '113') {
        return '☀️';
    }
    
    if (codeStr === '116') {
        return '⛅';
    }
    
    if (codeStr === '119' || codeStr === '122') {
        return '☁️';
    }
    
    if (codeStr === '143' || codeStr === '248' || codeStr === '260') {
        return '🌫️';
    }
    
    if (codeStr.length > 0 && codeStr.charAt(0) === '2') {
        return '⛈️';
    }
    
    if (codeStr.length > 0 && codeStr.charAt(0) === '3') {
        return '🌧️';
    }
    
    if (codeStr === '179' || codeStr === '371') {
        return '❄️';
    }
    
    if (codeStr.length >= 2) {
        const firstTwo = codeStr.substring(0, 2);
        if (firstTwo === '32' || firstTwo === '33') {
            return '❄️';
        }
    }
    
    if (codeStr.length > 0 && codeStr.charAt(0) === '1') {
        const codeNum = parseInt(codeStr);
        if (codeNum > 170) {
            return '🌦️';
        }
    }
    
    return '🌡️';
}

// Función para permitir búsqueda con Enter
function setupWeatherInput() {
    const cityInput = document.getElementById('city-input');
    if (cityInput) {
        cityInput.addEventListener('keypress', function(event) {
            if (event.key === 'Enter') {
                getSimpleWeather();
            }
        });
    }
}

// Inicializar la sección del clima
function initializeWeatherSection() {
    setupWeatherInput();
}