import React from 'react';
import { render } from '@testing-library/react-native';
import HomeScreen from '../HomeScreen';

describe('HomeScreen', () => {
    it('renders section titles', () => {
        const { getByText } = render(<HomeScreen />);
        expect(getByText('Mes utilisateurs :')).toBeTruthy();
        expect(getByText('Mes fichiers partagés récemment :')).toBeTruthy();
    });

    it('renders at least one user and file', () => {
        const { getByText } = render(<HomeScreen />);
        expect(getByText('Olivia Turner, M.D.')).toBeTruthy();
        expect(getByText('SGM Contract')).toBeTruthy();
    });
});
