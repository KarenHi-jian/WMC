// ARCHIVO COMPLETO matriySinAuto.js - ESTILO ACADÉMICO

// VARIABLES GLOBALES
let matrix_1, matrix_2, output, matrixSizeInput;

// INICIALIZACIÓN MEJORADA
document.addEventListener('DOMContentLoaded', function() {
    console.log("DOM cargado, inicializando variables...");
    
    matrix_1 = document.getElementById('matrix_1');
    matrix_2 = document.getElementById('matrix_2');
    output = document.getElementById('output');
    matrixSizeInput = document.getElementById('matrix-size');
    
    // Verificar que los elementos existan
    if (matrix_1) {
        console.log("✅ matrix_1 encontrado");
    } else {
        console.log("❌ matrix_1 NO encontrado");
    }
    
    if (matrix_2) {
        console.log("✅ matrix_2 encontrado");
    } else {
        console.log("❌ matrix_2 NO encontrado");
    }
    
    if (output) {
        console.log("✅ output encontrado");
    } else {
        console.log("❌ output NO encontrado");
    }
    
    if (matrixSizeInput) {
        console.log("✅ matrix-size input encontrado");
    } else {
        console.log("❌ matrix-size input NO encontrado");
    }
    
    console.log("Inicialización completa");
});

// FUNCIONES PARA GENERAR MATRICES DINÁMICAS
function getMatrixSize() {
    if (matrixSizeInput && matrixSizeInput.value) {
        const size = parseInt(matrixSizeInput.value);
        if (size >= 2 && size <= 10) {
            return size;
        }
    }
    return 3; // Valor por defecto
}

function generateRandomMatrix(size) {
    const matrix = createMatrix(size, size);
    
    // Generar matriz aleatoria con probabilidad de conexión del 40%
    for (let i = 0; i < size; i++) {
        for (let j = 0; j < size; j++) {
            if (i !== j && Math.random() < 0.4) {
                matrix[i][j] = 1;
            }
        }
    }
    
    return matrix;
}

function generateCircularMatrix(size) {
    const matrix = createMatrix(size, size);
    
    // Crear un grafo circular donde cada nodo se conecta al siguiente
    for (let i = 0; i < size; i++) {
        const next = (i + 1) % size;
        matrix[i][next] = 1;
        matrix[next][i] = 1; // Hacer simétrico
        
        // Agregar algunas conexiones adicionales para hacer más interesante
        if (size > 4) {
            const skip = (i + 2) % size;
            if (Math.random() < 0.5) {
                matrix[i][skip] = 1;
                matrix[skip][i] = 1;
            }
        }
    }
    
    return matrix;
}

function generateBipartiteMatrix(size) {
    const matrix = createMatrix(size, size);
    
    // Crear patrón bipartito donde nodos pares se conectan a impares
    for (let i = 0; i < size; i++) {
        for (let j = 0; j < size; j++) {
            if (i !== j) {
                // Conectar si uno es par y el otro impar
                if ((i % 2 === 0 && j % 2 === 1) || (i % 2 === 1 && j % 2 === 0)) {
                    matrix[i][j] = 1;
                }
            }
        }
    }
    
    return matrix;
}

function matrixToString(matrix) {
    let result = "[";
    for (let i = 0; i < matrix.length; i++) {
        if (i > 0) result += ",";
        result += "[";
        for (let j = 0; j < matrix[i].length; j++) {
            if (j > 0) result += ",";
            result += matrix[i][j].toString();
        }
        result += "]";
    }
    result += "]";
    return result;
}
function createMatrix(rows, cols, defaultValue = 0) {
    const matrix = [];
    for (let i = 0; i < rows; i++) {
        matrix[i] = [];
        for (let j = 0; j < cols; j++) {
            matrix[i][j] = defaultValue;
        }
    }
    return matrix;
}

function showToast(config) {
    const toastElement = document.getElementById('liveToast');
    const toastBody = document.getElementById('toast_body');
    
    if (toastBody) {
        toastBody.textContent = config.msg;
        toastBody.style.color = config.error ? '#dc3545' : '#198754';
    }
    
    if (toastElement && window.bootstrap) {
        const toast = new bootstrap.Toast(toastElement);
        toast.show();
    } else {
        console.log(config.msg);
    }
}

function printAdj(matrix) {
    let result = "";
    for (let i = 0; i < matrix.length; i++) {
        for (let j = 0; j < matrix[i].length; j++) {
            result += matrix[i][j].toString().padStart(3);
        }
        result += "\n";
    }
    return result;
}

// FUNCIONES DE LIMPIEZA Y VALIDACIÓN
function clearMatrix1() {
    if (matrix_1) {
        matrix_1.value = '';
        showToast({ msg: "Matrix 1 gelöscht!", error: false });
    }
}

function clearMatrix2() {
    if (matrix_2) {
        matrix_2.value = '';
        showToast({ msg: "Matrix 2 gelöscht!", error: false });
    }
}

function clearOutput() {
    if (output) {
        output.textContent = '🌌 MATRIX VOYAGER - Quantensystem bereit für Befehle...';
        showToast({ msg: "Terminal gelöscht!", error: false });
    }
}

function validateMatrix1() {
    validateMatrix(matrix_1, "Matrix 1");
}

function validateMatrix2() {
    validateMatrix(matrix_2, "Matrix 2");
}

function validateMatrix(matrixElement, matrixName) {
    if (!matrixElement || !matrixElement.value) {
        showToast({ msg: `${matrixName} ist leer!`, error: true });
        return false;
    }
    
    try {
        const matrix = JSON.parse(matrixElement.value);
        
        if (!Array.isArray(matrix)) {
            showToast({ msg: `${matrixName} ist kein Array!`, error: true });
            return false;
        }
        
        const n = matrix.length;
        for (let i = 0; i < n; i++) {
            if (!Array.isArray(matrix[i]) || matrix[i].length !== n) {
                showToast({ msg: `${matrixName} ist nicht quadratisch!`, error: true });
                return false;
            }
        }
        
        showToast({ msg: `${matrixName} ist gültig! ✅`, error: false });
        return true;
    } catch (error) {
        showToast({ msg: `${matrixName} JSON Fehler: ${error.message}`, error: true });
        return false;
    }
}

// FUNCIONES DE CARGA DE EJEMPLOS DINÁMICAS
function loadExampleMatrices() {
    try {
        const size = getMatrixSize();
        console.log(`Generando matrices de ejemplo de tamaño ${size}x${size}`);
        
        const matrix1 = generateCircularMatrix(size);
        const matrix2 = generateBipartiteMatrix(size);
        
        if (matrix_1) {
            matrix_1.value = matrixToString(matrix1);
            console.log("Matrix 1 cargada con Example");
        } else {
            console.log("ERROR: matrix_1 no encontrado en loadExampleMatrices");
        }
        
        if (matrix_2) {
            matrix_2.value = matrixToString(matrix2);
            console.log("Matrix 2 cargada con Example");
        } else {
            console.log("ERROR: matrix_2 no encontrado en loadExampleMatrices");
        }
        
        showToast({ msg: `Beispiel-Matrizen ${size}x${size} geladen! 📝`, error: false });
        console.log("Example Matrices loaded successfully!");
        
    } catch (error) {
        console.log("ERROR en loadExampleMatrices:", error.message);
        showToast({ msg: "Error al cargar ejemplos: " + error.message, error: true });
    }
}

function loadGraphExamples() {
    try {
        const size = getMatrixSize();
        console.log(`Generando graph prototypes de tamaño ${size}x${size}`);
        
        const matrix1 = generateRandomMatrix(size);
        const matrix2 = generateRandomMatrix(size);
        
        // Asegurar que las matrices estén conectadas agregando un ciclo básico
        for (let i = 0; i < size; i++) {
            const next = (i + 1) % size;
            matrix1[i][next] = 1;
            matrix1[next][i] = 1;
            matrix2[i][next] = 1;
            matrix2[next][i] = 1;
        }
        
        if (matrix_1) {
            matrix_1.value = matrixToString(matrix1);
            console.log("Matrix 1 cargada con Graph Prototype");
        } else {
            console.log("ERROR: matrix_1 no encontrado");
        }
        
        if (matrix_2) {
            matrix_2.value = matrixToString(matrix2);
            console.log("Matrix 2 cargada con Graph Prototype");
        } else {
            console.log("ERROR: matrix_2 no encontrado");
        }
        
        showToast({ msg: `Graph-Prototypen ${size}x${size} geladen! 🌐`, error: false });
        console.log("Graph Examples loaded successfully!");
        
    } catch (error) {
        console.log("ERROR en loadGraphExamples:", error.message);
        showToast({ msg: "Error al cargar Graph Prototypen: " + error.message, error: true });
    }
}

function loadHyperraumDemo() {
    try {
        const size = getMatrixSize();
        console.log(`Generando hyperraum demo de tamaño ${size}x${size}`);
        
        // Crear matrices más densas para el demo hyperraum
        const matrix1 = createMatrix(size, size);
        const matrix2 = createMatrix(size, size);
        
        // Patrón denso para matrix1
        for (let i = 0; i < size; i++) {
            for (let j = 0; j < size; j++) {
                if (i !== j && Math.random() < 0.6) {
                    matrix1[i][j] = 1;
                }
            }
        }
        
        // Patrón de estrella para matrix2
        const center = Math.floor(size / 2);
        for (let i = 0; i < size; i++) {
            if (i !== center) {
                matrix2[center][i] = 1;
                matrix2[i][center] = 1;
            }
        }
        
        if (matrix_1) matrix_1.value = matrixToString(matrix1);
        if (matrix_2) matrix_2.value = matrixToString(matrix2);
        
        showToast({ msg: `Hyperraum-Demo ${size}x${size} geladen! 🚀`, error: false });
        
    } catch (error) {
        console.log("ERROR en loadHyperraumDemo:", error.message);
        showToast({ msg: "Error al cargar Hyperraum Demo: " + error.message, error: true });
    }
}

// FUNCIONES DE MULTIPLICACIÓN Y POTENCIA
function multiplyMatrices(matrixA, matrixB) {
    const n = matrixA.length;
    const result = createMatrix(n, n);
    
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < n; j++) {
            for (let k = 0; k < n; k++) {
                result[i][j] += matrixA[i][k] * matrixB[k][j];
            }
        }
    }
    
    return result;
}

function powerMatrix(matrix, power) {
    if (power === 1) return matrix;
    
    let result = matrix;
    for (let p = 2; p <= power; p++) {
        result = multiplyMatrices(result, matrix);
    }
    
    return result;
}

function calculateMatrix() {
    if (!validateMatrix(matrix_1, "Matrix 1") || !validateMatrix(matrix_2, "Matrix 2")) {
        return;
    }
    
    try {
        const matrixA = JSON.parse(matrix_1.value);
        const matrixB = JSON.parse(matrix_2.value);
        
        if (matrixA.length !== matrixB.length) {
            showToast({ msg: "Matrizen haben unterschiedliche Größen!", error: true });
            return;
        }
        
        const result = multiplyMatrices(matrixA, matrixB);
        
        let displayResult = "🔢 MATRIX FUSION (A × B)\n";
        displayResult += "═══════════════════════════\n\n";
        displayResult += "📊 ERGEBNIS:\n";
        displayResult += printAdj(result);
        
        output.textContent = displayResult;
        showToast({ msg: "Matrix-Multiplikation abgeschlossen! 🔢", error: false });
    } catch (error) {
        showToast({ msg: "Fehler bei Multiplikation: " + error.message, error: true });
    }
}

function potenzMatrix1() {
    potenzMatrix(matrix_1, "Matrix 1");
}

function potenzMatrix2() {
    potenzMatrix(matrix_2, "Matrix 2");
}

function potenzMatrix(matrixElement, matrixName) {
    if (!validateMatrix(matrixElement, matrixName)) {
        return;
    }
    
    try {
        const matrix = JSON.parse(matrixElement.value);
        const power2 = powerMatrix(matrix, 2);
        const power3 = powerMatrix(matrix, 3);
        
        let result = `🚀 ${matrixName} HYPERSPRUNG\n`;
        result += "═══════════════════════════\n\n";
        result += "📊 ORIGINAL MATRIX:\n";
        result += printAdj(matrix);
        result += "\n🔸 MATRIX² (Quadrat):\n";
        result += printAdj(power2);
        result += "\n🔹 MATRIX³ (Kubik):\n";
        result += printAdj(power3);
        
        output.textContent = result;
        showToast({ msg: `${matrixName} Hypersprung abgeschlossen! 🚀`, error: false });
    } catch (error) {
        showToast({ msg: "Fehler bei Potenz: " + error.message, error: true });
    }
}

// DIJKSTRA ALGORITHM - ESTILO ACADÉMICO
function dijkstraSimple(matrix, start) {
    const n = matrix.length;
    const distances = new Array(n).fill(Infinity);
    const visited = new Array(n).fill(false);
    
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

function calculateDistances(matrix) {
    const n = matrix.length;
    const allDistances = [];
    
    for (let i = 0; i < n; i++) {
        allDistances[i] = dijkstraSimple(matrix, i);
    }
    
    return allDistances;
}

function calculateEccentricity(distances) {
    const eccentricity = [];
    
    for (let i = 0; i < distances.length; i++) {
        let maxDist = 0;
        for (let j = 0; j < distances.length; j++) {
            if (i !== j && distances[i][j] !== Infinity && distances[i][j] > maxDist) {
                maxDist = distances[i][j];
            }
        }
        eccentricity[i] = maxDist === 0 ? Infinity : maxDist;
    }
    
    return eccentricity;
}

function calculateRadius(eccentricity) {
    let minEcc = Infinity;
    
    for (let i = 0; i < eccentricity.length; i++) {
        if (eccentricity[i] > 0 && eccentricity[i] < minEcc) {
            minEcc = eccentricity[i];
        }
    }
    
    return minEcc === Infinity ? 0 : minEcc;
}

function calculateDiameter(eccentricity) {
    let maxEcc = 0;
    
    for (let i = 0; i < eccentricity.length; i++) {
        if (eccentricity[i] !== Infinity && eccentricity[i] > maxEcc) {
            maxEcc = eccentricity[i];
        }
    }
    
    return maxEcc;
}

function calculateCenter(eccentricity, radius) {
    const center = [];
    
    for (let i = 0; i < eccentricity.length; i++) {
        if (eccentricity[i] === radius) {
            center[center.length] = i;
        }
    }
    
    return center;
}

function isInCenter(center, nodeIndex) {
    for (let i = 0; i < center.length; i++) {
        if (center[i] === nodeIndex) {
            return true;
        }
    }
    return false;
}

function centerToString(center) {
    let result = "";
    for (let i = 0; i < center.length; i++) {
        if (i > 0) result += ", ";
        result += (center[i] + 1).toString();
    }
    return result;
}

function analyzeAdvancedGraph(matrix) {
    try {
        const n = matrix.length;
        
        let hasConnections = false;
        for (let i = 0; i < n && !hasConnections; i++) {
            for (let j = 0; j < n; j++) {
                if (matrix[i][j] > 0) {
                    hasConnections = true;
                    break;
                }
            }
        }
        
        if (!hasConnections) {
            return { error: "Matrix hat keine Verbindungen.", connected: false };
        }
        
        const allDistances = calculateDistances(matrix);
        const eccentricity = calculateEccentricity(allDistances);
        const radius = calculateRadius(eccentricity);
        const diameter = calculateDiameter(eccentricity);
        const center = calculateCenter(eccentricity, radius);
        
        let connected = true;
        for (let i = 0; i < n && connected; i++) {
            for (let j = 0; j < n; j++) {
                if (i !== j && allDistances[i][j] === Infinity) {
                    connected = false;
                    break;
                }
            }
        }
        
        return {
            connected,
            allDistances,
            eccentricity,
            radius,
            diameter,
            center,
            nodeCount: n
        };
    } catch (error) {
        return {
            error: "Fehler bei der Graphanalyse: " + error.message,
            connected: false
        };
    }
}

function analyzeMatrix(matrixElement, matrixName) {
    if (!matrixElement || !matrixElement.value) {
        showToast({ msg: `${matrixName} ist leer.`, error: true });
        return;
    }
    
    try {
        const matrix = JSON.parse(matrixElement.value);
        const analysis = analyzeAdvancedGraph(matrix);
        
        let result = `🎯 ADVANCED GRAPH ANALYSIS - ${matrixName}\n`;
        result += `═══════════════════════════════════\n\n`;
        
        if (analysis.error) {
            result += `❌ ERROR: ${analysis.error}\n\n`;
            result += `💡 SUGGESTIONS:\n`;
            result += `• Use 1 for connected, 0 for not connected\n`;
            result += `• Ensure matrix is square\n`;
            result += `• Add connections between nodes\n`;
        } else {
            result += `📊 BASIC METRICS:\n`;
            result += `• Nodes: ${analysis.nodeCount}\n`;
            result += `• Connected: ${analysis.connected ? 'Yes ✅' : 'No ❌'}\n\n`;
            
            if (analysis.connected) {
                result += `🎯 CENTRALITY MEASURES:\n`;
                result += `• Radius: ${analysis.radius}\n`;
                result += `• Diameter: ${analysis.diameter}\n`;
                result += `• Center: Node(s) ${analysis.center.map(i => i + 1).join(', ')}\n\n`;
                
                result += `📏 ECCENTRICITY BY NODE:\n`;
                for (let i = 0; i < analysis.eccentricity.length; i++) {
                    const ecc = analysis.eccentricity[i];
                    const isCenter = analysis.center.indexOf(i) !== -1;
                    result += `• Node ${i + 1}: ${ecc === Infinity ? '∞' : ecc}${isCenter ? ' (CENTER)' : ''}\n`;
                }
                
                result += `\n🗺️ DISTANCE MATRIX:\n`;
                result += `     `;
                for (let j = 0; j < analysis.nodeCount; j++) {
                    result += `N${j + 1}`.padStart(4);
                }
                result += `\n`;
                
                for (let i = 0; i < analysis.nodeCount; i++) {
                    result += `N${i + 1}:  `;
                    for (let j = 0; j < analysis.nodeCount; j++) {
                        const dist = analysis.allDistances[i][j];
                        const distStr = dist === Infinity ? '∞' : dist.toString();
                        result += distStr.padStart(3) + ' ';
                    }
                    result += `\n`;
                }
                
                result += `\n📈 INTERPRETATION:\n`;
                result += `• Radius (${analysis.radius}): Minimum eccentricity\n`;
                result += `• Diameter (${analysis.diameter}): Maximum eccentricity\n`;
                result += `• Center: Node(s) with minimum eccentricity\n`;
                result += `• Eccentricity: Max distance from node to any other node\n`;
            } else {
                result += `⚠️ DISCONNECTED GRAPH:\n`;
                result += `The graph is not connected. Some nodes cannot reach others.\n`;
                result += `Advanced measures require a connected graph.\n\n`;
            }
            
            result += `\n📋 ADJACENCY MATRIX:\n`;
            result += printAdj(matrix);
        }
        
        output.textContent = result;
        showToast({ msg: `Advanced analysis completed for ${matrixName}!` });
    } catch (error) {
        showToast({ msg: "Fehler: " + error.message, error: true });
    }
}

function analyzeMatrix1() { analyzeMatrix(matrix_1, "Matrix 1"); }
function analyzeMatrix2() { analyzeMatrix(matrix_2, "Matrix 2"); }