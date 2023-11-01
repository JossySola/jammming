import { clientId, redirectUri } from "./auth.js";

export default function accessToken() {
    const urlParams = new URLSearchParams(window.location.search);
    let codeVerifier = localStorage.getItem('code_verifier');
    const code = urlParams.get('code');
    const err = urlParams.get('error');
    const state = urlParams.get('state');
    const localState = localStorage.getItem('state');

    if(state === localState) {
        if(err) {
            window.localStorage.removeItem('code_verifier');
            window.localStorage.removeItem('state');
            window.localStorage.removeItem('code');
            window.localStorage.removeItem('refresh_token');
            console.error({
                message: err
            });
            return null;
        } else {
            const getToken = async () => {
                const payload = {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    },
                    body: new URLSearchParams({
                        client_id: clientId,
                        grant_type: 'authorization_code',
                        code,
                        redirect_uri: redirectUri,
                        code_verifier: codeVerifier
                    }),
                }
                const body = await fetch('https://accounts.spotify.com/api/token', payload);
                const response = await body.json();
                localStorage.setItem('access_token', response.access_token);
                localStorage.setItem('refresh_token', response.refresh_token);
                return response;
            }
            getToken();
        }
    } else {
        window.localStorage.removeItem('code_verifier');
        window.localStorage.removeItem('state');
        window.localStorage.removeItem('code');
        window.localStorage.removeItem('refresh_token');
        window.localStorage.removeItem('access_token');
        console.error({
            type: 'Cross-site Request Forgery prevention.',
            message: 'The local state is not the same as the one received from server.'
        });
        return null;
    }
}