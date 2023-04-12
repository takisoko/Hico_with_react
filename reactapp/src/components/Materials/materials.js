import React, { Component, useState, useEffect } from "react";
import axios, * as others from 'axios';
import { useParams } from "react-router-dom";
import { CustomSnackbar } from "../Snackbar";
import { Button, Modal, Box, Typography, TextField, IconButton, Divider } from '@mui/material';
/*import CloseIcon from '@mui/icons-material/Close';*/
import { DeleteModal } from "../DeleteModal";

import { IconTrash, IconEdit } from "@tabler/icons-react";
import { AddMaterialModal } from "./AddMaterialModal";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';


export function Materials() {
    const [materials, setMaterials] = useState(null);
    const [loading, setLoading] = useState(true);
    const [open, setOpen] = useState(false);
    const [index, setIndex] = useState(0);
    const [message, setMessage] = useState("");
    const [snackbarType, setSnackbarType] = useState("");

    useEffect(() => {

        fetchData();

    }, [index]);

    const refreshTable = () => {
        setIndex(index + 1);
    };
    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

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
                    setLoading(false);
                    setMaterials(response.data.materials);
                }
            })
            .catch((e) => {
                console.log("error", e);
                setCustomSnackbarType("error")
                setCustomMessage("Error loading materials")
            });
    };

    const onDelete = (id) => {
        axios
            .delete('https://localhost:7012/material/ToggleActive/' + id)
            .then(function (response) {
                if (
                    (response && response.status === 201) ||
                    (response && response.status === 200)
                ) {
                    setLoading(false);
                    setCustomSnackbarType("success")
                    setCustomMessage("Successfully changed material")
                    fetchData();
                }
            })
            .catch((e) => {
                console.log("error", e);
                setCustomSnackbarType("error")
                setCustomMessage("Error deleting material")
            });
    }


    const setCustomMessage = (message) => {
        setMessage(message)
    }

    const setCustomSnackbarType = (type) => {
        setSnackbarType(type)
    }

    return (
        <div>           

            <CustomSnackbar type={snackbarType} message={message} />
            <AddMaterialModal refreshTable={refreshTable} mode="add" type={0} setCustomMessage={setCustomMessage} setCustomSnackbarType={setCustomSnackbarType} />
            <h1 id="tabelLabel" >Materials</h1>
            {loading
                ? <p><em>Loading...</em></p>
                : <TableContainer component={Paper}>
                    <Table>
                    <thead>
                        <TableRow>
                            <TableCell align="left">Id</TableCell>
                            <TableCell align="left">Part Number</TableCell>
                            <TableCell>Manufacturer code</TableCell>
                            <TableCell>Price</TableCell>
                            <TableCell>Unit</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </thead>
                    <TableBody>
                        {materials.map(material =>
                            <TableRow key={material.id}>
                                <TableCell align="left">{material.id}</TableCell>
                                <TableCell align="left">{material.partNumber}</TableCell>
                                <TableCell>{material.manufacturerCode}</TableCell>
                                <TableCell>{material.price}</TableCell>
                                <TableCell>{material.unitOfIssue.name}</TableCell>
                                <TableCell style={{ display: "flex" }}>
                                    {material.active &&
                                            <AddMaterialModal refreshTable={refreshTable} id={material.id} mode="edit" type={material.unitOfIssue.type} setCustomMessage={setCustomMessage} setCustomSnackbarType={setCustomSnackbarType} />
                                    }
                                    <DeleteModal id={material.id} type="Material" DeleteData={onDelete} name={material.partNumber} active={material.active } />
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                    </Table>
                </TableContainer>}
        </div>
    )


}
