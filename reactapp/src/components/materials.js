import React, { Component, useState, useEffect } from "react";
import axios, * as others from 'axios';
import { useParams } from "react-router-dom";


export function Materials() {
    const [materials, setMaterials] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        
        fetchData();
        
    }, []);

    const fetchData = () => {
        axios
            .get('https://localhost:7012/material')
            .then(function (response) {
                if (
                    (response && response.status === 201) ||
                    (response && response.status === 200)
                ) {
                    console.log("materials", response.data.materials);
                    setLoading(false);
                    setMaterials(response.data.materials);
                }
            })
            .catch((e) => {
                console.log("error", e);
            });
    };

    return (
            <div>
                <h1 id="tabelLabel" >Materials</h1>
            {loading
                ? <p><em>Loading...</em></p>
                : <table className='table table-striped' aria-labelledby="tabelLabel">
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Part Number</th>
                            <th>Manufacturer code</th>
                            <th>Price</th>
                            <th>Unit</th>
                        </tr>
                    </thead>
                    <tbody>
                        {materials.map(material =>
                            <tr key={material.id}>
                                <td>{material.id}</td>
                                <td>{material.partNumber}</td>
                                <td>{material.manufacturerCode}</td>
                                <td>{material.price}</td>
                                <td>{material.unitOfIssue.name}</td>
                            </tr>
                        )}
                    </tbody>
                </table>}
            </div>
    )

    
}
