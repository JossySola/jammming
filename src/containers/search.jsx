import React, { useState } from "react";
import Song from "./song.jsx";
import { userAuth } from "./logic/auth.js";
import accessToken from "./logic/access.js";

export default function Search({playlist, setPlaylist}) {
    const [search, setSearch] = useState("");

    let data = "";
    
    const mapping = (arr) => {
        let jsx = [];
        for(let obj of arr) {
            jsx.push(<Song btn="add" obj={obj} setPlaylist={setPlaylist} playlist={playlist} key={obj.id}/>);
        }
        return jsx;
    }

    const handleSearch = (e) => {
        setSearch(e.target.value);
    }
    const handleSubmit = async () => {
        let accToken = localStorage.getItem('access_token');

        if(!accToken) {
            console.log('Missing access token');
            accessToken();
        } else if(accToken) {
            // Use API
            // Missing refresh token
            const str = search;
            const specialChar = /\W/.test(str);
            const num = /[0-9]/.test(str);

            if(specialChar || num) {
                console.log("The string has numbers/symbols.");
            } else {
                console.log(window.localStorage)
                console.log("The session is supposedly granted.");
            }

        } else {
            userAuth();
        }
    }

    return (
        <>
            <form
            onSubmit={(e) => {
                e.preventDefault();
                handleSubmit();
            }}>
                <input 
                type="text"
                name="search"
                id="search"
                maxLength="30"
                autoComplete="off"
                required
                onChange={(e) => {
                    handleSearch(e);
                }}
                />
                <button
                type="submit"
                name="submit"
                id="submit">Search!</button>
            </form>

            { search ? null : <span>Start searching for your fav songs!</span> }
            { data ? mapping(data) : null }
        </>
    )
}