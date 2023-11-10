import React from "react";
import Add from "./components/add.jsx";
import Remove from "./components/remove.jsx";

export default function Song({btn, setPlaylist, playlist, id, name, preview, album, artists}) {
    return (
        <>
            <details>
                <summary>{name}</summary>
                <img 
                src={album.images[1].url} 
                width={album.images[1].width} 
                height={album.images[1].height}
                aria-label={`Album named ${album.name} by ${artists[0].name}`}
                /> 
                <audio controls name="media">
                    <source src={preview} type="audio/mpeg" />
                    Your browser does not support the audio element.
                </audio>
                <span className="songName">{name}</span>
                <span className="songAuthor">Author: {artists[0].name}</span>
                <span className="songAlbum">Album: {album.name}</span>
                {btn === "add" ? <Add id={id} playlist={playlist} setPlaylist={setPlaylist}/> : null}
                {btn === "remove" ? <Remove id={id} playlist={playlist} setPlaylist={setPlaylist}/> : null}
            </details>
        </>
    )
}