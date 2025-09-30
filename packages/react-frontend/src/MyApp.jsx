// src/MyApp.jsx
// To run react and see the html:
// npm run dev
import React, { useState } from "react";
import Table from "./Table";
import Form from "./Form"

// using hooks such as useState() to implement state and other side-effects with functional components
// characters is now owned by the myApp function
const DEFAULTS = [
    { name: "Charlie", job: "Janitor" },
    { name: "Mac", job: "Bouncer" },
]
function MyApp() {
    const [characters, setCharacters] = useState(() => DEFAULTS);
    // useState([])
    
    // used to update the characters if we want one of them removed
    function removeOneCharacter(index){
        const updated = characters.filter((characters, i) => {
            return i !== index;
        });
        setCharacters(updated)
    }
    function updateList(person) {
    setCharacters([...characters, person]);
    }

    return(
    <div className="container">
        <h1>Name and Job postings</h1>
        <Table 
            characterData={characters}
            removeCharacter={removeOneCharacter}
        />
        <Form handleSubmit={updateList}/>
    </div>
    );
}

// export the function MyApp so other files can use it such as main
export default MyApp;