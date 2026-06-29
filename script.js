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

