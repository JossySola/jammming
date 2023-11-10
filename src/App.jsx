import React, { useEffect, useState } from "react";
import Search from "./containers/search.jsx";
import Playlist from "./containers/playlist.jsx";
// **************************************************
import accessToken from "./containers/logic/access.js";
// **************************************************

export default function App() {
    const [playlist, setPlaylist] = useState([]);
    const urlParams = new URLSearchParams(window.location.search);

    useEffect(() => {
        const code = urlParams.get('code');
        const state = localStorage.getItem('state');
        const verifier = localStorage.getItem('code_verifier');
        const access = localStorage.getItem('access_token');
        const refresh = localStorage.getItem('refresh_token');

        if(access && refresh) {
            return;
        } else if(code) {
            accessToken(code, state, verifier);
            console.log('access granted.')
        }
    }, []);

    return (
        <>
            <span>{ urlParams.get('error') ? "Spotify authorization is required" : null }</span>

            <main>
                <Search playlist={playlist} setPlaylist={setPlaylist}/>
            </main>
            <Playlist playlist={playlist} setPlaylist={setPlaylist}/>
        </>
    )
}