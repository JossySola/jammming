import alertMsg from "../alert.js";

const getRefreshToken = async () => {
    const refresh_token = localStorage.getItem('refresh_token');
    const url = "https://accounts.spotify.com/api/token";

    const payload = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: new URLSearchParams({
            grant_type: 'refresh_token',
            refresh_token,
            client_id: '4d78daad576446d79d1d038ddb3c3d2a'
        }),
    }

    try {
        const body = await fetch(url,payload);
        const response = await body.json();

        if (body.status !== 200 || response.error) {
            throw new Error(response.error + " // " +  response.error_description, {
                cause: body.status
            })
        }

        localStorage.setItem('access_token', response.accessToken);
        localStorage.setItem('refresh_token', response.refreshToken);
    } catch (err) {
        alertMsg(err.cause);

        console.error({
            From: "access",
            err,
            Code: err.cause,
        });
    }
}

export default getRefreshToken;