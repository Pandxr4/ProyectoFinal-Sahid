export async function obtenerTiposDeCambio() {
  try {
    const response = await fetch('./tiposDeCambio.json');
    if (!response.ok) {
      throw new Error('Error al obtener los datos del JSON local');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error:', error);
    return [];
  }
}
