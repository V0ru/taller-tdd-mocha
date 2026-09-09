import { useState } from 'react';
import validarPedido from './validarPedido';

export default function OrderForm() {
  const [items, setItems] = useState('');
  const [total, setTotal] = useState('');
  const [metodoPago, setMetodoPago] = useState('tarjeta');
  const [errores, setErrores] = useState([]);
  const [successMessage, setSuccessMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    // Refactor Frontend: Delegar la validación de las reglas al validador del dominio
    const pedido = {
      items,
      total: total === '' ? 0 : Number(total),
      metodoPago
    };

    const resultado = validarPedido(pedido);

    if (!resultado.valido) {
      setErrores(resultado.errores);
      setSuccessMessage('');
    } else {
      setErrores([]);
      setSuccessMessage('Order placed successfully!');
    }
  };

  return (
    <div className="app-container">
      <div className="header">
        <span className="badge">TDD Workshop</span>
        <h1>Order Validation System</h1>
        <p>Enter order details to validate business rules</p>
      </div>

      {errores.length > 0 && (
        <div className="alert alert-error" role="alert">
          <ul>
            {errores.map((err, idx) => (
              <li key={idx}>{err}</li>
            ))}
          </ul>
        </div>
      )}

      {successMessage && (
        <div className="alert alert-success" role="status">
          {successMessage}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="items">Product / Items</label>
          <input
            id="items"
            type="text"
            className="input-control"
            placeholder="e.g. Notebook, Pencil"
            value={items}
            onChange={(e) => setItems(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="total">Total Amount ($)</label>
          <input
            id="total"
            type="number"
            className="input-control"
            placeholder="0"
            value={total}
            onChange={(e) => setTotal(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="metodoPago">Payment Method</label>
          <select
            id="metodoPago"
            className="input-control"
            value={metodoPago}
            onChange={(e) => setMetodoPago(e.target.value)}
          >
            <option value="tarjeta">Credit / Debit Card (tarjeta)</option>
            <option value="PSE">PSE</option>
            <option value="contraentrega">Cash on Delivery (contraentrega)</option>
            <option value="efectivo">Cash (efectivo - Invalid)</option>
          </select>
        </div>

        <button type="submit" className="btn-submit">
          Validate Order
        </button>
      </form>
    </div>
  );
}
