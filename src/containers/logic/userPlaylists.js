export default async function getUserPlaylists() {
    const authorization = localStorage.getItem('access_token');

    const payload = {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${authorization}`
        }
    }
    console.log("GETTING PLAYLISTS")

    try {
        const body = await fetch('https://api.spotify.com/v1/me/playlists',payload);
        const response = await body.json();

        return response.items;
    } catch (err) {
        alertMsg(err.cause);

        console.error({
            From: "request",
            err,
            Code: err.cause,
        });
    }
}