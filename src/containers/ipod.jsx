import React, { useEffect } from "react";

export default function Ipod({userPlaylists}) {

    useEffect(() => {
    }, [userPlaylists]); 

    return (
        <div id="ipod">
            {userPlaylists.map((element) => {
                return (
                    <div className="ipodPlaylist" id={element.id} key={element.id}>
                        <p>{element.name}</p>
                        <p>Owner: {element.owner.display_name}</p>
                        <p>Songs: {element.tracks.total}</p>
                    </div>
                )
            })}
        </div>
    )
}