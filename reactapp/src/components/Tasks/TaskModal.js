import React, { Component, useState, useEffect } from "react";
import { Button, Modal, Box, Typography, TextField, IconButton, Divider } from '@mui/material';
/*import CloseIcon from '@mui/icons-material/Close';*/
import axios, * as others from 'axios';
import {    FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import { IconEdit, IconX } from "@tabler/icons-react";
    


export function TaskModal({ refreshTable, id, mode, type, setCustomMessage, setCustomSnackbarType }) {
    const [open, setOpen] = useState(false);
    const [units, setUnits] = useState([]);
    const [unitsUsed, setUnitsUsed] = useState([]);
    const [materials, setMaterials] = useState([]);
    const [value, setValue] = useState(null);
    const [loading, setLoading] = useState(true);
    const [formData, setFormData] = useState({ Name: "", Description: "", TotalDuration: 0, Amount: 0, UnitOfMeasurementId: '', MaterialId: 0 });

    useEffect(() => {
        if (open && units.length == 0) { 
            console.log("fetch")
            fetchUnitData();
        }
        //if (mode == 'edit')
        //    getEditData();

    }, [open]);

    useEffect(() => {
        console.log("units", units);
        if (units.length != 0) {
            getMaterials();
        }

    }, [units]);

    const fetchUnitData = () => {

        axios
            .get('https://localhost:7012/unit/allUnits/' + type)
            .then(function (response) {
                if (
                    (response && response.status === 201) ||
                    (response && response.status === 200)
                ) {
                    setLoading(false);
                    console.log("allUnits");
                    setUnits(response.data);
                }
            })
            .catch((e) => {
                console.log("error", e);
            });
    };

    const getMaterials = () => {
        axios
            .get('https://localhost:7012/material')
        .then(function (response) {
            if (
                (response && response.status === 201) ||
                (response && response.status === 200)
            ) {
                setLoading(false);
                setMaterials(response.data.materials);
                getEditData();
            }
        })
        .catch((e) => {
            console.log("error", e);
        });
    }

    const getEditData = () => {
        if (mode == 'edit') {
            axios
                .get('https://localhost:7012/task/' + id)
                .then(function (response) {
                    if (
                        (response && response.status === 201) ||
                        (response && response.status === 200)
                    ) {
                        const m = materials.filter(m => m.id == response.data.task.taskMaterialUsage.material.id);
                        setUnitsBasedOnMaterial(m[0]);

                        console.log("units", units);

                        console.log("setFormData");
                        setFormData({
                            Id: id, Name: response.data.task.name,
                            Description: response.data.task.description,
                            TotalDuration: parseInt(response.data.task.totalDuration),
                            Amount: parseInt(response.data.task.taskMaterialUsage.amount), UnitOfMeasurementId: 0,
                            UnitOfMeasurementId: parseInt(response.data.task.taskMaterialUsage.unitOfMeasurement.id),
                            MaterialId: response.data.task.taskMaterialUsage.material.id
                        });
                    }
                })
                .catch((e) => {
                    console.log("error", e);
                });
        }
    }

    const handleSelectChange = (e) => {
        setValue(e.target.value)
        console.log("setFormData");
        setFormData({ Id: formData.Id, Name: formData.Name, Description: formData.Description, TotalDuration: formData.TotalDuration, Amount: formData.Amount, UnitOfMeasurementId: e.target.value, MaterialId: formData.MaterialId })
    }

    const handleNameChange = (e) => {
        console.log("setFormData");
        setFormData({ Id: formData.Id, Name: e.target.value, Description: formData.Description, TotalDuration: formData.TotalDuration, Amount: formData.Amount, UnitOfMeasurementId: formData.UnitOfMeasurementId, MaterialId: formData.MaterialId })
    }
    const handleDescriptionChange = (e) => {
        console.log("setFormData");
        setFormData({ Id: formData.Id, Name: formData.Name, Description: e.target.value, TotalDuration: formData.TotalDuration, Amount: formData.Amount, UnitOfMeasurementId: formData.UnitOfMeasurementId, MaterialId: formData.MaterialId })
    }
    const handleTotalDurationChange = (e) => {
        console.log("setFormData");
        setFormData({ Id: formData.Id, Name: formData.Name, Description: formData.Description, TotalDuration: e.target.value, Amount: formData.Amount, UnitOfMeasurementId: formData.UnitOfMeasurementId, MaterialId: formData.MaterialId })
    }
    const handleAmountChange = (e) => {
        console.log("setFormData");
        setFormData({ Id: formData.Id, Name: formData.Name, Description: formData.Description, Amount: e.target.value, TotalDuration: formData.TotalDuration, UnitOfMeasurementId: formData.UnitOfMeasurementId, MaterialId: formData.MaterialId })
    }
    const handleMaterialSelectChange = (e) => {
        const m = materials.filter(m => m.id == e.target.value);

        setUnitsBasedOnMaterial(m[0]);
        console.log("setFormData");
        setFormData({ Id: formData.Id, Name: formData.Name, Description: formData.Description, TotalDuration: formData.TotalDuration, Amount: formData.Amount, UnitOfMeasurementId: formData.UnitOfMeasurementId, MaterialId: e.target.value })
    };

    const setUnitsBasedOnMaterial = (material) => {
        const materialUnits = units.filter(u => u.type == material.unitOfIssue.type);
        console.log("materialUnits", materialUnits);
        setUnitsUsed(materialUnits)
    };

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {

        console.log("handleClose");
        console.log("setFormData");
        setFormData({ Id: "", Name: "", Description: "", TotalDuration: 0, Amount: 0, UnitOfMeasurementId: 0, MaterialId: 0 });
        setOpen(false);
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        if (mode == 'edit') {
            console.log("setFormData");
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

                        setCustomSnackbarType("success")
                        setCustomMessage("Task edited")
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
                    setCustomMessage("Error editing task")
                });
        }
        else {
            console.log("setFormData");
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
                        setCustomSnackbarType("success")
                        setCustomMessage("Task added")
                    }
                })
                .catch((e) => {
                    console.log("error", e);
                    setCustomSnackbarType("error")
                    setCustomMessage("Error adding task")
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
                                    <TextField label="Amount" value={formData.Amount} fullWidth onChange={handleAmountChange} />
                                </FormControl>
                            {materials && <FormControl fullWidth>

                                <InputLabel id="Materials" >Material</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={formData.MaterialId || ''}
                                    label="Unit types"
                                    onChange={handleMaterialSelectChange}
                                    readOnly={mode == "edit"}
                                    defaultValue=""
                                >
                                    {materials.map(material =>
                                        <MenuItem key={material.id} value={material.id}>{material.partNumber}</MenuItem>
                                    )}
                                </Select>
                            </FormControl>}

                            {unitsUsed && <FormControl fullWidth>

                                <InputLabel id="Units" >Units</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={null || formData.UnitOfMeasurementId}
                                    label="Unit types"
                                    onChange={handleSelectChange}
                                    defaultValue=""
                                >
                                    {unitsUsed.map(unit =>
                                        <MenuItem key={unit.id} value={unit.id}>{unit.name}</MenuItem>
                                    )}
                                </Select>
                            </FormControl>}                            
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
