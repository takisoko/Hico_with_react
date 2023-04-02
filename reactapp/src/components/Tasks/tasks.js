import React, { Component, useState, useEffect } from "react";
import axios, * as others from 'axios';
import { useParams } from "react-router-dom";
import { TaskModal } from "./TaskModal";
import { CustomSnackbar } from "../Snackbar";
import { Button, Modal, Box, Typography, TextField, IconButton, Divider } from '@mui/material';

import { IconTrash, IconEdit } from "@tabler/icons-react";

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
                    console.log("tasks", response.data.tasks);
                    setLoading(false);
                    setTasks(response.data.tasks);
                }
            })
            .catch((e) => {
                console.log("error", e);
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
                : <table className='table table-striped' aria-labelledby="tabelLabel">
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Name</th>
                            <th>description</th>
                            <th>totalDuration</th>
                            <th>amount</th>
                            <th>unitOfMeasurement name</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tasks.map(task =>
                            <tr key={task.id}>
                                <td>{ task.id }</td>
                                <td>{ task.name }</td>
                                <td>{ task.description }</td>
                                <td>{ task.totalDuration }</td>
                                <td>{ task.taskMaterialUsage.amount }</td>
                                <td>{task.taskMaterialUsage.unitOfMeasurement.name}</td>
                                <td>
                                    <Button onClick={() => onDelete(task.id)}> <IconTrash width={20} /></Button>
                                    <TaskModal refreshTable={refreshTable} id={task.id} mode="edit" type={0} setCustomMessage={setCustomMessage} setCustomSnackbarType={setCustomSnackbarType} />
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>}
        </div>
    )


}
