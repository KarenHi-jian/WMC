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

// Verificar dependencias al cargar
document.addEventListener('DOMContentLoaded', function() {
  if (typeof cytoscape === 'undefined') {
    console.error('❌ Cytoscape no disponible. Asegúrate de cargar la librería.');
    updateOutput('❌ Error: Cytoscape.js no cargado.\nPor favor recarga la página.');
  } else {
    console.log('✅ Cytoscape disponible');
  }
});

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
    
    // Limpiar contenedor
    this.container.innerHTML = '';
    
    // Crear instancia de Cytoscape
    this.cy = cytoscape({
      container: this.container,
      
      elements: [
        // Nodos iniciales
        { data: { id: 'node1' } },
        { data: { id: 'node2' } },
        { data: { id: 'node3' } },
        { data: { id: 'node4' } },
        // Aristas con pesos
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
            'font-weight': 'bold',
            'width': 50,
            'height': 50,
            'border-width': 2,
            'border-color': '#87CEFA'
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
            'font-size': '12px',
            'font-weight': 'bold'
          }
        },
        {
          selector: '.start-node',
          style: { 
            'background-color': '#00FF00',
            'border-color': '#00AA00',
            'border-width': 3
          }
        },
        {
          selector: '.end-node',
          style: { 
            'background-color': '#FF0000',
            'border-color': '#AA0000',
            'border-width': 3
          }
        },
        {
          selector: '.path-node',
          style: { 
            'background-color': '#FFFF00',
            'border-color': '#CCCC00',
            'border-width': 3
          }
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
      
      layout: { 
        name: 'circle', 
        radius: 150,
        padding: 30
      }
    });
    
    console.log('✅ Grafo inicializado correctamente');
  }
  
  loadRandom() {
    // Eliminar elementos existentes
    this.cy.elements().remove();
    
    const nodeCount = Math.floor(Math.random() * 4) + 4; // 4-7 nodos
    const nodes = [];
    const edges = [];
    
    // Crear nodos
    for (let i = 1; i <= nodeCount; i++) {
      nodes.push({ data: { id: `node${i}` } });
    }
    
    // Crear conexiones básicas para garantizar conectividad
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
        if (Math.random() > 0.6) { // 40% probabilidad
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
    
    // Agregar elementos al grafo
    this.cy.add([...nodes, ...edges]);
    
    // Aplicar layout
    this.cy.layout({ 
      name: 'circle', 
      radius: 140,
      padding: 30
    }).run();
    
    return { nodes: nodeCount, edges: edges.length };
  }
  
  reset() {
    // Limpiar clases de estilo
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
  
  // Inicialización de estructuras de datos
  const distances = {};
  const previous = {};
  const unvisited = new Set();
  
  // Inicializar distancias y conjunto de no visitados
  nodes.forEach(node => {
    const id = node.id();
    distances[id] = id === startId ? 0 : Infinity;
    previous[id] = null;
    unvisited.add(id);
  });
  
  // Log para seguimiento del algoritmo
  const log = [
    `🚀 Iniciando algoritmo de Dijkstra`,
    `📍 Origen: ${startId}`,
    `🎯 Destino: ${endId}`,
    `═══════════════════════════════════`,
    `🔧 Algoritmo inicializado con ${nodes.length} nodos`,
    `📊 Distancias iniciales: ${JSON.stringify(distances)}`
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
    
    // Si no hay más nodos alcanzables
    if (currentNode === null || distances[currentNode] === Infinity) {
      log.push(`❌ No hay más nodos alcanzables desde ${startId}`);
      break;
    }
    
    // Marcar como visitado
    unvisited.delete(currentNode);
    log.push(`🔍 Visitando nodo: ${currentNode} (distancia: ${distances[currentNode]})`);
    
    // Si llegamos al destino, podemos terminar
    if (currentNode === endId) {
      log.push(`✅ ¡Destino ${endId} alcanzado!`);
      break;
    }
    
    // Examinar todos los vecinos del nodo actual
    const neighbors = edges.filter(edge => 
      edge.source().id() === currentNode || edge.target().id() === currentNode
    );
    
    neighbors.forEach(edge => {
      // Determinar el vecino
      const neighborId = edge.source().id() === currentNode ? 
        edge.target().id() : edge.source().id();
      
      // Solo procesar si no ha sido visitado
      if (unvisited.has(neighborId)) {
        const weight = edge.data('weight') || 1;
        const newDistance = distances[currentNode] + weight;
        
        // Si encontramos un camino más corto
        if (newDistance < distances[neighborId]) {
          distances[neighborId] = newDistance;
          previous[neighborId] = currentNode;
          log.push(`    📊 Actualizando ${neighborId}: nueva distancia ${newDistance} (arista peso: ${weight})`);
        }
      }
    });
    
    log.push(`    🗺️ Estado actual: ${JSON.stringify(distances)}`);
  }
  
  // Reconstruir el camino más corto
  const path = [];
  let current = endId;
  
  while (current !== null) {
    path.unshift(current);
    current = previous[current];
  }
  
  // Verificar si se encontró un camino válido
  if (path[0] !== startId) {
    log.push(`❌ No existe camino de ${startId} a ${endId}`);
    return { path: [], distance: Infinity, log };
  }
  
  // Calcular nodos visitados
  const visitedNodes = [];
  nodes.forEach(node => {
    if (distances[node.id()] !== Infinity) {
      visitedNodes.push(node.id());
    }
  });
  
  // Agregar resultado final al log
  log.push(`═══════════════════════════════════`);
  log.push(`✅ ¡Camino más corto encontrado!`);
  log.push(`📏 Distancia total: ${distances[endId]}`);
  log.push(`🛤️ Camino óptimo: ${path.join(' → ')}`);
  log.push(`👁️ Nodos visitados: ${visitedNodes.join(', ')}`);
  log.push(`🎯 Número de saltos: ${path.length - 1}`);
  
  return { 
    path, 
    distance: distances[endId], 
    log, 
    visited: visitedNodes,
    allDistances: distances 
  };
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
// FUNCIONES GLOBALES PARA LOS BOTONES HTML
// ===================================================================

window.initializeApp = function() {
  try {
    if (typeof cytoscape === 'undefined') {
      updateOutput('❌ Error: Cytoscape.js no está disponible.\nPor favor recarga la página.');
      return;
    }
    
    dijkstraApp = new DijkstraApp();
    dijkstraGraph = dijkstraApp.cy;
    
    const status = document.getElementById('app-status');
    if (status) {
      status.innerHTML = 'App-Status: Initialisiert ✅';
      status.style.color = '#00FF00';
    }
    
    updateOutput('🚀 DIJKSTRA VOYAGER erfolgreich initialisiert!\n\n✅ Graph mit 4 Knoten erstellt\n✅ Cytoscape.js geladen\n✅ Bereit für Pfadfindung!\n\n💡 Nächste Schritte:\n1. Optional: "Zufällige Daten" laden\n2. Start- und Zielknoten eingeben\n3. "Knoten auswählen" klicken\n4. Dijkstra-Algorithmus ausführen\n\n📚 Professionelle Implementierung aktiv');
    console.log('✅ App inicializada correctamente');
  } catch (error) {
    console.error('❌ Error al inicializar:', error);
    updateOutput('❌ Error al inicializar: ' + error.message + '\n\nVerifique que todas las librerías estén cargadas.');
  }
};

window.loadRandomData = function() {
  if (!dijkstraApp) {
    updateOutput('❌ App nicht initialisiert!\n\nBitte klicken Sie zuerst auf\n"App initialisieren"');
    return;
  }
  
  try {
    const result = dijkstraApp.loadRandom();
    selectedStart = null;
    selectedEnd = null;
    
    // Limpiar inputs
    const startInput = document.getElementById('start-node');
    const endInput = document.getElementById('end-node');
    if (startInput) startInput.value = '';
    if (endInput) endInput.value = '';
    
    updateOutput(`🎲 Zufälliger Graph erfolgreich geladen!\n\n📊 Statistiken:\n• Knoten: ${result.nodes}\n• Verbindungen: ${result.edges}\n• Typ: Zufällig generiert\n\n💡 Tipp:\nVerwenden Sie "Graph-Statistiken"\num verfügbare Knoten zu sehen\n\n⚠️ Neue Knotenauswahl erforderlich`);
    console.log('✅ Datos aleatorios cargados:', result);
  } catch (error) {
    console.error('❌ Error:', error);
    updateOutput('❌ Error beim Laden der Daten: ' + error.message);
  }
};

window.clearApp = function() {
  try {
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
    
    updateOutput('🗑️ App erfolgreich gelöscht\n\n✅ Alle Daten zurückgesetzt\n✅ Speicher freigegeben\n✅ Bereit für Neuinitialisierung\n\n💡 Klicken Sie auf "App initialisieren"\num neu zu beginnen');
    console.log('✅ App limpiada correctamente');
  } catch (error) {
    console.error('❌ Error:', error);
    updateOutput('❌ Error beim Löschen: ' + error.message);
  }
};

window.selectNodesManually = function() {
  if (!dijkstraApp) {
    updateOutput('❌ App nicht initialisiert!\n\nBitte zuerst "App initialisieren" klicken');
    return;
  }
  
  const startInput = document.getElementById('start-node');
  const endInput = document.getElementById('end-node');
  
  if (!startInput || !endInput) {
    updateOutput('❌ Eingabefelder nicht gefunden\n\nBitte Seite neu laden');
    return;
  }
  
  const startId = startInput.value.trim();
  const endId = endInput.value.trim();
  
  if (!startId || !endId) {
    updateOutput('❌ Leere Eingabefelder!\n\nBitte geben Sie Start- und Zielknoten ein\n\n💡 Beispiel:\n• Start-Knoten: node1\n• Ziel-Knoten: node3\n\nTipp: Verwenden Sie "Graph-Statistiken"\num verfügbare Knoten zu sehen');
    return;
  }
  
  const startNode = dijkstraGraph.$('#' + startId);
  const endNode = dijkstraGraph.$('#' + endId);
  
  if (startNode.length === 0) {
    updateOutput(`❌ Start-Knoten "${startId}" nicht gefunden!\n\nVerfügbare Knoten anzeigen:\n→ Klicken Sie "Graph-Statistiken"\n\n💡 Knoten-IDs sind case-sensitive`);
    return;
  }
  
  if (endNode.length === 0) {
    updateOutput(`❌ Ziel-Knoten "${endId}" nicht gefunden!\n\nVerfügbare Knoten anzeigen:\n→ Klicken Sie "Graph-Statistiken"\n\n💡 Knoten-IDs sind case-sensitive`);
    return;
  }
  
  if (startId === endId) {
    updateOutput('❌ Ungültige Auswahl!\n\nStart- und Zielknoten müssen\nunterschiedlich sein\n\n💡 Wählen Sie zwei verschiedene Knoten');
    return;
  }
  
  // Reset visual styles
  dijkstraApp.reset();
  
  // Marcar nodos seleccionados
  startNode.addClass('start-node');
  endNode.addClass('end-node');
  
  selectedStart = startId;
  selectedEnd = endId;
  
  updateOutput(`✅ Knoten erfolgreich ausgewählt!\n\n🟢 Start-Knoten: ${startId}\n🔴 Ziel-Knoten: ${endId}\n\n🚀 System bereit für Dijkstra-Algorithmus!\n\n💡 Nächster Schritt:\nKlicken Sie auf einen der Dijkstra-Buttons:\n• "Dijkstra mit Logging" (detailliert)\n• "Dijkstra stumm" (nur Ergebnis)`);
  console.log('✅ Nodos seleccionados:', { start: startId, end: endId });
};

window.runDijkstraWithLogging = function() {
  if (!dijkstraApp || !selectedStart || !selectedEnd) {
    updateOutput('❌ Voraussetzungen nicht erfüllt!\n\nPrüfen Sie:\n✅ App initialisiert?\n✅ Start-Knoten eingegeben?\n✅ Ziel-Knoten eingegeben?\n✅ "Knoten auswählen" geklickt?\n\nDann: Dijkstra ausführen');
    return;
  }
  
  try {
    // Reset y marcar nodos
    dijkstraApp.reset();
    dijkstraGraph.$('#' + selectedStart).addClass('start-node');
    dijkstraGraph.$('#' + selectedEnd).addClass('end-node');
    
    // Ejecutar algoritmo
    const result = dijkstra(dijkstraGraph, selectedStart, selectedEnd);
    
    let output = `📊 DIJKSTRA MIT VOLLSTÄNDIGEM LOGGING\n\n`;
    output += `📍 Start: ${selectedStart} → 🎯 Ziel: ${selectedEnd}\n`;
    output += `═══════════════════════════════════\n\n`;
    
    if (result.distance === Infinity) {
      output += `❌ KEIN PFAD GEFUNDEN!\n\n`;
      output += `Die Knoten ${selectedStart} und ${selectedEnd}\nsind nicht miteinander verbunden.\n\n`;
      output += `💡 Lösungsvorschläge:\n`;
      output += `• Andere Knoten auswählen\n`;
      output += `• Zufällige Daten laden\n`;
      output += `• Graph-Statistiken prüfen`;
    } else {
      output += `✅ KÜRZESTER PFAD ERFOLGREICH GEFUNDEN!\n\n`;
      output += `🏆 OPTIMALES ERGEBNIS:\n`;
      output += `📏 Gesamtdistanz: ${result.distance}\n`;
      output += `🛤️ Optimaler Pfad: ${result.path.join(' → ')}\n`;
      output += `👁️ Besuchte Knoten: ${result.visited.join(', ')}\n`;
      output += `🎯 Anzahl Hops: ${result.path.length - 1}\n`;
      output += `⚡ Effizienz: ${((result.visited.length / dijkstraGraph.nodes().length) * 100).toFixed(1)}% Knoten besucht\n\n`;
      
      // Visualizar camino en el grafo
      for (let i = 0; i < result.path.length - 1; i++) {
        const edge = dijkstraGraph.edges().filter(edge => 
          (edge.source().id() === result.path[i] && edge.target().id() === result.path[i + 1]) ||
          (edge.source().id() === result.path[i + 1] && edge.target().id() === result.path[i])
        );
        edge.addClass('path-edge');
      }
      
      // Marcar nodos del camino (excluyendo start y end)
      result.path.slice(1, -1).forEach(nodeId => {
        dijkstraGraph.$('#' + nodeId).addClass('path-node');
      });
    }
    
    output += `\n📋 DETAILLIERTES ALGORITHMUS-LOG:\n`;
    output += `─────────────────────────────────────\n`;
    result.log.forEach(logEntry => {
      output += logEntry + '\n';
    });
    
    updateOutput(output);
    console.log('✅ Dijkstra con logging ejecutado:', result);
  } catch (error) {
    console.error('❌ Error:', error);
    updateOutput('❌ Error beim Ausführen von Dijkstra: ' + error.message);
  }
};

window.runDijkstraSilent = function() {
  if (!dijkstraApp || !selectedStart || !selectedEnd) {
    updateOutput('❌ Voraussetzungen nicht erfüllt!\n\nBenötigt:\n1. App initialisieren\n2. Knoten auswählen\n3. Dijkstra ausführen');
    return;
  }
  
  try {
    // Reset y marcar nodos
    dijkstraApp.reset();
    dijkstraGraph.$('#' + selectedStart).addClass('start-node');
    dijkstraGraph.$('#' + selectedEnd).addClass('end-node');
    
    // Ejecutar algoritmo
    const result = dijkstra(dijkstraGraph, selectedStart, selectedEnd);
    
    let output = `🔇 DIJKSTRA STUMM (NUR ERGEBNIS)\n\n`;
    output += `📍 Start: ${selectedStart} → 🎯 Ziel: ${selectedEnd}\n`;
    output += `═══════════════════════════════════\n\n`;
    
    if (result.distance === Infinity) {
      output += `❌ KEIN PFAD VERFÜGBAR\n\n`;
      output += `Verbindung zwischen ${selectedStart} und ${selectedEnd}\nnicht möglich.\n\n`;
      output += `💡 Versuchen Sie andere Knoten oder\nladen Sie zufällige Daten.`;
    } else {
      output += `✅ PFADFINDUNG ERFOLGREICH\n\n`;
      output += `🏆 ENDERGEBNIS:\n`;
      output += `📏 Kürzeste Distanz: ${result.distance}\n`;
      output += `🛤️ Optimaler Pfad: ${result.path.join(' → ')}\n`;
      output += `🎯 Anzahl Hops: ${result.path.length - 1}\n`;
      output += `👁️ Besuchte Knoten: ${result.visited.length} von ${dijkstraGraph.nodes().length}\n`;
      output += `⚡ Algorithmus-Effizienz: ${((result.visited.length / dijkstraGraph.nodes().length) * 100).toFixed(1)}%\n\n`;
      output += `✨ Pfad visuell im Graph hervorgehoben`;
      
      // Visualizar camino
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
    console.log('✅ Dijkstra silencioso ejecutado:', result);
  } catch (error) {
    console.error('❌ Error:', error);
    updateOutput('❌ Error beim Ausführen: ' + error.message);
  }
};

window.resetGraphManual = function() {
  if (!dijkstraApp) {
    updateOutput('❌ App nicht initialisiert!\n\nBitte zuerst "App initialisieren" klicken');
    return;
  }
  
  try {
    dijkstraApp.reset();
    selectedStart = null;
    selectedEnd = null;
    
    const startInput = document.getElementById('start-node');
    const endInput = document.getElementById('end-node');
    if (startInput) startInput.value = '';
    if (endInput) endInput.value = '';
    
    updateOutput('🔄 Graph erfolgreich zurückgesetzt!\n\n✅ Alle visuellen Markierungen entfernt\n✅ Knoten-Auswahl gelöscht\n✅ Eingabefelder geleert\n✅ Bereit für neue Auswahl\n\n💡 Nächste Schritte:\n1. Start- und Zielknoten eingeben\n2. "Knoten auswählen" klicken\n3. Dijkstra-Algorithmus ausführen');
    console.log('✅ Graph reseteado correctamente');
  } catch (error) {
    console.error('❌ Error:', error);
    updateOutput('❌ Error beim Zurücksetzen: ' + error.message);
  }
};

window.showGraphStats = function() {
  if (!dijkstraApp) {
    updateOutput('❌ App nicht initialisiert!\n\nBitte zuerst "App initialisieren" klicken');
    return;
  }
  
  try {
    const stats = dijkstraApp.getStats();
    
    let output = `📈 DETAILLIERTE GRAPH-STATISTIKEN\n\n`;
    output += `📊 ÜBERSICHT:\n`;
    output += `─────────────────────\n`;
    output += `🔸 Anzahl Knoten: ${stats.nodeCount}\n`;
    output += `🔗 Anzahl Kanten: ${stats.edgeCount}\n`;
    output += `🌐 Verbindungsdichte: ${((stats.edgeCount * 2) / (stats.nodeCount * (stats.nodeCount - 1)) * 100).toFixed(1)}%\n`;
    output += `📐 Durchschnittlicher Grad: ${(stats.edgeCount * 2 / stats.nodeCount).toFixed(1)}\n\n`;
    
    output += `🏷️ VERFÜGBARE KNOTEN:\n`;
    output += `─────────────────────────\n`;
    stats.nodeIds.forEach(nodeId => {
      const degree = stats.connections.filter(c => c.source === nodeId || c.target === nodeId).length;
      const neighbors = stats.connections
        .filter(c => c.source === nodeId || c.target === nodeId)
        .map(c => c.source === nodeId ? c.target : c.source);
      output += `• ${nodeId} (Grad: ${degree}) → Verbunden mit: ${neighbors.join(', ')}\n`;
    });
    
    output += `\n🔗 ALLE VERBINDUNGEN:\n`;
    output += `─────────────────────────\n`;
    stats.connections.forEach(connection => {
      output += `• ${connection.source} ↔ ${connection.target} (Gewicht: ${connection.weight})\n`;
    });
    
    output += `\n💡 USAGE TIPPS:\n`;
    output += `─────────────────\n`;
    output += `• Kopieren Sie Knoten-IDs für die Eingabe\n`;
    output += `• Höheres Gewicht = längere Distanz\n`;
    output += `• Alle Knoten sind über Pfade erreichbar\n`;
    output += `• Case-sensitive: "node1" ≠ "Node1"`;
    
    updateOutput(output);
    console.log('✅ Estadísticas mostradas:', stats);
  } catch (error) {
    console.error('❌ Error:', error);
    updateOutput('❌ Error beim Anzeigen der Statistiken: ' + error.message);
  }
};

window.clearAlgorithmOutput = function() {
  updateOutput('DIJKSTRA VOYAGER wartet auf Befehle...\n\n💡 Verfügbare Aktionen:\n• App initialisieren\n• Zufällige Daten laden\n• Graph-Statistiken anzeigen\n• Knoten auswählen\n• Dijkstra-Algorithmus ausführen');
};

// ===================================================================
// INICIALIZACIÓN Y LOG
// ===================================================================
console.log("✅ DIJKSTRA VOYAGER completamente cargado");
console.log("🎯 Funciones globales disponibles:", {
  initializeApp: typeof window.initializeApp,
  loadRandomData: typeof window.loadRandomData,
  selectNodesManually: typeof window.selectNodesManually,
  runDijkstraWithLogging: typeof window.runDijkstraWithLogging,
  runDijkstraSilent: typeof window.runDijkstraSilent,
  resetGraphManual: typeof window.resetGraphManual,
  showGraphStats: typeof window.showGraphStats,
  clearAlgorithmOutput: typeof window.clearAlgorithmOutput
});

console.log("🎉 ¡Sistema completamente funcional! Haga clic en la pestaña 'Dijkstra' para comenzar.");

// Auto-verificación al final de la carga
setTimeout(() => {
  if (typeof cytoscape !== 'undefined') {
    console.log('🟢 Verificación final: Todas las dependencias están disponibles');
  } else {
    console.warn('🟡 Advertencia: Cytoscape.js podría no estar disponible');
  }
}, 100);