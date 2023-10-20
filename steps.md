# Steps taken

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