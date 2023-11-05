import { userAuth } from "./auth.js";

export default async function getItem(query) {
    const authorization = localStorage.getItem('access_token');

    const params = new URLSearchParams({
        q: query,
        limit: 15,
        type: "artist,track"
    });

    const payload = {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${authorization}`
        }
    }

    try {
        const response = await fetch(`https://api.spotify.com/v1/search?`+ params.toString(), payload);

        if(response.status !== 200) {
            throw new Error(response.message, {
                cause: response.status
            })
        }

        const data = await response.json();
        console.log(data)
        return data;
    } catch(err) {
        console.log(err + ' ' + err.cause);
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