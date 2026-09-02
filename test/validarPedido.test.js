const { expect } = require('chai');
const validarPedido = require('../src/validarPedido');

describe('validarPedido', () => {

  // Regla 1: El total debe ser mayor a 0
  it('el total del pedido debe ser mayor a 0', () => {
    // Arrange
    const pedido = {
      items: ['cuaderno'],
      total: 0,
      metodoPago: 'tarjeta'
    };

    // Act
    const resultado = validarPedido(pedido);

    // Assert
    expect(resultado.valido).to.be.false;
    expect(resultado.errores).to.include('El total debe ser mayor a 0');
  });

});
