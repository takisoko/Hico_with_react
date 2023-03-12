import React, { Component, useState, useEffect } from "react";
import axios, * as others from 'axios';
import { useParams } from "react-router-dom";


export function Units() {
    const [units, setUnits] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        fetchData();

    }, []);

    const fetchData = () => {
        axios
            .get('https://localhost:7012/unit')
            .then(function (response) {
                if (
                    (response && response.status === 201) ||
                    (response && response.status === 200)
                ) {
                    console.log("units", response.data);
                    setLoading(false);
                    setUnits(response.data);
                }
            })
            .catch((e) => {
                console.log("error", e);
            });
    };

    return (
        <div>
            <h1 id="tabelLabel" >Units</h1>
            {loading
                ? <p><em>Loading...</em></p>
                : <table className='table table-striped' aria-labelledby="tabelLabel">
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Name</th>
                            <th>Type</th>
                        </tr>
                    </thead>
                    <tbody>
                        {units.map(unit =>
                            <tr key={unit.id}>
                                <td>{ unit.id }</td>
                                <td>{ unit.name }</td>
                                <td>{ unit.typeName }</td>
                            </tr>
                        )}
                    </tbody>
                </table>}
        </div>
    )


}
