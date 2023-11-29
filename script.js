document.addEventListener("DOMContentLoaded", cargarRecordatorios);

function cargarRecordatorios() {
    var recordatoriosGuardados = JSON.parse(localStorage.getItem("recordatorios")) || [];
    var listaRecordatorios = document.getElementById("listaRecordatorios");

    recordatoriosGuardados.forEach(recordatorio => listaRecordatorios.appendChild(crearElementoRecordatorio(recordatorio)));
}

function agregarRecordatorio() {
    var nuevoRecordatorio = document.getElementById("nuevoRecordatorio").value.trim();

    if (nuevoRecordatorio !== "") {
        var listaRecordatorios = document.getElementById("listaRecordatorios");
        listaRecordatorios.appendChild(crearElementoRecordatorio(nuevoRecordatorio));

        guardarRecordatoriosEnLocalStorage();

        document.getElementById("nuevoRecordatorio").value = "";
    }
}

function crearElementoRecordatorio(texto) {
    var divRecordatorio = document.createElement("div");
    divRecordatorio.classList.add("recordatorio-container");

    var pRecordatorio = document.createElement("p");
    pRecordatorio.textContent = texto;
    divRecordatorio.appendChild(pRecordatorio);

    var contenedorBotones = document.createElement("div");
    contenedorBotones.classList.add("botones-container");

    agregarBoton(contenedorBotones, "Eliminar", () => eliminarRecordatorio(divRecordatorio));
    agregarBoton(contenedorBotones, "Modificar", () => modificarRecordatorio(divRecordatorio, pRecordatorio));

    divRecordatorio.appendChild(contenedorBotones);
    return divRecordatorio;
}

function agregarBoton(padre, texto, eventoClick) {
    var boton = document.createElement("button");
    boton.textContent = texto;
    boton.addEventListener("click", eventoClick);
    padre.appendChild(boton);
}

function eliminarRecordatorio(elemento) {
    elemento.parentNode.removeChild(elemento);
    guardarRecordatoriosEnLocalStorage();
}

function modificarRecordatorio(elemento, parrafo) {
    var modificacion = prompt("Ingrese la modificación:");
    if (modificacion !== null && modificacion.trim() !== "") {
        parrafo.textContent = modificacion;
        guardarRecordatoriosEnLocalStorage();
    }
}

function guardarRecordatoriosEnLocalStorage() {
    var listaRecordatorios = document.getElementById("listaRecordatorios");
    var recordatorios = Array.from(listaRecordatorios.children).map(recordatorio => recordatorio.firstChild.textContent);

    localStorage.setItem("recordatorios", JSON.stringify(recordatorios));

    function mostrarInformacion() {
        var ventanaInfo = window.open("", "Información del Grupo", "width=600,height=400");
    
        var contenidoInfo = `
            <html>
                <head>
                    <title>Información del Grupo</title>
                    <link rel="stylesheet" href="styles.css">
                </head>
                <body>
                    <h2>Información del Grupo</h2>
                    <p>Carrera: Diseño Multimedial</p>
                    <p>Materia: Diseño y Programación Web I</p>
                    <p>Turno: Mañana</p>
                    <p>Año: 2023</p>
                    <p>Integrantes: Érica Denis Morel y Tomás Mangonnet</p>
               </body>
            </html>
        `;
    
        ventanaInfo.document.write(contenidoInfo);
    }
    
    
}