import verifier from './verifier.js';
import codeChallenge from './challenge.js';

export const clientId = '4d78daad576446d79d1d038ddb3c3d2a';
// Given in Spotify developer dashboard
export const redirectUri = 'http://localhost:3000/';
// URI registered in the allowlist (Spotify dashboard)

const scope = 'user-read-private user-read-email';
// A space-separated list of scopes. Scopes are categorized data the user will allow or deny access to

const authUrl = new URL("https://accounts.spotify.com/authorize");
// The URL constructor returns a newly created URL object representing the URL defined by the parameters
// new URL(url, base)

window.localStorage.setItem('code_verifier', verifier);
// localStorage stores the code verifier locally, saved across browser sessions. localStorage has no expiration time


const params = {
    response_type: 'code',
    client_id: clientId,
    scope,
    code_challenge_method: 'S256',
    code_challenge: codeChallenge,
    redirect_uri: redirectUri,
}

authUrl.search = new URLSearchParams(params).toString();
// URL.search is a search string, also called a query string, that is a string containing a '?' followed
// by the parameters of the URL

window.location.href = authUrl.toString();
// HREF is a stringifier that returns a string containing the whole URL, and allows the href to be updated
// Setting the value of href navigates to the provided URL


// After receiving a response, we must then PARSE the URL to retrieve the code (an authorization code that can be exchanged for an access token) parameter
// PARSE means to analize a sequence/sentence
const urlParams = new URLSearchParams(window.location.search);
export const code = urlParams.get('code');
// retrieves the code parameter in the URL response

/*
// MOCKUP *******************************
let songsMockup = [
    {
        name: "Bittersweet",
        id: "1",
        genre: "R&B",
        author: "Lianne La Havas"
    },
    {
        name: "Marry the Night",
        id: "2",
        genre: "Pop",
        author: "Lady Gaga"
    },
    {
        name: "Star Shopping",
        id: "3",
        genre: "Alternative",
        author: "Lil Peep"
    },
    {
        name: "Telephone",
        id: "4",
        genre: "Pop",
        author: "Lady Gaga"
    }
];
// **************************************

export default function requestAPI(value) {
    let newArr = [];
    // async... await fetch
    for(let obj of songsMockup) {
        for(let prop in obj) {
            const x = obj[prop].toLowerCase();
            const y = value.toLowerCase();
            if(x === y) {
                newArr.push(obj);
            }
            
            continue;
        }
    }
    return newArr;
}*/