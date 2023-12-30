export default async function getUserPlaylists() {
    const authorization = localStorage.getItem('access_token');
    let data = [];

    const payload = {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${authorization}`
        }
    }

    const body = await fetch('https://api.spotify.com/v1/me/playlists',payload);
    const response = await body.json();

    response.items.map((item) => {
        const duplicate = data.find(play => play.id === item.id);

        if (duplicate) {
            return data;
        }

        data.push(item);
        return data;
    })
}