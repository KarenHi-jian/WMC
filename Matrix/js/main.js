// main.js - Actualizado con navegación para Rebellion News

// Variables globales
let A = createMatrix(3, 0);
let B = createMatrix(3, 0);
let activeMatrix = B;

// Función para crear matrices
function createMatrix(size, value) {
    const matrix = [];
    for (let i = 0; i < size; i++) {
        matrix[i] = [];
        for (let j = 0; j < size; j++) {
            matrix[i][j] = value;
        }
    }
    return matrix;
}

// Función para inicializar las matrices
function initializeMatrices() {
    createEditableMatrix(A, 'A-matrix', 1);
    createEditableMatrix(B, 'B-matrix', 2);
}

// Función para inicializar la navegación
function initNavigation() {
    const allSections = {
        'matrix': document.getElementById('matrix-section'),
        'nasa': document.getElementById('nasa-section'),
        'jedi': document.getElementById('jedi-section'),
        'weather': document.getElementById('weather-section'),
        'news': document.getElementById('news-section')  // Nueva sección
    };

    const allTabs = {
        'matrix': document.getElementById('matrix-tab'),
        'nasa': document.getElementById('nasa-tab'),
        'jedi': document.getElementById('jedi-tab'),
        'weather': document.getElementById('weather-tab'),
        'news': document.getElementById('news-tab')  // Nuevo tab
    };

    // Función para cambiar secciones
    function showSection(sectionName) {
        // Ocultar todas las secciones
        Object.values(allSections).forEach(section => {
            if (section) section.style.display = 'none';
        });
        
        // Desactivar todos los tabs
        Object.values(allTabs).forEach(tab => {
            if (tab) tab.classList.remove('active');
        });
        
        // Mostrar la sección seleccionada
        if (allSections[sectionName]) {
            allSections[sectionName].style.display = 'block';
        }
        if (allTabs[sectionName]) {
            allTabs[sectionName].classList.add('active');
        }
        
        // Cargar contenido específico si es necesario
        if (sectionName === 'news' && typeof loadRebellionNews === 'function') {
            loadRebellionNews();
        }
    }

    // Event listeners para todos los tabs
    Object.keys(allTabs).forEach(key => {
        if (allTabs[key]) {
            allTabs[key].addEventListener('click', () => showSection(key));
        }
    });
}

// Inicialización principal
window.onload = function() {
    // Inicializar matrices
    initializeMatrices();
   
    // Inicializar navegación
    initNavigation();
   
    // Event listeners para botones de matrices
    document.getElementById('resize-btn').addEventListener('click', function() {
        const sizeInput = document.getElementById('matrix-size');
        let size = parseInt(sizeInput.value);
       
        if (isNaN(size) || size < 2) {
            size = 2;
            sizeInput.value = "2";
        } else if (size > 10) {
            size = 10;
            sizeInput.value = "10";
        }
       
        A = createMatrix(size, 0);
        B = createMatrix(size, 0);
        activeMatrix = B;
       
        createEditableMatrix(A, 'A-matrix', 1);
        createEditableMatrix(B, 'B-matrix', 2);
       
        document.getElementById('output').textContent = `Matrix-Größe auf ${size}×${size} geändert.`;
    });
   
    document.getElementById('matrix-size').addEventListener('focus', function() {
        this.select();
    });
   
    document.getElementById('use-matrix1-btn').addEventListener('click', function() {
        activeMatrix = A;
        document.getElementById('output').textContent = 'Matrix 1 für Berechnungen ausgewählt.';
    });
   
    document.getElementById('use-matrix2-btn').addEventListener('click', function() {
        activeMatrix = B;
        document.getElementById('output').textContent = 'Matrix 2 für Berechnungen ausgewählt.';
    });
    
    document.getElementById('calculate-btn').addEventListener('click', function() {
        const outputDiv = document.getElementById('output');
       
        try {
            const squared = multiply(activeMatrix, activeMatrix);
            const cubed = multiply(squared, activeMatrix);
            const distances = calculateDistances(activeMatrix);
            const eccentricity = calculateEccentricity(distances);
            const radius = calculateRadius(eccentricity);
           
            let results = `>>> MATRIX VOYAGER INITIALISIERT <<<\n\n`;
            results += `Adjazenzmatrix:\n${printAdj(activeMatrix)}\n`;
            results += `\nQuadrat (Hyperraumsprung 2):\n${printAdj(squared)}\n`;
            results += `\nKubik (Hyperraumsprung 3):\n${printAdj(cubed)}\n`;
            results += `\nDistanzmatrix (Rebellenrouten):\n${printAdj(distances)}\n`;
            results += `\nExzentrizität (Machtbalance):\n${eccentricity}\n`;
            results += `\nRadius des Graphen (Galaktischer Kern): ${radius}\n`;
            results += `\n>>> CODEX PRIME ÜBERTRAGUNG BEENDET <<<`;
           
            outputDiv.textContent = results;
        } catch (error) {
            outputDiv.textContent = `Berechnungsfehler: ${error.message}`;
        }
    });
   
    document.getElementById('clear-btn').addEventListener('click', function() {
        document.getElementById('output').textContent = 'MATRIX VOYAGER wartet auf Befehle...';
    });
};