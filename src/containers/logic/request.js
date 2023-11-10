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
        const body = await fetch(`https://api.spotify.com/v1/search?`+ params.toString(), payload);
        const response = await body.json();

        if(body.status !== 200 || response.error) {
            throw new Error(response.error + " // " +  response.error_description, {
                cause: body.status
            })
        } else {
            console.log(response)
            return response;
        }
    } catch(err) {
        console.error({
            From: "request",
            err,
            Code: err.cause,
        });
    }
}