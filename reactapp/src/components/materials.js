import React, { Component, useState, useEffect } from "react";
import axios, * as others from 'axios';
import { useParams } from "react-router-dom";
import { Button, Modal, Box, Typography, TextField, IconButton, Divider } from '@mui/material';
/*import CloseIcon from '@mui/icons-material/Close';*/



export function Materials() {
    const [materials, setMaterials] = useState(null);
    const [loading, setLoading] = useState(true);
    const [open, setOpen] = useState(false);

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
            <Button variant="contained" sx={{ textTransform: 'none' }} onClick={handleOpen}>+ Add Material</Button>
            <Modal open={open} onClose={handleClose}>
                <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', bgcolor: 'background.paper', boxShadow: 24, p: 4, width: '50vw', maxWidth: 500 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Typography variant="h6" component="h2">Add New Material</Typography>
                        <IconButton onClick={handleClose}>
                            {/*<CloseIcon />*/}
                        </IconButton>
                    </Box>
                    <Divider sx={{ my: 2 }} />
                    <TextField label="Name" fullWidth />
                    <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }}>
                        <Button variant="contained" >Save</Button>
                    </Box>
                </Box>
            </Modal>
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
