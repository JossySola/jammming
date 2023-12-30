const clientId = '4d78daad576446d79d1d038ddb3c3d2a';
const redirectUri = 'http://localhost:3000/';

function userAuth(challenge, state) {
  const scope = 'user-read-private user-read-email playlist-modify-public playlist-modify-private';
  const authUrl = new URL("https://accounts.spotify.com/authorize");

  localStorage.setItem('code_challenge', challenge);
  localStorage.setItem('state', state);

  const params =  {
    response_type: 'code',
    client_id: clientId,
    redirect_uri: redirectUri,
    scope,
    state: state,
    code_challenge_method: 'S256',
    code_challenge: challenge,
  }

  authUrl.search = new URLSearchParams(params).toString();
  window.location.href = authUrl.toString();
}

export { userAuth, clientId, redirectUri };