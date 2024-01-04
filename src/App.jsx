import React, { useEffect, useState } from "react";
import Search from "./containers/search.jsx";
import Playlist from "./containers/playlist.jsx";
// **************************************************
import accessToken from "./containers/logic/access.js";
import getRefreshToken from "./containers/logic/refresh.js"
import getUser from "./containers/logic/me.js";
import Ipod from "./containers/ipod.jsx";
import getUserPlaylists from "./containers/logic/userPlaylists.js";
// SCRIPTS ***************************************
import requestAccess from "./containers/scripts/access/requestAccess.js";
import searchForItem from "./containers/scripts/user/searchForItem.js";
import getCurrentUserProfile from "./containers/scripts/user/getUserProfile.js";
// ***********************************************

export default function App() {
    const [newPlaylist, setNewPlaylist] = useState([]);
    const [userPlaylists, setUserPlaylists] = useState([]);
    const [connection, setConnection] = useState(false);

    const urlParams = new URLSearchParams(window.location.search);
    const redirectedWithCode = urlParams.get('code');
    const redirectedWithError = urlParams.get('error');

    useEffect(() => {
        if (getCurrentUserProfile()) {
            setConnection(true);
        }
        if (redirectedWithCode) {
            requestAccess();
            searchForItem(localStorage.getItem('standBySearch'));
        }
/*
        const state = localStorage.getItem('state');
        const verifier = localStorage.getItem('code_verifier');
        const access = localStorage.getItem('access_token');
        const refresh = localStorage.getItem('refresh_token');
        
        if (!err && access && refresh) {
            getUser();
            (async () => {
                let response = await getUserPlaylists();
                setUserPlaylists(response);
            })()
            const refreshAction = setInterval(getRefreshToken(),3600);
        } else if (code) {
            accessToken(code, state, verifier);
        }

        console.log(userPlaylists)

        return () => clearInterval(refreshAction);
*/
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
                <Search newPlaylist={newPlaylist} setNewPlaylist={setNewPlaylist}/>
            </main>
            <Playlist newPlaylist={newPlaylist} setNewPlaylist={setNewPlaylist} setUserPlaylists={setUserPlaylists} connection={connection}/>
            <Ipod userPlaylists={userPlaylists}/>
        </>
    )
}