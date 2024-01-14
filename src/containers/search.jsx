import React, { useEffect, useState } from "react";
// COMPONENTS ************************************
import Song from "./components/song.jsx";
// SCRIPTS ***************************************
import requestUserAuthorization from "./scripts/authorization/requestAuth.js";
import searchForItem from "./scripts/user/searchForItem.js";
// ***********************************************

export default function Search({newPlaylist, setNewPlaylist, connection}) {
    const [search, setSearch] = useState("");
    const [songs, setSongs] = useState([]);

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const redirectedWithCode = urlParams.get('code');
        const redirectedWithState = urlParams.get('state');
        const temporalSearchKeyword = window.localStorage.getItem('standBySearch');

        if(temporalSearchKeyword && redirectedWithCode && redirectedWithState) {
            (async () => {
                try {
                    const inputBox = document.getElementById('search');
                    inputBox.setAttribute('value',temporalSearchKeyword);
                    setSearch(temporalSearchKeyword);
                    const response = await searchForItem(temporalSearchKeyword);
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
                    window.localStorage.removeItem('standBySearch');
                } catch (e) {
                    console.log(e);
                }
            })()
        }
    }, [connection])

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
            return;
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
        <div id="searchSide">
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
                    placeholder="Song or Artist name"
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

                { specialChar || num ? <span style={{color: "black"}}>Numbers and symbols are not allowed</span> : null}
                { !search ? <h3 style={{color: "black"}}>Add songs to your new playlist!</h3> : null }
                { songs && search ? songs.map(el => el) : null}
        </div>
        </>
    )
}