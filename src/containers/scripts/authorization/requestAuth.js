import codeChallenge from './challenge.js';
import auth0 from './auth0.js';
import codeVerifier from './verifier.js';

const state = auth0;
const challenge = codeChallenge;

export default function requestUserAuthorization() {
  const scope = 'user-read-private user-read-email playlist-modify-public playlist-modify-private';
  const authUrl = new URL("https://accounts.spotify.com/authorize");

  localStorage.setItem('code_verifier', codeVerifier);
  localStorage.setItem('code_challenge', challenge);
  localStorage.setItem('state', state);

  const params =  {
    response_type: 'code',
    client_id: '4d78daad576446d79d1d038ddb3c3d2a',
    redirect_uri: 'http://localhost:3000/',
    scope,
    state: state,
    code_challenge_method: 'S256',
    code_challenge: challenge,
  }

  authUrl.search = new URLSearchParams(params).toString();
  window.location.href = authUrl.toString();
}