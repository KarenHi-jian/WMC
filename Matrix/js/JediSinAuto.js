// ===== JEDI SECTION - SIN FUNCIONES AUTOMÁTICAS =====

// ===== SISTEMA DE PESTAÑAS JEDI =====
function switchJediTab(tabName) {
  // Remover clase active de todas las pestañas
  const allTabs = document.querySelectorAll('.jedi-tab-button');
  const allPanels = document.querySelectorAll('.jedi-content-panel');
  
  allTabs.forEach(tab => tab.classList.remove('active'));
  allPanels.forEach(panel => panel.classList.remove('active'));
  
  // Activar la pestaña y panel seleccionados
  if (tabName === 'wisdom') {
    document.getElementById('wisdom-tab').classList.add('active');
    document.getElementById('jedi-wisdom-panel').classList.add('active');
  } else if (tabName === 'challenge') {
    document.getElementById('challenge-tab').classList.add('active');
    document.getElementById('jedi-challenge-panel').classList.add('active');
  }
}

// ===== DATOS JEDI =====

// Array de sabiduría Jedi
const jediWisdom = [
  {
    quote: "Möge die Macht mit dir sein!",
    author: "Obi-Wan Kenobi"
  },
  {
    quote: "Tu es oder tu es nicht. Es gibt kein Versuchen.",
    author: "Yoda"
  },
  {
    quote: "Die Furcht ist der Pfad zur dunklen Seite.",
    author: "Yoda"
  },
  {
    quote: "Ein Jedi nutzt die Macht zum Wissen und zur Verteidigung, niemals für Angriffe.",
    author: "Yoda"
  },
  {
    quote: "Größe macht einen nicht zum Jedi.",
    author: "Yoda"
  },
  {
    quote: "Die Macht wird stark in dir sein.",
    author: "Yoda"
  },
  {
    quote: "Geduld du haben musst, mein junger Padawan.",
    author: "Yoda"
  },
  {
    quote: "Im Dunkeln sind wir alle gleich.",
    author: "Jedi-Weisheit"
  },
  {
    quote: "Ein wahrer Jedi kämpft nur als letzten Ausweg.",
    author: "Obi-Wan Kenobi"
  },
  {
    quote: "Vertraue deinen Gefühlen.",
    author: "Obi-Wan Kenobi"
  }
];

// Array de desafíos Jedi
const jediChallenges = [
  "🧘‍♂️ Meditiere 10 Minuten in Stille und finde inneren Frieden.",
  "🤝 Hilf heute jemandem, ohne eine Gegenleistung zu erwarten.",
  "📚 Lerne etwas Neues über eine Kultur, die dir fremd ist.",
  "🌱 Pflanze einen Samen oder kümmere dich um eine Pflanze.",
  "💪 Überwinde heute eine Angst, auch wenn sie klein ist.",
  "🎯 Setze dir ein klares Ziel für die nächste Woche.",
  "🙏 Vergib jemandem, dem du böse warst.",
  "🌟 Teile dein Wissen mit jemandem, der es brauchen kann.",
  "🎨 Erschaffe etwas Schönes mit deinen Händen.",
  "🌍 Tu heute etwas Gutes für die Umwelt.",
  "📖 Lies ein Kapitel eines Buches, das dich inspiriert.",
  "🧠 Löse ein komplexes Problem mit Geduld und Kreativität.",
  "💝 Überrasche jemanden mit einer unerwarteten Freundlichkeit.",
  "🌅 Stehe früh auf und beobachte den Sonnenaufgang.",
  "🎵 Höre Musik, die deine Seele berührt und denke über das Leben nach."
];

// ===== FUNCIONES PRINCIPALES =====

// Función para obtener sabiduría Jedi - SOLO al hacer clic
function getJediWisdom() {
  const randomWisdom = jediWisdom[Math.floor(Math.random() * jediWisdom.length)];
  const outputDiv = document.getElementById('jedi-output');
  
  // Cambiar contenido sin efectos automáticos
  outputDiv.innerHTML = `
    <div style="text-align: center;">
      <div style="color: #90EE90; font-size: 1.8em; font-style: italic; margin-bottom: 20px;">
        "${randomWisdom.quote}"
      </div>
      <div style="color: var(--accent-color); font-size: 1.1em;">
        - ${randomWisdom.author}
      </div>
    </div>
  `;
}

// Función para obtener desafío Jedi - SOLO al hacer clic
function getJediChallenge() {
  const randomChallenge = jediChallenges[Math.floor(Math.random() * jediChallenges.length)];
  const challengeDiv = document.getElementById('jedi-challenge');
  
  // Cambiar contenido sin efectos automáticos
  challengeDiv.innerHTML = `
    <div style="text-align: center;">
      <h4 style="color: #FFA500; margin-bottom: 15px;">🎯 Deine heutige Jedi-Herausforderung:</h4>
      <p style="font-size: 1.2em; line-height: 1.6; margin: 0;">${randomChallenge}</p>
      <div style="margin-top: 20px; font-size: 0.9em; color: #FFD700;">
        ✨ Möge die Macht dich bei dieser Aufgabe leiten!
      </div>
    </div>
  `;
}