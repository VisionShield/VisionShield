import React from 'react';
import { render } from '@testing-library/react-native';
import FileCard from '../FileCard';

describe('FileCard', () => {
    it('renders file title and date', () => {
        const { getByText } = render(
            <FileCard title="SGM Contract" date="Nov 22, 2020" type="pdf" />
        );
        expect(getByText('SGM Contract')).toBeTruthy();
        expect(getByText('Nov 22, 2020')).toBeTruthy();
    });

    it('renders default icon', () => {
        const { getByTestId } = render(
            <FileCard title="Budget Report" date="Nov 20, 2020" type="excel" />
        );
        // You can add testID to your Ionicons in FileCard for more robust tests
    });
});
