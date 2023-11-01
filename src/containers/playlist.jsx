import React, { useEffect } from "react";
import Name from "./components/name.jsx";
import Export from "./components/export.jsx";
import Song from "./song.jsx";

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