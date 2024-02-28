import React from "react";

export default function Remove({id, newPlaylist, setNewPlaylist}) {
    function handleRemove() {
        setNewPlaylist(() => newPlaylist.filter((song) => song.id !== id));
    }

    return (
        <button alt="Remove button" className="remove" onClick={(e) => {
            e.preventDefault;
            handleRemove()
        }}>Remove</button>
    )
}