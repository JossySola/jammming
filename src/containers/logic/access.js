import { clientId, redirectUri } from "./auth.js";
import { setLocalParams } from "./reset.js";
import { userAuth } from "./auth.js";

export default async function accessToken(code, state, verifierParam) {
    const localState = localStorage.getItem('state');

    if(state === localState) {
        
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
                code_verifier: verifierParam
            }),
        }

        try {
            const body = await fetch('https://accounts.spotify.com/api/token', payload);
            const response = await body.json(); 

            if(body.status !== 200 || response.error) {
                throw new Error(response.error + " // " +  response.error_description, {
                    cause: body.status
                })
            } else {
                console.log(response)
                localStorage.setItem('access_token', response.access_token);
                localStorage.setItem('refresh_token', response.refresh_token);
            }
        } catch(err) {
            console.error({
                From: "access",
                err,
                Code: err.cause,
            });
            if(err.cause === 401) {
                window.localStorage.removeItem('access_token');
                window.localStorage.removeItem('code_verifier');
                window.localStorage.removeItem('code');
                window.localStorage.removeItem('refresh_token');
                window.localStorage.removeItem('state');
                setLocalParams();
                const challenge = localStorage.getItem('code_challenge');
                const state = localStorage.getItem('state');
                userAuth(challenge,state);
            }
        }
    } else {
    console.error({
        type: 'Cross-site Request Forgery prevention.',
        message: 'The local state is not the same as the one received from server.'
        });
    }
}