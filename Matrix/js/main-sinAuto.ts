// js/main-sinAuto.ts - Funciones principales
// PASO A PASO - Sin funciones automáticas

import { App } from "./app.js";
import { 
    dijkstraWithLogging, 
    dijkstraSilent, 
    resetGraph, 
    getGraphStats, 
    highlightPath 
} from "./dijkstra-sinAuto.js";

// Variable global para la aplicación
declare global {
    var app: App | null;
}

// Inicializar la variable global
globalThis.app = null;

// Variables para nodos seleccionados
let selectedStartNode: any = null;
let selectedEndNode: any = null;

// ===== FUNCIONES PRINCIPALES PARA HTML =====

// Función para inicializar la aplicación
export function initializeApp(): void {
    try {
        console.log("Inicializando aplicación...");
        
        // Verificar que Cytoscape esté disponible
        if (typeof cytoscape === 'undefined') {
            throw new Error('Cytoscape no está cargado. Incluye el script de Cytoscape.');
        }
        
        // Crear nueva instancia de App
        globalThis.app = new App();
        
        console.log("App inicializada correctamente");
        updateAppStatus();
        updateOutput("App inicializada! Grafo de ejemplo cargado.\nPuede cargar datos aleatorios o seleccionar nodos para Dijkstra.");
        
    } catch (error) {
        console.error("Error al inicializar app:", error);
        updateOutput(`Error: ${error.message}`);
    }
}

// Función para cargar datos aleatorios
export function loadRandomData(): void {
    if (!isAppReady()) {
        showError("App nicht initialisiert. Klicken Sie zuerst auf 'App initialisieren'.");
        return;
    }
    
    try {
        globalThis.app!.loadRandomGraph();
        updateOutput("Zufällige Daten geladen! Wählen Sie Start- und Zielknoten für Dijkstra.");
        
        // Limpiar selección anterior
        selectedStartNode = null;
        selectedEndNode = null;
        clearNodeSelection();
        
    } catch (error) {
        console.error("Error al cargar datos:", error);
        updateOutput(`Error beim Laden der Daten: ${error.message}`);
    }
}

// Función para obtener la aplicación
export function getApp(): App | null {
    return globalThis.app;
}

// Función para verificar si la app está lista
export function isAppReady(): boolean {
    return globalThis.app !== null;
}

// Función para limpiar la aplicación
export function clearApp(): void {
    if (globalThis.app && globalThis.app.graph) {
        try {
            globalThis.app.graph.destroy();
        } catch (error) {
            console.warn("Error al destruir grafo:", error);
        }
    }
    
    globalThis.app = null;
    selectedStartNode = null;
    selectedEndNode = null;
    
    console.log("App limpiada");
    updateAppStatus();
    updateOutput("DIJKSTRA VOYAGER wartet auf Befehle...");
    clearNodeSelection();
}

// ===== FUNCIONES DE DIJKSTRA =====

// Función para seleccionar nodos manualmente
export function selectNodesManually(): void {
    const startInput = document.getElementById('start-node') as HTMLInputElement;
    const endInput = document.getElementById('end-node') as HTMLInputElement;
    
    if (!startInput || !endInput) {
        showError("Eingabefelder für Knoten nicht gefunden.");
        return;
    }
    
    const startId = startInput.value.trim();
    const endId = endInput.value.trim();
    
    if (!startId || !endId) {
        showError("Bitte beide Knoten-IDs eingeben (z.B. node1, node2).");
        return;
    }
    
    if (!isAppReady()) {
        showError("App nicht initialisiert.");
        return;
    }
    
    try {
        const app = getApp()!;
        const startNodeResult = app.getNodeById(startId);
        const endNodeResult = app.getNodeById(endId);
        
        if (startNodeResult.length === 0) {
            showError(`Start-Knoten "${startId}" nicht gefunden. Verfügbare Knoten überprüfen.`);
            return;
        }
        
        if (endNodeResult.length === 0) {
            showError(`Ziel-Knoten "${endId}" nicht gefunden. Verfügbare Knoten überprüfen.`);
            return;
        }
        
        selectedStartNode = startNodeResult[0];
        selectedEndNode = endNodeResult[0];
        
        // Destacar nodos seleccionados visualmente
        highlightSelectedNodes();
        
        updateOutput(`Knoten ausgewählt:\nStart: ${startId}\nZiel: ${endId}\n\nBereit für Dijkstra-Algorithmus!`);
        
    } catch (error) {
        console.error("Error al seleccionar nodos:", error);
        showError(`Fehler bei der Knotenauswahl: ${error.message}`);
    }
}

// Función para ejecutar Dijkstra con logging
export function runDijkstraWithLogging(): void {
    if (!validateDijkstraSetup()) return;
    
    try {
        const app = getApp()!;
        console.log("=== EJECUTANDO DIJKSTRA CON LOGGING ===");
        
        const path = dijkstraWithLogging(app.graph, selectedStartNode, selectedEndNode);
        
        if (path.length === 0) {
            updateOutput(`Kein Pfad gefunden zwischen ${selectedStartNode.id()} und ${selectedEndNode.id()}.\nÜberprüfen Sie, ob die Knoten verbunden sind.`);
            return;
        }
        
        const pathString = path.map((node: any) => node.id()).join(' → ');
        const distance = path[path.length - 1].data('distance') || 'unbekannt';
        
        // Destacar el camino encontrado
        highlightPath(app.graph, path);
        
        updateOutput(`✅ KÜRZESTER PFAD GEFUNDEN!\n\nPfad: ${pathString}\nGesamtdistanz: ${distance}\n\nÜberprüfen Sie die Konsole für detaillierte Logs.`);
        
    } catch (error) {
        console.error("Error en Dijkstra:", error);
        updateOutput(`Fehler beim Ausführen von Dijkstra: ${error.message}`);
    }
}

// Función para ejecutar Dijkstra silencioso
export function runDijkstraSilent(): void {
    if (!validateDijkstraSetup()) return;
    
    try {
        const app = getApp()!;
        const path = dijkstraSilent(app.graph, selectedStartNode, selectedEndNode);
        
        if (path.length === 0) {
            updateOutput(`Kein Pfad gefunden zwischen ${selectedStartNode.id()} und ${selectedEndNode.id()}.`);
            return;
        }
        
        const pathString = path.map((node: any) => node.id()).join(' → ');
        const distance = path[path.length - 1].data('distance') || 'unbekannt';
        
        // Destacar el camino encontrado
        highlightPath(app.graph, path);
        
        updateOutput(`Kürzester Pfad: ${pathString}\nDistanz: ${distance}`);
        
    } catch (error) {
        console.error("Error en Dijkstra silencioso:", error);
        updateOutput(`Fehler: ${error.message}`);
    }
}

// Función para resetear el grafo
export function resetGraphManual(): void {
    if (!isAppReady()) {
        showError("App nicht initialisiert.");
        return;
    }
    
    try {
        const app = getApp()!;
        resetGraph(app.graph);
        
        // Restaurar estilos originales
        app.graph.nodes().style({
            'background-color': '#00BFFF',
            'border-color': '#87CEFA'
        });
        
        app.graph.edges().style({
            'line-color': '#87CEFA',
            'width': 4
        });
        
        updateOutput("Graph wurde zurückgesetzt.\nAlle Dijkstra-Daten entfernt und Stile wiederhergestellt.");
        
    } catch (error) {
        console.error("Error al resetear grafo:", error);
        updateOutput(`Fehler beim Zurücksetzen: ${error.message}`);
    }
}

// Función para mostrar estadísticas del grafo
export function showGraphStats(): void {
    if (!isAppReady()) {
        showError("App nicht initialisiert.");
        return;
    }
    
    try {
        const app = getApp()!;
        const stats = getGraphStats(app.graph);
        
        const nodeList = app.getAllNodes().map((node: any) => node.id()).join(', ');
        
        updateOutput(`📊 GRAPH-STATISTIKEN:

Knoten: ${stats.nodeCount}
Kanten: ${stats.edgeCount}
Durchschnittlicher Grad: ${stats.averageDegree.toFixed(2)}
Verbunden: ${stats.isConnected ? 'Ja' : 'Nein'}

Verfügbare Knoten: ${nodeList}

${stats.isConnected ? '✅ Dijkstra sollte zwischen allen Knoten funktionieren.' : '⚠️ Warnung: Grafo nicht vollständig verbunden.'}`);
        
    } catch (error) {
        console.error("Error al obtener estadísticas:", error);
        updateOutput(`Fehler bei Statistiken: ${error.message}`);
    }
}

// Función para limpiar el output
export function clearAlgorithmOutput(): void {
    updateOutput("DIJKSTRA VOYAGER wartet auf Befehle...");
}

// ===== FUNCIONES DE UTILIDAD =====

function updateAppStatus(): void {
    const statusDiv = document.getElementById('app-status');
    if (statusDiv) {
        statusDiv.textContent = isAppReady() ? 
            'App-Status: Initialisiert ✅' : 
            'App-Status: Nicht initialisiert ❌';
        statusDiv.style.color = isAppReady() ? '#32CD32' : '#FF6347';
    }
}

function updateOutput(message: string): void {
    const outputDiv = document.getElementById('algorithm-output');
    if (outputDiv) {
        outputDiv.textContent = message;
        outputDiv.style.color = '#87CEFA';
    }
}

function showError(message: string): void {
    alert(message);
    updateOutput(`❌ ERROR: ${message}`);
    
    const outputDiv = document.getElementById('algorithm-output');
    if (outputDiv) {
        outputDiv.style.color = '#FF6347';
    }
}

function validateDijkstraSetup(): boolean {
    if (!isAppReady()) {
        showError("App nicht initialisiert.");
        return false;
    }
    
    if (!selectedStartNode || !selectedEndNode) {
        showError("Bitte wählen Sie Start- und Zielknoten aus.");
        return false;
    }
    
    return true;
}

function highlightSelectedNodes(): void {
    if (!isAppReady() || !selectedStartNode || !selectedEndNode) return;
    
    try {
        const app = getApp()!;
        
        // Resetear todos los estilos
        app.graph.nodes().style({
            'background-color': '#00BFFF',
            'border-color': '#87CEFA'
        });
        
        // Destacar nodos seleccionados
        selectedStartNode.style({
            'background-color': '#32CD32',
            'border-color': '#228B22'
        });
        
        selectedEndNode.style({
            'background-color': '#FF6347',
            'border-color': '#DC143C'
        });
        
    } catch (error) {
        console.warn("Error al destacar nodos:", error);
    }
}

function clearNodeSelection(): void {
    const startInput = document.getElementById('start-node') as HTMLInputElement;
    const endInput = document.getElementById('end-node') as HTMLInputElement;
    
    if (startInput) startInput.value = '';
    if (endInput) endInput.value = '';
}