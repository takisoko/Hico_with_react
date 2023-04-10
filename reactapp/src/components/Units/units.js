import React, { Component, useState, useEffect } from "react";
import axios, * as others from 'axios';
import { useParams } from "react-router-dom";
import { UnitModal } from "./Modal";
import { DeleteModal } from "../DeleteModal";
import { CustomSnackbar } from "../Snackbar";
import { IconTrash, IconEdit } from "@tabler/icons-react";
import {
    Autocomplete,
    FormControl, InputLabel, Select, MenuItem, Button
} from "@mui/material";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';



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
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell >Id</TableCell>
                                <TableCell align="left">Name</TableCell>
                                <TableCell align="right">Type</TableCell>
                                <TableCell align="right">Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {units.map(unit =>
                                <TableRow key={unit.id}>
                                    <TableCell >{unit.id}</TableCell>
                                    <TableCell align="left">{unit.name}</TableCell>
                                    <TableCell align="right">{unit.typeName}</TableCell>
                                    <TableCell align="right">
                                        <DeleteModal id={unit.id} type="Unit" DeleteData={onDelete} name={unit.name} />
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
            }
        </div>
    )


}
