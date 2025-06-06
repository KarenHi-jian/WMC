//1.APPLICATION STATE OBJECT
// (Sin estado automático)

//2.DOM Node Refs
const btn_clear_1 = document.getElementById("btn_clear_1");
const btn_clear_2 = document.getElementById("btn_clear_2");
const btn_validate_1 = document.getElementById("btn_validate_1");
const btn_validate_2 = document.getElementById("btn_validate_2");
const btn_calculate = document.getElementById("btn_calculate");
const matrix_1 = document.getElementById("matrix_1");
const matrix_2 = document.getElementById("matrix_2");
const toastLiveExample = document.getElementById("liveToast");
const toast_body = document.getElementById("toast_body");
const output = document.getElementById("output");

//3.DOM Node Creation Fn's
// (Sin funciones de creación automática)

//4.RENDER FN
// (Sin render automático)

//5.EVENT HANDLERS - CONVERTIDOS A FUNCIONES MANUALES
function showToast({ msg, error }) {
    // Solo verifica si bootstrap está disponible
    if (typeof bootstrap !== 'undefined' && toastLiveExample && toast_body) {
        const toastBootstrap = bootstrap.Toast.getOrCreateInstance(
            toastLiveExample,
        );
        toastLiveExample.classList.remove("bg-danger");
        toastLiveExample.classList.add("bg-success");
        toastBootstrap.show();
        toast_body.textContent = msg;
        if (error) {
            toastLiveExample.classList.add("bg-danger");
            toastLiveExample.classList.remove("bg-success");
        }
    } else {
        // Fallback si no hay bootstrap o elementos
        if (error) {
            alert("Error: " + msg);
        } else {
            alert("Info: " + msg);
        }
    }
}

function matrix_toString(matrix) {
    return `  [\n${
        matrix.map((line) => `[${line.join(", ")}]`).join(",\n")
    }\n  ]`;
}

function validateMatrix(elt) {
    if (!elt || !elt.value) {
        showToast({ msg: "No matrix data to validate.", error: true });
        return false;
    }
    
    let matrix = elt.value;
    try {
        matrix = JSON.parse(matrix);
        if (!Array.isArray(matrix)) {
            throw new Error("Matrix is not an array.");
        }
        for (let i = 0; i < matrix.length; i++) {
            if (!Array.isArray(matrix[i])) {
                throw new Error(`Line ${i} is not an array.`);
            }
            for (let j = 0; j < matrix[i].length; j++) {
                if (typeof matrix[i][j] !== "number") {
                    throw new Error(`Line ${i}, column ${j} is not a number.`);
                }
            }
        }
        showToast({ msg: "Matrix is valid." });
        return true;
    } catch (error) {
        showToast({ msg: error.message, error: true });
        return false;
    }
}

function multiply() {
    try {
        // Validar antes de calcular
        if (!matrix_1.value || !matrix_2.value) {
            showToast({ msg: "Please enter both matrices.", error: true });
            return;
        }
        
        const matrix1 = JSON.parse(matrix_1.value);
        const matrix2 = JSON.parse(matrix_2.value);
        
        // Verificar que las matrices sean válidas
        if (!Array.isArray(matrix1) || !Array.isArray(matrix2)) {
            showToast({ msg: "Invalid matrix format.", error: true });
            return;
        }
        
        // Verificar que las matrices sean cuadradas y del mismo tamaño
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
        
        const n = matrix1.length;
        const rv = Array(n).fill().map(() => Array(n).fill(0));
        
        for (let z = 0; z < n; z++) {
            for (let s = 0; s < n; s++) {
                for (let i = 0; i < n; i++) {
                    rv[z][s] += matrix1[z][i] * matrix2[i][s];
                }
            }
        }
        
        output.textContent = matrix_toString(rv);
        showToast({ msg: "Matrix multiplication completed successfully!" });
        
    } catch (error) {
        showToast({ msg: "Error in calculation: " + error.message, error: true });
    }
}

// ✅ FUNCIONES MANUALES - Solo se ejecutan al hacer clic
function clearMatrix1() {
    if (matrix_1) {
        matrix_1.value = "";
        showToast({ msg: "Matrix 1 cleared." });
    }
}

function clearMatrix2() {
    if (matrix_2) {
        matrix_2.value = "";
        showToast({ msg: "Matrix 2 cleared." });
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

function clearOutput() {
    if (output) {
        output.textContent = "MATRIX VOYAGER wartet auf Befehle...";
        showToast({ msg: "Output cleared." });
    }
}

// ✅ FUNCIÓN PARA LLENAR MATRICES DE EJEMPLO
function loadExampleMatrices() {
    const example1 = [[1, 0, 1], [0, 1, 0], [1, 0, 1]];
    const example2 = [[0, 1, 0], [1, 0, 1], [0, 1, 0]];
    
    if (matrix_1 && matrix_2) {
        matrix_1.value = JSON.stringify(example1);
        matrix_2.value = JSON.stringify(example2);
        showToast({ msg: "Example matrices loaded!" });
    }
}

//6.INIT BINDINGS - ❌ REMOVIDO: Sin event listeners automáticos
// ANTES (automático):
// btn_clear_1.addEventListener("click", () => { matrix_1.value = ""; });
// btn_clear_2.addEventListener("click", () => { matrix_2.value = ""; });
// btn_validate_1.addEventListener("click", () => { validateMatrix(matrix_1); });
// btn_validate_2.addEventListener("click", () => { validateMatrix(matrix_2); });
// btn_calculate.addEventListener("click", multiply);

// DESPUÉS (manual): Se usan funciones onclick directamente en HTML

//7.INITIAL RENDER - ❌ REMOVIDO: Sin inicialización automática
// ANTES (automático):
// matrix_2.value = "";
// matrix_1.value = "";

// DESPUÉS (manual): El usuario decide qué hacer