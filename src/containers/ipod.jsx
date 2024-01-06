import React, { useEffect } from "react";
// SCRIPTS ***************************************
import getUserPlaylists from "./scripts/user/getUserPlaylists.js";
// ***********************************************

export default function Ipod({connection, userPlaylists, exportation, setExportation, setUserPlaylists}) {
    useEffect(() => {
        (async () => {
            let response = await getUserPlaylists();
            setUserPlaylists(response);
        })()
        setExportation(false);
    }, [exportation])

    return (
        <div id="ipod">
            {connection ? <p className="connected">Connected</p> : <p className="disconnected">Disconnected</p>}
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
    )
}