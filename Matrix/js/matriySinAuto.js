// matriySinAuto.js - Operaciones de matrices SIN AUTOMATIC FUNCTIONS

// Función para crear una matriz de tamaño n×n
function createMatrix(n, fillValue) {
    if (fillValue === undefined) {
        fillValue = 0;
    }
    
    const matrix = [];
    for (let i = 0; i < n; i++) {
        const row = [];
        for (let j = 0; j < n; j++) {
            row.push(fillValue);
        }
        matrix.push(row);
    }
    return matrix;
}

// Función para crear matriz editable en el DOM
function createEditableMatrix(matrix, elementId, matrixNumber) {
    const container = document.getElementById(elementId);
    if (!container) return;
    
    container.innerHTML = '';
    
    const table = document.createElement('table');
    
    for (let i = 0; i < matrix.length; i++) {
        const row = document.createElement('tr');
        
        for (let j = 0; j < matrix[i].length; j++) {
            const cell = document.createElement('td');
            const input = document.createElement('input');
            input.type = 'number';
            input.min = '0';
            input.className = 'matrix-input';
            input.value = matrix[i][j];
            input.dataset.row = i;
            input.dataset.col = j;
            input.dataset.matrix = matrixNumber;
            
            // Event listener para actualizar la matriz
            input.addEventListener('input', function(e) {
                updateMatrixValue(this);
            });
            
            // Seleccionar todo el texto al hacer clic
            input.addEventListener('focus', function() {
                this.select();
            });
            
            cell.appendChild(input);
            row.appendChild(cell);
        }
        
        table.appendChild(row);
    }
    
    container.appendChild(table);
}

// Función para actualizar valores de matriz
function updateMatrixValue(input) {
    const row = parseInt(input.dataset.row);
    const col = parseInt(input.dataset.col);
    const matrixNum = parseInt(input.dataset.matrix);
    let value = parseInt(input.value);
    
    if (isNaN(value)) {
        value = 0;
        input.value = "0";
    }
    
    if (matrixNum === 1) {
        if (window.A_matrix) {
            window.A_matrix[row][col] = value;
        }
    } else {
        if (window.B_matrix) {
            window.B_matrix[row][col] = value;
        }
    }
}

// Función para imprimir matrices
function printAdj(matrix) {
    let result = '';
    for (let z = 0; z < matrix.length; z++) {
        result += `Zeile ${z}: `;
        for (let i = 0; i < matrix[z].length; i++) {
            result += matrix[z][i];
            if (i < matrix[z].length - 1) {
                result += " ";
            }
        }
        result += "\n";
    }
    return result;
}

// Función de multiplicación de matrices
function multiply(m_A, m_B) {
    const n = m_A.length;
    const rv = createMatrix(n, 0);
    
    for (let z = 0; z < n; z++) {
        for (let s = 0; s < n; s++) {
            let wert = 0;
            for (let i = 0; i < n; i++) {
                wert += m_A[z][i] * m_B[i][s];
            }
            rv[z][s] = wert;
        }
    }
    
    return rv;
}

// Algoritmo de Dijkstra simple
function dijkstraSimple(matrix, start) {
    const n = matrix.length;
    const distances = [];
    const visited = [];
    
    for (let i = 0; i < n; i++) {
        distances.push(Infinity);
        visited.push(false);
    }
    
    distances[start] = 0;
    
    for (let count = 0; count < n; count++) {
        let minDist = Infinity;
        let current = -1;
        
        for (let i = 0; i < n; i++) {
            if (!visited[i] && distances[i] < minDist) {
                minDist = distances[i];
                current = i;
            }
        }
        
        if (current === -1) break;
        
        visited[current] = true;
        
        for (let neighbor = 0; neighbor < n; neighbor++) {
            if (matrix[current][neighbor] > 0 && !visited[neighbor]) {
                const newDist = distances[current] + 1;
                
                if (newDist < distances[neighbor]) {
                    distances[neighbor] = newDist;
                }
            }
        }
    }
    
    return distances;
}

// Función para calcular todas las distancias
function calculateDistances(matrix) {
    const n = matrix.length;
    const allDistances = createMatrix(n, Infinity);
    
    for (let i = 0; i < n; i++) {
        allDistances[i] = dijkstraSimple(matrix, i);
    }
    
    return allDistances;
}

// Función para calcular excentricidad
function calculateEccentricity(distances) {
    const n = distances.length;
    const eccentricity = [];
    
    for (let i = 0; i < n; i++) {
        let maxDist = 0;
        for (let j = 0; j < n; j++) {
            if (distances[i][j] !== Infinity && distances[i][j] > maxDist) {
                maxDist = distances[i][j];
            }
        }
        eccentricity.push(maxDist);
    }
    
    return eccentricity;
}

// Función para calcular el radio
function calculateRadius(eccentricity) {
    let minEccentricity = Infinity;
    
    for (let i = 0; i < eccentricity.length; i++) {
        if (eccentricity[i] > 0 && eccentricity[i] < minEccentricity) {
            minEccentricity = eccentricity[i];
        }
    }
    
    return minEccentricity === Infinity ? 0 : minEccentricity;
}

// Función principal para realizar todos los cálculos
function performMatrixCalculations() {
    const outputDiv = document.getElementById('output');
    
    try {
        const matrix = window.activeMatrix;
        if (!matrix) {
            outputDiv.textContent = 'Fehler: Keine aktive Matrix ausgewählt.';
            return;
        }
        
        const squared = multiply(matrix, matrix);
        const cubed = multiply(squared, matrix);
        const distances = calculateDistances(matrix);
        const eccentricity = calculateEccentricity(distances);
        const radius = calculateRadius(eccentricity);
        
        let results = `>>> MATRIX VOYAGER INITIALISIERT <<<\n\n`;
        results += `Adjazenzmatrix:\n${printAdj(matrix)}\n`;
        results += `\nQuadrat (Hyperraumsprung 2):\n${printAdj(squared)}\n`;
        results += `\nKubik (Hyperraumsprung 3):\n${printAdj(cubed)}\n`;
        results += `\nDistanzmatrix (Rebellenrouten):\n${printAdj(distances)}\n`;
        results += `\nExzentrizität (Machtbalance):\n`;
        
        for (let i = 0; i < eccentricity.length; i++) {
            results += eccentricity[i];
            if (i < eccentricity.length - 1) {
                results += ", ";
            }
        }
        results += `\n`;
        results += `\nRadius des Graphen (Galaktischer Kern): ${radius}\n`;
        results += `\n>>> CODEX PRIME ÜBERTRAGUNG BEENDET <<<`;
        
        outputDiv.textContent = results;
    } catch (error) {
        outputDiv.textContent = `Berechnungsfehler: ${error.message}`;
    }
}