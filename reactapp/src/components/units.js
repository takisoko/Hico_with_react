import React, { Component, useState, useEffect } from "react";
import axios, * as others from 'axios';
import { useParams } from "react-router-dom";
import {
    Autocomplete,
    FormControl, InputLabel, Select, MenuItem
} from "@mui/material";



export function Units() {
    const [units, setUnits] = useState(null);
    const [unitTypes, setUnitTypes] = useState(null);
    const [loading, setLoading] = useState(true);
    const [value, setValue] = useState(null);

    useEffect(() => {

        fetchData();
       /* fetchUnitData();*/

    }, []);


    const fetchUnitData = () => {
        axios
            .get('https://localhost:7012/unit/unitTypes')
            .then(function (response) {
                if (
                    (response && response.status === 201) ||
                    (response && response.status === 200)
                ) {
                    console.log("unitTypes", response.data);
                    setLoading(false);
                    setUnitTypes(response.data);
                    console.log("unitTypes2", unitTypes);
                }
            })
            .catch((e) => {
                console.log("error", e);
            });
    };

    const handleSelectChange = (e) => {

        console.log("e", e.target);
        setValue(e.target.value)
    }

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
                    console.log("units2", units);
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
                :
                <>
                    <div>
                        <FormControl fullWidth>
                            <InputLabel id="Unit types">Unit types</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={value || ''}
                                label="Unit types"
                                onChange={handleSelectChange}
                            >
                                {units.map(unit =>
                                    <MenuItem key={unit.name}  value={unit.name}>{unit.name}</MenuItem>
                                )}
                            </Select>
                        </FormControl>
                    </div>
                    <table className='table table-striped' aria-labelledby="tabelLabel">
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
                    </table>
                </>
            }
        </div>
    )


}
