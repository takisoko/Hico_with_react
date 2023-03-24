import React, { Component, useState, useEffect } from "react";
import { Button, Modal, Box, Typography, TextField, IconButton, Divider } from '@mui/material';
/*import CloseIcon from '@mui/icons-material/Close';*/
import axios, * as others from 'axios';
import {    FormControl, InputLabel, Select, MenuItem } from "@mui/material";

    


export function AddMaterialModal({ refreshTable }) {
    const [open, setOpen] = useState(false);
    const [units, setUnits] = useState([]);
    const [value, setValue] = useState(null);
    const [loading, setLoading] = useState(true);
    const [formData, setFormData] = useState({ PartNumber: 'default PartNumber', ManufacturerCode: 0, Price: 0, UnitOfIssue: { typeName: 'default type', name: 'default name' } });

    useEffect(() => {
        fetchUnitData();

    }, []);


    const fetchUnitData = () => {

        console.log("fetchUnitData");
        axios
            .get('https://localhost:7012/unit')
            .then(function (response) {
                if (
                    (response && response.status === 201) ||
                    (response && response.status === 200)
                ) {
                    console.log("response", response);
                    setLoading(false);
                    setUnits(response.data);
                }
            })
            .catch((e) => {
                console.log("error", e);
            });
    };

    const handleSelectChange = (e) => {
        setValue(e.target.value)
        setFormData({ PartNumber: formData.PartNumber, ManufacturerCode: formData.ManufacturerCode, Price: formData.Price, UnitOfIssueId: e.target.value })
    }

    const handleManufacturerCodeChange = (e) => {
        setFormData({ PartNumber: formData.PartNumber, ManufacturerCode: e.target.value, Price: formData.Price, UnitOfIssueId: e.target.value })
    }

    const handlePriceChange = (e) => {
        setFormData({ PartNumber: formData.PartNumber, ManufacturerCode: formData.ManufacturerCode, Price: e.target.value, UnitOfIssueId: e.target.value })
    }

    const handlePartNumberChange = (e) => {
        setFormData({ PartNumber: e.target.value, ManufacturerCode: formData.ManufacturerCode, Price: formData.Price, UnitOfIssueId: e.target.value })
    }


    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleSubmit = (event) => {
        event.preventDefault();

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
                                    <TextField label="PartNumber" fullWidth onChange={handlePartNumberChange} />
                                </FormControl>
                                <FormControl fullWidth>
                                    <TextField label="ManufacturerCode" fullWidth onChange={handleManufacturerCodeChange} />
                                </FormControl>
                                <FormControl fullWidth>
                                    <TextField label="Price" fullWidth onChange={handlePriceChange} />
                                </FormControl>
                            
                                <FormControl fullWidth>
                                
                                    <InputLabel id="Units" >Units</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={value || ''}
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
