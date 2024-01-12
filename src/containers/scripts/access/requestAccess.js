import alertMsg from "../alert.js";

export default async function requestAccessToken(code,state) {
    const urlParams = new URLSearchParams(window.location.search);
    const err = urlParams.get('error');
    const localState = localStorage.getItem('state');
    const codeVerifier = localStorage.getItem('code_verifier');

    if (err) return false;

    if (state === localState) {
        try {
            const payload = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: new URLSearchParams({
                    client_id: '4d78daad576446d79d1d038ddb3c3d2a',
                    grant_type: 'authorization_code',
                    code,
                    redirect_uri: 'https://jossysola.github.io/jammming/',
                    code_verifier: codeVerifier
                }),
            }
            const body = await fetch('https://accounts.spotify.com/api/token', payload);
            const response = await body.json(); 

            if (body.status !== 200 || response.error) {
                throw new Error(response.error + " // " +  response.error_description, {
                    cause: body.status
                })
            }

            localStorage.setItem('access_token', response.access_token);
            localStorage.setItem('refresh_token', response.refresh_token);

            console.log(localStorage.getItem('refresh_token') + " FROM ACCESS")
            
            return response;
        } catch (err) {
            alertMsg(err.cause);

            console.error({
                From: "access",
                err,
                Code: err.cause,
            });
            return false;
        }
    } else {
        console.error({
        type: 'Cross-site Request Forgery prevention.',
        message: 'The local state is not the same as the one received from server.'
        });
        return false;
    }
}