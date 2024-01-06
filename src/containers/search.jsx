import React, { useState } from "react";
// COMPONENTS ************************************
import Song from "./components/song.jsx";
// SCRIPTS ***************************************
import requestUserAuthorization from "./scripts/authorization/requestAuth.js";
import searchForItem from "./scripts/user/searchForItem.js";
// ***********************************************

export default function Search({newPlaylist, setNewPlaylist, connection}) {
    const [search, setSearch] = useState("");
    const [songs, setSongs] = useState([]);

    const specialChar = /[^A-Za-z\s]/.test(search);
    const num = /[0-9]/.test(search);

    const handleSearch = (e) => {
        !search ? setSongs([]) : null;
        setSearch(e.target.value);
    }

    const handleSubmit = async () => {
        if (specialChar || num) {
            console.error({
                type: 'String permissions',
                message: 'The input has numbers/symbols'
            });
            return false;
        } else if (connection === false) {
            localStorage.setItem('standBySearch', search);
            requestUserAuthorization();
        } else {
            const response = await searchForItem(search);
            const tracks = response.tracks.items;
            setSongs(() => {
                return tracks.map((obj) => {
                    return <Song 
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
                    />
                })
            })
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
            { songs && search ? songs.map(el => el) : null}
        </>
    )
}