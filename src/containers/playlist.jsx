import React, { useState } from "react";
import Song from "./components/song.jsx";
import getUserPlaylists from "./logic/userPlaylists.js";
//import exportNewPlaylist from "./logic/export.js";
// SCRIPTS ***************************************
import exportNewPlaylist from "./scripts/user/exportNewPlaylist.js";

export default function Playlist({newPlaylist, setNewPlaylist, setUserPlaylists, connection}) {
    const [playlistName, setPlaylistName] = useState("");

    const handleSubmit = () => {
        if (!connection) null;

        const uris = newPlaylist.map(track => `${track.uri}`);
        
        /*
        try {
            exportNewPlaylist(playlistName, uris, newPlaylist);
        } catch (e) {
            console.log(e);
        } finally {
            setNewPlaylist([]);
        }
        setUserPlaylists(getUserPlaylists());
        setPlaylistName("");
        */
    }

    return (
        <section>
            <form onSubmit={(e) => {
                e.preventDefault();
                handleSubmit();
            }}>
                <input type="text" name="playlist" id="playlist" maxLength="30" autoComplete="off" placeholder="Your playlist name" required 
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
    )
}