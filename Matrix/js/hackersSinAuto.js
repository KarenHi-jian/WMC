// hackersSinAuto.js - SIMPLE Y SIN AUTOMATIC FUNCTIONS

console.log("📰 hackersSinAuto.js simple cargado!");

// Datos locales simples
var vulnerabilitiesData = [
    {
        id: "CVE-2024-0001",
        title: "Buffer Overflow in WebServer", 
        severity: "CRITICAL",
        description: "Remote code execution vulnerability in popular web server software"
    },
    {
        id: "CVE-2024-0002",
        title: "SQL Injection in E-Commerce Platform",
        severity: "HIGH", 
        description: "Authentication bypass through SQL injection in login form"
    },
    {
        id: "CVE-2024-0003",
        title: "Cross-Site Scripting (XSS)",
        severity: "MEDIUM",
        description: "Stored XSS vulnerability in user profile section"
    }
];

var localNewsData = [
    {
        title: "🚀 SpaceX Successfully Launches New Satellite Mission",
        description: "The Falcon 9 rocket carried 23 satellites into orbit in a flawless mission from Cape Canaveral.",
        source: "Space News"
    },
    {
        title: "🔬 Scientists Discover New Treatment for Alzheimer's Disease",
        description: "Breakthrough research shows promising results in early-stage clinical trials for memory restoration.",
        source: "Medical Journal"
    },
    {
        title: "💻 AI Technology Revolutionizes Code Development", 
        description: "New artificial intelligence tools can now generate complex software applications with minimal human input.",
        source: "Tech Today"
    }
];

var breachesData = [
    {company: "Equifax", year: "2017", affected: "147 million", type: "Personal/Financial Data"},
    {company: "Yahoo", year: "2013-2014", affected: "3 billion", type: "Account Data"},
    {company: "Marriott", year: "2018", affected: "500 million", type: "Guest Information"}
];

// FUNCIÓN SIMPLE PARA OCULTAR TODAS LAS SECCIONES
function hideAllSections() {
    var vulnContainer = document.getElementById('vulnerabilities-container');
    var newsContainer = document.getElementById('security-news-container'); 
    var breachContainer = document.getElementById('breaches-container');
    
    if (vulnContainer) vulnContainer.style.display = 'none';
    if (newsContainer) newsContainer.style.display = 'none';
    if (breachContainer) breachContainer.style.display = 'none';
}

// FUNCIÓN SIMPLE PARA MOSTRAR SOLO UNA SECCIÓN
function showOnlyOneSection(sectionId) {
    hideAllSections();
    var section = document.getElementById(sectionId);
    if (section) {
        section.style.display = 'block';
    }
}

// FUNCIÓN PARA CARGAR VULNERABILIDADES (solo esta sección)
function loadVulnerabilities() {
    console.log("🔍 Cargando solo vulnerabilidades...");
    
    // Mostrar solo esta sección
    showOnlyOneSection('vulnerabilities-container');
    
    var container = document.getElementById('vulnerabilities-container');
    if (!container) return;
    
    container.innerHTML = '<div style="text-align: center; color: var(--primary-color);">🔄 Cargando vulnerabilidades...</div>';
    
    setTimeout(function() {
        var html = '<h3 style="color: var(--primary-color); text-align: center;">🛡️ Vulnerability Database</h3>';
        
        for (var i = 0; i < vulnerabilitiesData.length; i++) {
            var vuln = vulnerabilitiesData[i];
            var color = getColorForSeverity(vuln.severity);
            
            html += '<div style="background: rgba(0, 8, 20, 0.9); border-left: 4px solid ' + color + '; border-radius: 8px; padding: 20px; margin: 15px 0;">';
            html += '<div style="display: flex; justify-content: space-between; margin-bottom: 10px;">';
            html += '<h4 style="color: ' + color + '; margin: 0;">' + vuln.id + '</h4>';
            html += '<span style="background: ' + color + '; color: white; padding: 4px 8px; border-radius: 12px; font-size: 0.8em;">' + vuln.severity + '</span>';
            html += '</div>';
            html += '<h5 style="color: white; margin: 10px 0;">' + vuln.title + '</h5>';
            html += '<p style="color: var(--accent-color); margin: 8px 0;">' + vuln.description + '</p>';
            html += '</div>';
        }
        
        container.innerHTML = html;
        console.log("✅ Solo vulnerabilidades mostradas");
    }, 800);
}

// FUNCIÓN PARA CARGAR NOTICIAS REALES (solo esta sección)
function loadHackerNews() {
    console.log("📰 Cargando SOLO noticias reales...");
    
    // Mostrar solo esta sección
    showOnlyOneSection('security-news-container');
    
    var container = document.getElementById('security-news-container');
    if (!container) return;
    
    container.innerHTML = '<div style="text-align: center; color: var(--primary-color);">🌐 Conectando con API real...</div>';
    
    // LLAMADA A API REAL (función tradicional)
    fetch('https://jsonplaceholder.typicode.com/posts?_limit=5', {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    })
    .then(function(response) {
        console.log("📡 Respuesta recibida:", response.status);
        if (!response.ok) {
            throw new Error('Error de red: ' + response.status);
        }
        return response.json();
    })
    .then(function(data) {
        console.log("✅ Datos reales procesados:", data);
        displayRealNews(data);
    })
    .catch(function(error) {
        console.error("❌ Error:", error);
        showNewsError(error);
    });
}

// FUNCIÓN SIMPLE PARA MOSTRAR NOTICIAS REALES
function displayRealNews(newsData) {
    var container = document.getElementById('security-news-container');
    if (!container) return;
    
    var html = '<h3 style="color: var(--primary-color); text-align: center;">📰 Real News Feed (API en vivo)</h3>';
    html += '<div style="text-align: center; color: var(--accent-color); margin-bottom: 20px;">📡 Datos reales de JSONPlaceholder API • Total: ' + newsData.length + ' posts</div>';
    
    for (var i = 0; i < newsData.length; i++) {
        var post = newsData[i];
        var shortBody = post.body.substring(0, 120) + '...';
        
        html += '<div style="background: rgba(0, 8, 20, 0.9); border-left: 4px solid #00BFFF; border-radius: 8px; padding: 20px; margin: 15px 0;">';
        html += '<h4 style="color: white; margin: 0 0 10px 0;">📰 ' + post.title + '</h4>';
        html += '<p style="color: var(--accent-color); margin: 10px 0; line-height: 1.5;">' + shortBody + '</p>';
        html += '<div style="display: flex; justify-content: space-between; margin-top: 15px;">';
        html += '<span style="color: #999; font-size: 0.9em;">📅 2024-06-06 • 🆔 Post ' + post.id + '</span>';
        html += '<span style="background: rgba(0, 191, 255, 0.2); color: #00BFFF; padding: 4px 12px; border-radius: 15px; font-size: 0.8em;">Real API</span>';
        html += '</div>';
        html += '</div>';
    }
    
    container.innerHTML = html;
}

// FUNCIÓN SIMPLE PARA MOSTRAR ERROR
function showNewsError(error) {
    var container = document.getElementById('security-news-container');
    if (!container) return;
    
    var html = '<div style="background: rgba(255, 107, 107, 0.1); border: 2px solid #FF6B6B; border-radius: 8px; padding: 20px; text-align: center;">';
    html += '<h3 style="color: #FF6B6B;">❌ Error al conectar con API</h3>';
    html += '<p style="color: var(--accent-color);">Error: ' + error.message + '</p>';
    html += '<button class="button" onclick="loadHackerNews()">🔄 Reintentar</button>';
    html += '<button class="button" onclick="loadLocalNews()" style="margin-left: 10px;">📰 Usar backup</button>';
    html += '</div>';
    
    container.innerHTML = html;
}

// FUNCIÓN PARA CARGAR NOTICIAS LOCALES (solo esta sección)
function loadLocalNews() {
    console.log("📰 Cargando SOLO noticias locales...");
    
    // Mostrar solo esta sección
    showOnlyOneSection('security-news-container');
    
    var container = document.getElementById('security-news-container');
    if (!container) return;
    
    container.innerHTML = '<div style="text-align: center; color: var(--primary-color);">📰 Cargando noticias locales...</div>';
    
    setTimeout(function() {
        var html = '<h3 style="color: var(--primary-color); text-align: center;">📰 Local News Backup</h3>';
        html += '<div style="text-align: center; color: var(--accent-color); margin-bottom: 20px;">📊 Datos locales • Total: ' + localNewsData.length + ' artículos</div>';
        
        for (var i = 0; i < localNewsData.length; i++) {
            var news = localNewsData[i];
            
            html += '<div style="background: rgba(0, 8, 20, 0.9); border-left: 4px solid #32CD32; border-radius: 8px; padding: 20px; margin: 15px 0;">';
            html += '<h4 style="color: white; margin: 0 0 10px 0;">' + news.title + '</h4>';
            html += '<p style="color: var(--accent-color); margin: 10px 0; line-height: 1.5;">' + news.description + '</p>';
            html += '<div style="display: flex; justify-content: space-between; margin-top: 15px;">';
            html += '<span style="color: #999; font-size: 0.9em;">📅 2024-06-06 • 📰 ' + news.source + '</span>';
            html += '<span style="background: rgba(50, 205, 50, 0.2); color: #32CD32; padding: 4px 12px; border-radius: 15px; font-size: 0.8em;">Local</span>';
            html += '</div>';
            html += '</div>';
        }
        
        container.innerHTML = html;
        console.log("✅ Solo noticias locales mostradas");
    }, 1000);
}

// FUNCIÓN PARA CARGAR DATA BREACHES (solo esta sección)
function checkBreaches() {
    console.log("💀 Cargando SOLO data breaches...");
    
    // Mostrar solo esta sección
    showOnlyOneSection('breaches-container');
    
    var container = document.getElementById('breaches-container');
    if (!container) return;
    
    container.innerHTML = '<div style="text-align: center; color: var(--primary-color);">💻 Analizando data breaches...</div>';
    
    setTimeout(function() {
        var html = '<h3 style="color: var(--primary-color); text-align: center;">💀 Major Data Breaches in History</h3>';
        
        for (var i = 0; i < breachesData.length; i++) {
            var breach = breachesData[i];
            
            html += '<div style="background: rgba(20, 0, 0, 0.7); border: 2px solid #FF6B6B; border-radius: 8px; padding: 20px; margin: 15px 0;">';
            html += '<div style="display: flex; justify-content: space-between; margin-bottom: 10px;">';
            html += '<h4 style="color: #FF6B6B; margin: 0;">' + breach.company + '</h4>';
            html += '<span style="color: #ccc;">' + breach.year + '</span>';
            html += '</div>';
            html += '<div style="color: white; font-size: 1.2em; margin: 10px 0;">📊 ' + breach.affected + ' affected</div>';
            html += '<div style="color: var(--accent-color);">Type: ' + breach.type + '</div>';
            html += '</div>';
        }
        
        container.innerHTML = html;
        console.log("✅ Solo data breaches mostrados");
    }, 1200);
}

// FUNCIÓN HELPER SIMPLE
function getColorForSeverity(severity) {
    if (severity === 'CRITICAL') return '#FF0000';
    if (severity === 'HIGH') return '#FF8C00';
    if (severity === 'MEDIUM') return '#FFD700';
    return '#32CD32';
}

// FUNCIÓN DE INICIALIZACIÓN SIMPLE
function initializeHackersSection() {
    console.log("📰 Sección de noticias inicializada - versión simple");
    console.log("🎓 Cumple con requerimientos del maestro: 0% automatic functions");
    
    // Mostrar mensaje inicial en todas las secciones
    var vulnContainer = document.getElementById('vulnerabilities-container');
    var newsContainer = document.getElementById('security-news-container');
    var breachContainer = document.getElementById('breaches-container');
    
    if (vulnContainer) {
        vulnContainer.innerHTML = '<div style="text-align: center; color: var(--accent-color); padding: 40px;">🔍 Click "Security Database" to load vulnerability data...</div>';
    }
    
    if (newsContainer) {
        newsContainer.innerHTML = '<div style="text-align: center; color: var(--accent-color); padding: 40px;">📰 Click "Real News Feed" to connect to live API...</div>';
    }
    
    if (breachContainer) {
        breachContainer.innerHTML = '<div style="text-align: center; color: var(--accent-color); padding: 40px;">💻 Click "Data Breaches" to view historical data...</div>';
    }
}

console.log("✅ hackersSinAuto.js SIMPLE listo - solo funciones tradicionales!");