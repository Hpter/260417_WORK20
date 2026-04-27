// Declaración de variables
let listaInscripciones = []
let indiceEdicion = null

const campoNombrePersona = document.getElementById('nombrePersona')
const campoActividadSeleccionada = document.getElementById('actividadSeleccionada')
const botonGuardar = document.getElementById('botonGuardar')
const cuerpoTablaInscripciones = document.getElementById('cuerpoTablaInscripciones')

botonGuardar.addEventListener('click', guardarInscripcion)

// C de CRUD
function guardarInscripcion(){
    const nombrePersona = campoNombrePersona.value.trim() 
    const actividadSeleccionada = campoActividadSeleccionada.value
    const turnoMarcado = document.querySelector('input[name="turnoActividad"]:checked')

    if(nombrePersona === "" || actividadSeleccionada === "" || !turnoMarcado){
        alert("Debes completar todos los campos")
        return
    }

    const turnoSeleccionado = turnoMarcado.value

    const nuevaInscripcion = {
        nombre: nombrePersona,
        actividad: actividadSeleccionada,
        turno: turnoSeleccionado
    }

    //listaInscripciones.push(nuevaInscripcion)
    if (indiceEdicion === null){
        listaInscripciones.push(nuevaInscripcion)  
    } else {
        listaInscripciones[indiceEdicion] = nuevaInscripcion
        indiceEdicion = null
        botonGuardar.textContent = "Añadir inscripcion"
        botonGuardar.classList.remove('btn-warning')
        botonGuardar.classList.add('btn-outline-info')
    }
    limpiarFormulario()
    mostrarInscripciones()
}

// R de CRUD
function mostrarInscripciones(){
    cuerpoTablaInscripciones.innerHTML = ""

    listaInscripciones.forEach((inscripcion, indice)=>{
        cuerpoTablaInscripciones.innerHTML += `
        <tr>
            <td>${inscripcion.nombre}</td>
            <td>${inscripcion.actividad}</td>
            <td>${inscripcion.turno}</td>
            <td>
                <button class="btn btn-warning" onclick="editaInscripcion(${indice})">Editar</button>
                <button class="btn btn-danger" onclick="borrarInscripcion(${indice})">Borrar</button>
            </td>
        </tr>
        `
    })
}

// Limpiar formulario
function limpiarFormulario(){
    campoNombrePersona.value = ""
    campoActividadSeleccionada.value = ""
    document.querySelectorAll('input[name="turnoActividad"]').forEach(radio=>{
        radio.checked = false
    })
}

// D de CRUD
function borrarInscripcion(indice){
    listaInscripciones.splice(indice, 1)
    mostrarInscripciones()
}

// U de CRUD
function editaInscripcion(indice) {
    const inscripcion = listaInscripciones[indice]

    campoNombrePersona.value = inscripcion.nombre
    campoActividadSeleccionada.value = inscripcion.actividad

    const radioTurno = document.querySelector(`input[name="turnoActividad"][value="${inscripcion.turno}"]`)
    if (radioTurno){
        radioTurno.checked = true
    }

    indiceEdicion = indice

    botonGuardar.textContent = "Guardar cambios"
    botonGuardar.classList.remove('btn-outline-info')
    botonGuardar.classList.add('btn-warning')    
}