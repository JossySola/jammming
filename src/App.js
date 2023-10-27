import React, { useState } from "react";
import Search from "./containers/search.js";
import Playlist from "./containers/playlist.js";


export default function App() {
    const [playlist, setPlaylist] = useState([]);
    return (
        <>
            <main>
                <Search playlist={playlist} setPlaylist={setPlaylist}/>
            </main>
            <Playlist playlist={playlist} setPlaylist={setPlaylist}/>
        </>
    )
}