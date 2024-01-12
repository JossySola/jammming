import alertMsg from "../alert.js";
import getCurrentUserProfile from "./getUserProfile.js";

export default async function exportNewPlaylist(name, URIs, newPlaylist) {
    const authorization = localStorage.getItem('access_token');
    const user = await getCurrentUserProfile();

    const payloadForCreation = {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${authorization}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: name,
            description: "Playlist made at Jammming!"
        })
    }
    const payloadForAdding = {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${authorization}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "uris": URIs,
            "position": 0
        })
    }
    
    try {
        // CREATES PLAYLIST
        const body = await fetch(`https://api.spotify.com/v1/users/${user}/playlists`,payloadForCreation);
        const response = await body.json();
        const playlistId = response.id;
    
        // ADDS TRACKS
        if (newPlaylist.length > 0) {
            await fetch(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`, payloadForAdding);
        }
        return response;
    } catch (err) {
        alertMsg(err.cause);
    
        console.error({
            From: "request",
            err,
            Code: err.cause,
        });
        return false;
    }
}