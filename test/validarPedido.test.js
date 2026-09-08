const { expect } = require('chai');
const validarPedido = require('../src/validarPedido');

describe('validarPedido', () => {

  // Regla 1: El total debe ser mayor a 0
  it('The total order amount must be greater than 0', () => {
    const pedido = {
      items: ['cuaderno'],
      total: 0,
      metodoPago: 'tarjeta'
    };

    const resultado = validarPedido(pedido);

    expect(resultado.valido).to.be.false;
    expect(resultado.errores).to.include('the total must be greater than 0');
  });
  // Regla 2: El método de pago debe ser uno de: 'tarjeta', 'PSE', 'contraentrega' como vamos a colocar efectivo es invalido
  it('The payment method must be card, PSE, or cash on delivery.', () => {
    const pedido = {
      items: ['cuaderno'],
      total: 50000,
      metodoPago: 'efectivo'
    };

    const resultado = validarPedido(pedido);

    expect(resultado.valido).to.be.false;
    expect(resultado.errores).to.include('Invalid payment method');
  });
  
  // Regla 3: Si es contraentrega y supera 500000, no es válido
  it('Cash on delivery must not be permitted for amounts exceeding 500,000.', () => {
    // Arrange
    const pedido = {
      items: ['cuaderno'],
      total: 600000,
      metodoPago: 'contraentrega'
    };

    // Act
    const resultado = validarPedido(pedido);

    // Assert
    expect(resultado.valido).to.be.false;
    expect(resultado.errores).to.include('Cash on delivery is not available for orders exceeding $500,000.');
  });
  // Regla 4: Caso feliz (pedido completamente válido)
  it('It must be valid with products, a positive total, and card payment.', () => {
    // Arrange
    const pedido = {
      items: ['cuaderno', 'lapicero'],
      total: 45000,
      metodoPago: 'tarjeta'
    };

    // Act
    const resultado = validarPedido(pedido);

    // Assert
    expect(resultado.valido).to.be.true;
    expect(resultado.errores.length).to.equal(0);
  });
});