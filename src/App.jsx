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
        const redirectedWithCode = urlParams.get('code');
        const redirectedWithState = urlParams.get('state');

        if (redirectedWithCode && redirectedWithState && connection === false) {
            try {
                requestAccessToken(redirectedWithCode, redirectedWithState);
                setConnection(true);
            } catch (e) {
                console.log(e);
                setConnection(false);
            }
            //searchForItem(localStorage.getItem('standBySearch'));
        }
/*
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
        */
    }, []);

    return (
        <>
            <h1>Jammming.</h1>

            <div id="poweredWithSpotify">
                <span>Powered with</span><div alt="Spotify logo" className="spotify"/><span style={{color: '#1ed760ff', margin: 0, padding: 0, fontSize: "0.8rem"}}>®</span>
            </div>
            
            <span>{ redirectedWithError ? "Spotify authorization is required" : null }</span>
            
            <main>
                <Search newPlaylist={newPlaylist} setNewPlaylist={setNewPlaylist} connection={connection}/>
            </main>
            <Playlist newPlaylist={newPlaylist} setNewPlaylist={setNewPlaylist} userPlaylists={userPlaylists} setUserPlaylists={setUserPlaylists} connection={connection}/>
        </>
    )
}