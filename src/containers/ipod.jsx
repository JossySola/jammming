import React, { useEffect, useState } from "react";

export default function Ipod({playlist}) {
    const [data, setData] = useState([]);

    useEffect(() => {
        (async () => {
            const authorization = localStorage.getItem('access_token');
            const payload = {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${authorization}`
                }
            }

            const body = await fetch('https://api.spotify.com/v1/me/playlists',payload);
            const response = await body.json();

            response.items.map((item) => {
                setData((prev) => {
                    const duplicate = prev.find(play => play.id === item.id);

                    if (duplicate) {
                        return [...prev];
                    }
                    return [...prev, item];
                });
            })
        })()
    }, []); 

    return (
        <div id="ipod">
            {data.map((element) => {
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