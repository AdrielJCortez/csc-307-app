// src/MyApp.jsx
// To run react and see the html:
// npm run dev
import React, { useState } from "react";
import Table from "./Table";
import Form from "./Form"

// using hooks such as useState() to implement state and other side-effects with functional components
// characters is now owned by the myApp function
function MyApp() {
    const [characters, setCharacters] = useState([]);
    
    // used to update the characters if we want one of them removed
    function removeOneCharacter(index){
        const updated = characters.filter((characters, i) => {
            return i !== index;
        });
        setCharacters(updated)
    }

    return(
    <div className="container">
        <Table 
            characterData={characters}
            removeOneCharacter={removeOneCharacter}
        />
        <Form />
    </div>
    );
}

// export the function MyApp so other files can use it such as main
export default MyApp;