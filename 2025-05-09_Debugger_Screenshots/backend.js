
const adj1 = [
    [0, 1, 0],
    [1, 0, 1],
    [0, 1, 0],
];

const adj2 = [
    [0, 1, 1],
    [1, 0, 1],
    [1, 1, 0],
];

function printAdj(matrix) {
    console.log("Matriz:");
    for (let i = 0; i < matrix.length; i++) {
        console.log(`Fila ${i}: ${matrix[i].join(" ")}`);
    }
}


function multiply(m_A, m_B) {
    const n = m_A.length;
    const result = [];
    
    
    for (let i = 0; i < n; i++) {
        result.push(new Array(n).fill(0));
    }
    
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < n; j++) {
            let sum = 0;
            for (let k = 0; k < n; k++) {
                sum += m_A[i][k] * m_B[k][j];
            }
            result[i][j] = sum;
        }
    }
    
    return result;
}

console.log("=== PROGRAMA DE MATRICES ===\n");

console.log("Matriz 1:");
printAdj(adj1);

console.log("\nMatriz 2:");
printAdj(adj2);

const producto = multiply(adj1, adj2);
console.log("\nResultado de la multiplicación:");
printAdj(producto);

const cuadrado = multiply(adj2, adj2);
console.log("\nMatriz 2 al cuadrado:");
printAdj(cuadrado);