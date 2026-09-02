function validarPedido(pedido) {
  const errores = [];
//Bueno ahora vamos a escribir el codigo minimo necesario hacer que pase como dice el profe 
  // Regla 1: El total debe ser mayor a 0
  if (pedido.total <= 0) {
    errores.push('El total debe ser mayor a 0');
  }

  return {
    valido: errores.length === 0,
    errores: errores
  };
}

module.exports = validarPedido;
