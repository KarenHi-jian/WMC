//1.APPLICATION STATE OBJECT
// (Sin estado automático - ESPECIFICACIÓN DEL PROFESOR)

//2.DOM Node Refs - CORREGIDAS pero manteniendo filosofía manual
// CORRECCIÓN: Referencias seguras pero sin cambiar la filosofía
const btn_clear_1 = document.getElementById("btn_clear_1");          // Puede no existir
const btn_clear_2 = document.getElementById("btn_clear_2");          // Puede no existir  
const btn_validate_1 = document.getElementById("btn_validate_1");    // Puede no existir
const btn_validate_2 = document.getElementById("btn_validate_2");    // Puede no existir
const btn_calculate = document.getElementById("btn_calculate");      // Puede no existir
const matrix_1 = document.getElementById("matrix_1");                // REQUERIDO
const matrix_2 = document.getElementById("matrix_2");                // REQUERIDO
const toastLiveExample = document.getElementById("liveToast");       // Opcional
const toast_body = document.getElementById("toast_body");            // Opcional
const output = document.getElementById("output");                    // REQUERIDO

//3.DOM Node Creation Fn's
// (Sin funciones de creación automática - ESPECIFICACIÓN DEL PROFESOR)

//4.RENDER FN
// (Sin render automático - ESPECIFICACIÓN DEL PROFESOR)

//5.EVENT HANDLERS - CONVERTIDOS A FUNCIONES MANUALES
// ESPECIFICACIÓN DEL PROFESOR: Solo funciones onclick, sin event listeners

// CORREGIDA: Manejo robusto de Bootstrap
function showToast({ msg, error }) {
    // CORRECCIÓN: Verificación más robusta pero manteniendo lógica original
    if (typeof bootstrap !== 'undefined' && toastLiveExample && toast_body) {
        try {
            const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastLiveExample);
            toastLiveExample.classList.remove("bg-danger", "bg-success");
            toastLiveExample.classList.add(error ? "bg-danger" : "bg-success");
            toastBootstrap.show();
            toast_body.textContent = msg;
        } catch (bootstrapError) {
            // CORRECCIÓN: Fallback si Bootstrap falla
            console.warn("Bootstrap Toast error:", bootstrapError);
            if (error) {
                alert("Error: " + msg);
            } else {
                alert("Info: " + msg);
            }
        }
    } else {
        // Fallback original mantenido
        if (error) {
            alert("Error: " + msg);
        } else {
            alert("Info: " + msg);
        }
    }
}

// CORREGIDA: Formateo más robusto pero manteniendo lógica original
function matrix_toString(matrix) {
    // CORRECCIÓN: Verificación de entrada pero manteniendo formato original
    if (!Array.isArray(matrix) || matrix.length === 0) {
        return "Error: Invalid matrix format";
    }
    
    try {
        return `  [\n${
            matrix.map((line) => `[${line.join(", ")}]`).join(",\n")
        }\n  ]`;
    } catch (error) {
        return "Error formatting matrix: " + error.message;
    }
}

// CORREGIDA: Validación más robusta pero manteniendo estructura original
function validateMatrix(elt) {
    // CORRECCIÓN: Verificar elemento existe
    if (!elt) {
        showToast({ msg: "Matrix element not found.", error: true });
        return false;
    }
    
    if (!elt.value || elt.value.trim() === "") {
        showToast({ msg: "No matrix data to validate.", error: true });
        return false;
    }
    
    let matrix = elt.value;
    try {
        matrix = JSON.parse(matrix);
        if (!Array.isArray(matrix)) {
            throw new Error("Matrix is not an array.");
        }
        
        // CORRECCIÓN: Verificar matriz no vacía
        if (matrix.length === 0) {
            throw new Error("Matrix cannot be empty.");
        }
        
        // CORRECCIÓN: Verificar primera fila no vacía
        if (!Array.isArray(matrix[0]) || matrix[0].length === 0) {
            throw new Error("Matrix rows cannot be empty.");
        }
        
        const expectedLength = matrix[0].length;
        
        for (let i = 0; i < matrix.length; i++) {
            if (!Array.isArray(matrix[i])) {
                throw new Error(`Line ${i + 1} is not an array.`);
            }
            
            // CORRECCIÓN: Verificar filas de igual longitud
            if (matrix[i].length !== expectedLength) {
                throw new Error(`Line ${i + 1} has incorrect length. Expected: ${expectedLength}, got: ${matrix[i].length}`);
            }
            
            for (let j = 0; j < matrix[i].length; j++) {
                if (typeof matrix[i][j] !== "number" || isNaN(matrix[i][j])) {
                    throw new Error(`Line ${i + 1}, column ${j + 1} is not a valid number: "${matrix[i][j]}"`);
                }
            }
        }
        
        // CORRECCIÓN: Verificar matriz cuadrada
        if (matrix.length !== expectedLength) {
            throw new Error(`Matrix must be square. Got ${matrix.length}x${expectedLength}`);
        }
        
        showToast({ msg: `Matrix is valid (${matrix.length}x${matrix.length}).` });
        return true;
    } catch (error) {
        // CORRECCIÓN: Mejor manejo de errores JSON
        let errorMessage = error.message;
        if (error instanceof SyntaxError) {
            errorMessage = "Invalid JSON format. Use [[1,2],[3,4]] for 2x2 matrix.";
        }
        showToast({ msg: errorMessage, error: true });
        return false;
    }
}

// CORREGIDA: Multiplicación más robusta pero manteniendo algoritmo original
function multiply() {
    try {
        // CORRECCIÓN: Verificar elementos existen
        if (!matrix_1 || !matrix_2) {
            showToast({ msg: "Matrix input elements not found.", error: true });
            return;
        }
        
        // Validar antes de calcular - LÓGICA ORIGINAL MANTENIDA
        if (!matrix_1.value || !matrix_2.value) {
            showToast({ msg: "Please enter both matrices.", error: true });
            return;
        }
        
        const matrix1 = JSON.parse(matrix_1.value);
        const matrix2 = JSON.parse(matrix_2.value);
        
        // Verificar que las matrices sean válidas - LÓGICA ORIGINAL MANTENIDA
        if (!Array.isArray(matrix1) || !Array.isArray(matrix2)) {
            showToast({ msg: "Invalid matrix format.", error: true });
            return;
        }
        
        // CORRECCIÓN: Verificar matrices no vacías
        if (matrix1.length === 0 || matrix2.length === 0 || 
            !matrix1[0] || !matrix2[0] || 
            matrix1[0].length === 0 || matrix2[0].length === 0) {
            showToast({ msg: "Matrices cannot be empty.", error: true });
            return;
        }
        
        // Verificar que las matrices sean cuadradas y del mismo tamaño - LÓGICA ORIGINAL MANTENIDA
        const n1 = matrix1.length;
        const n2 = matrix2.length;
        
        if (n1 !== n2) {
            showToast({ msg: "Matrices must be the same size.", error: true });
            return;
        }
        
        if (matrix1[0].length !== n1 || matrix2[0].length !== n2) {
            showToast({ msg: "Matrices must be square.", error: true });
            return;
        }
        
        // ALGORITMO ORIGINAL MANTENIDO - Sin cambios
        const n = matrix1.length;
        const rv = Array(n).fill().map(() => Array(n).fill(0));
        
        for (let z = 0; z < n; z++) {
            for (let s = 0; s < n; s++) {
                for (let i = 0; i < n; i++) {
                    rv[z][s] += matrix1[z][i] * matrix2[i][s];
                }
            }
        }
        
        // CORRECCIÓN: Verificar elemento output existe
        if (!output) {
            showToast({ msg: "Output element not found.", error: true });
            return;
        }
        
        output.textContent = matrix_toString(rv);
        showToast({ msg: "Matrix multiplication completed successfully!" });
        
    } catch (error) {
        showToast({ msg: "Error in calculation: " + error.message, error: true });
    }
}

// ✅ FUNCIONES MANUALES - Solo se ejecutan al hacer clic
// ESPECIFICACIÓN DEL PROFESOR: Control manual, sin automático

// CORREGIDA: Verificación de elemento pero manteniendo lógica simple
function clearMatrix1() {
    if (matrix_1) {
        matrix_1.value = "";
        showToast({ msg: "Matrix 1 cleared." });
    } else {
        showToast({ msg: "Matrix 1 element not found.", error: true });
    }
}

// CORREGIDA: Verificación de elemento pero manteniendo lógica simple
function clearMatrix2() {
    if (matrix_2) {
        matrix_2.value = "";
        showToast({ msg: "Matrix 2 cleared." });
    } else {
        showToast({ msg: "Matrix 2 element not found.", error: true });
    }
}

function validateMatrix1() {
    validateMatrix(matrix_1);
}

function validateMatrix2() {
    validateMatrix(matrix_2);
}

function calculateMatrix() {
    multiply();
}

// CORREGIDA: Verificación de elemento output
function clearOutput() {
    if (output) {
        output.textContent = "MATRIX VOYAGER wartet auf Befehle...";
        showToast({ msg: "Output cleared." });
    } else {
        showToast({ msg: "Output element not found.", error: true });
    }
}

// ✅ FUNCIÓN PARA LLENAR MATRICES DE EJEMPLO
// CORREGIDA: Verificación de elementos pero manteniendo lógica simple
function loadExampleMatrices() {
    const example1 = [[1, 0, 1], [0, 1, 0], [1, 0, 1]];
    const example2 = [[0, 1, 0], [1, 0, 1], [0, 1, 0]];
    
    if (matrix_1 && matrix_2) {
        matrix_1.value = JSON.stringify(example1);
        matrix_2.value = JSON.stringify(example2);
        showToast({ msg: "Example matrices loaded!" });
    } else {
        showToast({ msg: "Matrix input elements not found.", error: true });
    }
}

//6.INIT BINDINGS - ❌ REMOVIDO: Sin event listeners automáticos
// ESPECIFICACIÓN DEL PROFESOR: Sin event listeners automáticos
// ANTES (automático):
// btn_clear_1.addEventListener("click", () => { matrix_1.value = ""; });
// btn_clear_2.addEventListener("click", () => { matrix_2.value = ""; });
// btn_validate_1.addEventListener("click", () => { validateMatrix(matrix_1); });
// btn_validate_2.addEventListener("click", () => { validateMatrix(matrix_2); });
// btn_calculate.addEventListener("click", multiply);

// DESPUÉS (manual): Se usan funciones onclick directamente en HTML
// ESPECIFICACIÓN DEL PROFESOR: onclick="functionName()" en el HTML

//7.INITIAL RENDER - ❌ REMOVIDO: Sin inicialización automática
// ESPECIFICACIÓN DEL PROFESOR: Sin inicialización automática
// ANTES (automático):
// matrix_2.value = "";
// matrix_1.value = "";

// DESPUÉS (manual): El usuario decide qué hacer
// ESPECIFICACIÓN DEL PROFESOR: Usuario tiene control total

// ✅ LOGGING PARA DEBUGGING (solo en consola, sin afectar UI)
// CORRECCIÓN: Logging opcional para desarrollo
console.log("✅ Matrix Voyager loaded - Manual mode (Professor specifications)");
console.log("📋 Available functions:", {
    clearMatrix1: typeof clearMatrix1,
    clearMatrix2: typeof clearMatrix2,
    validateMatrix1: typeof validateMatrix1,
    validateMatrix2: typeof validateMatrix2,
    calculateMatrix: typeof calculateMatrix,
    clearOutput: typeof clearOutput,
    loadExampleMatrices: typeof loadExampleMatrices
});

// CORRECCIÓN: Verificación silenciosa de elementos críticos
if (!matrix_1 || !matrix_2 || !output) {
    console.warn("⚠️ Some critical elements missing:", {
        matrix_1: !!matrix_1,
        matrix_2: !!matrix_2,
        output: !!output
    });
}