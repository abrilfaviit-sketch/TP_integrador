/*Array de datos*/
const consejosSupervivencia = [
    "Llevar agua y galletitas, los parciales con hambre no se aprueban.",
    "Revisar el campus virtual antes de salir, por las dudas.",
    "Cargar la batería de la compu al 100% la noche anterior.",
    "No dejes para mañana el PDF que podés leer hoy.",
    "El mate no se le niega a ningún compañero de banco.",
    "Si el código no compila, caminá 5 minutos y volvé a mirar."
];

/*Espera a que el DOM esté completamente cargado*/
document.addEventListener("DOMContentLoaded", () => {
    
    /*identifica en q pagina esta ejecutando funciones*/
    if (document.querySelector(".body-login")) {
        inicializarLogin();
    }
    
    if (document.getElementById("introduccion")) {
        inicializarManual();
    }
    
    if (document.querySelector(".contacto-formulario")) {
        inicializarContacto();
    }
});


/*sistema de acceso*/
function inicializarLogin() {
    const formularioLogin = document.querySelector(".formulario-inicio");
    
    /*primer evento: submit */
    if (formularioLogin) {
        formularioLogin.addEventListener("submit", () => {
            const usuario = document.getElementById("usuario").value;
            /*Se guarda el nombre en el almacenamiento local para usarlo en el manual*/
            localStorage.setItem("nombreAgente", usuario);
        });
    }
}


/*Manual principal y funcionalidad dinamica*/
function inicializarManual() {
    /*Reemplaza el texto introductorio con el nombre del usuario*/
    const nombreGuardado = localStorage.getItem("nombreAgente") || "Agente Anónimo";
    const bajadaTexto = document.querySelector(".bajada-texto");
    
    /*DOM 1: modifica el texto de bienvenida personalizado*/
    if (bajadaTexto) {
        bajadaTexto.innerHTML = `Bienvenida/o, <strong>Agente ${nombreGuardado}</strong>. En un mundo de apuntes infinitos, solo los mejores sobreviven.`;
    }

    /* Generador interactivo de consejos*/
    const panelConsejos = document.querySelector(".panel-consejos");
    
    if (panelConsejos) {
        // DOM 2: Crear elementos dinámicamente*/
        const botonConsejo = document.createElement("button");
        botonConsejo.textContent = "GENERAR CONSEJO DE MISIÓN ALEATORIO";
        botonConsejo.className = "btn-mision"; 
        botonConsejo.style.marginTop = "15px";
        
        const contenedorTextoConsejo = document.createElement("p");
        contenedorTextoConsejo.style.fontStyle = "italic";
        contenedorTextoConsejo.style.color = "#00ffcc"; 
        contenedorTextoConsejo.style.marginTop = "10px";

        panelConsejos.appendChild(botonConsejo);
        panelConsejos.appendChild(contenedorTextoConsejo);

        // Segundo evento: click (Para disparar la función del array)*/
        botonConsejo.addEventListener("click", () => {
            /*Invoca a otra función pasándole el array*/
            mostrarConsejoAleatorio(consejosSupervivencia, contenedorTextoConsejo);
        });
    }
}

/* Procesar y calcular índice aleatorio del array*/
function mostrarConsejoAleatorio(lista, elementoDestino) {
    const indiceAleatorio = Math.floor(Math.random() * lista.length);
    elementoDestino.textContent = `💡 Consejo de campo: "${lista[indiceAleatorio]}"`;
}




/*validación y manejo de errores (formulario contacto)*/
function inicializarContacto() {
    const formularioContacto = document.querySelector("#contacto form");
    const inputCelular = document.querySelector("input[type='tel']");

    /*Tercer evento: input (Detecta cuando el usuario escriba en tiempo real)*/
    if (inputCelular) {
        inputCelular.addEventListener("input", () => {
            inputCelular.value = inputCelular.value.replace(/[^0-9]/g, '');
        });
    }

    if (formularioContacto) {
        formularioContacto.addEventListener("submit", (e) => {
            e.preventDefault(); 
            
            /*validación y manejo de errores*/
            try {
                const nombre = formularioContacto.querySelector("input[placeholder='Ingrese su nombre']").value.trim();
                const apellido = formularioContacto.querySelector("input[placeholder='Ingrese su apellido']").value.trim();
                const mensaje = formularioContacto.querySelector("textarea").value.trim();

                if (nombre === "" || apellido === "") {
                    throw new Error("Los campos de identidad obligatorios están vacíos.");
                }
                
                if (mensaje.length < 5) {
                    throw new Error("El mensaje secreto es demasiado corto. ¡Dejá un mensajito divino más detallado!");
                }

                alert(`¡Transmisión enviada con éxito, Agente ${nombre}! Tu reporte fue subido a la base de datos.`);
                formularioContacto.reset();

            } catch (error) {
                alert(`⚠️ ERROR DE TRÁNSITO: ${error.message}`);
            }
        });
    }
}