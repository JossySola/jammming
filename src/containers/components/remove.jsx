import React from "react";

export default function Remove({id, playlist, setPlaylist}) {
    function handleRemove() {
        setPlaylist(() => playlist.filter((song) => song.id !== id));
    }

    return (
        <button onClick={(e) => {
            e.preventDefault;
            handleRemove()
        }}>-</button>
    )
}