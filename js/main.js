import { obtenerTiposDeCambio } from "./data.js";
import { mostrarAlerta } from "./alertas.js";

let tiposDeCambio = [];

// Función para encontrar el valor de tipo de cambio
function obtenerTasa(tipo) {
  const moneda = tiposDeCambio.find(moneda => moneda.tipo === tipo);
  if (!moneda) {
    mostrarAlerta('error', 'Error', 'El tipo de cambio seleccionado no es válido.', 'rgb(255, 200, 200)');
    return null;
  }
  return moneda.valor;
}

// Función para convertir ARS a USD
function convertirARS(cantidad, tipoDeCambio) {
  const tasa = obtenerTasa(tipoDeCambio);
  if (tasa === null) {
    return 0;
  }
  return (cantidad / tasa).toFixed(2);
}

// Función para convertir USD a ARS
function convertirUSD(cantidad, tipoDeCambio) {
  const tasa = obtenerTasa(tipoDeCambio);
  if (tasa === null) {
    return 0;
  }
  return (cantidad * tasa).toFixed(2);
}

// Función para iniciar el conversor
async function iniciarConversor() {
  tiposDeCambio = await obtenerTiposDeCambio();
  
  const nombreUsuarioInput = document.getElementById('nombreUsuario');
  const confirmarNombreBtn = document.getElementById('confirmarNombre');
  const tipoDeCambioSelect = document.getElementById('tipoDeCambio');
  const cantidadARSInput = document.getElementById('cantidadARS');
  const convertirARSBtn = document.getElementById('convertirARS');
  const resultadoARSP = document.getElementById('resultadoARS');
  const tipoDeCambioInversoSelect = document.getElementById('tipoDeCambioInverso');
  const cantidadUSDInput = document.getElementById('cantidadUSD');
  const convertirUSDBtn = document.getElementById('convertirUSD');
  const resultadoUSDP = document.getElementById('resultadoUSD');

  let nombreUsuario = '';

  // Cargar el nombre de usuario desde el local storage
  if (localStorage.getItem('nombreUsuario')) {
    nombreUsuario = localStorage.getItem('nombreUsuario');
    mostrarAlerta('success', 'Bienvenido de nuevo', `Hola de nuevo, ${nombreUsuario}`, 'rgb(220, 220, 220)');
  }

  confirmarNombreBtn.addEventListener('click', () => {
    nombreUsuario = nombreUsuarioInput.value;
    if (nombreUsuario === "") {
      mostrarAlerta('error', 'Error', 'Tenés que poner un nombre de usuario para continuar.', 'rgb(255, 200, 200)');
    } else {
      // Guardar el nombre de usuario en el local storage
      localStorage.setItem('nombreUsuario', nombreUsuario);
      mostrarAlerta('success', 'Nombre de usuario', `El nombre de usuario ingresado es: ${nombreUsuario}`, 'rgb(200, 255, 200)');
    }
  });

  convertirARSBtn.addEventListener('click', () => {
    const tipoDeCambio = tipoDeCambioSelect.value;
    const cantidadARS = parseFloat(cantidadARSInput.value);
    const resultado = convertirARS(cantidadARS, tipoDeCambio);
    resultadoARSP.innerText = `${cantidadARS} ARS son equivalentes a ${resultado} USD según el tipo de cambio ${tipoDeCambio} al día de hoy.`;

    // Guardar la conversión en local storage
    const conversion = {
      tipoDeCambio: tipoDeCambio,
      cantidadARS: cantidadARS,
      resultado: resultado,
      fecha: new Date().toLocaleString()
    };
    guardarConversion('conversionesARS', conversion);
  });

  convertirUSDBtn.addEventListener('click', () => {
    const tipoDeCambio = tipoDeCambioInversoSelect.value;
    const cantidadUSD = parseFloat(cantidadUSDInput.value);
    const resultado = convertirUSD(cantidadUSD, tipoDeCambio);
    resultadoUSDP.innerText = `${cantidadUSD} USD son equivalentes a ${resultado} ARS según el tipo de cambio ${tipoDeCambio} al día de hoy.`;

    // Guardar la conversión en local storage
    const conversion = {
      tipoDeCambio: tipoDeCambio,
      cantidadUSD: cantidadUSD,
      resultado: resultado,
      fecha: new Date().toLocaleString()
    };
    guardarConversion('conversionesUSD', conversion);
  });
}

// Función para guardar las conversiones en local storage
function guardarConversion(key, conversion) {
  let conversiones = [];
  if (localStorage.getItem(key)) {
    conversiones = JSON.parse(localStorage.getItem(key));
  }
  conversiones.push(conversion);
  localStorage.setItem(key, JSON.stringify(conversiones));
}

// Iniciar el conversor cuando el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', iniciarConversor);
