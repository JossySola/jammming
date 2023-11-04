import { clientId } from "./auth.js";

const refresh = localStorage.getItem('refresh_token');

const payload = {
    method: 'POST',
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: new URLSearchParams({
        grant_type: 'refresh_token',
        refresh_token: refresh,
        client_id: clientId
    }),
}

export default async function getRefreshToken() {
    const body = await fetch('https://accounts.spotify.com/api/token', payload);
    const response = await body.json();
    localStorage.setItem('access_token', response.accessToken);
    localStorage.setItem('refresh_token', response.refreshToken);
    return response;
}