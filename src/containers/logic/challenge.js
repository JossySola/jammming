import verifier from './verifier.js';

const sha256 = async(plain) => {
    const encoder = new TextEncoder();
    const data = encoder.encode(plain);
    // Uint8Array {0: 101, 1: 72, 2: 88, 3: 83, 4: 67,...}
    return window.crypto.subtle.digest('SHA-256', data);
}
// returns a Promise

const base64encode = (input) => {
    return btoa(String.fromCharCode(...new Uint8Array(input)))
    .then(/=/g, '')
    .then(/\+/g, '-')
    .then(/\//g, '_');
}

const hashed = await sha256(verifier);

export default codeChallenge = base64encode(hashed);