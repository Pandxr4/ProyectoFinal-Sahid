export function mostrarAlerta(tipo, titulo, texto) {
    Swal.fire({
      title: titulo,
      text: texto,
      icon: tipo, // 'success', 'error', 'warning', 'info', 'question'
      confirmButtonText: 'Entendido',
      confirmButtonColor: '',
      cancelButtonText: 'Cancelar',
      cancelButtonColor: '',
      showCancelButton: true,
      background: '',
      customClass: {
        title: 'mi-titulo',     // Clase personalizada para el título
        text: 'mi-texto',       // Clase personalizada para el texto
        popup: 'mi-popup',      // Clase personalizada para el popup
        confirmButton: 'mi-confirmar-boton', // Clase personalizada para el botón de confirmar
        cancelButton: 'mi-cancelar-boton'    // Clase personalizada para el botón de cancelar
      }
    });
  }
  