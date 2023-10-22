import React from "react";
import Search from "./containers/search.js";
import Export from "./containers/components/export.js";
import Name from "./containers/components/name.js";


export default function App() {
    return (
        <>
            <main>
                <Search />
            </main>
            <section>
                <Name />
                <Export />
            </section>
        </>
    )
}