import React, { Component, useState, useEffect } from "react";
import axios, * as others from 'axios';
import { useParams } from "react-router-dom";
import { Button, Modal, Box, Typography, TextField, IconButton, Divider } from '@mui/material';
/*import CloseIcon from '@mui/icons-material/Close';*/

import { IconTrash, IconEdit } from "@tabler/icons-react";
import { AddMaterialModal } from "./AddMaterialModal";


export function Materials() {
    const [materials, setMaterials] = useState(null);
    const [loading, setLoading] = useState(true);
    const [open, setOpen] = useState(false);
    const [index, setIndex] = useState(0);

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
            });
    };

    const onDelete = (id) => {
        console.log("id", id);
        axios
            .delete('https://localhost:7012/material/' + id)
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
            });
    }

    return (
        <div>           

            <AddMaterialModal refreshTable={refreshTable} mode="add"/>
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
                            <th>Actions</th>
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
                                <td>
                                    <Button onClick={() => onDelete(material.id)}> <IconTrash width={20} /></Button>
                                    <AddMaterialModal refreshTable={refreshTable} id={material.id} mode="edit"/>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>}
        </div>
    )


}
