import React, { useState } from "react";
import getItem from "./logic/request.js";
import { setLocalParams } from "./logic/reset.js";
import { userAuth } from "./logic/auth.js";
import Song from "./song.jsx";

export default function Search({newPlaylist, setNewPlaylist}) {
    const [search, setSearch] = useState("");
    const [songs, setSongs] = useState();

    const specialChar = /[^A-Za-z\s]/.test(search);
    const num = /[0-9]/.test(search);

    const handleSearch = (e) => {
        setSearch(e.target.value);
    }

    const handleSubmit = async () => {
        const verifier = localStorage.getItem('code_verifier');
        const challenge = localStorage.getItem('code_challenge');
        const state = localStorage.getItem('state');
        let tracks = [];
        let jsx = [];

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
            const response = await getItem(search);
            tracks = response.tracks.items;
            tracks.map((obj) => {
                jsx.push(<Song 
                btn="add" 
                setNewPlaylist={setNewPlaylist} 
                newPlaylist={newPlaylist} 
                key={obj.id} 
                id={obj.id}
                name={obj.name} 
                uri={obj.uri} 
                album={obj.album} 
                artists={obj.artists}
                preview={obj.preview_url}
                />);
            })
            setSongs(jsx)
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
            { songs && search ? songs.map((el) => {
                return el
                }) : null 
            }
            
        </>
    )
}