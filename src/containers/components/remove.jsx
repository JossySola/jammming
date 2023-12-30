import React from "react";

export default function Remove({id, newPlaylist, setNewPlaylist}) {
    function handleRemove() {
        setNewPlaylist(() => newPlaylist.filter((song) => song.id !== id));
    }

    return (
        <button onClick={(e) => {
            e.preventDefault;
            handleRemove()
        }}>-</button>
    )
}