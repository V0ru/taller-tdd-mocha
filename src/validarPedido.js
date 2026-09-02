function validarPedido(pedido) {
  const errores = [];

  // Regla 1: El total debe ser mayor a 0
  if (pedido.total <= 0) {
    errores.push('El total debe ser mayor a 0');
  }

  // Regla 2: El método de pago debe ser uno de: 'tarjeta', 'PSE', 'contraentrega' Ahora esta la validacion minima ecesaria para hacer que pase como dice el profe 
  const metodosValidos = ['tarjeta', 'PSE', 'contraentrega'];
  if (!metodosValidos.includes(pedido.metodoPago)) {
    errores.push('Método de pago no válido');
  }

  return {
    valido: errores.length === 0,
    errores: errores
  };
}

module.exports = validarPedido;
