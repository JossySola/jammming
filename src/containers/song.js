import React from "react";
import Add from "./components/add.js";
import Remove from "./components/remove.js";

export default function Song({btn, obj, setPlaylist, playlist}) {
    return (
        <>
            <details>
                <span className="songName">{obj.name}</span>
                <span className="songAuthor">Author: {obj.author}</span>
                <span className="songGenre">Genre: {obj.genre}</span>
                {btn === "add" ? <Add obj={obj} playlist={playlist} setPlaylist={setPlaylist}/> : null}
                {btn === "remove" ? <Remove obj={obj} playlist={playlist} setPlaylist={setPlaylist}/> : null}
            </details>
        </>
    )
}