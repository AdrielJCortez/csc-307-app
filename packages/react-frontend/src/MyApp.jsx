// src/MyApp.jsx
// To run react and see the html:
// npm run dev
import React, { useState, useEffect } from "react";
import Table from "./Table";
import Form from "./Form";

// using hooks such as useState() to implement state and other side-effects with functional components
// characters is now owned by the myApp function
const DEFAULTS = []
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
        postUser(person)
            .then(() => setCharacters([...characters, person]))
            .catch((error) => {
                console.log(error);
            })
    }

    function fetchUsers() {
        const promise = fetch("http://localhost:8000/users");
        return promise
    }

    useEffect(() => {
        fetchUsers()
            .then((res) => res.json())
            .then((json) => setCharacters(json["users_list"]))
            .catch((error) => { console.log(error); });
        
    }, [] ) ;

    function postUser(person) {
        const promise = fetch("Http://localhost:8000/users", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(person),
        });

        return promise;
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