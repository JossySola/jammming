function generateString(length) {
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const values = crypto.getRandomValues(new Uint8Array(length));
    // Uint8Array [0: 30, 1: 131, 2: 85, 3: 204, 4: 64...]
    return values.reduce((acc, x) => acc + possible[x % possible.length], ""); 
    // .reduce(callbackFn, initialValue)
    // callbackFn = A function to execute for each element in the array.
    // its return value becomes the value of the *accumulator* parameter
    // on the next invocation of callbackFn.
    //
    // (accumulator, currentValue, currentIndex) => expression
    // (30,131) => 30 + possible[131 % 62 = 7]
    //            30 = e + 7 = H
    // (37,85) => 37 + possible[85 % 62 = 23]
    //               23 = X
}

export default verifier = generateString(64);
// eHXSCU1MkTL5wAHwtQfNMJU8cCetHMnWuD9FKUCvtBdwK63FORWJ7OlTiUFx62EY