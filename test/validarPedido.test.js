const { expect } = require('chai');
const validarPedido = require('../src/validarPedido');

describe('validarPedido', () => {

  // Regla 1: El total debe ser mayor a 0
  it('el total del pedido debe ser mayor a 0', () => {
    
    const pedido = {
      items: ['cuaderno'],
      total: 0,
      metodoPago: 'tarjeta'
    };

    const resultado = validarPedido(pedido);

    
    expect(resultado.valido).to.be.false;
    expect(resultado.errores).to.include('El total debe ser mayor a 0');
  });

  // Regla 2:Bueno en la regla 2  el metodo de pago debe ser uno 
  it('el método de pago debe ser tarjeta, PSE o contraentrega', () => {
    // Arrange (aca preparamos un pedido pues con un metodo invalido como efectivo)
    const pedido = {
      items: ['cuaderno'],
      total: 50000,
      metodoPago: 'efectivo'
    };


    const resultado = validarPedido(pedido);

    expect(resultado.valido).to.be.false;
    expect(resultado.errores).to.include('Método de pago no válido');
  });

});
