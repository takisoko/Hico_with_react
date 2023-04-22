import React, { Component, useState, useEffect } from "react";
import { Button, Modal, Box, Typography, TextField, IconButton, Divider, Stack } from '@mui/material';
/*import CloseIcon from '@mui/icons-material/Close';*/
import axios, * as others from 'axios';
import { useParams } from "react-router-dom";
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import { IconEdit, IconX } from "@tabler/icons-react";
    


export function UnitModal({ refreshTable, setCustomMessage, setCustomSnackbarType }) {
    const [open, setOpen] = useState(false);
    const [unitTypes, setUnitTypes] = useState([]);
    const [value, setValue] = useState(null);
    const [loading, setLoading] = useState(true);
    const [formData, setFormData] = useState({ typeName: 'default type', name: 'default name' });

    useEffect(() => {
        fetchUnitData();

    }, []);


    const fetchUnitData = () => {
        axios
            .get('https://localhost:7012/unit/unitTypes')
            .then(function (response) {
                if (
                    (response && response.status === 201) ||
                    (response && response.status === 200)
                ) {
                    setLoading(false);
                    setUnitTypes(response.data);
                }
            })
            .catch((e) => {
                console.log("error", e);
                setCustomSnackbarType("error")
                setCustomMessage("Error loading unit types")
            });
    };

    const handleSelectChange = (e) => {
        setValue(e.target.value)
        setFormData({ typeName: e.target.value, name: formData.name })
    }

    const handleNameChange = (e) => {
        console.log("handleNameChange", formData)
        setFormData({ typeName: formData.typeName, name: e.target.value });
    }

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setFormData({ typeName: formData.typeName, name: '' });
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        axios
            .post('https://localhost:7012/unit', formData)
            .then(function (response) {
                if (
                    (response && response.status === 201) ||
                    (response && response.status === 200)
                ) {
                    setOpen(false);
                    refreshTable();
                    setCustomSnackbarType("success")
                    setCustomMessage("Unit added")
                }
            })
            .catch((e) => {
                console.log("error", e);
                setCustomSnackbarType("error")
                setCustomMessage("Error submiting unit data")
            });
    }

    return (
        <div>
            <Button variant="contained" sx={{ textTransform: 'none' }} onClick={handleOpen}>+ Add Unit</Button>
            <Modal open={open} onClose={handleClose}>
                <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', bgcolor: 'background.paper', boxShadow: 24, p: 4, width: '50vw', maxWidth: 500 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Typography variant="h6" component="h2">Add New Material</Typography>
                        <IconButton onClick={handleClose}>
                            <IconX />
                        </IconButton>
                    </Box>
                    <Divider sx={{ my: 2 }} />
                    
                    <form onSubmit={handleSubmit}>
                        {!loading && 
                            <Stack spacing={3}>
                            <FormControl fullWidth>
                                <TextField label="Name" fullWidth onChange={handleNameChange} />
                                </FormControl>
                            
                                <FormControl fullWidth>
                                
                                    <InputLabel id="Unit types" >Unit types</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={value || ''}
                                        label="Unit types"
                                        onChange={handleSelectChange}
                                    >
                                        {unitTypes.map(unitType =>
                                            <MenuItem key={unitType} value={unitType}>{unitType}</MenuItem>
                                        )}
                                    </Select>
                                </FormControl>
                            </Stack>}
                        <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }}>
                            <input type="submit" value="Submit" />
                        </Box>
                    </form>                    
                </Box>
            </Modal>
      
        </div>
    )


}
