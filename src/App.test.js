import { render, screen } from '@testing-library/react';
import App from './App';

describe('App', () => {
  test('renders Recurring Date Picker header', () => {
    render(<App />);
    const headerElement = screen.getByText(/Recurring Date Picker/i);
    expect(headerElement).toBeInTheDocument();
  });

  test('renders frequency selector', () => {
    render(<App />);
    const frequencyLabel = screen.getByText(/Frequency/i);
    expect(frequencyLabel).toBeInTheDocument();
  });

  test('renders date range picker', () => {
  render(<App />);
  const startDateLabel = screen.getByText(/Start Date/i);
  expect(startDateLabel).toBeInTheDocument();
  });

  test('renders preview section', () => {
  render(<App />);
  const previewHeader = screen.getByText(/Preview/i);
  expect(previewHeader).toBeInTheDocument();
  });
});