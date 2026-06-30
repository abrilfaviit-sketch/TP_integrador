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
    
    if (formularioLogin) {
        formularioLogin.addEventListener("submit", () => {
            const usuario = document.getElementById("usuario").value;
            localStorage.setItem("nombreAgente", usuario);
        });
    }
}


/*Manual principal y funcionalidad dinamica*/
function inicializarManual() {
    const nombreGuardado = localStorage.getItem("nombreAgente") || "Agente Anónimo";
    const bajadaTexto = document.querySelector(".bajada-texto");
    
    if (bajadaTexto) {
        bajadaTexto.innerHTML = `Bienvenida/o, <strong>Agente ${nombreGuardado}</strong>. En un mundo de apuntes infinitos, solo los mejores sobreviven.`;
    }

    /* Generador interactivo de consejos*/
    const panelConsejos = document.querySelector(".panel-consejos");
    
    if (panelConsejos) {
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

        botonConsejo.addEventListener("click", () => {
            mostrarConsejoAleatorio(consejosSupervivencia, contenedorTextoConsejo);
        });
    }

    /* Evento: Buscador principal en tiempo real (keyup)*/
    const inputBuscar = document.getElementById("buscador-global");
    if (inputBuscar) {
        inputBuscar.addEventListener("keyup", () => {
            ejecutarBusquedaGlobal(inputBuscar.value.toLowerCase());
        });
    }

    /* Evento: Botón del Calculador Académico */
    const btnCalcular = document.getElementById("btn-calcular-estado");
    if (btnCalcular) {
        btnCalcular.addEventListener("click", calcularEstadoAcademico);
    }

    /* Escuchador para los botones de filtro de villanos*/
    const botonesFiltro = document.querySelectorAll(".btn-filtro");
    botonesFiltro.forEach(boton => {
        boton.addEventListener("click", () => {
            const categoria = boton.getAttribute("data-villano");
            filtrarEnemigos(categoria);
        });
    });
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

    if (inputCelular) {
        inputCelular.addEventListener("input", () => {
            inputCelular.value = inputCelular.value.replace(/[^0-9]/g, '');
        });
    }

    if (formularioContacto) {
        formularioContacto.addEventListener("submit", (e) => {
            e.preventDefault(); 

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


/* Funciones de Soporte */

function filtrarEnemigos(tipoVillano) {
    const articulosVillanos = document.querySelectorAll(".bloque-villano");
    
    articulosVillanos.forEach(articulo => {
        const tipoArticulo = articulo.getAttribute("data-tipo");
        
        if (tipoVillano === "todos" || tipoArticulo === tipoVillano) {
            articulo.style.display = "block"; 
        } else {
            articulo.style.display = "none";  
        }
    });
}

function ejecutarBusquedaGlobal(palabraClave) {
    const bloquesContenido = document.querySelectorAll(".contenido-manual article, .panel-consejos, .seccion-calculador");

    bloquesContenido.forEach(bloque => {
        const textoBloque = bloque.textContent.toLowerCase();

        if (textoBloque.includes(palabraClave)) {
            bloque.style.display = ""; 
        } else {
            bloque.style.display = "none"; 
        }
    });
}

function calcularEstadoAcademico() {
    const nota1 = parseFloat(document.getElementById("nota-parcial1").value);
    const nota2 = parseFloat(document.getElementById("nota-parcial2").value);
    const asistencia = parseFloat(document.getElementById("porcentaje-asistencia").value);
    const cajaResultado = document.getElementById("resultado-estado");

    if (isNaN(nota1) || isNaN(nota2) || isNaN(asistencia) || 
        nota1 < 1 || nota1 > 10 || nota2 < 1 || nota2 > 10 || asistencia < 0 || asistencia > 100) {
        
        cajaResultado.style.display = "block";
        cajaResultado.style.backgroundColor = "#2a1215";
        cajaResultado.style.color = "#ff4a4a";
        cajaResultado.style.border = "1px solid #ff4a4a";
        cajaResultado.textContent = "⚠️ ERROR: Por favor, ingresá notas válidas (1 al 10) y asistencia (0 al 100%).";
        return; 
    }

    const promedio = (nota1 + nota2) / 2;

    let estadoFinal = "";
    let colorTexto = "";
    let colorFondo = "";
    let colorBorde = "";

    if (promedio >= 8 && asistencia >= 80) {
        estadoFinal = `🏆 ¡MISION CUMPLIDA! Estado: PROMOCIONADO. Promedio: ${promedio.toFixed(2)} | Asistencia: ${asistencia}%`;
        colorTexto = "#00ffcc";
        colorFondo = "#0c1f24";
        colorBorde = "#00ffcc";
    } else if (promedio >= 4 && asistencia >= 75) {
        estadoFinal = `⚖️ ESTADO: REGULARIZA. Vas a rendir examen final. Promedio: ${promedio.toFixed(2)} | Asistencia: ${asistencia}%`;
        colorTexto = "#ffcc00";
        colorFondo = "#24210c";
        colorBorde = "#ffcc00";
    } else {
        estadoFinal = `🚨 ALERTA: RECURSA EN LA PRÓXIMA MISIÓN. Promedio: ${promedio.toFixed(2)} o Asistencia: ${asistencia}% insuficientes.`;
        colorTexto = "#ff4a4a"; 
        colorFondo = "#2a1215";
        colorBorde = "#ff4a4a";
    }

    cajaResultado.style.display = "block";
    cajaResultado.style.color = colorTexto;
    cajaResultado.style.backgroundColor = colorFondo;
    cajaResultado.style.border = `1px solid ${colorBorde}`;
    cajaResultado.textContent = estadoFinal;
}

/* Escuchador independiente para el medidor de estudio (Contacto) */
document.addEventListener("DOMContentLoaded", function() {
    const barraNivel = document.getElementById("nivel-preparacion");
    const cajaMensaje = document.getElementById("mensaje-preparacion");

    if (barraNivel && cajaMensaje) {
        barraNivel.addEventListener("input", function() {
            const valor = parseInt(barraNivel.value);

            if (valor >= 85) {
                cajaMensaje.textContent = "⚡ ¡Wowww, genial! Estás muy preparado para el combate. ¡A romperla!";
                cajaMensaje.style.color = "#00ffcc"; 
            } else if (valor >= 50) {
                cajaMensaje.textContent = "⚔️ Nivel aceptable. Tenés estrategia, pero no te confíes en la batalla.";
                cajaMensaje.style.color = "#ffcc00"; 
            } else {
                cajaMensaje.textContent = "🚨 ¡Alerta! Vamos, estudiá un poco más que el enemigo no perdona.";
                cajaMensaje.style.color = "#ff4a4a"; 
            }
        });
        barraNivel.dispatchEvent(new Event("input"));
    }
});