// ESTRUCTURA CORRECTA DEL CÓDIGO JavaScript

// Variables globales que se usarán en múltiples funciones
let overlay = null;  // Declarar overlay como variable global
let galaxyEffect = null;

// Función para crear estrellas
function createStars() {
    const starsContainer = document.getElementById('stars');
    const starCount = 150;
    
    for (let i = 0; i < starCount; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        star.style.width = Math.random() * 3 + 'px';
        star.style.height = star.style.width;
        star.style.left = Math.random() * 100 + '%';
        star.style.top = Math.random() * 100 + '%';
        star.style.animationDelay = Math.random() * 2 + 's';
        starsContainer.appendChild(star);
    }
}

// Función del botón - SOLO IR A LA OTRA PÁGINA
function startApplication() {
    window.location.href = 'pruebafinalcss.html';
}

// Función de mute
function toggleMute() {
    const audio = document.getElementById('narration');
    const icon = document.getElementById('mute-icon');
    if (audio) {
        audio.muted = !audio.muted;
        icon.textContent = audio.muted ? '🔇' : '🔊';
    }
}

// Función iniciarIntro movida FUERA del event listener para evitar problemas de scope
function iniciarIntro() {
    console.log('Iniciando intro...');
    const audio = document.getElementById('narration');
    const indicator = document.querySelector('.audio-indicator');
    const container = document.querySelector('.story-container');
    
    // Mostrar cuenta regresiva
    const countdown = document.createElement('div');
    countdown.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        font-size: 12em;
        color: #00BFFF;
        text-shadow: 0 0 30px rgba(0, 191, 255, 0.8),
                     0 0 60px rgba(0, 191, 255, 0.5),
                     0 0 90px rgba(0, 191, 255, 0.3);
        z-index: 1000;
        font-family: 'Pathway Gothic One', sans-serif;
        animation: pulse 1.5s ease-in-out;
    `;
    countdown.textContent = '5';
    document.body.appendChild(countdown);
    
    // Cuenta regresiva
    setTimeout(() => {
        countdown.style.animation = 'none';
        countdown.offsetHeight;
        countdown.textContent = '4';
        countdown.style.animation = 'pulse 1.5s ease-in-out';
    }, 1500);
    
    setTimeout(() => {
        countdown.style.animation = 'none';
        countdown.offsetHeight;
        countdown.textContent = '3';
        countdown.style.animation = 'pulse 1.5s ease-in-out';
    }, 3000);
    
    setTimeout(() => {
        countdown.style.animation = 'none';
        countdown.offsetHeight;
        countdown.textContent = '2';
        countdown.style.animation = 'pulse 1.5s ease-in-out';
    }, 4500);
    
    setTimeout(() => {
        countdown.style.animation = 'none';
        countdown.offsetHeight;
        countdown.textContent = '1';
        countdown.style.animation = 'pulse 1.5s ease-in-out';
    }, 6000);
    
    // Después de la cuenta regresiva
    setTimeout(() => {
        countdown.remove();
        
        // Hacer visible el texto
        container.style.opacity = '1';
        container.style.transform = 'translateY(0)';
        
        // Iniciar la animación del texto
        container.classList.remove('fade-in');
        container.classList.add('start-crawl');
        
        // Reproducir el audio
        audio.currentTime = 0;
        audio.play().then(() => {
            console.log('✓ Audio y animación iniciados correctamente');
            if (indicator) indicator.classList.add('active');
        }).catch(error => {
            console.error('Error al reproducir audio:', error);
            const mensaje = document.createElement('div');
            mensaje.style.cssText = `
                position: fixed;
                top: 20px;
                right: 20px;
                background: rgba(0, 0, 0, 0.8);
                color: #00BFFF;
                padding: 10px 20px;
                border-radius: 5px;
                font-size: 14px;
                z-index: 1000;
            `;
            mensaje.textContent = 'Presiona play en el reproductor de audio';
            document.body.appendChild(mensaje);
            
            setTimeout(() => {
                mensaje.remove();
            }, 5000);
        });
        
        // Mostrar el botón BEGINNE DIE REISE
        setTimeout(() => {
            const beginButton = document.querySelector('.begin-button');
            if (beginButton) {
                beginButton.style.display = 'inline-block';
            }
        }, 25000);
    }, 7500);
}

// Cuando carga la página
window.addEventListener('load', () => {
    createStars();
    
    const audio = document.getElementById('narration');
    const indicator = document.querySelector('.audio-indicator');
    const container = document.querySelector('.story-container');
    
    // Pre-cargar el audio
    audio.load();
    
    // Crear overlay de fondo
    overlay = document.createElement('div');  // Ahora usa la variable global
    overlay.className = 'intro-overlay';
    overlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.3);
        z-index: 1999;
    `;
    document.body.appendChild(overlay);
    
    // CREAR BOTÓN CON EFECTO GALAXIA
    const buttonWrapper = document.createElement('div');
    buttonWrapper.className = 'galaxy-button-wrapper';
    
    // Canvas de galaxia
    const galaxyCanvas = document.createElement('canvas');
    galaxyCanvas.id = 'galaxyCanvas';
    galaxyCanvas.className = 'galaxy-canvas';
    galaxyCanvas.width = 500;   // ← AGREGA ESTA
    galaxyCanvas.height = 200;  // ← AGREGA ESTA
    buttonWrapper.appendChild(galaxyCanvas);
    
    // Efecto glow
    const glowDiv = document.createElement('div');
    glowDiv.className = 'galaxy-glow';
    buttonWrapper.appendChild(glowDiv);
    
    // Botón mejorado
    const startBtn = document.createElement('button');
    startBtn.className = 'galaxy-start-btn';
    startBtn.textContent = 'START INTRO';
    startBtn.onclick = function() {
        console.log('Botón clickeado!');
        
        // Crear explosión
        if (typeof triggerGalaxyExplosion === 'function') {
            triggerGalaxyExplosion();
        }
        
        // Esperar para ver el efecto
        setTimeout(() => {
            buttonWrapper.remove();
            overlay.remove();
            overlay = null; // Limpiar la referencia
            
            // Iniciar intro
            iniciarIntro();
        }, 500);
    };
    buttonWrapper.appendChild(startBtn);
    
    // Agregar el wrapper al body
    document.body.appendChild(buttonWrapper);
    
    // Inicializar el efecto galaxia
    if (typeof initGalaxyEffect === 'function') {
        initGalaxyEffect('galaxyCanvas');
    } else {
        console.warn('initGalaxyEffect no está definida');
    }
    
    // Listeners del audio
    audio.addEventListener('play', () => {
        if (indicator) {
            indicator.classList.add('active');
        }
    });
    
    audio.addEventListener('ended', () => {
        if (indicator) {
            indicator.classList.remove('active');
        }
    });
    
    audio.addEventListener('pause', () => {
        if (indicator) {
            indicator.classList.remove('active');
        }
    });
});

// ESC para saltar
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        const audio = document.getElementById('narration');
        if (audio) audio.pause();
        window.location.href = 'pruebafinalcss.html';
    }
});