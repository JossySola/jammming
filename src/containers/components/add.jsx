import React from "react";

export default function Add(
    {
    id,
    uri,
    name,
    album,
    artists,
    preview,
    newPlaylist,
    setNewPlaylist}) {

    function handleClick() {
        setNewPlaylist((prev) => {
            const duplicate = prev.find(song => song.id === id);

            if (duplicate) {
                return [...prev];
            }
            return [...prev, {id,uri,name,album,artists,preview,newPlaylist,setNewPlaylist}];
        })
    }
    
    return (
        <button onClick={(e) => {
            e.preventDefault;
            handleClick();
        }}>+</button>
    )
}