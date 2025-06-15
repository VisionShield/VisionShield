import * as SecureStore from 'expo-secure-store';
import { API_IP } from '../constants/config';


export async function fetchWithAuth(url, options = {}) {
    let token = await SecureStore.getItemAsync('access_token');
    let res = await fetch(url, {
        ...options,
        headers: {
            ...(options.headers || {}),
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        credentials: 'include',
    });

    if (res.status === 401 || res.status === 403) {
        const refreshRes = await fetch(`http://${API_IP}/refresh`, {
            method: 'POST',
            credentials: 'include',
        });
        if (refreshRes.ok) {
            const refreshData = await refreshRes.json();
            if (refreshData.access_token) {
                await SecureStore.setItemAsync('access_token', refreshData.access_token);
                token = refreshData.access_token;
                res = await fetch(url, {
                    ...options,
                    headers: {
                        ...(options.headers || {}),
                        Authorization: `Bearer ${token}`,
                    },
                    credentials: 'include',
                });
            }
        }
    }
    return res;
}
