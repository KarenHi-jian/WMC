// weather.js

// API de Clima
async function getSimpleWeather() {
    const cityInput = document.getElementById('city-input');
    const output = document.getElementById('weather-output');
    const city = cityInput.value.trim();
   
    if (!city) {
        output.innerHTML = '<div style="text-align: center; color: #ff9999;">Bitte geben Sie eine Stadt ein!</div>';
        return;
    }
   
    output.innerHTML = '<div class="loading" style="text-align: center;">Lade Wetterdaten...</div>';
   
    try {
        const response = await fetch(`https://wttr.in/${encodeURIComponent(city)}?format=j1`);
       
        if (!response.ok) {
            throw new Error('Stadt nicht gefunden');
        }
       
        const data = await response.json();
        const current = data.current_condition[0];
       
        output.innerHTML = `
            <div style="width: 100%;">
                <h3 style="color: var(--primary-color); text-align: center; margin-bottom: 30px; font-size: 1.5em;">
                    ${data.nearest_area[0].areaName[0].value}
                </h3>
               
                <div style="text-align: center;">
                    <div style="font-size: 5em; margin: 20px 0;">
                        ${getWeatherEmoji(current.weatherCode)}
                    </div>
                    <p style="font-size: 3.5em; margin: 20px 0; color: white; font-weight: bold;">
                        ${current.temp_C}°C
                    </p>
                    <p style="color: var(--accent-color); font-size: 1.5em; margin: 20px 0;">
                        ${current.weatherDesc[0].value}
                    </p>
                </div>
                
                <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 20px; margin-top: 40px;">
                    <div style="text-align: center; background: rgba(0, 255, 255, 0.1); padding: 15px; border-radius: 10px;">
                        <div style="font-size: 2em;">💧</div>
                        <p style="color: var(--accent-color); margin: 10px 0;">Luftfeuchtigkeit</p>
                        <p style="font-size: 1.5em; font-weight: bold;">${current.humidity}%</p>
                    </div>
                    <div style="text-align: center; background: rgba(0, 255, 255, 0.1); padding: 15px; border-radius: 10px;">
                        <div style="font-size: 2em;">💨</div>
                        <p style="color: var(--accent-color); margin: 10px 0;">Wind</p>
                        <p style="font-size: 1.5em; font-weight: bold;">${current.windspeedKmph} km/h</p>
                    </div>
                    <div style="text-align: center; background: rgba(0, 255, 255, 0.1); padding: 15px; border-radius: 10px;">
                        <div style="font-size: 2em;">🌡️</div>
                        <p style="color: var(--accent-color); margin: 10px 0;">Gefühlt</p>
                        <p style="font-size: 1.5em; font-weight: bold;">${current.FeelsLikeC}°C</p>
                    </div>
                </div>
            </div>
        `;
       
    } catch (error) {
        output.innerHTML = `
            <div style="text-align: center; color: #ff9999;">
                Fehler: Stadt nicht gefunden oder Verbindungsproblem
            </div>
        `;
    }
}

// Función para obtener el emoji correcto según el código del clima
function getWeatherEmoji(code) {
    const codeStr = String(code);
    
    // Soleado
    if (codeStr === '113') return '☀️';
    
    // Parcialmente nublado
    if (codeStr === '116') return '⛅';
    
    // Nublado
    if (codeStr === '119' || codeStr === '122') return '☁️';
    
    // Niebla
    if (codeStr === '143' || codeStr === '248' || codeStr === '260') return '🌫️';
    
    // Lluvia ligera
    if (codeStr === '176' || codeStr === '263' || codeStr === '266' || codeStr === '293' || codeStr === '296') return '🌦️';
    
    // Lluvia
    if (codeStr === '299' || codeStr === '302' || codeStr === '305' || codeStr === '308' || codeStr === '311') return '🌧️';
    
    // Tormenta
    if (codeStr === '200' || codeStr === '386' || codeStr === '389' || codeStr === '392' || codeStr === '395') return '⛈️';
    
    // Nieve ligera
    if (codeStr === '179' || codeStr === '323' || codeStr === '326' || codeStr === '368') return '🌨️';
    
    // Nieve
    if (codeStr === '227' || codeStr === '230' || codeStr === '329' || codeStr === '332' || codeStr === '335' || codeStr === '338' || codeStr === '371' || codeStr === '374' || codeStr === '377') return '❄️';
    
    // Ventisca
    if (codeStr === '230' || codeStr === '232') return '🌬️❄️';
    
    // Granizo
    if (codeStr === '350' || codeStr === '353' || codeStr === '356' || codeStr === '359' || codeStr === '362' || codeStr === '365') return '🌨️';
    
    // Por defecto
    return '🌡️';
}

// Agregar evento para buscar al presionar Enter
document.addEventListener('DOMContentLoaded', function() {
    const cityInput = document.getElementById('city-input');
    if (cityInput) {
        cityInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                getSimpleWeather();
            }
        });
    }
});