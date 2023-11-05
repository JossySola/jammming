import React, { useEffect, useState } from "react";
import Search from "./containers/search.jsx";
import Playlist from "./containers/playlist.jsx";
import accessToken from "./containers/logic/access.js";
import codeVerifier from "./containers/logic/verifier.js";
import codeChallenge from "./containers/logic/challenge.js";
import auth0 from "./containers/logic/Auth0.js";
import { userAuth } from "./containers/logic/auth.js";

export default function App() {
    useEffect(() => { 
        console.log(localStorage);

        const urlParams = new URLSearchParams(window.location.search);
        const verifierParam = localStorage.getItem('code_verifier');
        const challengeParam = localStorage.getItem('code_challenge');
        const state = auth0;
        const stateParam = localStorage.getItem('state');
        const stateReceived = urlParams.get('state');
        const accessParam = localStorage.getItem('access_token');
        const refreshParam = localStorage.getItem('refresh_token');
        const codeReceived = urlParams.get('code');
        const codeParam = localStorage.getItem('code');

        if(
            (!verifierParam || 
                verifierParam === "undefined" || 
                verifierParam === "null") && 
                (!stateParam || 
                    stateParam === "undefined" || 
                    stateParam === "null") && 
                    (!challengeParam || 
                        challengeParam === "undefined" || 
                        challengeParam === "null")) {
                            localStorage.setItem('code_verifier', codeVerifier);
                            userAuth(codeChallenge, state);
        } else if (verifierParam && stateParam && challengeParam) {
            if(codeReceived) {
                accessToken(codeReceived, stateReceived, verifierParam);
            } else if(urlParams.get('error')) {
                window.localStorage.removeItem('code');
                window.localStorage.removeItem('refresh_token');
                window.localStorage.removeItem('access_token');
                console.error({
                    type: 'Permissions',
                    message: 'The permissions were not granted.'
                });
            }
        }
    }, []);

    const [playlist, setPlaylist] = useState([]);
    
    const declined = () => {
        const urlParams = new URLSearchParams(window.location.search);
        if(urlParams.get('error')) {
            return <span>Spotify authorization is required</span>
        }
    }

    return (
        <>
            { /*redirected()*/ }
            <span>{declined()}</span>

            <main>
                <Search playlist={playlist} setPlaylist={setPlaylist}/>
            </main>
            <Playlist playlist={playlist} setPlaylist={setPlaylist}/>
        </>
    )
}