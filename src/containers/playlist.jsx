import React, { useEffect } from "react";
import Name from "./components/name.jsx";
import Export from "./components/export.jsx";
import Song from "./song.jsx";

export default function Playlist({playlist, setPlaylist}) {
    
    useEffect(() => {
    }, [playlist]);

    return (
        <section>
            <Name />
            {
                playlist ? playlist.map((song) => {
                    return <Song 
                    btn="remove" 
                    setPlaylist={setPlaylist} 
                    playlist={playlist} 
                    key={song.id} 
                    id={song.id} 
                    name={song.name} 
                    album={song.album} 
                    artists={song.artists} 
                    preview={song.preview_url}/>
                }) : null
            }
            <Export />
        </section>
    )
}