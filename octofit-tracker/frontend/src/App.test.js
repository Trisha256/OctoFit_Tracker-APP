import { render, screen } from '@testing-library/react';
import App from './App';

test('renders OctoFit Tracker heading', () => {
  render(<App />);
  const headingElement = screen.getByText(/OctoFit Tracker/i);
  expect(headingElement).toBeInTheDocument();
});
