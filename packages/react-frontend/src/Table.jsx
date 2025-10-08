// src/Table.jsx
import React from "react";

function TableHeader() {
    return (
        <thead> 
            <tr>
                <th>ID</th> 
                <th>Name</th> 
                <th>Job</th>
                <th>Remove</th>
            </tr>
        </thead>
    );
}
// For orgainzation break components such as Table into Table_header and body

// Props are a great way to pass existing data to a React component, 
// however the component cannot change the props and are read only!
function TableBody(props) {
    const rows = props.characterData.map((row, index) => {
        return (
            <tr key={index}>
                <td>{row.id}</td>
                <td>{row.name}</td>
                <td>{row.job}</td>
                <td>
                    <button onClick={() => props.removeCharacter(index)}>
                        Delete
                    </button>
                </td>
            </tr>
        );
    }
    )
    return (
        <tbody>
            {rows}
        </tbody>
    );
}

function Table(props){
    return (
        <table>
            <TableHeader />
            <TableBody 
                characterData={props.characterData}
                removeCharacter={props.removeCharacter}
            />
        </table>
    );
}

export default Table;