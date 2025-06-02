import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import LoginScreen from '../LoginScreen';

test('renders login screen and allows input', () => {
    const { getByPlaceholderText, getByText } = render(<LoginScreen />);
    const emailInput = getByPlaceholderText('Adresse email');
    const passwordInput = getByPlaceholderText('Mot de passe');

    fireEvent.changeText(emailInput, 'test@example.com');
    fireEvent.changeText(passwordInput, 'Password123');

    expect(emailInput.props.value).toBe('test@example.com');
    expect(passwordInput.props.value).toBe('Password123');
    expect(getByText('Se connecter')).toBeTruthy();
});
