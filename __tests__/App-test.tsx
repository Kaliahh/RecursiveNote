import { render } from '@testing-library/react-native';
import App from '../App';


describe('Anything', () => {
  it('happens', () => {
    expect(true).toBe(true);
  });

  it('also happens', () => {
    expect(true).toBe(true);
  });

  it('renders', () => {
    const { getByText } = render(<App />);

    expect(getByText('Create db')).toBeTruthy();
    expect(getByText('Delete db')).toBeTruthy();
  });
});