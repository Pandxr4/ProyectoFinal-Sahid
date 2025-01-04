import { tiposDeCambio } from "./data.js";

/**
 * Función para convertir ARS a USD según el tipo de cambio.
 * @param {number} cantidad - La cantidad de ARS a convertir.
 * @param {string} tipoDeCambio - El tipo de cambio a utilizar.
 * @returns {string|number} - El resultado de la conversión o un mensaje de error.
 */
function convertirARS(cantidad, tipoDeCambio) {
  const cambio = tiposDeCambio.find(cambio => cambio.tipo === tipoDeCambio);
  if (cambio) {
    const resultado = cantidad / cambio.valor;
    return resultado.toFixed(2);
  } else {
    return 'Tipo de cambio no válido';
  }
}

// Función para iniciar el conversor
function iniciarConversor() {
  const nombreUsuarioInput = document.getElementById('nombreUsuario');
  const confirmarNombreBtn = document.getElementById('confirmarNombre');
  const tipoDeCambioSelect = document.getElementById('tipoDeCambio');
  const cantidadARSInput = document.getElementById('cantidadARS');
  const convertirBtn = document.getElementById('convertir');
  const resultadoP = document.getElementById('resultado');

  let nombreUsuario = '';

  confirmarNombreBtn.addEventListener('click', () => {
    nombreUsuario = nombreUsuarioInput.value;
    if (nombreUsuario === "") {
      alert("Tenés que poner un nombre de usuario para continuar.");
    } else {
      alert("El nombre de usuario ingresado es: " + nombreUsuario);
    }
  });

  convertirBtn.addEventListener('click', () => {
    const tipoDeCambio = tipoDeCambioSelect.value;
    const cantidadARS = parseFloat(cantidadARSInput.value);
    const resultado = convertirARS(cantidadARS, tipoDeCambio);
    resultadoP.innerText = `${cantidadARS} ARS son equivalentes a ${resultado} USD según el tipo de cambio al día de hoy(${tipoDeCambio}).`;
  });
}

// Iniciar el conversor cuando el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', iniciarConversor);
