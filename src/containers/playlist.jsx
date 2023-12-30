import React, { useEffect, useState } from "react";
import Name from "./components/name.jsx";
import Export from "./components/export.jsx";
import Song from "./song.jsx";

export default function Playlist({playlist, setPlaylist}) {
    const [playlistName, setPlaylistName] = useState("");

    const handleSubmit = async () => {
        const authorization = localStorage.getItem('access_token')
        const user = localStorage.getItem('user');
        const uris = [];

        playlist.map((track) => {
            uris.push(`${track.uri}`)
        })

        const payloadForCreation = {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${authorization}`,
                'Content-Type': 'application/json'
            },
            body: new URLSearchParams({
                "name": `${playlistName}`,
                "description": "Playlist created at Jammming",
                "public": false
            })
        }

        const payloadForAdding = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: new URLSearchParams({
                "uris": JSON.stringify(uris),
                "position":0
            })
        }

        try {
            // CREATES PLAYLIST
            const body = await fetch(`https://api.spotify.com/v1/${user}/playlists`,payloadForCreation);
            const response = await body.json();
            const playlistId = response.id;
            console.log(playlistId)

            // ADDS TRACKS
            /*
            const secondBody = await fetch(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`, payloadForAdding);
            const secondResponse = await secondBody.json();
            */

            // CLEARS PLAYLIST DISPLAY
            setPlaylist([]);

        } catch (err) {
            alertMsg(err.cause);

            console.error({
                From: "request",
                err,
                Code: err.cause,
            });
        }
    }

    return (
        <section>
            <form onSubmit={(e) => {
                e.preventDefault();
                handleSubmit();
            }}>
                <Name onChange={(e) => {
                    e.preventDefault();
                    setPlaylistName(e.target.value);
                }}/>
                <Export />
            </form>
            {
                playlist ? playlist.map((song) => {
                    return <Song 
                    btn="remove" 
                    setPlaylist={setPlaylist} 
                    playlist={playlist} 
                    key={song.id} 
                    id={song.id} 
                    name={song.name} 
                    album={song.album} 
                    artists={song.artists} 
                    preview={song.preview_url}/>
                }) : null
            }
        </section>
    )
}