function validarPedido(pedido) {
  const errores = [];

  // Regla 1: El total debe ser mayor a 0
  if (pedido.total <= 0) {
    errores.push('the total must be greater than 0');
  }

  // Regla 2: Método de pago válido
  const metodosValidos = ['tarjeta', 'PSE', 'contraentrega'];

  if (!metodosValidos.includes(pedido.metodoPago)) {
    errores.push('Invalid payment method');
  }
  // Regla 3: Si es contraentrega y supera 500000, no es válido
  if (pedido.metodoPago === 'contraentrega' && pedido.total > 500000) {
    errores.push('Cash on delivery is not available for orders exceeding $500,000.');
  }


  return {
    valido: errores.length === 0,
    errores: errores
  };
}

module.exports = validarPedido;