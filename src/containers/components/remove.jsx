import React from "react";

export default function Remove({obj, playlist, setPlaylist}) {
    function handleRemove() {
        let newArr = [];
        for(let element of playlist) {
            if(element.id !== obj.id) {
                newArr.push(element);
            }
        }
        setPlaylist(newArr)
    }

    return (
        <button onClick={(e) => {
            e.preventDefault;
            handleRemove()
        }}>-</button>
    )
}