import React from "react";

export default function Remove({id, newPlaylist, setNewPlaylist}) {
    function handleRemove() {
        setNewPlaylist(() => newPlaylist.filter((song) => song.id !== id));
    }

    return (
        <button alt="Remove button" style={{fontSize: "1.3rem", width: "4rem", height: "4rem", color: "#0866ff"}} onClick={(e) => {
            e.preventDefault;
            handleRemove()
        }}>Remove</button>
    )
}