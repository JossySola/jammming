import React, { useState } from "react";
import Song from "./song.jsx";
import getItem from "./logic/request.js";
import { setLocalParams } from "./logic/reset.js";
import { userAuth } from "./logic/auth.js";

export default function Search({playlist, setPlaylist}) {
    const [search, setSearch] = useState("");
    const specialChar = /[^A-Za-z\s]/.test(search);
    const num = /[0-9]/.test(search);
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
        const verifier = localStorage.getItem('code_verifier');
        const challenge = localStorage.getItem('code_challenge');
        const state = localStorage.getItem('state');

        if(specialChar || num) {
            console.error({
                type: 'String permissions',
                message: 'The input has numbers/symbols'
            });
            return null;
        } else if(!verifier || !challenge || !state) {
            setLocalParams();
            userAuth(challenge,state);
        } else {
            getItem(search);
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
            { specialChar || num ? <span style={{color: "white"}}>Numbers and symbols are not allowed</span> : null}
            { !search ? <span style={{color: "white"}}>Start searching for your fav songs!</span> : null }
            { data ? mapping(data) : null }
        </>
    )
}