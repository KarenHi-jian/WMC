 // ===================================================================
// DIJKSTRA VOYAGER - Sistema de Algoritmos de Grafos
// Archivo: js/dijkstra-sinAuto.js
// ===================================================================

console.log("🚀 Cargando Dijkstra Voyager...");

// Variables globales
let dijkstraApp = null;
let dijkstraGraph = null;
let selectedStart = null;
let selectedEnd = null;

// Verificar dependencias
if (typeof cytoscape === 'undefined') {
  console.error('❌ Cytoscape no disponible. Asegúrate de cargar la librería.');
} else {
  console.log('✅ Cytoscape disponible');
}

// ===================================================================
// CLASE PRINCIPAL DIJKSTRA APP
// ===================================================================
class DijkstraApp {
  constructor() {
    this.container = document.getElementById('graph-container');
    if (!this.container) {
      console.error('❌ Graph container no encontrado');
      return;
    }
    
    this.container.innerHTML = '';
    
    this.cy = cytoscape({
      container: this.container,
      
      elements: [
        { data: { id: 'node1' } },
        { data: { id: 'node2' } },
        { data: { id: 'node3' } },
        { data: { id: 'node4' } },
        { data: { id: 'edge1', source: 'node1', target: 'node2', weight: 1 } },
        { data: { id: 'edge2', source: 'node2', target: 'node3', weight: 2 } },
        { data: { id: 'edge3', source: 'node1', target: 'node4', weight: 5 } },
        { data: { id: 'edge4', source: 'node4', target: 'node3', weight: 1 } }
      ],
      
      style: [
        {
          selector: 'node',
          style: {
            'background-color': '#00BFFF',
            'label': 'data(id)',
            'color': 'white',
            'text-valign': 'center',
            'text-halign': 'center',
            'font-size': '14px',
            'width': 50,
            'height': 50
          }
        },
        {
          selector: 'edge',
          style: {
            'width': 4,
            'line-color': '#87CEFA',
            'target-arrow-color': '#87CEFA',
            'target-arrow-shape': 'triangle',
            'curve-style': 'bezier',
            'label': 'data(weight)',
            'color': 'white',
            'text-background-color': '#000',
            'text-background-opacity': 0.8,
            'font-size': '12px'
          }
        },
        {
          selector: '.start-node',
          style: { 'background-color': '#00FF00' }
        },
        {
          selector: '.end-node',
          style: { 'background-color': '#FF0000' }
        },
        {
          selector: '.path-node',
          style: { 'background-color': '#FFFF00' }
        },
        {
          selector: '.path-edge',
          style: {
            'line-color': '#FF0000',
            'target-arrow-color': '#FF0000',
            'width': 6
          }
        }
      ],
      
      layout: { name: 'circle', radius: 150 }
    });
    
    console.log('✅ Grafo inicializado correctamente');
  }
  
  loadRandom() {
    this.cy.elements().remove();
    
    const nodeCount = Math.floor(Math.random() * 4) + 4; // 4-7 nodos
    const nodes = [];
    const edges = [];
    
    // Crear nodos
    for (let i = 1; i <= nodeCount; i++) {
      nodes.push({ data: { id: `node${i}` } });
    }
    
    // Crear conexiones básicas (cadena)
    for (let i = 1; i < nodeCount; i++) {
      const weight = Math.floor(Math.random() * 5) + 1;
      edges.push({
        data: {
          id: `edge${i}-${i+1}`,
          source: `node${i}`,
          target: `node${i+1}`,
          weight: weight
        }
      });
    }
    
    // Agregar conexiones aleatorias adicionales
    for (let i = 1; i <= nodeCount; i++) {
      for (let j = i + 2; j <= nodeCount; j++) {
        if (Math.random() > 0.6) { // 40% probabilidad de conexión
          const weight = Math.floor(Math.random() * 8) + 1;
          edges.push({
            data: {
              id: `edge${i}-${j}`,
              source: `node${i}`,
              target: `node${j}`,
              weight: weight
            }
          });
        }
      }
    }
    
    this.cy.add([...nodes, ...edges]);
    this.cy.layout({ name: 'circle', radius: 140 }).run();
    
    return { nodes: nodeCount, edges: edges.length };
  }
  
  reset() {
    this.cy.nodes().removeClass('start-node end-node path-node');
    this.cy.edges().removeClass('path-edge');
  }
  
  getStats() {
    const nodes = this.cy.nodes();
    const edges = this.cy.edges();
    
    return {
      nodeCount: nodes.length,
      edgeCount: edges.length,
      nodeIds: nodes.map(n => n.id()),
      connections: edges.map(e => ({
        source: e.source().id(),
        target: e.target().id(),
        weight: e.data('weight') || 1
      }))
    };
  }
}

// ===================================================================
// ALGORITMO DIJKSTRA - IMPLEMENTACIÓN PROFESIONAL
// ===================================================================
function dijkstra(graph, startId, endId) {
  const nodes = graph.nodes();
  const edges = graph.edges();
  
  // Inicialización
  const distances = {};
  const previous = {};
  const unvisited = new Set();
  
  nodes.forEach(node => {
    const id = node.id();
    distances[id] = id === startId ? 0 : Infinity;
    previous[id] = null;
    unvisited.add(id);
  });
  
  const log = [
    `🚀 Iniciando algoritmo de Dijkstra`,
    `📍 Origen: ${startId}`,
    `🎯 Destino: ${endId}`,
    `═══════════════════════════════════`,
    `🔧 Algoritmo inicializado con ${nodes.length} nodos`
  ];
  
  // Algoritmo principal
  while (unvisited.size > 0) {
    // Encontrar nodo no visitado con menor distancia
    let currentNode = null;
    let minDistance = Infinity;
    
    for (const nodeId of unvisited) {
      if (distances[nodeId] < minDistance) {
        minDistance = distances[nodeId];
        currentNode = nodeId;
      }
    }
    
    if (currentNode === null || distances[currentNode] === Infinity) {
      log.push(`❌ No hay más nodos alcanzables`);
      break;
    }
    
    unvisited.delete(currentNode);
    log.push(`🔍 Visitando nodo: ${currentNode} (distancia: ${distances[currentNode]})`);
    
    if (currentNode === endId) {
      log.push(`✅ ¡Destino alcanzado!`);
      break;
    }
    
    // Examinar vecinos
    const neighbors = edges.filter(edge => 
      edge.source().id() === currentNode || edge.target().id() === currentNode
    );
    
    neighbors.forEach(edge => {
      const neighborId = edge.source().id() === currentNode ? 
        edge.target().id() : edge.source().id();
      
      if (unvisited.has(neighborId)) {
        const weight = edge.data('weight') || 1;
        const newDistance = distances[currentNode] + weight;
        
        if (newDistance < distances[neighborId]) {
          distances[neighborId] = newDistance;
          previous[neighborId] = currentNode;
          log.push(`    📊 Actualizando ${neighborId}: distancia ${newDistance} (peso: ${weight})`);
        }
      }
    });
  }
  
  // Reconstruir camino
  const path = [];
  let current = endId;
  
  while (current !== null) {
    path.unshift(current);
    current = previous[current];
  }
  
  if (path[0] !== startId) {
    return { path: [], distance: Infinity, log };
  }
  
  // Nodos visitados
  const visitedNodes = [];
  nodes.forEach(node => {
    if (distances[node.id()] !== Infinity) {
      visitedNodes.push(node.id());
    }
  });
  
  // Agregar resultado al log
  log.push(`═══════════════════════════════════`);
  log.push(`✅ ¡Camino encontrado!`);
  log.push(`📏 Distancia total: ${distances[endId]}`);
  log.push(`🛤️ Camino: ${path.join(' → ')}`);
  log.push(`👁️ Nodos visitados: ${visitedNodes.join(', ')}`);
  
  return { path, distance: distances[endId], log, visited: visitedNodes };
}

// ===================================================================
// UTILIDADES
// ===================================================================
function updateOutput(message) {
  const output = document.getElementById('algorithm-output');
  if (output) {
    output.textContent = message;
  }
}

// ===================================================================
// FUNCIONES GLOBALES PARA LOS BOTONES
// ===================================================================
window.initializeApp = function() {
  try {
    dijkstraApp = new DijkstraApp();
    dijkstraGraph = dijkstraApp.cy;
    
    const status = document.getElementById('app-status');
    if (status) {
      status.innerHTML = 'App-Status: Initialisiert ✅';
      status.style.color = '#00FF00';
    }
    
    updateOutput('🚀 DIJKSTRA VOYAGER initialisiert\n\nGraph mit 4 Knoten erstellt\nBereit für Pfadfindung!\n\n💡 Nächste Schritte:\n1. Optional: Zufällige Daten laden\n2. Start- und Zielknoten eingeben\n3. Knoten auswählen\n4. Dijkstra-Algorithmus ausführen\n\n📚 Professionelle Implementierung');
    console.log('✅ App inicializada correctamente');
  } catch (error) {
    console.error('❌ Error:', error);
    updateOutput('❌ Error al inicializar: ' + error.message);
  }
};

window.loadRandomData = function() {
  if (!dijkstraApp) {
    updateOutput('❌ App nicht initialisiert. Klicken Sie zuerst auf "App initialisieren".');
    return;
  }
  
  const result = dijkstraApp.loadRandom();
  selectedStart = null;
  selectedEnd = null;
  
  // Limpiar inputs
  const startInput = document.getElementById('start-node');
  const endInput = document.getElementById('end-node');
  if (startInput) startInput.value = '';
  if (endInput) endInput.value = '';
  
  updateOutput(`🎲 Zufälliger Graph geladen\n\nKnoten: ${result.nodes}\nVerbindungen: ${result.edges}\n\nVerwenden Sie "Graph-Statistiken" um\nverfügbare Knoten zu sehen\n\n💡 Neue Knotenauswahl erforderlich`);
};

window.clearApp = function() {
  dijkstraApp = null;
  dijkstraGraph = null;
  selectedStart = null;
  selectedEnd = null;
  
  const container = document.getElementById('graph-container');
  if (container) {
    container.innerHTML = '<div style="display: flex; align-items: center; justify-content: center; height: 100%; color: #87CEFA; font-size: 1.2em;">Klicken Sie auf "App initialisieren" um zu beginnen</div>';
  }
  
  const status = document.getElementById('app-status');
  if (status) {
    status.innerHTML = 'App-Status: Nicht initialisiert ❌';
    status.style.color = '#FF0000';
  }
  
  // Limpiar inputs
  const startInput = document.getElementById('start-node');
  const endInput = document.getElementById('end-node');
  if (startInput) startInput.value = '';
  if (endInput) endInput.value = '';
  
  updateOutput('🗑️ App gelöscht\n\nAlle Daten zurückgesetzt\nBereit für Neuinitialisierung');
};

window.selectNodesManually = function() {
  if (!dijkstraApp) {
    updateOutput('❌ App nicht initialisiert');
    return;
  }
  
  const startInput = document.getElementById('start-node');
  const endInput = document.getElementById('end-node');
  
  if (!startInput || !endInput) {
    updateOutput('❌ Eingabefelder nicht gefunden');
    return;
  }
  
  const startId = startInput.value.trim();
  const endId = endInput.value.trim();
  
  if (!startId || !endId) {
    updateOutput('❌ Bitte geben Sie Start- und Zielknoten ein\n\n💡 Beispiel:\nStart-Knoten: node1\nZiel-Knoten: node3');
    return;
  }
  
  const startNode = dijkstraGraph.$('#' + startId);
  const endNode = dijkstraGraph.$('#' + endId);
  
  if (startNode.length === 0) {
    updateOutput(`❌ Start-Knoten "${startId}" nicht gefunden\n\nVerwenden Sie "Graph-Statistiken" um\nverfügbare Knoten zu sehen`);
    return;
  }
  
  if (endNode.length === 0) {
    updateOutput(`❌ Ziel-Knoten "${endId}" nicht gefunden\n\nVerwenden Sie "Graph-Statistiken" um\nverfügbare Knoten zu sehen`);
    return;
  }
  
  if (startId === endId) {
    updateOutput('❌ Start- und Zielknoten müssen\nunterschiedlich sein');
    return;
  }
  
  dijkstraApp.reset();
  
  startNode.addClass('start-node');
  endNode.addClass('end-node');
  
  selectedStart = startId;
  selectedEnd = endId;
  
  updateOutput(`✅ Knoten erfolgreich ausgewählt:\n\n🟢 Start-Knoten: ${startId}\n🔴 Ziel-Knoten: ${endId}\n\n🚀 Bereit für Dijkstra-Algorithmus!\nKlicken Sie auf einen der Dijkstra-Buttons`);
};

window.runDijkstraWithLogging = function() {
  if (!dijkstraApp || !selectedStart || !selectedEnd) {
    updateOutput('❌ App nicht initialisiert oder Knoten nicht ausgewählt\n\nBitte:\n1. App initialisieren\n2. Start- und Zielknoten eingeben\n3. "Knoten auswählen" klicken\n4. Dijkstra ausführen');
    return;
  }
  
  dijkstraApp.reset();
  dijkstraGraph.$('#' + selectedStart).addClass('start-node');
  dijkstraGraph.$('#' + selectedEnd).addClass('end-node');
  
  const result = dijkstra(dijkstraGraph, selectedStart, selectedEnd);
  
  let output = `📊 DIJKSTRA MIT LOGGING\n\n`;
  output += `📍 Start: ${selectedStart} → 🎯 Ziel: ${selectedEnd}\n`;
  output += `═══════════════════════════════════\n\n`;
  
  if (result.distance === Infinity) {
    output += `❌ Kein Pfad gefunden!\nDie Knoten sind nicht verbunden.`;
  } else {
    output += `✅ Kürzester Pfad gefunden!\n`;
    output += `📏 Gesamtdistanz: ${result.distance}\n`;
    output += `🛤️ Optimaler Pfad: ${result.path.join(' → ')}\n`;
    output += `👁️ Besuchte Knoten: ${result.visited.join(', ')}\n`;
    output += `🎯 Anzahl Hops: ${result.path.length - 1}\n\n`;
    
    // Destacar camino en el grafo
    for (let i = 0; i < result.path.length - 1; i++) {
      const edge = dijkstraGraph.edges().filter(edge => 
        (edge.source().id() === result.path[i] && edge.target().id() === result.path[i + 1]) ||
        (edge.source().id() === result.path[i + 1] && edge.target().id() === result.path[i])
      );
      edge.addClass('path-edge');
    }
    
    result.path.slice(1, -1).forEach(nodeId => {
      dijkstraGraph.$('#' + nodeId).addClass('path-node');
    });
  }
  
  output += `\n📋 ALGORITHMUS-LOG:\n`;
  output += `─────────────────────────\n`;
  result.log.forEach(logEntry => {
    output += logEntry + '\n';
  });
  
  updateOutput(output);
};

window.runDijkstraSilent = function() {
  if (!dijkstraApp || !selectedStart || !selectedEnd) {
    updateOutput('❌ App nicht initialisiert oder Knoten nicht ausgewählt\n\nBitte:\n1. App initialisieren\n2. Knoten auswählen\n3. Dijkstra ausführen');
    return;
  }
  
  dijkstraApp.reset();
  dijkstraGraph.$('#' + selectedStart).addClass('start-node');
  dijkstraGraph.$('#' + selectedEnd).addClass('end-node');
  
  const result = dijkstra(dijkstraGraph, selectedStart, selectedEnd);
  
  let output = `🔇 DIJKSTRA STUMM\n\n`;
  output += `📍 Start: ${selectedStart} → 🎯 Ziel: ${selectedEnd}\n`;
  output += `═══════════════════════════════════\n\n`;
  
  if (result.distance === Infinity) {
    output += `❌ Kein Pfad von ${selectedStart} zu ${selectedEnd} gefunden.\nDie Knoten sind nicht erreichbar.`;
  } else {
    output += `✅ ERGEBNIS:\n`;
    output += `📏 Kürzeste Distanz: ${result.distance}\n`;
    output += `🛤️ Optimaler Pfad: ${result.path.join(' → ')}\n`;
    output += `🎯 Anzahl Hops: ${result.path.length - 1}\n`;
    output += `👁️ Besuchte Knoten: ${result.visited.length}`;
    
    // Destacar camino
    for (let i = 0; i < result.path.length - 1; i++) {
      const edge = dijkstraGraph.edges().filter(edge => 
        (edge.source().id() === result.path[i] && edge.target().id() === result.path[i + 1]) ||
        (edge.source().id() === result.path[i + 1] && edge.target().id() === result.path[i])
      );
      edge.addClass('path-edge');
    }
    
    result.path.slice(1, -1).forEach(nodeId => {
      dijkstraGraph.$('#' + nodeId).addClass('path-node');
    });
  }
  
  updateOutput(output);
};

window.resetGraphManual = function() {
  if (!dijkstraApp) {
    updateOutput('❌ App nicht initialisiert');
    return;
  }
  
  dijkstraApp.reset();
  selectedStart = null;
  selectedEnd = null;
  
  const startInput = document.getElementById('start-node');
  const endInput = document.getElementById('end-node');
  if (startInput) startInput.value = '';
  if (endInput) endInput.value = '';
  
  updateOutput('🔄 Graph zurückgesetzt\n\nAlle visuellen Markierungen entfernt\nKnoten-Auswahl gelöscht\nBereit für neue Auswahl');
};

window.showGraphStats = function() {
  if (!dijkstraApp) {
    updateOutput('❌ App nicht initialisiert');
    return;
  }
  
  const stats = dijkstraApp.getStats();
  
  let output = `📈 GRAPH-STATISTIKEN\n\n`;
  output += `📊 Übersicht:\n`;
  output += `─────────────\n`;
  output += `🔸 Anzahl Knoten: ${stats.nodeCount}\n`;
  output += `🔗 Anzahl Kanten: ${stats.edgeCount}\n`;
  output += `🌐 Verbindungsdichte: ${((stats.edgeCount * 2) / (stats.nodeCount * (stats.nodeCount - 1)) * 100).toFixed(1)}%\n\n`;
  
  output += `🏷️ Verfügbare Knoten:\n`;
  output += `─────────────────────\n`;
  stats.nodeIds.forEach(nodeId => {
    const degree = stats.connections.filter(c => c.source === nodeId || c.target === nodeId).length;
    output += `• ${nodeId} (Grad: ${degree})\n`;
  });
  
  output += `\n🔗 Verbindungen:\n`;
  output += `─────────────────\n`;
  stats.connections.forEach(connection => {
    output += `• ${connection.source} ↔ ${connection.target} (Gewicht: ${connection.weight})\n`;
  });
  
  output += `\n💡 Tipp: Kopieren Sie Knoten-IDs für die Auswahl`;
  
  updateOutput(output);
};

window.clearAlgorithmOutput = function() {
  updateOutput('DIJKSTRA VOYAGER wartet auf Befehle...');
};

// ===================================================================
// INICIALIZACIÓN
// ===================================================================
console.log("✅ DIJKSTRA VOYAGER completamente cargado");
console.log("🎯 Funciones disponibles:", {
  initializeApp: typeof window.initializeApp,
  loadRandomData: typeof window.loadRandomData,
  selectNodesManually: typeof window.selectNodesManually,
  runDijkstraWithLogging: typeof window.runDijkstraWithLogging,
  runDijkstraSilent: typeof window.runDijkstraSilent,
  resetGraphManual: typeof window.resetGraphManual,
  showGraphStats: typeof window.showGraphStats,
  clearAlgorithmOutput: typeof window.clearAlgorithmOutput
});

console.log("🎉 ¡Sistema listo para uso!");
