// Operaciones específicas de matrices
let matrixSize = 3;

let A = [
            [0, 1, 0],
            [1, 0, 1],
            [0, 1, 0],
        ];

let B = [
            [0, 1, 1],
            [1, 0, 1],
            [1, 1, 0],
        ];

let activeMatrix = B; // Matriz activa para cálculos

let matrixA = [];
let matrixB = [];

// Inicializar matrices
function initializeMatrices() {
    createMatrix('matrix-a', matrixA, 'A');
    createMatrix('matrix-b', matrixB, 'B');
}
// Función para crear matriz editable
function createEditableMatrix(matrix, elementId, matrixNumber) {
    const container = document.getElementById(elementId);
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
                    
                    // Event listener para actualizar la matriz cuando se cambia el valor
            input.addEventListener('input', function(e) {
            const row = parseInt(this.dataset.row);
            const col = parseInt(this.dataset.col);
            const matrixNum = parseInt(this.dataset.matrix);
            let value = parseInt(this.value);
                   
                        // Asegurarse de que el valor sea un número válido
                if (isNaN(value)) {
                    value = 0;
                    this.value = "0";
                    }
                        
                    if (matrixNum === 1) {
                        adj1[row][col] = value;
                       } else {
                            adj2[row][col] = value;
                        }
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
        
        // Función para crear una matriz de tamaño n×n
        function createMatrix(n, fillValue = 0) {
            return Array(n).fill().map(() => Array(n).fill(fillValue));
        }
        
        // Función para imprimir matrices
        function printAdj(matrix) {
            let result = '';
            for (let z = 0; z < matrix.length; z++) {
                result += `Zeile ${z}: ${matrix[z].join(" ")}\n`;
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

        function calculateDistances(matrix) {
            const n = matrix.length;
            const allDistances = createMatrix(n, Infinity);
            
            // Ejecutar Dijkstra desde cada nodo
            for (let i = 0; i < n; i++) {
                allDistances[i] = dijkstraSimple(matrix, i);
            }
            
            return allDistances;
        }
            
        // Función Dijkstra simple - CORREGIDA
        function dijkstraSimple(matrix, start) {
            const n = matrix.length;
            const distances = new Array(n).fill(Infinity);
            const visited = new Array(n).fill(false);
            
            distances[start] = 0;
            
            for (let count = 0; count < n; count++) {
                let minDist = Infinity;
                let current = -1;
                
                // Encontrar el nodo no visitado con menor distancia
                for (let i = 0; i < n; i++) {
                    if (!visited[i] && distances[i] < minDist) {
                        minDist = distances[i];
                        current = i;
                    }
                }
                
                // Si no encontramos nodo, terminar
                if (current === -1) break;
                
                // Marcar como visitado
                visited[current] = true;
                
                // Actualizar distancias de los vecinos
                for (let neighbor = 0; neighbor < n; neighbor++) {
                    if (matrix[current][neighbor] > 0 && !visited[neighbor]) {
                        const newDist = distances[current] + 1; // Usa 1 porque es no ponderado
                        
                        if (newDist < distances[neighbor]) {
                            distances[neighbor] = newDist;
                        }
                    }
                }
            }
            
            return distances;
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
    