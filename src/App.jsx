import React, { useEffect, useState } from "react";
import Search from "./containers/search.jsx";
import Playlist from "./containers/playlist.jsx";
// **************************************************
import accessToken from "./containers/logic/access.js";
import getUser from "./containers/logic/me.js";
import Ipod from "./containers/ipod.jsx";
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

        if (access && refresh) {
            getUser();
        } else if (code) {
            accessToken(code, state, verifier);
        }
    }, []);

    return (
        <>
            <span>{ urlParams.get('error') ? "Spotify authorization is required" : null }</span>
            
            <button onClick={() => {
                window.localStorage.removeItem('access_token');
                window.localStorage.removeItem('code_verifier');
                window.localStorage.removeItem('code');
                window.localStorage.removeItem('refresh_token');
                window.localStorage.removeItem('state');
                window.localStorage.removeItem('user');

                const code = urlParams.get('code');
                const state = localStorage.getItem('state');
                const verifier = localStorage.getItem('code_verifier');
                const access = localStorage.getItem('access_token');
                const refresh = localStorage.getItem('refresh_token');
                const user = localStorage.getItem('user');

                console.log(`Code: ${code}\nState:${state}\nVerifier:${verifier}\nAccess:${access}\nRefresh Token:${refresh}\nUser:${user}`)
            }}>Reset</button>
            <button onClick={() => {
                const code = urlParams.get('code');
                const state = localStorage.getItem('state');
                const verifier = localStorage.getItem('code_verifier');
                const access = localStorage.getItem('access_token');
                const refresh = localStorage.getItem('refresh_token');
                const user = localStorage.getItem('user');

                console.log(`Code: ${code}\nState:${state}\nVerifier:${verifier}\nAccess:${access}\nRefresh Token:${refresh}\nUser:${user}`)
            }}>Print</button>

            <main>
                <Search playlist={playlist} setPlaylist={setPlaylist}/>
            </main>
            <Playlist playlist={playlist} setPlaylist={setPlaylist}/>
            <Ipod playlist={playlist}/>
        </>
    )
}