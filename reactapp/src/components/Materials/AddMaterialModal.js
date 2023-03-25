import React, { Component, useState, useEffect } from "react";
import { Button, Modal, Box, Typography, TextField, IconButton, Divider } from '@mui/material';
/*import CloseIcon from '@mui/icons-material/Close';*/
import axios, * as others from 'axios';
import {    FormControl, InputLabel, Select, MenuItem } from "@mui/material";

    


export function AddMaterialModal({ refreshTable, id, mode }) {
    const [open, setOpen] = useState(false);
    const [units, setUnits] = useState([]);
    const [value, setValue] = useState(null);
    const [loading, setLoading] = useState(true);
    const [formData, setFormData] = useState({ PartNumber: '', ManufacturerCode: 0, Price: 0, UnitOfIssueId: 0 });

    useEffect(() => {
        console.log("useEffect open");
        fetchUnitData();

    }, [open]);


    const fetchUnitData = () => {

        console.log("fetchUnitData");
        axios
            .get('https://localhost:7012/unit')
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
            });

        if (mode == 'edit') {
            console.log("fetchMaterialData", id);
            axios
                .get('https://localhost:7012/material/'+ id)
                .then(function (response) {
                    if (
                        (response && response.status === 201) ||
                        (response && response.status === 200)
                    ) {
                        console.log("responsess", response);
                        setFormData({ PartNumber: response.data.material.partNumber, ManufacturerCode: parseInt(response.data.material.manufacturerCode), Price: parseInt(response.data.material.price), UnitOfIssueId: parseInt(response.data.material.unitOfIssueId) })
                    }
                })
                .catch((e) => {
                    console.log("error", e);
                });
        }

        console.log("response formData", formData);
    };

    const handleSelectChange = (e) => {
        setValue(e.target.value)
        setFormData({ PartNumber: formData.PartNumber, ManufacturerCode: formData.ManufacturerCode, Price: formData.Price, UnitOfIssueId: e.target.value })
    }

    const handleManufacturerCodeChange = (e) => {
        setFormData({ PartNumber: formData.PartNumber, ManufacturerCode: e.target.value, Price: formData.Price, UnitOfIssueId: formData.UnitOfIssueId })
    }

    const handlePriceChange = (e) => {
        setFormData({ PartNumber: formData.PartNumber, ManufacturerCode: formData.ManufacturerCode, Price: e.target.value, UnitOfIssueId: formData.UnitOfIssueId })
    }

    const handlePartNumberChange = (e) => {
        setFormData({ PartNumber: e.target.value, ManufacturerCode: formData.ManufacturerCode, Price: formData.Price, UnitOfIssueId: formData.UnitOfIssueId })
    }


    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        console.log("response formData", formData);
        axios
            .post('https://localhost:7012/material', formData)
            .then(function (response) {
                if (
                    (response && response.status === 201) ||
                    (response && response.status === 200)
                ) {
                    setOpen(false);
                    refreshTable();
                }
            })
            .catch((e) => {
                console.log("error", e);
            });
    }

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
                    
                    <form onSubmit={handleSubmit}>
                        {!loading && 
                            <>
                            <FormControl fullWidth>
                                    <TextField label="PartNumber" value={formData.PartNumber} fullWidth onChange={handlePartNumberChange} />
                                </FormControl>
                            <FormControl fullWidth>
                                    <TextField label="ManufacturerCode" value={formData.ManufacturerCode} fullWidth onChange={handleManufacturerCodeChange} />
                                </FormControl>
                                <FormControl fullWidth>
                                    <TextField label="Price" fullWidth value={formData.Price} onChange={handlePriceChange} />
                                </FormControl>
                            
                                <FormControl fullWidth>
                                
                                    <InputLabel id="Units" >Units</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={formData.UnitOfIssueId || ''}
                                        label="Unit types"
                                        onChange={handleSelectChange}
                                    >
                                        {units.map(unit =>
                                            <MenuItem key={unit.id} value={unit.id}>{unit.name}</MenuItem>
                                        )}
                                    </Select>
                                </FormControl>
                            </>}
                        <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }}>
                            <input variant="contained" type="submit" value="Submit" />
                        </Box>
                    </form>
                </Box>
            </Modal>
      
        </div>
    )


}
