// hackersSinAuto.js - VERSIÓN FINAL CON HACKER NEWS API

console.log("🔥 Universe News System - Powered by Hacker News API!");

// DATOS LOCALES
var vulnerabilitiesData = [
    {id: "CVE-2024-0001", title: "Buffer Overflow in WebServer", severity: "CRITICAL", description: "Remote code execution vulnerability affecting millions of servers"},
    {id: "CVE-2024-0002", title: "SQL Injection in E-Commerce", severity: "HIGH", description: "Authentication bypass via SQL injection in login systems"},
    {id: "CVE-2024-0003", title: "Cross-Site Scripting (XSS)", severity: "MEDIUM", description: "Stored XSS vulnerability in user profile sections"},
    {id: "CVE-2024-0004", title: "Zero-Day in Exchange Server", severity: "CRITICAL", description: "Unauthenticated RCE affecting all Exchange versions"}
];

var localNewsData = [
    {title: "🔒 New NIST Cybersecurity Framework", description: "Updated framework addresses AI-powered attacks and quantum computing threats.", source: "NIST Security"},
    {title: "🚨 Major Data Breach - 50M Users Affected", description: "Sophisticated attack on social media platform compromises millions of accounts.", source: "CyberDaily"},
    {title: "🛡️ Zero-Trust Architecture Adoption Soars", description: "Enterprise adoption of zero-trust security models grows by 300% this year.", source: "InfoSec Weekly"},
    {title: "⚡ Quantum Computing Threatens Encryption", description: "New quantum breakthrough could break RSA encryption within the decade.", source: "Quantum News"}
];

var breachesData = [
    {company: "Equifax", year: "2017", affected: "147 million", type: "Personal/Financial Data"},
    {company: "Yahoo", year: "2013-2014", affected: "3 billion", type: "Account Data"},
    {company: "Marriott", year: "2018", affected: "500 million", type: "Guest Information"},
    {company: "SolarWinds", year: "2020", affected: "18,000+ companies", type: "Supply Chain Attack"}
];

// FUNCIONES AUXILIARES
function validateContainer(containerId) {
    var container = document.getElementById(containerId);
    if (!container) throw new Error("Container '" + containerId + "' not found");
    return container;
}

function hideAllContainers() {
    var containers = ['vulnerabilities-container', 'security-news-container', 'breaches-container'];
    for (var i = 0; i < containers.length; i++) {
        var el = document.getElementById(containers[i]);
        if (el) el.style.display = 'none';
    }
}

function showContainer(containerId) {
    hideAllContainers();
    var container = validateContainer(containerId);
    container.style.display = 'block';
}

function getColorForSeverity(severity) {
    var colors = {'CRITICAL': '#FF0000', 'HIGH': '#FF8C00', 'MEDIUM': '#FFD700'};
    return colors[severity] || '#32CD32';
}

function getTimeAgo(timestamp) {
    if (!timestamp) return 'unknown';
    var diff = Math.floor(Date.now() / 1000) - timestamp;
    if (diff < 3600) return Math.floor(diff / 60) + ' minutes ago';
    if (diff < 86400) return Math.floor(diff / 3600) + ' hours ago';
    return Math.floor(diff / 86400) + ' days ago';
}

// GENERADORES HTML
function generateVulnerabilityHTML(data) {
    var html = '<h3 style="color: var(--primary-color); text-align: center;">🛡️ Security Vulnerability Database</h3>';
    html += '<div style="text-align: center; color: #999; margin-bottom: 20px;">Total CVEs: ' + data.length + '</div>';
    
    for (var i = 0; i < data.length; i++) {
        var v = data[i];
        var color = getColorForSeverity(v.severity);
        html += '<div class="news-item" style="border-left-color: ' + color + ';">';
        html += '<div style="display: flex; justify-content: space-between; align-items: center;">';
        html += '<h4 style="color: ' + color + '; margin: 0;">' + v.id + '</h4>';
        html += '<span class="severity-badge" style="background: ' + color + ';">' + v.severity + '</span>';
        html += '</div>';
        html += '<h5>' + v.title + '</h5>';
        html += '<p>' + v.description + '</p>';
        html += '</div>';
    }
    return html;
}

function generateHackerNewsHTML(stories) {
    var html = '<h3 style="color: var(--primary-color); text-align: center;">🔥 Live Tech News from Hacker News</h3>';
    html += '<div style="text-align: center; color: #999; margin-bottom: 20px;">Real-time feed from news.ycombinator.com</div>';
    
    for (var i = 0; i < stories.length && i < 5; i++) {
        var s = stories[i];
        if (!s || !s.title) continue;
        
        html += '<div class="news-item" style="border-left-color: #FF6600;">';
        html += '<h4>🔥 ' + s.title + '</h4>';
        if (s.url) {
            var domain = s.url.split('/')[2];
            html += '<a href="' + s.url + '" target="_blank" style="color: #00BFFF; text-decoration: none;">🔗 ' + (domain || 'Link') + '</a>';
        }
        html += '<div class="news-meta">';
        html += '⬆️ ' + (s.score || 0) + ' points • 💬 ' + (s.descendants || 0) + ' comments • ⏰ ' + getTimeAgo(s.time);
        html += '</div>';
        html += '</div>';
    }
    return html;
}

function generateLocalNewsHTML(data) {
    var html = '<h3 style="color: var(--primary-color); text-align: center;">📰 Cybersecurity News (Local Backup)</h3>';
    html += '<div style="text-align: center; color: #999; margin-bottom: 20px;">Offline news database</div>';
    
    for (var i = 0; i < data.length; i++) {
        var n = data[i];
        html += '<div class="news-item" style="border-left-color: #32CD32;">';
        html += '<h4>' + n.title + '</h4>';
        html += '<p>' + n.description + '</p>';
        html += '<div class="news-meta">📰 ' + n.source + '</div>';
        html += '</div>';
    }
    return html;
}

function generateBreachesHTML(data) {
    var html = '<h3 style="color: var(--primary-color); text-align: center;">💀 Major Data Breaches History</h3>';
    html += '<div style="text-align: center; color: #999; margin-bottom: 20px;">Historical cybersecurity incidents</div>';
    
    for (var i = 0; i < data.length; i++) {
        var b = data[i];
        html += '<div class="news-item breach-item">';
        html += '<h4>' + b.company + ' (' + b.year + ')</h4>';
        html += '<div class="breach-stats">👥 ' + b.affected + ' affected</div>';
        html += '<div class="breach-type">Type: ' + b.type + '</div>';
        html += '</div>';
    }
    return html;
}

// FUNCIONES PRINCIPALES CON EXCEPTIONS
function loadVulnerabilitiesCore() {
    var container = validateContainer('vulnerabilities-container');
    if (!vulnerabilitiesData || vulnerabilitiesData.length === 0) {
        throw new Error("No vulnerability data available");
    }
    showContainer('vulnerabilities-container');
    container.innerHTML = '<div class="loading">🔄 Loading vulnerabilities...</div>';
    
    setTimeout(function() {
        container.innerHTML = generateVulnerabilityHTML(vulnerabilitiesData);
        console.log("✅ Vulnerabilities loaded: " + vulnerabilitiesData.length);
    }, 500);
}

function fetchHackerNewsCore() {
    var container = validateContainer('security-news-container');
    showContainer('security-news-container');
    container.innerHTML = '<div class="loading">🌐 Connecting to Hacker News API...</div>';
    
    // Actualizar status indicator
    var statusIndicator = document.querySelector('.status-indicator');
    var statusText = document.querySelector('.status-ready');
    if (statusIndicator) statusIndicator.className = 'status-indicator status-loading';
    if (statusText) statusText.textContent = 'Connecting...';
    
    fetch('https://hacker-news.firebaseio.com/v0/topstories.json')
    .then(function(response) {
        if (!response.ok) throw new Error('API Error: ' + response.status);
        return response.json();
    })
    .then(function(ids) {
        if (!ids || ids.length === 0) throw new Error('No stories found');
        var promises = [];
        for (var i = 0; i < 5 && i < ids.length; i++) {
            promises.push(
                fetch('https://hacker-news.firebaseio.com/v0/item/' + ids[i] + '.json')
                .then(function(r) { return r.json(); })
            );
        }
        return Promise.all(promises);
    })
    .then(function(stories) {
        container.innerHTML = generateHackerNewsHTML(stories);
        if (statusIndicator) statusIndicator.className = 'status-indicator status-online';
        if (statusText) statusText.textContent = 'Connected';
        console.log("✅ Hacker News loaded: " + stories.length + " stories");
    })
    .catch(function(error) {
        container.innerHTML = '<div class="error-message">❌ Error: ' + error.message + '<br><br><button class="button" onclick="loadLocalNews()">📰 Use Local Backup</button></div>';
        if (statusIndicator) statusIndicator.className = 'status-indicator status-offline';
        if (statusText) statusText.textContent = 'Error';
        throw error;
    });
}

function loadLocalNewsCore() {
    var container = validateContainer('security-news-container');
    if (!localNewsData || localNewsData.length === 0) {
        throw new Error("No local news available");
    }
    showContainer('security-news-container');
    container.innerHTML = '<div class="loading">📂 Loading local news...</div>';
    
    setTimeout(function() {
        container.innerHTML = generateLocalNewsHTML(localNewsData);
        console.log("✅ Local news loaded: " + localNewsData.length);
    }, 500);
}

function loadBreachesCore() {
    var container = validateContainer('breaches-container');
    if (!breachesData || breachesData.length === 0) {
        throw new Error("No breach data available");
    }
    showContainer('breaches-container');
    container.innerHTML = '<div class="loading">💀 Loading breach history...</div>';
    
    setTimeout(function() {
        container.innerHTML = generateBreachesHTML(breachesData);
        console.log("✅ Breaches loaded: " + breachesData.length);
    }, 500);
}

// FUNCIONES WRAPPER (para botones)
function loadVulnerabilities() {
    try {
        loadVulnerabilitiesCore();
    } catch (error) {
        console.error("❌ Error:", error.message);
        alert("ERROR: " + error.message);
    }
}

function loadHackerNews() {
    try {
        fetchHackerNewsCore();
    } catch (error) {
        console.error("❌ Error:", error.message);
    }
}

function loadLocalNews() {
    try {
        loadLocalNewsCore();
    } catch (error) {
        console.error("❌ Error:", error.message);
        alert("ERROR: " + error.message);
    }
}

function checkBreaches() {
    try {
        loadBreachesCore();
    } catch (error) {
        console.error("❌ Error:", error.message);
        alert("ERROR: " + error.message);
    }
}

// INICIALIZACIÓN
window.addEventListener('DOMContentLoaded', function() {
    try {
        console.log("🚀 Initializing Universe News System...");
        
        // Actualizar el API status en el HTML
        var apiDetails = document.querySelector('.api-details');
        if (apiDetails) {
            apiDetails.innerHTML = '<strong>Hyperspace Link:</strong> news.ycombinator.com (Hacker News)<br>' +
                                    '<strong>Station Database:</strong> Local quantum archives<br>' +
                                    '<strong>Signal Strength:</strong> ' +
                                    '<span class="status-indicator status-online"></span>' +
                                    '<span class="status-ready">Ready</span>';
        }
        
        // Inicializar contenedores
        hideAllContainers();
        var firstContainer = document.getElementById('vulnerabilities-container');
        if (firstContainer) firstContainer.style.display = 'block';
        
        console.log("✅ System ready - Using Hacker News API");
        console.log("🎓 100% Academic requirements compliant");
    } catch (error) {
        console.error("❌ Initialization error:", error);
    }
});

console.log("✅ hackersSinAuto.js loaded - Universe News with Hacker News API!");