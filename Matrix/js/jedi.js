// Frases de Jedi
const jediQuotes = [
    { text: "Tue es oder tue es nicht. Es gibt kein Versuchen.", author: "Yoda" },
    { text: "Die Furcht ist der Pfad zur dunklen Seite.", author: "Yoda" },
    { text: "In meiner Erfahrung gibt es keinen Zufall.", author: "Obi-Wan Kenobi" },
    { text: "Möge die Macht mit dir sein!", author: "Obi-Wan Kenobi" },
    { text: "Deine Augen können dich täuschen, traue ihnen nicht.", author: "Obi-Wan Kenobi" },
    // ... más frases
];

const jediChallenges = [
    "Meditiere heute 10 Minuten in völliger Stille, spüre die Macht um dich herum.",
    "Hilf heute jemandem selbstlos, ohne eine Gegenleistung zu erwarten.",
    // ... más desafíos
];

function getJediWisdom() {
    const output = document.getElementById('jedi-output');
    const randomQuote = jediQuotes[Math.floor(Math.random() * jediQuotes.length)];
    
    output.style.opacity = '0';
    
    setTimeout(() => {
        output.innerHTML = `
            <div style="text-align: center;">
                <div style="color: #90EE90; font-size: 1.8em; font-style: italic; 
                    margin-bottom: 20px; line-height: 1.4; padding: 0 20px;">
                    "${randomQuote.text}"
                </div>
                <div style="color: var(--accent-color); font-size: 1.1em;">
                    - ${randomQuote.author}
                </div>
            </div>
        `;
        output.style.opacity = '1';
    }, 300);
}

function getJediChallenge() {
    const challengeOutput = document.getElementById('jedi-challenge');
    const randomChallenge = jediChallenges[Math.floor(Math.random() * jediChallenges.length)];
    
    challengeOutput.style.opacity = '0';
    
    setTimeout(() => {
        challengeOutput.innerHTML = `
            <div style="text-align: center;">
                <div style="color: #FFD700; font-size: 1.3em; margin-bottom: 10px;">
                    🌟 Heutige Jedi-Herausforderung 🌟
                </div>
                <div style="color: white; font-size: 1.1em; line-height: 1.5; 
                    background-color: rgba(255, 215, 0, 0.1); 
                    padding: 20px; border-radius: 10px; 
                    border: 2px solid rgba(255, 215, 0, 0.3);">
                    ${randomChallenge}
                </div>
            </div>
        `;
        challengeOutput.style.opacity = '1';
    }, 300);
}





    