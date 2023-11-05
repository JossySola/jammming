const clientId = '4d78daad576446d79d1d038ddb3c3d2a';
const redirectUri = 'http://localhost:3000/';

function userAuth(challenge, state) {
  const scope = 'user-read-private user-read-email';
  const authUrl = new URL("https://accounts.spotify.com/authorize");

  localStorage.setItem('code_challenge', challenge);
  localStorage.setItem('state', state);
  console.log(state)

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
  //const urlParams = new URLSearchParams(window.location.search);
  //let code = urlParams.get('code');
  //window.localStorage.setItem('code', code);
}

export { userAuth, clientId, redirectUri };