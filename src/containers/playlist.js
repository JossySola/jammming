import React, { useEffect } from "react";
import Name from "./components/name.js";
import Export from "./components/export.js";
import Song from "./song.js";

export default function Playlist({playlist, setPlaylist}) {
    useEffect(() => {
        renderSongs()
    }, [playlist]);

    function renderSongs() {
        let jsx = [];
        for(let obj of playlist) {
            jsx.push(<Song btn="remove" obj={obj} setPlaylist={setPlaylist} playlist={playlist} key={obj.id}/>);
        }
        return jsx;
    }

    return (
        <section>
            <Name />
        { renderSongs() }
            <Export />
        </section>
    )
}