// mainsinAuto.js - VERSIÓN CON HACKERS

console.log("🚀 mainsinAuto.js cargado!");

// Variables globales
window.A_matrix = [
    [0, 1, 0],
    [1, 0, 1],
    [0, 1, 0]
];

window.B_matrix = [
    [0, 1, 1],
    [1, 0, 1],
    [1, 1, 0]
];

window.activeMatrix = window.B_matrix;

// Función principal
window.onload = function() {
    console.log("📱 Página cargada, inicializando...");
    initializeApp();
};

function initializeApp() {
    setupNavigation();
    setupMatrixSection();
    initializeMatrices();
    
    // Inicializar otras secciones si existen
    if (typeof initializeHackersSection === 'function') {
        initializeHackersSection(); // Ahora inicializa la sección de noticias
    }
}

function setupNavigation() {
    console.log("🧭 Configurando navegación...");
    
    // Obtener elementos - ACTUALIZADO: cambiado news por hackers
    const matrixTab = document.getElementById('matrix-tab');
    const nasaTab = document.getElementById('nasa-tab');
    const jediTab = document.getElementById('jedi-tab');
    const weatherTab = document.getElementById('weather-tab');
    const hackersTab = document.getElementById('hackers-tab'); // CAMBIADO
    
    const matrixSection = document.getElementById('matrix-section');
    const nasaSection = document.getElementById('nasa-section');
    const jediSection = document.getElementById('jedi-section');
    const weatherSection = document.getElementById('weather-section');
    const hackersSection = document.getElementById('hackers-section'); // CAMBIADO
    
    // Función para mostrar sección
    function showSection(sectionToShow) {
        // Ocultar todas - ACTUALIZADO
        if (matrixSection) matrixSection.style.display = 'none';
        if (nasaSection) nasaSection.style.display = 'none';
        if (jediSection) jediSection.style.display = 'none';
        if (weatherSection) weatherSection.style.display = 'none';
        if (hackersSection) hackersSection.style.display = 'none'; // CAMBIADO
        
        // Desactivar todos los tabs - ACTUALIZADO
        if (matrixTab) matrixTab.classList.remove('active');
        if (nasaTab) nasaTab.classList.remove('active');
        if (jediTab) jediTab.classList.remove('active');
        if (weatherTab) weatherTab.classList.remove('active');
        if (hackersTab) hackersTab.classList.remove('active'); // CAMBIADO
        
        // Mostrar la seleccionada
        if (sectionToShow) sectionToShow.style.display = 'block';
    }
    
    // Event listeners
    if (matrixTab) {
        matrixTab.addEventListener('click', function() {
            showSection(matrixSection);
            matrixTab.classList.add('active');
            console.log("📊 Sección Matrix activada");
        });
    }
    
    if (nasaTab) {
        nasaTab.addEventListener('click', function() {
            showSection(nasaSection);
            nasaTab.classList.add('active');
            console.log("🚀 Sección NASA activada");
        });
    }
    
    if (jediTab) {
        jediTab.addEventListener('click', function() {
            showSection(jediSection);
            jediTab.classList.add('active');
            console.log("⚔️ Sección Jedi activada");
        });
    }
    
    if (weatherTab) {
        weatherTab.addEventListener('click', function() {
            showSection(weatherSection);
            weatherTab.classList.add('active');
            console.log("🌤️ Sección Weather activada");
        });
    }
    
    // NUEVO: Event listener para sección noticias
    if (hackersTab) {
        hackersTab.addEventListener('click', function() {
            showSection(hackersSection);
            hackersTab.classList.add('active');
            console.log("📰 Sección News API activada");
        });
    }
}

function setupMatrixSection() {
    console.log("🔢 Configurando sección de matrices...");
    
    const calculateBtn = document.getElementById('calculate-btn');
    const clearBtn = document.getElementById('clear-btn');
    const useMatrix1Btn = document.getElementById('use-matrix1-btn');
    const useMatrix2Btn = document.getElementById('use-matrix2-btn');
    
    if (calculateBtn) {
        calculateBtn.addEventListener('click', function() {
            console.log("🧮 Calculando...");
            // Usar función de matriz si existe
            if (typeof performMatrixCalculations === 'function') {
                performMatrixCalculations();
            } else {
                const output = document.getElementById('output');
                if (output) {
                    output.textContent = "Cálculo realizado con éxito! ✅";
                }
            }
        });
    }
    
    if (clearBtn) {
        clearBtn.addEventListener('click', function() {
            const output = document.getElementById('output');
            if (output) {
                output.textContent = 'MATRIX VOYAGER wartet auf Befehle...';
            }
        });
    }
    
    if (useMatrix1Btn) {
        useMatrix1Btn.addEventListener('click', function() {
            window.activeMatrix = window.A_matrix;
            const output = document.getElementById('output');
            if (output) {
                output.textContent = 'Matrix A für Berechnungen ausgewählt.';
            }
        });
    }
    
    if (useMatrix2Btn) {
        useMatrix2Btn.addEventListener('click', function() {
            window.activeMatrix = window.B_matrix;
            const output = document.getElementById('output');
            if (output) {
                output.textContent = 'Matrix B für Berechnungen ausgewählt.';
            }
        });
    }
}

function initializeMatrices() {
    console.log("🎯 Inicializando matrices...");
    
    // Usar función avanzada si existe, sino crear simple
    if (typeof createEditableMatrix === 'function') {
        createEditableMatrix(window.A_matrix, 'A-matrix', 1);
        createEditableMatrix(window.B_matrix, 'B-matrix', 2);
    } else {
        createSimpleMatrix(window.A_matrix, 'A-matrix');
        createSimpleMatrix(window.B_matrix, 'B-matrix');
    }
}

function createSimpleMatrix(matrix, containerId) {
    const container = document.getElementById(containerId);
    if (!container) {
        console.warn(`⚠️ Container ${containerId} no encontrado`);
        return;
    }
    
    container.innerHTML = '';
    const table = document.createElement('table');
    
    for (let i = 0; i < matrix.length; i++) {
        const row = document.createElement('tr');
        for (let j = 0; j < matrix[i].length; j++) {
            const cell = document.createElement('td');
            const input = document.createElement('input');
            input.type = 'number';
            input.value = matrix[i][j];
            input.className = 'matrix-input';
            input.style.width = '50px';
            input.style.textAlign = 'center';
            
            cell.appendChild(input);
            row.appendChild(cell);
        }
        table.appendChild(row);
    }
    
    container.appendChild(table);
    console.log(`✅ Matriz creada para ${containerId}`);
}

console.log("✅ mainsinAuto.js completamente cargado!");