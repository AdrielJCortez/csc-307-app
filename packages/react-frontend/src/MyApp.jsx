// src/MyApp.jsx
// To run react and see the html:
// npm run dev
import React, { useState } from "react";
import Table from "./Table";

// using hooks such as useState() to implement state and other side-effects with functional components
// characters is now owned by the myApp function
function MyApp() {
    const [characters, setCharacters] = useState([
    {
        name: "Charlie",
        job: "Janitor"
    },
    {
        name: "Mac",
        job: "Bouncer"
    },
    {
        name: "Dee",
        job: "Aspring actress"
    },
    {
        name: "Dennis",
        job: "Bartender"
    }
    ]);
    
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
    </div>
    );
}

// export the function MyApp so other files can use it such as main
export default MyApp;