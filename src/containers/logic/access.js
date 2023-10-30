import { code, clientId, redirectUri } from "./token.js";

const codeParam = code;

const getAccess = async code => {
    let codeVerifier = localStorage.getItem('code_verifier');

    const payload = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
            client_id: clientId,
            grant_type: 'authorization_code',
            codeParam,
            redirect_uri: redirectUri,
            code_verifier: codeVerifier,

        }),
    }

    try {
        const body = await fetch(url, payload);
        const response = await body.json();
        localStorage.setItem('access_token', response.access_token);
    } catch(e) {
        console.error(e.message);
        console.error(e.value);
    }
}

export default getAccess;