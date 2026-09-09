// Constantes de Dominio
export const METODOS_PAGO_VALIDOS = ['tarjeta', 'PSE', 'contraentrega'];
export const LIMITE_MAXIMO_CONTRAENTREGA = 500000;

export const MENSAJES_ERROR = {
  TOTAL_INVALIDO: 'the total must be greater than 0',
  METODO_PAGO_INVALIDO: 'Invalid payment method',
  LIMITE_CONTRAENTREGA_EXCEDIDO: 'Cash on delivery is not available for orders exceeding $500,000.'
};

// Refactor Regla 1: El total debe ser mayor a 0
export function validarTotal(total) {
  return typeof total === 'number' && !isNaN(total) && total > 0;
}

// Refactor Regla 2: Método de pago válido
export function validarMetodoPago(metodoPago) {
  return METODOS_PAGO_VALIDOS.includes(metodoPago);
}

// Refactor Regla 3: Si es contraentrega y supera 500000, no es válido
export function validarLimiteContraentrega(metodoPago, total) {
  if (metodoPago === 'contraentrega' && total > LIMITE_MAXIMO_CONTRAENTREGA) {
    return false;
  }
  return true;
}

// Pipeline de validadores por regla
const REGLAS_VALIDACION = [
  (pedido) => (!validarTotal(pedido?.total) ? MENSAJES_ERROR.TOTAL_INVALIDO : null),
  (pedido) => (!validarMetodoPago(pedido?.metodoPago) ? MENSAJES_ERROR.METODO_PAGO_INVALIDO : null),
  (pedido) => (!validarLimiteContraentrega(pedido?.metodoPago, pedido?.total) ? MENSAJES_ERROR.LIMITE_CONTRAENTREGA_EXCEDIDO : null)
];

// Orquestador principal de validación
export function validarPedido(pedido = {}) {
  const errores = REGLAS_VALIDACION
    .map((regla) => regla(pedido))
    .filter(Boolean);

  return {
    valido: errores.length === 0,
    errores
  };
}

export default validarPedido;