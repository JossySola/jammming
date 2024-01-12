# #1
## SITUATION (Context)

After the Spotify API redirected the user to the Web App, the App needed to take a specific action after redirection. If authorized **Request Access Token**, if denied **Display an error message**.

## TASK (Responsability)

*(Only when working in a team)*

## ACTION (Breakdown of process)

- Used **useEffect** to perform the request of the Access token if authorized
- Display the correct message if unauthorized
- Set **useState** to know if the *connection*'s state is established or not

## RESULT (Outcome)

The Web App requests the **Access token** if the user authorizes, letting the App access the Spotify API successfully. The Web App displays the correct alert message if the user is redirected after they deny access.

---
# #2
## SITUATION (Context)

To have a better UI flow, the Web App needed to request Spotify Authorization only when the user started searching for a song/artist, instead of requesting the authorization immediately after the Web App loaded.

## TASK (Responsability)

*(Only when working in a team)*

## ACTION (Breakdown of process)

- Once the Web App loads, it sends a GET request to the Spotify API with an *IIFE async function* and utilizes the **Connection State** to store whether there is a connection with the API or not based on the response received.

## RESULT (Outcome)

- If the connection does not exist:
    - Sets the **Connection State** to false
- If the connection exists:
    - Sets the **Connection State** to true
    - Makes the appropriate React component to request the user's playlists to be displayed