// js/dijkstra-sinAuto.ts - Algoritmo Dijkstra
// PASO A PASO - Sin funciones automáticas

// Clase para manejar datos de nodos
class NodeHelper {
    static getDistance(node: any): number {
        return node.data("distance") || Infinity;
    }
    
    static setDistance(node: any, value: number): void {
        node.data("distance", value);
    }
    
    static getPrevious(node: any): any {
        const prevId = node.data("previous");
        if (!prevId) return null;
        return node.cy().getElementById(prevId);
    }
    
    static setPrevious(node: any, value: string | null): void {
        node.data("previous", value);
    }
    
    static isProcessed(node: any): boolean {
        return node.data("processed") || false;
    }
    
    static setProcessed(node: any, value: boolean = true): void {
        node.data("processed", value);
    }
    
    static reset(node: any): void {
        node.removeData("distance");
        node.removeData("previous");
        node.removeData("processed");
    }
    
    static toString(node: any): string {
        return `Node ${node.id()}: distance=${NodeHelper.getDistance(node)}, previous=${NodeHelper.getPrevious(node)?.id() || 'null'}, processed=${NodeHelper.isProcessed(node)}`;
    }
}

// Función principal del algoritmo Dijkstra
export function dijkstra(
    graph: any,
    startNode: any,
    endNode: any,
    enableLogging: boolean = false
): any[] {
    
    if (!graph || !startNode || !endNode) {
        console.error("Parámetros inválidos para Dijkstra");
        return [];
    }
    
    if (enableLogging) {
        console.log("=== INICIANDO DIJKSTRA ===");
        console.log(`Start: ${startNode.id()}, End: ${endNode.id()}`);
    }
    
    // Inicializar todos los nodos
    const allNodes = graph.nodes();
    for (let i = 0; i < allNodes.length; i++) {
        const node = allNodes[i];
        NodeHelper.setDistance(node, Infinity);
        NodeHelper.setPrevious(node, null);
        NodeHelper.setProcessed(node, false);
    }
    
    // El nodo inicial tiene distancia 0
    NodeHelper.setDistance(startNode, 0);
    
    // Conjunto de nodos no procesados
    const unprocessed = new Set();
    for (let i = 0; i < allNodes.length; i++) {
        unprocessed.add(allNodes[i].id());
    }
    
    // Algoritmo principal
    while (unprocessed.size > 0) {
        // Encontrar el nodo no procesado con menor distancia
        let currentNode: any = null;
        let minDistance = Infinity;
        
        for (const nodeId of unprocessed) {
            const node = graph.getElementById(nodeId);
            const distance = NodeHelper.getDistance(node);
            
            if (distance < minDistance) {
                minDistance = distance;
                currentNode = node;
            }
        }
        
        // Si no hay nodo alcanzable, terminar
        if (!currentNode || minDistance === Infinity) {
            if (enableLogging) {
                console.log("No hay más nodos alcanzables");
            }
            break;
        }
        
        // Si llegamos al destino, terminar
        if (currentNode.id() === endNode.id()) {
            if (enableLogging) {
                console.log(`¡Destino encontrado! ${currentNode.id()}`);
            }
            break;
        }
        
        // Marcar como procesado
        unprocessed.delete(currentNode.id());
        NodeHelper.setProcessed(currentNode, true);
        
        if (enableLogging) {
            console.log(`Procesando: ${NodeHelper.toString(currentNode)}`);
        }
        
        // Examinar todos los vecinos
        const edges = currentNode.connectedEdges();
        for (let i = 0; i < edges.length; i++) {
            const edge = edges[i];
            const neighbor = edge.source().id() === currentNode.id() ? 
                edge.target() : edge.source();
            
            // Solo procesar vecinos no procesados
            if (!unprocessed.has(neighbor.id())) {
                continue;
            }
            
            const edgeWeight = edge.data("weight") || 1;
            const currentDistance = NodeHelper.getDistance(currentNode);
            const newDistance = currentDistance + edgeWeight;
            const neighborDistance = NodeHelper.getDistance(neighbor);
            
            // Si encontramos un camino más corto
            if (newDistance < neighborDistance) {
                NodeHelper.setDistance(neighbor, newDistance);
                NodeHelper.setPrevious(neighbor, currentNode.id());
                
                if (enableLogging) {
                    console.log(`  Actualizando vecino: ${neighbor.id()} -> distancia: ${newDistance}`);
                }
            }
        }
    }
    
    // Reconstruir el camino
    const path = [];
    let current = endNode;
    
    while (current !== null) {
        path.unshift(current);
        current = NodeHelper.getPrevious(current);
        
        // Evitar bucles infinitos
        if (path.length > allNodes.length) {
            console.error("Error: bucle infinito detectado en la reconstrucción del camino");
            return [];
        }
    }
    
    // Verificar si se encontró un camino válido
    if (path.length === 0 || path[0].id() !== startNode.id()) {
        if (enableLogging) {
            console.log("No se encontró camino al destino");
        }
        return [];
    }
    
    if (enableLogging) {
        console.log("=== CAMINO ENCONTRADO ===");
        const pathIds = path.map(node => node.id());
        console.log(`Camino: ${pathIds.join(" → ")}`);
        console.log(`Distancia total: ${NodeHelper.getDistance(endNode)}`);
    }
    
    return path;
}

// Versión con logging habilitado
export function dijkstraWithLogging(graph: any, startNode: any, endNode: any): any[] {
    return dijkstra(graph, startNode, endNode, true);
}

// Versión silenciosa
export function dijkstraSilent(graph: any, startNode: any, endNode: any): any[] {
    return dijkstra(graph, startNode, endNode, false);
}

// Función para resetear todos los nodos del grafo
export function resetGraph(graph: any): void {
    const allNodes = graph.nodes();
    for (let i = 0; i < allNodes.length; i++) {
        NodeHelper.reset(allNodes[i]);
    }
    console.log("Grafo reseteado - todos los datos de Dijkstra eliminados");
}

// Función para obtener estadísticas del grafo
export function getGraphStats(graph: any): {
    nodeCount: number;
    edgeCount: number;
    averageDegree: number;
    isConnected: boolean;
} {
    const nodes = graph.nodes();
    const edges = graph.edges();
    const nodeCount = nodes.length;
    const edgeCount = edges.length;
    
    // Calcular grado promedio
    const averageDegree = nodeCount > 0 ? (edgeCount * 2) / nodeCount : 0;
    
    // Verificar si el grafo está conectado (simplificado)
    let isConnected = true;
    if (nodeCount > 1) {
        // Usar BFS simple para verificar conectividad
        const visited = new Set();
        const queue = [nodes[0]];
        visited.add(nodes[0].id());
        
        while (queue.length > 0) {
            const current = queue.shift();
            const neighbors = current.connectedEdges();
            
            for (let i = 0; i < neighbors.length; i++) {
                const edge = neighbors[i];
                const neighbor = edge.source().id() === current.id() ? 
                    edge.target() : edge.source();
                
                if (!visited.has(neighbor.id())) {
                    visited.add(neighbor.id());
                    queue.push(neighbor);
                }
            }
        }
        
        isConnected = visited.size === nodeCount;
    }
    
    return {
        nodeCount,
        edgeCount,
        averageDegree,
        isConnected
    };
}

// Función para destacar el camino en el grafo
export function highlightPath(graph: any, path: any[]): void {
    // Resetear estilos
    graph.nodes().style({
        'background-color': '#00BFFF',
        'border-color': '#87CEFA'
    });
    
    graph.edges().style({
        'line-color': '#87CEFA',
        'width': 4
    });
    
    // Destacar nodos del camino
    for (let i = 0; i < path.length; i++) {
        const node = path[i];
        if (i === 0) {
            // Nodo inicial - verde
            node.style({
                'background-color': '#32CD32',
                'border-color': '#228B22'
            });
        } else if (i === path.length - 1) {
            // Nodo final - rojo
            node.style({
                'background-color': '#FF6347',
                'border-color': '#DC143C'
            });
        } else {
            // Nodos intermedios - amarillo
            node.style({
                'background-color': '#FFD700',
                'border-color': '#FFA500'
            });
        }
    }
    
    // Destacar aristas del camino
    for (let i = 0; i < path.length - 1; i++) {
        const currentNode = path[i];
        const nextNode = path[i + 1];
        
        // Encontrar la arista entre estos nodos
        const edge = currentNode.edgesWith(nextNode);
        if (edge.length > 0) {
            edge.style({
                'line-color': '#FF6347',
                'width': 6
            });
        }
    }
}

// Exportar la clase helper también
export { NodeHelper };