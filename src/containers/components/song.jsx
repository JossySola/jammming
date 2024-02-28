import React from "react";
import Add from "./add.jsx";
import Remove from "./remove.jsx";
import icon from "../../styles/Spotify_Icon_RGB_Green.png";

export default function Song({btn, uri, setNewPlaylist, newPlaylist, id, name, preview, album, artists}) {
    return (
        <>
            <details>
                <summary>
                    <img src={icon} width="50px" height="50px"/>
                    {name}
                    {btn === "add" ? <Add id={id} name={name} uri={uri} preview={preview} album={album} artists={artists} newPlaylist={newPlaylist} setNewPlaylist={setNewPlaylist}/> : <Remove id={id} uri={uri} newPlaylist={newPlaylist} setNewPlaylist={setNewPlaylist}/>}
                </summary>
                <div className="track">
                    <img 
                    src={album.images[1].url} 
                    width={album.images[1].width} 
                    height={album.images[1].height}
                    aria-label={`Album named ${album.name} by ${artists[0].name}`}
                    />
                    <p className="preview">Song preview:</p>
                    <audio controls name="media" controlsList="nodownload nofullscreen noremoteplayback">
                        <source src={preview} type="audio/mpeg" />
                        Your browser does not support the audio element.
                    </audio>
                    <span className="songName">{name}</span>
                    <span className="songAuthor">Artist: {artists[0].name}</span>
                    <span className="songAlbum">Album: {album.name}</span>
                    <a href={`https://open.spotify.com/track/${id}`} target="_blank" className="openSpotify">Play on Spotify</a>
                </div>
            </details>
        </>
    )
}