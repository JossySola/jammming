import { clientId, redirectUri } from "./auth.js";
import getRefreshToken from "./refresh.js";

export default function accessToken(code, state, verifierParam) {
    const localState = localStorage.getItem('state');

    if(state === localState) {
        const getAccess = async () => {
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
                localStorage.setItem('access_token', response.access_token);
                localStorage.setItem('refresh_token', response.refresh_token);

                if(response.status !== 200) {
                    throw new Error(response.message, {
                        cause: response.status
                    })
                }
                return response;

            } catch(err) {
                console.log(err.message + ' ' + err.cause);
                if(err.cause === 401) {
                    window.localStorage.removeItem('access_token');
                    window.localStorage.removeItem('code_verifier');
                    window.localStorage.removeItem('code');
                    window.localStorage.removeItem('refresh_token');
                    window.localStorage.removeItem('state');
                
                    userAuth();
                } else if(err.cause === 400) {
                    /*
                    window.localStorage.removeItem('access_token');
                    window.localStorage.removeItem('code_verifier');
                    window.localStorage.removeItem('code');
                    window.localStorage.removeItem('refresh_token');
                    window.localStorage.removeItem('state');*/
                }
            }
        }
        getAccess();
    } else {
    /*window.localStorage.removeItem('code_verifier');
    window.localStorage.removeItem('state');
    window.localStorage.removeItem('code');
    window.localStorage.removeItem('refresh_token');
    window.localStorage.removeItem('access_token');*/
    console.error({
        type: 'Cross-site Request Forgery prevention.',
        message: 'The local state is not the same as the one received from server.'
        });
    }
}