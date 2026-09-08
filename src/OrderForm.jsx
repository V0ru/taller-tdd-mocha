import { useState } from 'react';

export default function OrderForm() {
  const [items, setItems] = useState('');
  const [total, setTotal] = useState('');
  const [metodoPago, setMetodoPago] = useState('tarjeta');
  const [errores, setErrores] = useState([]);
  const [successMessage, setSuccessMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const nuevosErrores = [];
    const totalNum = Number(total);

    // Regla 1: El total debe ser mayor a 0
    if (totalNum <= 0 || isNaN(totalNum)) {
      nuevosErrores.push('the total must be greater than 0');
    }

    // Regla 2: Método de pago válido ('tarjeta', 'PSE', 'contraentrega')
    const metodosValidos = ['tarjeta', 'PSE', 'contraentrega'];
    if (!metodosValidos.includes(metodoPago)) {
      nuevosErrores.push('Invalid payment method');
    }

    // Regla 3: Contraentrega no admite pedidos mayores a 500.000
    if (metodoPago === 'contraentrega' && totalNum > 500000) {
      nuevosErrores.push('Cash on delivery is not available for orders exceeding $500,000.');
    }

    if (nuevosErrores.length > 0) {
      setErrores(nuevosErrores);
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
