import React from 'react';
import "./Table.css";

function Table({ countries }) {
    return (
        <div className="table">
            {countries.map((country) => ( 
                //emmet tr>td*2
                <tr>
                    <td>{country.country}</td>
                    <td><strong>{country.cases}</strong></td>
                </tr>
            ))}
        </div>
    )
}

export default Table
