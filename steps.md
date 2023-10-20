# Steps taken

## UI Hierarchy

Root
|
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

## State Representation

+ Songs data
    [x] The data changes over time.
    [x] The data is not passed via props.
    [x] The data is not computed based on existing state or props.
+ Search data
    [x] The data changes over time.
    [x] The data is not passed via props.
    [x] The data is not computed based on existing state or props.
+ Playlist data
    [x] The data changes over time.
    [x] The data is not passed via props.
    [x] The data is not computed based on existing state or props.

## State Placement

+ *External JS*
+ `Playlist Reducer`< - - - - - ┐
    + Search Component          |
        + `Search State`        |
            + Songs Component   |
                + `Songs State` |