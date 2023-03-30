import React, { Component, useState, useEffect } from "react";
import { Button, Modal, Box, Typography, TextField, IconButton, Divider } from '@mui/material';
/*import CloseIcon from '@mui/icons-material/Close';*/
import axios, * as others from 'axios';
import {    FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import { IconEdit, IconX } from "@tabler/icons-react";
    


export function TaskModal({ refreshTable, id, mode, type }) {
    const [open, setOpen] = useState(false);
    const [units, setUnits] = useState([]);
    const [unitsUsed, setUnitsUsed] = useState([]);
    const [materials, setMaterials] = useState([]);
    const [value, setValue] = useState(null);
    const [loading, setLoading] = useState(true);
    const [formData, setFormData] = useState({ Id: "", Name: "", Description: "", TotalDuration: 0, Amount: 0, UnitOfMeasurementId: 0, MaterialId: 0 });

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
            });
       
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

        if (mode == 'edit') {
            axios
                .get('https://localhost:7012/task/'+ id)
                .then(function (response) {
                    if (
                        (response && response.status === 201) ||
                        (response && response.status === 200)
                    ) {
                        setFormData({ Id: id, Name: response.data.task.Name, Description: response.data.task.Description, TotalDuration: parseInt(response.data.task.TotalDuration), Amount: parseInt(response.data.task.Amount), UnitOfMeasurementId: parseInt(response.data.task.value), MaterialId: parseInt(response.data.task.MaterialId) })
                    }
                })
                .catch((e) => {
                    console.log("error", e);
                });
        }

    };

    const handleSelectChange = (e) => {
        setValue(e.target.value)
        setFormData({ Id: formData.Id, Name: formData.Name, Description: formData.Description, TotalDuration: formData.TotalDuration, Amount: formData.Amount, UnitOfMeasurementId: e.target.value, MaterialId: formData.MaterialId })
    }

    const handleNameChange = (e) => {
        setFormData({ Id: formData.Id, Name: e.target.value, Description: formData.Description, TotalDuration: formData.TotalDuration, Amount: formData.Amount, UnitOfMeasurementId: formData.UnitOfMeasurementId, MaterialId: formData.MaterialId })
    }
    const handleDescriptionChange = (e) => {
        setFormData({ Id: formData.Id, Name: formData.Name, Description: e.target.value, TotalDuration: formData.TotalDuration, Amount: formData.Amount, UnitOfMeasurementId: formData.UnitOfMeasurementId, MaterialId: formData.MaterialId })
    }
    const handleTotalDurationChange = (e) => {
        setFormData({ Id: formData.Id, Name: formData.Name, Description: formData.Description, TotalDuration: e.target.value, Amount: formData.Amount, UnitOfMeasurementId: formData.UnitOfMeasurementId, MaterialId: formData.MaterialId })
    }
    const handleAmountChange = (e) => {
        setFormData({ Id: formData.Id, Name: formData.Name, Description: formData.Description, Amount: e.target.value, TotalDuration: formData.TotalDuration, UnitOfMeasurementId: formData.UnitOfMeasurementId, MaterialId: formData.MaterialId })
    }
    const handleMaterialSelectChange = (e) => {
        const m = materials.filter(m => m.id == e.target.value)
        const materialUnits = units.filter(u => u.type == m[0].unitOfIssue.type);
        setUnitsUsed(materialUnits)
        setFormData({ Id: formData.Id, Name: formData.Name, Description: formData.Description, TotalDuration: formData.TotalDuration, Amount: formData.Amount, UnitOfMeasurementId: formData.UnitOfMeasurementId, MaterialId: e.target.value })
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
            setFormData({ Id: formData.Id, Name: formData.Name, Description: formData.Description, TotalDuration: formData.TotalDuration, Amount: formData.Amount, UnitOfMeasurementId: formData.UnitOfMeasurementId, MaterialId: formData.MaterialId })

            axios
                .put('https://localhost:7012/task/', formData)
                .then(function (response) {
                    if (
                        (response && response.status === 201) ||
                        (response && response.status === 200)
                    ) {
                        setOpen(false);
                        refreshTable();
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
                });
        }
        else {
            setFormData({ Name: formData.Name, Description: formData.Description, TotalDuration: parseInt(formData.TotalDuration), Amount: parseInt(formData.Amount), UnitOfMeasurementId: formData.UnitOfMeasurementId, MaterialId: formData.MaterialId })

            axios
                .post('https://localhost:7012/task', formData)
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
    }

    return (
        <div>
            <Button variant="contained" sx={{ textTransform: 'none' }} onClick={handleOpen}>{mode != "edit" ? "+ Add Task" : <IconEdit/>}</Button>
            <Modal open={open} onClose={handleClose}>
                <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', bgcolor: 'background.paper', boxShadow: 24, p: 4, width: '50vw', maxWidth: 500 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Typography variant="h6" component="h2"> {mode != "edit" ? "Add New Task" : "Edit Task"}</Typography>
                        <IconButton onClick={handleClose}>
                            <IconX />
                        </IconButton>
                    </Box>
                    <Divider sx={{ my: 2 }} />
                    
                    <form onSubmit={handleSubmit}>
                        {!loading && 
                            <>
                                <FormControl fullWidth>
                                    <TextField label="Name" fullWidth value={formData.Name} onChange={handleNameChange} />
                                </FormControl>
                                <FormControl fullWidth>
                                        <TextField label="Description" value={formData.Description} fullWidth onChange={handleDescriptionChange} />
                                    </FormControl>
                                <FormControl fullWidth>
                                    <TextField label="TotalDuration" value={formData.TotalDuration} fullWidth onChange={handleTotalDurationChange} />
                                </FormControl>
                                <FormControl fullWidth>
                                    <TextField label="TotalDuration" value={formData.Amount} fullWidth onChange={handleAmountChange} />
                                </FormControl>
                            
                                <FormControl fullWidth>
                                
                                    <InputLabel id="Units" >Units</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={formData.UnitOfMeasurementId || ''}
                                        label="Unit types"
                                        onChange={handleSelectChange}
                                    >
                                        {unitsUsed.map(unit =>
                                            <MenuItem key={unit.id} value={unit.id}>{unit.name}</MenuItem>
                                        )}
                                    </Select>
                                </FormControl>
                                <FormControl fullWidth>
                                
                                    <InputLabel id="Units" >Material</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={formData.MaterialId || ''}
                                        label="Unit types"
                                        onChange={handleMaterialSelectChange}
                                    >
                                        {materials.map(material =>
                                            <MenuItem key={material.id} value={material.id}>{material.partNumber}</MenuItem>
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
