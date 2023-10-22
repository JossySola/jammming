import React from "react";
import Add from "./components/add.js";
import Remove from "./components/remove.js";

export default function Song() {
    return (
        <>
            <details>
                Song
                <Add />
                <Remove />
            </details>
        </>
    )
}