import codeChallenge from './challenge.js';
import auth0 from './auth0.js';
import codeVerifier from './verifier.js';

export default function requestUserAuthorization() {
  const state = auth0;

  const scope = 'user-read-private user-read-email playlist-modify-public playlist-modify-private';
  const authUrl = new URL("https://accounts.spotify.com/authorize");

  window.localStorage.setItem('code_verifier', codeVerifier);
  window.localStorage.setItem('state', state);

  const params =  {
    response_type: 'code',
    client_id: '4d78daad576446d79d1d038ddb3c3d2a',
    scope,
    state: state,
    code_challenge_method: 'S256',
    code_challenge: codeChallenge,
    redirect_uri: 'http://localhost:3000/'
  }

  authUrl.search = new URLSearchParams(params).toString();
  window.location.href = authUrl.toString();
}