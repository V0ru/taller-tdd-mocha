function validarPedido(pedido) {
  const errores = [];

  // Regla 1: El total debe ser mayor a 0
  if (pedido.total <= 0) {
    errores.push('El total debe ser mayor a 0');
  }

  // Regla 2: El método de pago debe ser uno de: 'tarjeta', 'PSE', 'contraentrega'
  const metodosValidos = ['tarjeta', 'PSE', 'contraentrega'];
  if (!metodosValidos.includes(pedido.metodoPago)) {
    errores.push('Método de pago no válido');
  }

  // Regla 3: Si es contraentrega y supera 500000, no es válido
  if (pedido.metodoPago === 'contraentrega' && pedido.total > 500000) {
    errores.push('El pago contraentrega no admite pedidos mayores a $500.000');
  }

  return {
    valido: errores.length === 0,
    errores: errores
  };
}

module.exports = validarPedido;
//y bueno aca como ya agregamos la condiciion el la logica el test debe funcionar 