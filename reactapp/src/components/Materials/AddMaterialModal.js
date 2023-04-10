import React, { Component, useState, useEffect } from "react";
import { Button, Modal, Box, Typography, TextField, IconButton, Divider } from '@mui/material';
/*import CloseIcon from '@mui/icons-material/Close';*/
import axios, * as others from 'axios';
import {    FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import { IconEdit, IconX } from "@tabler/icons-react";
    


export function AddMaterialModal({ refreshTable, id, mode, type, setCustomMessage, setCustomSnackbarType }) {
    const [open, setOpen] = useState(false);
    const [units, setUnits] = useState([]);
    const [value, setValue] = useState(null);
    const [loading, setLoading] = useState(true);
    const [formData, setFormData] = useState({ Id: id, PartNumber: '', ManufacturerCode: 0, Price: 0, UnitOfIssueId: 0 });

    useEffect(() => {
        if(open)
            fetchUnitData();

    }, [open]);


    const fetchUnitData = () => {

        axios
            .get('https://localhost:7012/unit/allUnits/' + type)
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
                setCustomMessage("Error loading unit types")
            });

        if (mode == 'edit') {
            axios
                .get('https://localhost:7012/material/'+ id)
                .then(function (response) {
                    if (
                        (response && response.status === 201) ||
                        (response && response.status === 200)
                    ) {
                        setFormData({ Id: id, PartNumber: response.data.material.partNumber, ManufacturerCode: parseInt(response.data.material.manufacturerCode), Price: parseInt(response.data.material.price), UnitOfIssueId: parseInt(response.data.material.unitOfIssueId) })
                    }
                })
                .catch((e) => {
                    console.log("error", e);
                    setCustomSnackbarType("error")
                    setCustomMessage("Error loading material")
                });
        }

    };

    const handleSelectChange = (e) => {
        setValue(e.target.value)
        setFormData({ Id: formData.Id, PartNumber: formData.PartNumber, ManufacturerCode: formData.ManufacturerCode, Price: formData.Price, UnitOfIssueId: e.target.value })
    }

    const handleManufacturerCodeChange = (e) => {
        setFormData({ Id: formData.Id, PartNumber: formData.PartNumber, ManufacturerCode: e.target.value, Price: formData.Price, UnitOfIssueId: formData.UnitOfIssueId })
    }

    const handlePriceChange = (e) => {
        setFormData({ Id: formData.Id, PartNumber: formData.PartNumber, ManufacturerCode: formData.ManufacturerCode, Price: e.target.value, UnitOfIssueId: formData.UnitOfIssueId })
    }

    const handlePartNumberChange = (e) => {
        setFormData({ Id: formData.Id, PartNumber: e.target.value, ManufacturerCode: formData.ManufacturerCode, Price: formData.Price, UnitOfIssueId: formData.UnitOfIssueId })
    }


    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        if (mode == 'edit') {
            setFormData({ Id: id, PartNumber: formData.PartNumber, ManufacturerCode: formData.ManufacturerCode, Price: formData.Price, UnitOfIssueId: formData.UnitOfIssueId })

            axios
                .put('https://localhost:7012/material/', formData)
                .then(function (response) {
                    if (
                        (response && response.status === 201) ||
                        (response && response.status === 200)
                    ) {
                        setOpen(false);
                        refreshTable();
                        setCustomSnackbarType("success")
                        setCustomMessage("Edited material")
                        console.log("success");
                    }
                    else if (response && response.status === 400) {
                        console.log(response.data.message);
                    }
                })
                .catch((e) => {
                    let er = e.response;
                    if (er.status === 400) {
                        console.log(er.data.message);
                    }
                    console.log("error", e);
                    setCustomSnackbarType("error")
                    setCustomMessage("Error editing material")
                });
        }
        else {
            axios
                .post('https://localhost:7012/material', formData)
                .then(function (response) {
                    if (
                        (response && response.status === 201) ||
                        (response && response.status === 200)
                    ) {
                        setOpen(false);
                        refreshTable();
                        setCustomSnackbarType("success")
                        setCustomMessage("Added a material")
                    }
                })
                .catch((e) => {
                    console.log("error", e);
                    setCustomSnackbarType("error")
                    setCustomMessage("Error adding material")
                });
        }
    }

    return (
        <div>
            <Button variant="contained" sx={{ textTransform: 'none' }} onClick={handleOpen}>{mode != "edit" ? "+ Add Material" : <IconEdit/>}</Button>
            <Modal open={open} onClose={handleClose}>
                <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', bgcolor: 'background.paper', boxShadow: 24, p: 4, width: '50vw', maxWidth: 500 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Typography variant="h6" component="h2"> {mode != "edit" ? "Add New Material" : "Edit Material"}</Typography>
                        <IconButton onClick={handleClose}>
                            <IconX />
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
                                    <TextField label="ManufacturerCode" value={formData.ManufacturerCode} fullWidth onChange={handleManufacturerCodeChange}  type="number"/>
                                </FormControl>
                                <FormControl fullWidth>
                                    <TextField label="Price" fullWidth value={formData.Price} onChange={handlePriceChange}  type="number"/>
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
