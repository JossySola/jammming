# STEPS TAKEN

## UI Hierarchy
```html
<!--

Root
|
|__ App
    |__ Search
    |       |__ Songs
    |              |__ Add
    |              |__ Remove
    |
    |__ Playlist
    |        |__ Table
    |        |     |__ Songs
    |        |            |__ Remove
    |        |__ Name
    |        |__ Export

-->
```
## State Representation

+ Search data
    - [x] The data changes over time.
    - [x] The data is not passed via props.
    - [x] The data is not computed based on existing state or props.
+ Songs data
    - [x] The data changes over time.
    - [x] The data is not passed via props.
    - [x] The data is not computed based on existing state or props.
+ Playlist data
    - [x] The data changes over time.
    - [x] The data is not passed via props.
    - [x] The data is not computed based on existing state or props.

## State Placement
```html
<!--

+ *External JS*
+ `Playlist Reducer`< - - - - - ┐
    + Search Component          |
        + `Search State`        |
            + Songs Component   |
                + `Songs State` |
                
-->
```

## Conditionals

| **IF** | **THEN** |
| ------ | -------- |
| Main is empty | "Start searching for your fav songs!" |
| Attempt adding a song already in Playlist | "This song is already in your playlist!" |
| Export without Playlist name | Alert: "Don't forget to name your playlist!" |
| Attempt exporting without songs | Alert: "Pick some songs first!" |
| Attempt export without log in Spotify | "Let's log in first!" |

## Packages in local environment

*Project created without npm create-react-app*

> npm init

> npm install react@latest -g

> npm install react-dom@latest -g

> npm install curl@latest -g

> git clone https://github.com/Microsoft/vcpkg.git

> cd vcpkg

> ./bootstrap-vcpkg.sh

> ./vcpkg integrate install

> vcpkg install curl[tool]

+ Create folder named "public"
    + Create file named "index.html"

> npm install react-scripts@latest -g

+ Edit package.json
```json
"devDependencies": {
    "react-scripts": "^5.0.1"
  },
"scripts": {
    "start": "react-scripts start"
  }
```

+ Create folder named "src"
    + Create file named "index.js"

*Relative imports outside of src/ are not supported.*

## Connect components and return only JSX in each one
## Create basic CSS styling to identify elements in a live environment