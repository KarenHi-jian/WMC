// news.js - Rebellion News (Hacker News API)

async function loadRebellionNews() {
    const output = document.getElementById('news-output');
    
    // Mostrar estado de carga
    output.innerHTML = `
        <div class="loading" style="text-align: center; padding: 40px;">
            <div style="font-size: 3em; margin-bottom: 20px;">📡</div>
            <p style="color: var(--primary-color); font-size: 1.2em;">
                Empfange Rebellion-Übertragungen...
            </p>
        </div>
    `;
    
    try {
        // Obtener las top stories de Hacker News
        const topStoriesResponse = await fetch('https://hacker-news.firebaseio.com/v0/topstories.json');
        const topStories = await topStoriesResponse.json();
        
        // Obtener las primeras 15 historias
        const storyPromises = topStories.slice(0, 15).map(async (id) => {
            const storyResponse = await fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json`);
            return storyResponse.json();
        });
        
        const stories = await Promise.all(storyPromises);
        
        // Generar HTML para las noticias
        let newsHTML = `
            <div class="news-header">
                <h3>📡 Rebellion News Network</h3>
                <p>Neueste technologische Nachrichten aus der Galaxie</p>
            </div>
            <div class="news-container">
        `;
        
        stories.forEach((story, index) => {
            const timeAgo = getTimeAgo(story.time);
            const domain = story.url ? new URL(story.url).hostname : 'news.ycombinator.com';
            
            newsHTML += `
                <div class="news-card">
                    <div class="news-card-header">
                        <h4>#${index + 1} - ${story.title}</h4>
                        <span class="news-score">${story.score} ⚡</span>
                    </div>
                    
                    <div class="news-info">
                        <span>🚀 ${story.by}</span>
                        <span>•</span>
                        <span>🕒 ${timeAgo}</span>
                        <span>•</span>
                        <span>💬 ${story.descendants || 0} Kommentare</span>
                        <span>•</span>
                        <span>🌐 ${domain}</span>
                    </div>
                    
                    <div class="news-actions">
                        ${story.url ? `
                            <a href="${story.url}" 
                               target="_blank" 
                               rel="noopener noreferrer"
                               class="news-link">
                                📖 Artikel lesen
                            </a>
                        ` : ''}
                        <a href="https://news.ycombinator.com/item?id=${story.id}" 
                           target="_blank" 
                           rel="noopener noreferrer"
                           class="news-link">
                            💬 Diskussion
                        </a>
                    </div>
                </div>
            `;
        });
        
        newsHTML += '</div>';
        output.innerHTML = newsHTML;
        
    } catch (error) {
        output.innerHTML = `
            <div class="error-box">
                <div style="font-size: 3em; margin-bottom: 20px;">🛸</div>
                <p style="font-size: 1.2em;">
                    Fehler beim Empfangen der Rebellion-Übertragungen
                </p>
                <p>${error.message}</p>
            </div>
        `;
    }
}

// Función auxiliar para calcular tiempo transcurrido
function getTimeAgo(timestamp) {
    const now = Date.now() / 1000;
    const diff = now - timestamp;
    
    if (diff < 3600) {
        const minutes = Math.floor(diff / 60);
        return `vor ${minutes} ${minutes === 1 ? 'Minute' : 'Minuten'}`;
    } else if (diff < 86400) {
        const hours = Math.floor(diff / 3600);
        return `vor ${hours} ${hours === 1 ? 'Stunde' : 'Stunden'}`;
    } else {
        const days = Math.floor(diff / 86400);
        return `vor ${days} ${days === 1 ? 'Tag' : 'Tagen'}`;
    }
}

// Función para actualizar noticias automáticamente
function startNewsRefresh() {
    // Actualizar cada 5 minutos
    setInterval(() => {
        const newsSection = document.getElementById('news-section');
        if (newsSection && newsSection.style.display !== 'none') {
            loadRebellionNews();
        }
    }, 300000); // 300000 ms = 5 minutos
}

// Event listener para el botón de refresh
document.addEventListener('DOMContentLoaded', function() {
    const refreshBtn = document.getElementById('refresh-news');
    if (refreshBtn) {
        refreshBtn.addEventListener('click', loadRebellionNews);
    }
});