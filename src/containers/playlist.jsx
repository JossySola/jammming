import React, { useState } from "react";
// COMPONENTS ************************************
import Song from "./components/song.jsx";
// CONTAINERS ************************************
import Ipod from "./ipod.jsx";
// SCRIPTS ***************************************
import exportNewPlaylist from "./scripts/user/exportNewPlaylist.js";
// ***********************************************

export default function Playlist({newPlaylist, setNewPlaylist, userPlaylists, setUserPlaylists, connection}) {
    const [playlistName, setPlaylistName] = useState("");
    const [exportation, setExportation] = useState(false);

    const handleSubmit = () => {
        if (connection === false) return null;

        const uris = newPlaylist.map(track => `${track.uri}`);

        try {
            exportNewPlaylist(playlistName, uris, newPlaylist);
        } catch (e) {
            console.log(e);
        }
        setNewPlaylist([]);
        setPlaylistName("");
        setExportation(true);
    }

    return (
        <>
            <section id="playlist">
                <form onSubmit={(e) => {
                    e.preventDefault();
                    handleSubmit();
                }}>
                    <input type="text" name="playlist" maxLength="30" autoComplete="off" placeholder="Your playlist name" required 
                    onChange={(e) => {
                        e.preventDefault();
                        setPlaylistName(e.target.value);
                    }}/>
                    <button type="submit">Export</button>
                </form>
                {
                    newPlaylist ? newPlaylist.map((song) => {
                        return <Song 
                        btn="remove" 
                        setNewPlaylist={setNewPlaylist} 
                        newPlaylist={newPlaylist} 
                        key={song.id} 
                        id={song.id} 
                        name={song.name} 
                        album={song.album} 
                        artists={song.artists} 
                        preview={song.preview_url}/>
                    }) : null
                }
            </section>
            <Ipod connection={connection} userPlaylists={userPlaylists} exportation={exportation} setExportation={setExportation} setUserPlaylists={setUserPlaylists}/>
        </>
    )
}