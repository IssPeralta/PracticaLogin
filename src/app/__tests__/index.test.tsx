import * as React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { Alert } from 'react-native';
import Login from '../index';

// Mock de Alert
jest.spyOn(Alert, 'alert');

// Mock de expo-router para capturar la navegación
const mockPush = jest.fn();
jest.mock('expo-router', () => ({
  useRouter: () => ({
    push: mockPush,
    back: jest.fn(),
  }),
}));

describe('Index (Login Screen)', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders correctly', () => {
    const { getAllByText, getByPlaceholderText } = render(<Login />);
    expect(getAllByText('Iniciar Sesión')).toHaveLength(2);
    expect(getByPlaceholderText('Email')).toBeTruthy();
    expect(getByPlaceholderText('Contraseña')).toBeTruthy();
  });

  it('shows alert when fields are empty', () => {
    const { getByTestId } = render(<Login />);
    fireEvent.press(getByTestId('login-button'));
    expect(Alert.alert).toHaveBeenCalledWith('Error', 'Los campos están vacíos');
  });

  it('shows alert when only email is empty', () => {
    const { getByTestId, getByPlaceholderText } = render(<Login />);
    fireEvent.changeText(getByPlaceholderText('Contraseña'), 'Password123!');
    fireEvent.press(getByTestId('login-button'));
    expect(Alert.alert).toHaveBeenCalledWith('Error', 'El email está vacío');
  });

  it('shows alert when only password is empty', () => {
    const { getByTestId, getByPlaceholderText } = render(<Login />);
    fireEvent.changeText(getByPlaceholderText('Email'), 'test@test.com');
    fireEvent.press(getByTestId('login-button'));
    expect(Alert.alert).toHaveBeenCalledWith('Error', 'La contraseña está vacía');
  });

  it('has secure text entry for password field', () => {
    const { getByPlaceholderText } = render(<Login />);
    const passwordInput = getByPlaceholderText('Contraseña');
    expect(passwordInput.props.secureTextEntry).toBe(true);
  });

  it('has correct keyboard type for email field', () => {
    const { getByPlaceholderText } = render(<Login />);
    const emailInput = getByPlaceholderText('Email');
    expect(emailInput.props.keyboardType).toBe('email-address');
  });
});

describe('Email validation', () => {
  beforeEach(() => jest.clearAllMocks());

  it('accepts valid email formats', () => {
    const { getByTestId, getByPlaceholderText } = render(<Login />);
    fireEvent.changeText(getByPlaceholderText('Email'), 'correo@valido.com');
    fireEvent.changeText(getByPlaceholderText('Contraseña'), 'Password123!');
    fireEvent.press(getByTestId('login-button'));
    
    expect(Alert.alert).not.toHaveBeenCalledWith('Error', 'Email inválido');
  });

  it('rejects invalid email formats', () => {
    const { getByTestId, getByPlaceholderText } = render(<Login />);
    fireEvent.changeText(getByPlaceholderText('Email'), 'correo-invalido');
    fireEvent.changeText(getByPlaceholderText('Contraseña'), 'Password123!');
    fireEvent.press(getByTestId('login-button'));
    
    expect(Alert.alert).toHaveBeenCalledWith('Error', 'Email inválido');
  });
});

describe('Password validation', () => {
  beforeEach(() => jest.clearAllMocks());

  const setup = (password: string) => {
    const utils = render(<Login />);
    fireEvent.changeText(utils.getByPlaceholderText('Email'), 'correo@valido.com');
    fireEvent.changeText(utils.getByPlaceholderText('Contraseña'), password);
    fireEvent.press(utils.getByTestId('login-button'));
    return utils;
  };

  it('accepts valid passwords and navigates to success', () => {
    setup('Password123!');
    expect(mockPush).toHaveBeenCalledWith('/success');
  });

  it('rejects passwords without uppercase', () => {
    setup('password123!');
    expect(Alert.alert).toHaveBeenCalledWith('Error', 'La contraseña debe tener una mayúscula');
  });

  it('rejects passwords without lowercase', () => {
    setup('PASSWORD123!');
    expect(Alert.alert).toHaveBeenCalledWith('Error', 'La contraseña debe tener una minúscula');
  });

  it('rejects passwords without special characters', () => {
    setup('Password'); 
    expect(Alert.alert).toHaveBeenCalledWith('Error', 'La contraseña debe tener un número o carácter especial');
  });

  it('rejects passwords shorter than 8 characters', () => {
    setup('Pw1!');
    expect(Alert.alert).toHaveBeenCalledWith('Error', 'La contraseña debe tener al menos 8 caracteres');
  });

  it('rejects passwords with only numbers and special characters', () => {
    setup('12345678!');
    expect(Alert.alert).toHaveBeenCalledWith('Error', 'La contraseña debe tener una mayúscula');
  });
});