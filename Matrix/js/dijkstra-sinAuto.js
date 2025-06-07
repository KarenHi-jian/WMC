// dijkstra-sinAuto.js - VERSIÓN COMPACTA ACADÉMICA
console.log("🚀 Dijkstra Voyager loaded");

// Variables globales
let graph = [];
let nodes = [];
let startNode = null;
let endNode = null;
let isInitialized = false;

// Inicializar aplicación
function initializeApp() {
    const matrix1 = document.getElementById('matrix_1');
    const output = document.getElementById('dijkstra-output');
    
    if (!matrix1?.value.trim()) {
        throw new Error("Matrix 1 está vacía");
    }
    
    graph = JSON.parse(matrix1.value);
    const n = graph.length;
    
    // Validar matriz cuadrada
    if (!graph.every(row => row.length === n)) {
        throw new Error("Matriz debe ser cuadrada");
    }
    
    // Crear nodos
    nodes = Array.from({length: n}, (_, i) => `node${i + 1}`);
    isInitialized = true;
    
    // Mostrar resultado
    let result = `🚀 DIJKSTRA VOYAGER INITIALIZED\n`;
    result += `📊 Nodes: ${n} | Available: ${nodes.join(", ")}\n\n`;
    result += `📋 ADJACENCY MATRIX:\n${printMatrix(graph)}`;
    
    output.textContent = result;
    alert(`SUCCESS: ${n} nodos inicializados!`);
}

// Imprimir matriz
function printMatrix(matrix) {
    let result = "     " + matrix.map((_, i) => `N${i + 1}`.padStart(4)).join("") + "\n";
    matrix.forEach((row, i) => {
        result += `N${i + 1}:`.padStart(5) + row.map(val => val.toString().padStart(3)).join(" ") + "\n";
    });
    return result;
}

// Seleccionar nodos
function selectNodesManually() {
    if (!isInitialized) {
        throw new Error("Dijkstra no inicializado");
    }
    
    const start = prompt("Start node (ej: node1):")?.trim();
    const end = prompt("End node (ej: node3):")?.trim();
    
    if (!start || !end) {
        throw new Error("Ambos nodos son requeridos");
    }
    
    const startIdx = nodes.indexOf(start);
    const endIdx = nodes.indexOf(end);
    
    if (startIdx === -1 || endIdx === -1) {
        throw new Error(`Nodos válidos: ${nodes.join(", ")}`);
    }
    
    if (startIdx === endIdx) {
        throw new Error("Start y end deben ser diferentes");
    }
    
    startNode = start;
    endNode = end;
    alert(`SUCCESS: ${start} → ${end} seleccionado!`);
}

// Algoritmo Dijkstra
function dijkstraAlgorithm(graph, start, end) {
    const n = graph.length;
    const distances = new Array(n).fill(Infinity);
    const previous = new Array(n).fill(-1);
    const visited = new Array(n).fill(false);
    
    distances[start] = 0;
    
    for (let count = 0; count < n; count++) {
        // Encontrar nodo no visitado con menor distancia
        let current = -1;
        let minDist = Infinity;
        
        for (let i = 0; i < n; i++) {
            if (!visited[i] && distances[i] < minDist) {
                minDist = distances[i];
                current = i;
            }
        }
        
        if (current === -1 || current === end) break;
        visited[current] = true;
        
        // Actualizar vecinos
        for (let neighbor = 0; neighbor < n; neighbor++) {
            if (graph[current][neighbor] > 0 && !visited[neighbor]) {
                const newDist = distances[current] + graph[current][neighbor];
                if (newDist < distances[neighbor]) {
                    distances[neighbor] = newDist;
                    previous[neighbor] = current;
                }
            }
        }
    }
    
    return { distances, previous };
}

// Reconstruir camino
function getPath(previous, start, end) {
    const path = [];
    let current = end;
    
    while (current !== -1) {
        path.unshift(current);
        current = previous[current];
    }
    
    return path[0] === start ? path : [];
}

// Ejecutar Dijkstra
function runDijkstraWithLogging() {
    if (!isInitialized) {
        throw new Error("Dijkstra no inicializado");
    }
    
    if (!startNode || !endNode) {
        throw new Error("Nodos no seleccionados");
    }
    
    const startIdx = nodes.indexOf(startNode);
    const endIdx = nodes.indexOf(endNode);
    
    const result = dijkstraAlgorithm(graph, startIdx, endIdx);
    const path = getPath(result.previous, startIdx, endIdx);
    const output = document.getElementById('dijkstra-output');
    
    let text = `🚀 DIJKSTRA RESULTS\n`;
    text += `🎯 ROUTE: ${startNode} → ${endNode}\n\n`;
    
    if (result.distances[endIdx] === Infinity) {
        text += `❌ NO PATH FOUND!\n`;
    } else {
        text += `✅ SHORTEST PATH FOUND!\n`;
        text += `• Distance: ${result.distances[endIdx]}\n`;
        text += `• Path: ${path.map(i => nodes[i]).join(" → ")}\n\n`;
        
        text += `📊 ALL DISTANCES FROM ${startNode}:\n`;
        result.distances.forEach((dist, i) => {
            text += `• To ${nodes[i]}: ${dist === Infinity ? '∞' : dist}\n`;
        });
    }
    
    output.textContent = text;
    alert("SUCCESS: Dijkstra completado!");
}

// Estadísticas del grafo
function showGraphStats() {
    if (!isInitialized) {
        throw new Error("Dijkstra no inicializado");
    }
    
    const output = document.getElementById('dijkstra-output');
    const n = graph.length;
    
    // Contar aristas
    let edges = 0;
    graph.forEach(row => {
        edges += row.filter(val => val > 0).length;
    });
    
    // Calcular conectividad
    let connected = true;
    for (let i = 0; i < n && connected; i++) {
        const result = dijkstraAlgorithm(graph, i, 0);
        connected = result.distances.every((dist, j) => i === j || dist !== Infinity);
    }
    
    let stats = `📈 GRAPH STATISTICS\n`;
    stats += `📊 Nodes: ${n} | Edges: ${edges}\n`;
    stats += `🔗 Connected: ${connected ? 'YES' : 'NO'}\n\n`;
    stats += `📋 ADJACENCY MATRIX:\n${printMatrix(graph)}`;
    
    output.textContent = stats;
    alert("SUCCESS: Estadísticas generadas!");
}

// Limpiar output
function clearAlgorithmOutput() {
    const output = document.getElementById('dijkstra-output');
    if (output) {
        output.textContent = "🚀 DIJKSTRA VOYAGER - Listo para comandos...";
    }
}

// Alias para compatibilidad con try-catch
function initializeGraph() {
    try {
        initializeApp();
    } catch (error) {
        alert(`ERROR: ${error.message}`);
    }
}

function selectNodes() {
    try {
        selectNodesManually();
    } catch (error) {
        alert(`ERROR: ${error.message}`);
    }
}

function executeDijkstra() {
    try {
        runDijkstraWithLogging();
    } catch (error) {
        alert(`ERROR: ${error.message}`);
    }
}

function clearDijkstraTerminal() {
    clearAlgorithmOutput();
}

// Wrapper para estadísticas con manejo de errores
function displayGraphStats() {
    try {
        showGraphStats();
    } catch (error) {
        alert(`ERROR: ${error.message}`);
    }
}