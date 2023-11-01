import codeChallenge from "./challenge.js";
import codeVerifier from "./verifier.js";
import auth0 from "./Auth0.js";

const clientId = '4d78daad576446d79d1d038ddb3c3d2a';
const redirectUri = 'http://localhost:3000/';

function userAuth() {
  const scope = 'user-read-private user-read-email';
  const authUrl = new URL("https://accounts.spotify.com/authorize");
  const state = auth0;

  // generated in the previous step
  window.localStorage.setItem('state', state);
  window.localStorage.setItem('code_verifier', codeVerifier);

  const params =  {
    response_type: 'code',
    client_id: clientId,
    redirect_uri: redirectUri,
    scope,
    state: state,
    code_challenge_method: 'S256',
    code_challenge: codeChallenge,
  }

  authUrl.search = new URLSearchParams(params).toString();
  window.location.href = authUrl.toString();
  const urlParams = new URLSearchParams(window.location.search);
  let code = urlParams.get('code');
  window.localStorage.setItem('code', code);
}

export {userAuth, clientId, redirectUri};