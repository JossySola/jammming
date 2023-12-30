import React from "react";

export default function Add(
    {
    id,
    uri,
    name,
    album,
    artists,
    preview,
    playlist,
    setPlaylist}) {

    function handleClick() {
        setPlaylist((prev) => {
            const duplicate = prev.find(song => song.id === id);

            if (duplicate) {
                return [...prev];
            }
            return [...prev, {id,uri,name,album,artists,preview,playlist,setPlaylist}];
        })
    }
    
    return (
        <button onClick={(e) => {
            e.preventDefault;
            handleClick();
        }}>+</button>
    )
}