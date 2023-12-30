import { userAuth } from "./auth.js";
import { setLocalParams } from "./reset.js";
import alertMsg from "./alert.js";

export default async function getUser() {
    const authorization = localStorage.getItem('access_token');

    const payload = {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${authorization}`
        }
    }

    try {
        const body = await fetch(`https://api.spotify.com/v1/me`, payload);
        const response = await body.json();

        if(body.status !== 200 || response.error) {
            throw new Error(response.error + " // " +  response.error_description, {
                cause: body.status
            })
        } else {
            localStorage.setItem('user', response.id);
            return response;
        }
    } catch(err) {
        alertMsg(err.cause);

        console.error({
            From: "request",
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
}