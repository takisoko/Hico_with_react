import React, { Component, useState, useEffect } from "react";
import axios, * as others from 'axios';
import { useParams } from "react-router-dom";
import { TaskModal } from "./TaskModal";
import { CustomSnackbar } from "../Snackbar";
import { Button, Modal, Box, Typography, TextField, IconButton, Divider } from '@mui/material';
import { DeleteModal } from "../DeleteModal";

import { IconTrash, IconEdit } from "@tabler/icons-react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

export function Tasks() {
    const [tasks, setTasks] = useState(null);
    const [loading, setLoading] = useState(true);
    const [index, setIndex] = useState(0);
    const [message, setMessage] = useState("");
    const [snackbarType, setSnackbarType] = useState("");

    useEffect(() => {

        fetchData();

    }, [index]);

    const refreshTable = () => {
        setIndex(index + 1);
    };

    useEffect(() => {

        fetchData();

    }, []);

    const onDelete = (id) => {
        axios
            .delete('https://localhost:7012/task/' + id)
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
                setCustomSnackbarType("error")
                setCustomMessage("Error loading tasks")
            });
    }

    const fetchData = () => {
        axios
            .get('https://localhost:7012/task')
            .then(function (response) {
                if (
                    (response && response.status === 201) ||
                    (response && response.status === 200)
                ) {
                    setLoading(false);
                    setTasks(response.data.tasks);
                }
            })
            .catch((e) => {
                console.log("error", e);
                setCustomSnackbarType("error")
                setCustomMessage("Error deleting tasks")
            });
    };

    const setCustomMessage = (message) => {
        setMessage(message)
    }

    const setCustomSnackbarType = (type) => {
        setSnackbarType(type)
    }

    return (
        <div>
            <CustomSnackbar type={snackbarType} message={message} />
            <TaskModal refreshTable={refreshTable} mode="add" type={0} setCustomMessage={setCustomMessage} setCustomSnackbarType={setCustomSnackbarType} />

            
            <h1 id="tabelLabel" >Tasks</h1>
            {loading
                ? <p><em>Loading...</em></p>
                : <TableContainer component={Paper}>
                    <Table >
                    <thead>
                        <TableRow>
                            <TableCell align="left">Id</TableCell>
                            <TableCell align="left">Name</TableCell>
                            <TableCell align="right">description</TableCell>
                            <TableCell align="right">totalDuration</TableCell>
                            <TableCell align="right">amount</TableCell>
                            <TableCell align="right">unitOfMeasurement name</TableCell>
                            <TableCell align="right">Actions</TableCell>
                        </TableRow>
                    </thead>
                    <TableBody>
                        {tasks.map(task =>
                            <TableRow key={task.id}>
                                <TableCell align="left">{ task.id }</TableCell>
                                <TableCell align="left">{ task.name }</TableCell>
                                <TableCell align="right">{ task.description }</TableCell>
                                <TableCell align="right">{ task.totalDuration }</TableCell>
                                <TableCell align="right">{ task.taskMaterialUsage.amount }</TableCell>
                                <TableCell align="right">{task.taskMaterialUsage.unitOfMeasurement.name}</TableCell>
                                <TableCell align="right" style={{ display: "flex" }}>
                                    <DeleteModal id={task.id} type="Task" DeleteData={onDelete} name={task.name} />
                                    <TaskModal refreshTable={refreshTable} id={task.id} mode="edit" type={0} setCustomMessage={setCustomMessage} setCustomSnackbarType={setCustomSnackbarType} />
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                    </Table>
                </TableContainer>}
        </div>
    )


}
