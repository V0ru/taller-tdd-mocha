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

  // Regla 2: El método de pago debe ser uno de: 'tarjeta', 'PSE', 'contraentrega'
  it('el método de pago debe ser tarjeta, PSE o contraentrega', () => {
    // Arrange
    const pedido = {
      items: ['cuaderno'],
      total: 50000,
      metodoPago: 'efectivo'
    };

    // Act
    const resultado = validarPedido(pedido);

    // Assert
    expect(resultado.valido).to.be.false;
    expect(resultado.errores).to.include('Método de pago no válido');
  });

  // Regla 3: Si es contraentrega y supera 500000, no es válido
  it('no debe permitir contraentrega para montos mayores a 500000', () => {
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
    expect(resultado.errores).to.include('El pago contraentrega no admite pedidos mayores a $500.000');
  });

});
//Y bueno como todavia no hemos agregado esta condicion en la logica el test debe fallar que es practicamente lo que hemos echo en las demas reglas 
