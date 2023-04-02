import React, { useState, useEffect, Component } from 'react';
import {
    Snackbar,
    Alert, Button
} from "@mui/material";

export function CustomSnackbar({ message, type }) {

    const [open, setOpen] = useState(false);
    const [vertical, setVertical] = useState('top');
    const [horizontal, setHorizontal] = useState('right');

    useEffect(() => {
        if (message != "")
            setOpen(true);

    }, [message]);


    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>
            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose} anchorOrigin={{ vertical, horizontal }}>
                {type == 'error' ?
                    (<Alert onClose={handleClose} severity="error">{message}</Alert>)
                    : (type == 'success' ?
                        (<Alert onClose={handleClose} severity="success">{ message}</Alert>) :
                        (<Alert onClose={handleClose} severity="info">{message}</Alert>))}
            </Snackbar>
            
        </div>
    )
    
}
