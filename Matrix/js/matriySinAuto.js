// ARCHIVO COMPLETO matriySinAuto.js - ESTILO ACADÉMICO CORREGIDO - VERSIÓN FINAL

// VARIABLES GLOBALES
let matrix_1, matrix_2, output, matrixSizeInput;
let visualCanvas, visualContext;
const CANVAS_SIZE = 380;
const NODE_SIZE = 18;

// INICIALIZACIÓN BÁSICA - ESTILO ACADÉMICO
document.addEventListener('DOMContentLoaded', function() {
    matrix_1 = document.getElementById('matrix_1');
    matrix_2 = document.getElementById('matrix_2');
    output = document.getElementById('output');
    matrixSizeInput = document.getElementById('matrix-size');
    initGraphVisualization();
    // Verificación básica de elementos críticos
    if (!matrix_1 || !matrix_2 || !output) {
        alert("ERROR: Critical DOM elements not found!");
    }
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

// FUNCIÓN BÁSICA PARA MOSTRAR MENSAJES - ESTILO ACADÉMICO PURO
function showToast(config) {
    // Método 1: Mostrar en el terminal de output - BÁSICO
    if (output) {
        const prefix = config.error ? "ERROR" : "SUCCESS";
        const message = prefix + ": " + config.msg + "\n\n";
        
        // Agregar mensaje al principio del output
        if (output.textContent && output.textContent.length > 50) {
            output.textContent = message + output.textContent;
        } else {
            output.textContent = message + "MATRIX VOYAGER - Quantensystem bereit für Befehle...";
        }
    }
    
    // Método 2: Alert básico para errores críticos
    if (config.error) {
        alert(config.msg);
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
        showToast({ msg: "✅ Matrix 1 erfolgreich gelöscht!", error: false });
    }
}

function clearMatrix2() {
    if (matrix_2) {
        matrix_2.value = '';
        showToast({ msg: "✅ Matrix 2 erfolgreich gelöscht!", error: false });
    }
}

function clearOutput() {
    if (output) {
        output.textContent = '🌌 MATRIX VOYAGER - Quantensystem bereit für Befehle...';
        showToast({ msg: "✅ Terminal erfolgreich geleert!", error: false });
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
        showToast({ msg: `❌ ${matrixName} ist leer!`, error: true });
        return false;
    }
    
    try {
        const matrix = JSON.parse(matrixElement.value);
        
        if (!Array.isArray(matrix)) {
            showToast({ msg: `❌ ${matrixName} ist kein Array!`, error: true });
            return false;
        }
        
        const n = matrix.length;
        if (n === 0) {
            showToast({ msg: `❌ ${matrixName} ist leer (0 Zeilen)!`, error: true });
            return false;
        }
        
        for (let i = 0; i < n; i++) {
            if (!Array.isArray(matrix[i])) {
                showToast({ msg: `❌ ${matrixName} Zeile ${i + 1} ist kein Array!`, error: true });
                return false;
            }
            
            if (matrix[i].length !== n) {
                showToast({ msg: `❌ ${matrixName} ist nicht quadratisch! Zeile ${i + 1} hat ${matrix[i].length} Elemente, erwartet ${n}!`, error: true });
                return false;
            }
            
            // Überprüfen ob alle Werte Zahlen sind
            for (let j = 0; j < matrix[i].length; j++) {
                if (typeof matrix[i][j] !== 'number') {
                    showToast({ msg: `❌ ${matrixName} Position [${i + 1},${j + 1}] ist keine Zahl: "${matrix[i][j]}"!`, error: true });
                    return false;
                }
                
                if (matrix[i][j] < 0) {
                    showToast({ msg: `❌ ${matrixName} Position [${i + 1},${j + 1}] ist negativ: ${matrix[i][j]}!`, error: true });
                    return false;
                }
            }
        }
        
        showToast({ msg: `✅ ${matrixName} ist gültig und bereit!`, error: false });
        return true;
        
    } catch (error) {
        if (error instanceof SyntaxError) {
            showToast({ msg: `❌ ${matrixName} JSON Syntax-Fehler: Überprüfen Sie Klammern und Kommas!`, error: true });
        } else {
            showToast({ msg: `❌ ${matrixName} Unbekannter Fehler: ${error.message}`, error: true });
        }
        return false;
    }
}

// FUNCIONES DE EJEMPLO Y CARGA DE DATOS
/**
 * FUNCIÓN ACADÉMICA: CARGAR EJEMPLOS DE DEMOSTRACIÓN
 * Genera matrices de ejemplo para análisis educativo (SIN Math.random)
 */
function loadHyperraumDemo() {
    try {
        const size = getMatrixSize();
        
        // Crear matrices de ejemplo académicas simples
        const matrix1 = createExampleMatrix1(size);
        const matrix2 = createExampleMatrix2(size);
        
        // Cargar en los campos de texto
        if (matrix_1) {
            matrix_1.value = JSON.stringify(matrix1);
        }
        if (matrix_2) {
            matrix_2.value = JSON.stringify(matrix2);
        }
        
        // Mostrar mensaje de éxito
        showToast({ 
            msg: `🚀 Hyperraum-Demo ${size}x${size} erfolgreich geladen!`, 
            error: false 
        });
        
    } catch (error) {
        showToast({ 
            msg: "❌ Fehler beim Laden der Hyperraum-Demo: " + error.message, 
            error: true 
        });
    }
}

/**
 * CREAR MATRIZ DE EJEMPLO 1 - PATRÓN ACADÉMICO CIRCULAR
 * @param {number} n - Tamaño de la matriz
 * @returns {Array} Matriz de adyacencia ejemplo
 */
function createExampleMatrix1(n) {
    const matrix = createMatrix(n, n, 0);
    
    // Crear patrón circular simple: cada nodo conecta con el siguiente
    for (let i = 0; i < n - 1; i++) {
        matrix[i][i + 1] = 1;
    }
    
    // Cerrar el ciclo para hacer el grafo más interesante
    if (n >= 3) {
        matrix[n - 1][0] = 1;
    }
    
    return matrix;
}

/**
 * CREAR MATRIZ DE EJEMPLO 2 - PATRÓN ACADÉMICO ESTRELLA
 * @param {number} n - Tamaño de la matriz
 * @returns {Array} Matriz de adyacencia ejemplo
 */
function createExampleMatrix2(n) {
    const matrix = createMatrix(n, n, 0);
    
    // Crear patrón estrella: primer nodo conecta con todos los demás
    if (n > 1) {
        for (let j = 1; j < n; j++) {
            matrix[0][j] = 1; // Nodo 0 conecta con todos
        }
    }
    
    return matrix;
}

/**
 * FUNCIÓN PARA EL BOTÓN "GRAPH PROTOTYPEN LADEN"
 * Carga ejemplos específicos de tipos de grafos
 */
function loadGraphExamples() {
    try {
        // Ejemplos académicos fijos para demostración
        const triangleGraph = [
            [0, 1, 1],
            [1, 0, 1],
            [1, 1, 0]
        ];
        
        const pathGraph = [
            [0, 1, 0],
            [0, 0, 1],
            [0, 0, 0]
        ];
        
        // Cargar ejemplos
        if (matrix_1) {
            matrix_1.value = JSON.stringify(triangleGraph);
        }
        if (matrix_2) {
            matrix_2.value = JSON.stringify(pathGraph);
        }
        
        showToast({ 
            msg: "🌐 Graph Prototypen erfolgreich geladen!", 
            error: false 
        });
        
    } catch (error) {
        showToast({ 
            msg: "❌ Fehler beim Laden der Prototypen: " + error.message, 
            error: true 
        });
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
            showToast({ msg: "❌ Matrizen haben unterschiedliche Größen!", error: true });
            return;
        }
        
        const result = multiplyMatrices(matrixA, matrixB);
        
        let displayResult = "🔢 MATRIX FUSION (A × B)\n";
        displayResult += "═══════════════════════════\n\n";
        displayResult += "📊 ERGEBNIS:\n";
        displayResult += printAdj(result);
        
        output.textContent = displayResult;
        showToast({ msg: "🔢 Matrix-Multiplikation erfolgreich abgeschlossen!", error: false });
    } catch (error) {
        showToast({ msg: "❌ Fehler bei Multiplikation: " + error.message, error: true });
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
        showToast({ msg: `🚀 ${matrixName} Hypersprung erfolgreich berechnet!`, error: false });
    } catch (error) {
        showToast({ msg: "❌ Fehler bei Potenz: " + error.message, error: true });
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
        showToast({ msg: `❌ ${matrixName} ist leer.`, error: true });
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
                result += `• Center: Node(s) ${centerToString(analysis.center)}\n\n`;
                
                result += `📏 ECCENTRICITY BY NODE:\n`;
                for (let i = 0; i < analysis.eccentricity.length; i++) {
                    const ecc = analysis.eccentricity[i];
                    const isCenter = isInCenter(analysis.center, i);
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
        showToast({ msg: `📊 Erweiterte Analyse für ${matrixName} abgeschlossen!` });
    } catch (error) {
        showToast({ msg: "❌ Fehler: " + error.message, error: true });
    }
}

function analyzeMatrix1() { 
    analyzeMatrix(matrix_1, "Matrix 1"); 
}

function analyzeMatrix2() { 
    analyzeMatrix(matrix_2, "Matrix 2"); 
}

// FUNCIÓN PARA IR A LA SECCIÓN DIJKSTRA - ESTILO ACADÉMICO
function goToDijkstraSection() {
    showSection('dijkstra-section');
    alert("SUCCESS: Navegando a la sección Dijkstra!");
}

// =============================================================================
// MÓDULO DE VISUALIZACIÓN DE GRAFOS - VERSIÓN ACADÉMICA
// =============================================================================

/**
 * INICIALIZACIÓN DEL SISTEMA DE VISUALIZACIÓN
 * Función académica para configurar el canvas HTML5
 */
function initGraphVisualization() {
    visualCanvas = document.getElementById('graph-canvas');
    if (visualCanvas) {
        visualContext = visualCanvas.getContext('2d');
        visualCanvas.width = CANVAS_SIZE;
        visualCanvas.height = CANVAS_SIZE;
        clearGraphArea();
        console.log("Sistema de visualización iniciado correctamente");
    } else {
        console.warn("Canvas de visualización no encontrado");
    }
}

/**
 * LIMPIAR ÁREA DE VISUALIZACIÓN
 * Prepara el canvas con grid académico
 */
function clearGraphArea() {
    if (!visualContext) return;
    
    // Fondo blanco académico
    visualContext.fillStyle = '#ffffff';
    visualContext.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
    // Grid de referencia académico
    visualContext.strokeStyle = '#f0f0f0';
    visualContext.lineWidth = 1;
    
    // Líneas verticales del grid
    for (let x = 0; x <= CANVAS_SIZE; x += 20) {
        visualContext.beginPath();
        visualContext.moveTo(x, 0);
        visualContext.lineTo(x, CANVAS_SIZE);
        visualContext.stroke();
    }
    
    // Líneas horizontales del grid
    for (let y = 0; y <= CANVAS_SIZE; y += 20) {
        visualContext.beginPath();
        visualContext.moveTo(0, y);
        visualContext.lineTo(CANVAS_SIZE, y);
        visualContext.stroke();
    }
    
    // Título académico
    visualContext.fillStyle = '#333333';
    visualContext.font = 'bold 14px Arial';
    visualContext.textAlign = 'center';
    visualContext.fillText('Representación Gráfica de Matriz de Adyacencia', CANVAS_SIZE/2, 20);
}

function calculateNodePositions(nodeCount) {
    const positions = [];
    const centerX = CANVAS_SIZE / 2;
    const centerY = CANVAS_SIZE / 2;
    const radius = Math.min(CANVAS_SIZE, CANVAS_SIZE) * 0.32;
    
    for (let i = 0; i < nodeCount; i++) {
        const angle = (2 * Math.PI * i) / nodeCount - Math.PI / 2;
        const x = centerX + radius * Math.cos(angle);
        const y = centerY + radius * Math.sin(angle);
        positions.push({ x: x, y: y });
    }
    
    return positions;
}

function renderGraphEdges(matrix, positions) {
    if (!visualContext) return;
    
    const nodeCount = matrix.length;
    visualContext.strokeStyle = '#2196F3';
    visualContext.lineWidth = 2;
    
    for (let i = 0; i < nodeCount; i++) {
        for (let j = 0; j < nodeCount; j++) {
            if (matrix[i][j] > 0 && i !== j) {
                const start = positions[i];
                const end = positions[j];
                
                visualContext.beginPath();
                visualContext.moveTo(start.x, start.y);
                visualContext.lineTo(end.x, end.y);
                visualContext.stroke();
                
                drawArrow(start, end);
            }
        }
    }
}

function drawArrow(start, end) {
    if (!visualContext) return;
    
    const arrowLength = 10;
    const arrowAngle = Math.PI / 6;
    const angle = Math.atan2(end.y - start.y, end.x - start.x);
    
    const arrowX = end.x - (NODE_SIZE + 8) * Math.cos(angle);
    const arrowY = end.y - (NODE_SIZE + 8) * Math.sin(angle);
    
    visualContext.beginPath();
    visualContext.moveTo(arrowX, arrowY);
    visualContext.lineTo(
        arrowX - arrowLength * Math.cos(angle - arrowAngle),
        arrowY - arrowLength * Math.sin(angle - arrowAngle)
    );
    visualContext.moveTo(arrowX, arrowY);
    visualContext.lineTo(
        arrowX - arrowLength * Math.cos(angle + arrowAngle),
        arrowY - arrowLength * Math.sin(angle + arrowAngle)
    );
    visualContext.stroke();
}

function renderGraphNodes(positions) {
    if (!visualContext) return;
    
    visualContext.fillStyle = '#4CAF50';
    visualContext.strokeStyle = '#333333';
    visualContext.lineWidth = 2;
    visualContext.font = 'bold 12px Arial';
    visualContext.textAlign = 'center';
    visualContext.textBaseline = 'middle';
    
    for (let i = 0; i < positions.length; i++) {
        const pos = positions[i];
        
        // Dibujar círculo del nodo
        visualContext.beginPath();
        visualContext.arc(pos.x, pos.y, NODE_SIZE, 0, 2 * Math.PI);
        visualContext.fill();
        visualContext.stroke();
        
        // Dibujar número del nodo
        visualContext.fillStyle = '#FFFFFF';
        visualContext.fillText((i + 1).toString(), pos.x, pos.y);
        visualContext.fillStyle = '#4CAF50';
    }
}

function visualizeMatrix1() {
    visualizeMatrix(matrix_1, "Matrix 1");
}

function visualizeMatrix2() {
    visualizeMatrix(matrix_2, "Matrix 2");
}

function visualizeMatrix(matrixElement, matrixName) {
    if (!validateMatrix(matrixElement, matrixName)) {
        return;
    }
    
    try {
        const matrix = JSON.parse(matrixElement.value);
        const nodeCount = matrix.length;
        
        if (nodeCount > 10) {
            showToast({ msg: `❌ ${matrixName} ist zu groß für Visualisierung (max 10 Knoten)!`, error: true });
            return;
        }
        
        clearGraphArea();
        const positions = calculateNodePositions(nodeCount);
        renderGraphEdges(matrix, positions);
        renderGraphNodes(positions);
        
        showToast({ msg: `🎨 ${matrixName} erfolgreich visualisiert!`, error: false });
        
    } catch (error) {
        showToast({ msg: `❌ Fehler bei Visualisierung: ${error.message}`, error: true });
    }
}