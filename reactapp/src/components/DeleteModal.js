import React, { Component, useState, useEffect } from "react";
import { Button, Modal, Box, Typography, TextField, IconButton, Divider } from '@mui/material';
/*import CloseIcon from '@mui/icons-material/Close';*/
import axios, * as others from 'axios';
import { useParams } from "react-router-dom";
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import { IconTrash, IconX, IconRotateClockwise2 } from "@tabler/icons-react";


export function DeleteModal({ id, DeleteData, type, name, active }) {
    const [open, setOpen] = useState(false);
    const handleDelete = () => {
        DeleteData(id);
    };


    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };


    return (
        <div>
            <Button sx={{ textTransform: 'none' }} onClick={handleOpen}> {type == "Task" || active ?  <IconTrash/> : <IconRotateClockwise2/> } </Button>
            <Modal open={open} onClose={handleClose}>
                <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', bgcolor: 'background.paper', boxShadow: 24, p: 4, width: '50vw', maxWidth: 500 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Typography variant="h6" component="h2">Delete {type}</Typography>
                        <IconButton onClick={handleClose}>
                            <IconX />
                        </IconButton>
                    </Box>
                    <Divider sx={{ my: 2 }} />
                    <Typography variant="Body2" component="Body2">Are you sure you want to { type == "Task" ? "delete" : (active ? "deactivate" : "activate")} "{name}" {type}?</Typography>
                    
                    <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }}>
                        <Button variant="contained" color="error" onClick={handleDelete}>Confirm</Button>
                    </Box>
                </Box>
            </Modal>

        </div>
    )


}
