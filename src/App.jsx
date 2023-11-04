import React, { useState } from "react";
import Search from "./containers/search.jsx";
import Playlist from "./containers/playlist.jsx";
import accessToken from "./containers/logic/access.js";

export default function App() {
    const [playlist, setPlaylist] = useState([]);
    
    const declined = () => {
        const urlParams = new URLSearchParams(window.location.search);
        if(urlParams.get('error')) {
            return <span>Spotify authorization is required</span>
        }
    }

    const redirected = () => {
        const urlParams = new URLSearchParams(window.location.search);
        if(urlParams.get('code')) {
            console.log(localStorage)
            accessToken();
        }
    }

    return (
        <>
            {redirected()}
            <span>{declined()}</span>

            <main>
                <Search playlist={playlist} setPlaylist={setPlaylist}/>
            </main>
            <Playlist playlist={playlist} setPlaylist={setPlaylist}/>
        </>
    )
}