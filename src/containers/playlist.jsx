import React, { useEffect, useState } from "react";
// COMPONENTS ************************************
import Song from "./components/song.jsx";
// CONTAINERS ************************************
import Ipod from "./ipod.jsx";
// SCRIPTS ***************************************
import exportNewPlaylist from "./scripts/user/exportNewPlaylist.js";
import getUserPlaylists from "./scripts/user/getUserPlaylists.js";
// ***********************************************

export default function Playlist({newPlaylist, setNewPlaylist, userPlaylists, setUserPlaylists, connection}) {
    const [playlistName, setPlaylistName] = useState("");
    const [exportation, setExportation] = useState(false);

    useEffect(() => {
        (async () => {
            let response = await getUserPlaylists();
            setUserPlaylists(response);
            document.getElementById("playlistInput").setAttribute("value", "");
        })()
    }, [exportation])

    const handleSubmit = async () => {
        if (connection === false) {
            setExportation(false);
            return null;
        } else if (newPlaylist) {
            const uris = newPlaylist.map(track => `${track.uri}`);
            try {
                const response = await exportNewPlaylist(playlistName, uris, newPlaylist);
                response ? setExportation(true) : setExportation(false);
            } catch (e) {
                console.log(e);
            } finally {
                setNewPlaylist([]);
                setPlaylistName("");
            }
        }
    }

    return (
        <>
            <section id="playlist">
                <form onSubmit={(e) => {
                    e.preventDefault();
                    handleSubmit();
                }}>
                    <input type="text" name="playlist" id="playlistInput" maxLength="30" autoComplete="off" placeholder="Your playlist name" required 
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

            <div id="spotifySide">
                <Ipod connection={connection} userPlaylists={userPlaylists}/>
            </div>
            
        </>
    )
}