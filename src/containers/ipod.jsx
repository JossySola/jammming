import React, { useEffect } from "react";
// SCRIPTS ***************************************
import getUserPlaylists from "./scripts/user/getUserPlaylists.js";
// ***********************************************

export default function Ipod({connection, userPlaylists, exportation, setExportation, setUserPlaylists}) {
    useEffect(() => {
        if (connection) {
            (async () => {
                let response = await getUserPlaylists();
                setUserPlaylists(response);
            })()
            setExportation(false);
        }
    }, [exportation])

    return (
        <div id="ipodContainer">
            <div id="ipod">
                <div id="screen">
                    <div id="statusBar">
                        {connection ? 
                            <><span className="connected">Connected</span><div className="spotifyDisconnected"></div></> : <><span className="disconnected">Disconnected</span><div className="spotifyDisconnected"></div></>}
                    </div>
                    {connection ? userPlaylists.map((playlist) => {
                        return (
                            <div key={playlist.id} id={playlist.id} className="ipodPlaylist">
                                <p>{playlist.name}</p>
                                <p>Playlist made by: {playlist.owner.display_name}</p>
                                <p>Total tracks: {playlist.tracks.total}</p>    
                            </div>
                        )
                    }) : null}
                </div>
                <div id="ipodWheel"></div>
            </div>
        </div>
    )
}