import React from "react";
import alert from "../../styles/alert.svg";

export default function alertMsg(err) {
    const element = (str) => {
        return <p style={{color: "#fc472e"}}>
            <img 
            style={{width: 64, height: 64}} 
            src={alert} 
            alt="Error icon" 
            aria-label="Error icon"/>
            " " + {str}
            </p>
    }

    switch(err) {
        case 400:
            return element("Spotify did not understand the app request.");
        break;
        case 401:
            return element("The Spotify permissions were denied or the session has expired.");
        break;
        case 403:
            return element("Spotify understood the app request, but is refusing to fulfill it.");
        break;
        case 404:
            return element("The requested resource could not be found.");
        break;
        case 429:
            return element("Too many requests.");
        break;
        case 500:
            return element("Spotify Internal Server Error");
        break;
        case 503:
            return element("Spotify service unavailable.");
        break;
        default:
            return element("There is an unknown error.");
    }
}