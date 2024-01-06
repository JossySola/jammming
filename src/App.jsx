import React, { useEffect, useState } from "react";
// CONTAINERS ************************************
import Search from "./containers/search.jsx";
import Playlist from "./containers/playlist.jsx";
// SCRIPTS ***************************************
import requestAccessToken from "./containers/scripts/access/requestAccess.js";
import searchForItem from "./containers/scripts/user/searchForItem.js";
import getUserPlaylists from "./containers/scripts/user/getUserPlaylists.js";
import getCurrentUserProfile from "./containers/scripts/user/getUserProfile.js";
// ***********************************************

export default function App() {
    const [newPlaylist, setNewPlaylist] = useState([]);
    const [userPlaylists, setUserPlaylists] = useState([]);
    const [connection, setConnection] = useState(false);

    const urlParams = new URLSearchParams(window.location.search);
    const redirectedWithError = urlParams.get('error');

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const redirectedWithCode = urlParams.get('code');
        const redirectedWithState = urlParams.get('state');

        if (redirectedWithCode && redirectedWithState && connection === false) {
            try {
                requestAccessToken(redirectedWithCode, redirectedWithState);
                setConnection(true);
                //searchForItem(localStorage.getItem('standBySearch'));
            } catch (e) {
                console.log(e);
                setConnection(false);
            }
        }

        (async () => {
            const userAvailable = await getCurrentUserProfile();
            if (userAvailable === false) {
                setConnection(false);
                return;
            } else {
                setConnection(true);
                const userPlaylists = await getUserPlaylists();
                setUserPlaylists(userPlaylists);
                return;
            }
        })()
    }, []);

    return (
        <>
            <span>{ redirectedWithError ? "Spotify authorization is required" : null }</span>
            
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
                <Search newPlaylist={newPlaylist} setNewPlaylist={setNewPlaylist} connection={connection}/>
            </main>
            <Playlist newPlaylist={newPlaylist} setNewPlaylist={setNewPlaylist} userPlaylists={userPlaylists} setUserPlaylists={setUserPlaylists} connection={connection}/>
        </>
    )
}