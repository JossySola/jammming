const generateStr = (length) => {
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789~-_';
    const values = crypto.getRandomValues(new Uint8Array(length));
    return values.reduce((acc, x) => acc + possible[x % possible.length], "");
  }
  
  const cipher  = generateStr(16);

  function isValid(char) {
    if(char > 45 && char < 48) {
        char += 2;
    } else if(char > 57 && char < 65) {
        char += 7;
    } else if(char > 90 && char < 95) {
        char += 4;
    } else if(char > 95 && char < 97) {
        char += 1;
    } else if(char > 122 && char < 126) {
        char += 3;
    } else if(char > 126) {
        const difference = char - 126;
        char = 45;
        char += difference;
    }
    return char;
  }

  const encrypt = (str) => {
    let newStr = [];
    const len = str.length;
    const numPlaces = Math.floor(Math.random()*len+1);

    for(let i=0; i < str.length; i++) {
        let char = str.charCodeAt(i); // returns a number
        char += numPlaces;
        const validation = isValid(char);
        const secondVal = isValid(validation);
        const thirdVal = isValid(secondVal);
        newStr.push(String.fromCharCode(thirdVal));
    }
    return newStr;
  }

  const auth0 = encrypt(cipher).join('');

  export default auth0;