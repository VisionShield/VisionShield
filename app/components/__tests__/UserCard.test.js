import React from 'react';
import { render } from '@testing-library/react-native';
import UserCard from '../UserCard';

describe('UserCard', () => {
    it('renders user name and subtitle', () => {
        const { getByText } = render(
            <UserCard
                avatar="👩‍⚕️"
                name="Olivia Turner"
                subtitle="Manager of Link's Project"
                status="online"
            />
        );
        expect(getByText('Olivia Turner')).toBeTruthy();
        expect(getByText("Manager of Link's Project")).toBeTruthy();
    });

    it('renders avatar emoji', () => {
        const { getByText } = render(
            <UserCard
                avatar="👨‍💼"
                name="Dr. Alexander Bennett"
                subtitle="Lawyer"
                status="offline"
            />
        );
        expect(getByText('👨‍💼')).toBeTruthy();
    });
});
