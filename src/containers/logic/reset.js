import codeVerifier from "./verifier.js";
import codeChallenge from "./challenge.js";
import auth0 from "./Auth0.js";

export function clearCodeReceived() {
    localStorage.removeItem('code');
}

export function clearAccessTokens() {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
}

export function setLocalParams() {
    localStorage.setItem('code_verifier', codeVerifier);
    localStorage.setItem('code_challenge', codeChallenge);
    localStorage.setItem('state', auth0);
}