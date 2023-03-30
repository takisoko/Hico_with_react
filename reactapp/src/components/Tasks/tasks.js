import React, { Component, useState, useEffect } from "react";
import axios, * as others from 'axios';
import { useParams } from "react-router-dom";
import { TaskModal } from "./TaskModal";

export function Tasks() {
    const [tasks, setTasks] = useState(null);
    const [loading, setLoading] = useState(true);
    const [index, setIndex] = useState(0);

    useEffect(() => {

        fetchData();

    }, [index]);

    const refreshTable = () => {
        setIndex(index + 1);
    };

    useEffect(() => {

        fetchData();

    }, []);

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

    return (
        <div>
            <TaskModal refreshTable={refreshTable} mode="add" type={0} />
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
                                <td>{ task.taskMaterialUsage.unitOfMeasurement.name }</td>
                            </tr>
                        )}
                    </tbody>
                </table>}
        </div>
    )


}
