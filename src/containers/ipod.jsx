import React, { useEffect } from "react";

export default function Ipod({userPlaylists}) {
    
    return (
        <div id="ipod">
            {userPlaylists ? userPlaylists.map((track) => {
                return (
                    <div key={track.id} id={track.id} className="ipodPlaylist">
                        <p>{track.name}</p>
                        <p>Made by: {track.owner.display_name}</p>
                        <p>Total tracks: {track.tracks.total}</p>    
                    </div>
                )
            }) : null}
        </div>
    )
}