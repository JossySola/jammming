import codeChallenge from "./challenge.js";
import auth0 from "./Auth0.js";

const clientId = '4d78daad576446d79d1d038ddb3c3d2a';
const redirectUri = 'http://localhost:3000';

const scope = 'user-read-private user-read-email';
const authUrl = new URL("https://accounts.spotify.com/authorize")

// generated in the previous step
window.localStorage.setItem('code_verifier', codeVerifier);

const params =  {
  response_type: 'code',
  client_id: clientId,
  redirect_uri: redirectUri,
  scope,
  state: auth0,
  code_challenge_method: 'S256',
  code_challenge: codeChallenge,
}

authUrl.search = new URLSearchParams(params).toString();
window.location.href = authUrl.toString();