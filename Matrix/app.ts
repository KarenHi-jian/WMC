// js/app.ts - Clase principal de la aplicación
// PASO A PASO - Versión para principiantes

export class App {
    public dom_nodes: { [key: string]: HTMLElement };
    public graph: any; // Usar 'any' por simplicidad
    
    constructor() {
        this.dom_nodes = {};
        this.graph = null;
        this.initializeDOMNodes();
        this.initializeGraph();
    }
    
    private initializeDOMNodes(): void {
        // Buscar elementos del DOM
        this.dom_nodes["load-random"] = document.getElementById("load-random") || this.createLoadRandomButton();
        this.dom_nodes["graph-container"] = document.getElementById("graph-container") || this.createGraphContainer();
    }
    
    private createLoadRandomButton(): HTMLElement {
        const button = document.createElement("button");
        button.id = "load-random";
        button.className = "button";
        button.textContent = "🎲 Grafo aleatorio laden";
        button.onclick = () => this.loadRandomGraph();
        
        // Buscar donde agregar el botón
        const container = document.getElementById("algorithm-section");
        if (container) {
            const buttonContainer = document.createElement("div");
            buttonContainer.style.textAlign = "center";
            buttonContainer.style.margin = "10px 0";
            buttonContainer.appendChild(button);
            container.appendChild(buttonContainer);
        }
        
        return button;
    }
    
    private createGraphContainer(): HTMLElement {
        const container = document.createElement("div");
        container.id = "graph-container";
        container.style.width = "100%";
        container.style.height = "400px";
        container.style.border = "2px solid #00BFFF";
        container.style.borderRadius = "8px";
        container.style.marginTop = "20px";
        container.style.backgroundColor = "rgba(0, 0, 0, 0.3)";
        
        const algorithmSection = document.getElementById("algorithm-section");
        if (algorithmSection) {
            algorithmSection.appendChild(container);
        }
        
        return container;
    }
    
    private initializeGraph(): void {
        // Verificar que Cytoscape esté disponible
        if (typeof cytoscape === 'undefined') {
            console.error('Cytoscape no está cargado. Asegúrate de incluir el script.');
            return;
        }
        
        const container = this.dom_nodes["graph-container"];
        
        this.graph = cytoscape({
            container: container,
            
            elements: [
                // Nodos de ejemplo
                { data: { id: 'node1' } },
                { data: { id: 'node2' } },
                { data: { id: 'node3' } },
                { data: { id: 'node4' } },
                
                // Conexiones de ejemplo
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
                        'text-background-padding': '3px',
                        'font-size': '12px',
                        'font-weight': 'bold'
                    }
                }
            ],
            
            layout: {
                name: 'circle',
                radius: 150
            }
        });
        
        console.log('Grafo inicializado con éxito');
    }
    
    public loadRandomGraph(): void {
        console.log('Generando grafo aleatorio...');
        
        // Limpiar grafo actual
        this.graph.elements().remove();
        
        // Generar nodos aleatorios
        const nodeCount = Math.floor(Math.random() * 4) + 4; // 4-7 nodos
        const nodes = [];
        const edges = [];
        
        // Crear nodos
        for (let i = 1; i <= nodeCount; i++) {
            nodes.push({ data: { id: `node${i}` } });
        }
        
        // Asegurar que el grafo esté conectado
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
        
        // Agregar conexiones adicionales aleatorias
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
        this.graph.add([...nodes, ...edges]);
        
        // Aplicar layout
        this.graph.layout({
            name: 'circle',
            radius: 140
        }).run();
        
        console.log(`Grafo aleatorio: ${nodeCount} nodos, ${edges.length} conexiones`);
        
        // Actualizar output si existe
        const outputDiv = document.getElementById('algorithm-output');
        if (outputDiv) {
            outputDiv.textContent = `Grafo aleatorio generado: ${nodeCount} nodos, ${edges.length} conexiones.`;
        }
    }
    
    public getNodeById(nodeId: string): any {
        return this.graph.$(`#${nodeId}`);
    }
    
    public getAllNodes(): any[] {
        return this.graph.nodes();
    }
    
    public getAllEdges(): any[] {
        return this.graph.edges();
    }
}