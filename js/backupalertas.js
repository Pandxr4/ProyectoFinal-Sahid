export function mostrarAlerta(tipo, titulo, mensaje, colorFondo) {
    let icono = '';
    switch (tipo) {
      case 'success':
        icono = 'success';
        break;
      case 'error':
        icono = 'error';
        break;
      case 'warning':
        icono = 'warning';
        break;
      case 'info':
        icono = 'info';
        break;
      default:
        icono = '';
    }
  
    Swal.fire({
      title: titulo,
      text: mensaje,
      icon: icono,
      background: colorFondo,
      confirmButtonColor: '#3085d6',
      confirmButtonText: 'OK'
    });
  }
  