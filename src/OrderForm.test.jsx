import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import OrderForm from './OrderForm';

describe('OrderForm - Frontend TDD Tests', () => {

  // Regla 1: El total debe ser mayor a 0
  test('Rule 1: shows error message when total amount is 0 or less', async () => {
    const user = userEvent.setup();
    render(<OrderForm />);

    const itemsInput = screen.getByLabelText(/product \/ items/i);
    const totalInput = screen.getByLabelText(/total amount/i);
    const submitButton = screen.getByRole('button', { name: /validate order/i });

    await user.type(itemsInput, 'cuaderno');
    await user.clear(totalInput);
    await user.type(totalInput, '0');
    await user.click(submitButton);

    const errorMessage = await screen.findByText(/the total must be greater than 0/i);
    expect(errorMessage).toBeInTheDocument();
  });

});
