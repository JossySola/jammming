import React from "react";

export default function Add({obj, playlist, setPlaylist}) {
    function handleClick() {
        if(playlist.length > 0) {
            for(let x of playlist) {
                if(obj.id === x.id) {
                    return false;
                }
            }
        }
        setPlaylist([...playlist, obj]);
    }
    
    return (
        <button onClick={(e) => {
            e.preventDefault;
            handleClick();
        }}>+</button>
    )
}