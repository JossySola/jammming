import React, { useState } from "react";
import Song from "./song.js";
import requestAPI from "./logic/request.js";

export default function Search({playlist, setPlaylist}) {
    const [search, setSearch] = useState("");
    let data = requestAPI(search);
    
    const mapping = (arr) => {
        let jsx = [];
        for(let obj of arr) {
            jsx.push(<Song btn="add" obj={obj} setPlaylist={setPlaylist} playlist={playlist} key={obj.id}/>);
        }
        return jsx;
    }

    return (
        <>
            <input type="search" onChange={(e) => {
                e.preventDefault();
                setSearch(e.target.value);
            }} />

            { search ? null : <span>Start searching for your fav songs!</span> }
            { data ? mapping(data) : null }
        </>
    )
}