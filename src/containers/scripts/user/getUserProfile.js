const getCurrentUserProfile = async () => {
    const access = localStorage.getItem('access_token');

    try {
        const body = await fetch('https://api.spotify.com/v1/me', {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${access}`
            }
        })

        if(body.status !== 200 || response.error) {
            throw new Error(response.error + " // " +  response.error_description, {
                cause: body.status
            })
        }

        const response = await body.json();
        localStorage.setItem('user', response.id);
        return response;

    } catch (err) {
        alertMsg(err.cause);

        console.error({
            From: "request",
            err,
            Code: err.cause,
        });
        
        return false;
    }
}

export default getCurrentUserProfile;