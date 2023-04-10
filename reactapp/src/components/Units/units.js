import React, { Component, useState, useEffect } from "react";
import axios, * as others from 'axios';
import { useParams } from "react-router-dom";
import { UnitModal } from "./Modal";
import { CustomSnackbar } from "../Snackbar";
import { IconTrash, IconEdit } from "@tabler/icons-react";
import {
    Autocomplete,
    FormControl, InputLabel, Select, MenuItem, Button
} from "@mui/material";



export function Units() {
    const [units, setUnits] = useState(null);
    const [loading, setLoading] = useState(true);
    const [value, setValue] = useState(null);
    const [index, setIndex] = useState(0);
    const [message, setMessage] = useState("");
    const [snackbarType, setSnackbarType] = useState("");

    useEffect(() => {

        fetchData();

    }, [index]);

    const refreshTable = () => {
        setIndex(index + 1);
    };

    const onDelete = (id) => {
        axios
            .delete('https://localhost:7012/unit/' + id)
            .then(function (response) {
                if (
                    (response && response.status === 201) ||
                    (response && response.status === 200)
                ) {
                    setLoading(false);
                    fetchData();
                }
            })
            .catch((e) => {
                console.log("error", e);
                setCustomSnackbarType("error")
                setCustomMessage("Error loading units")
            });
    }

    const fetchData = () => {
        axios
            .get('https://localhost:7012/unit/allUnits/0')
            .then(function (response) {
                if (
                    (response && response.status === 201) ||
                    (response && response.status === 200)
                ) {
                    setLoading(false);
                    setUnits(response.data);
                }
            })
            .catch((e) => {
                console.log("error", e);
                setCustomSnackbarType("error")
                setCustomMessage("Error deleting unit")
            });
    };

    const setCustomMessage = (message) => {
        setMessage(message)
    }

    const setCustomSnackbarType = (type) => {
        setSnackbarType(type)
    }

    return (
        <div>
            <CustomSnackbar type={snackbarType} message={message} />
            <UnitModal refreshTable={refreshTable} setCustomMessage={setCustomMessage} setCustomSnackbarType={setCustomSnackbarType } />
            <h1 id="tabelLabel" >Units</h1>
            {loading
                ? <p><em>Loading...</em></p>
                :
                <>
                    <table className='table table-striped' aria-labelledby="tabelLabel">
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Name</th>
                            <th>Type</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {units.map(unit =>
                            <tr key={unit.id}>
                                <td>{ unit.id }</td>
                                <td>{ unit.name }</td>
                                <td>{unit.typeName}</td>
                                <td><Button onClick={() => onDelete(unit.id)}> <IconTrash width={20} /></Button></td>
                            </tr>
                        )}
                    </tbody>
                    </table>
                </>
            }
        </div>
    )


}
