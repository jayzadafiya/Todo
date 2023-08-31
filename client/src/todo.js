import React, { useState, useEffect } from 'react';
import Sortable from 'sortablejs';
import './index.css';

const Todo = () => {
    const [tasks, setTasks] = useState([]);
    const [newTaskTitle, setNewTaskTitle] = useState('');
    const [newTaskDescription, setNewTaskDescription] = useState('');

    useEffect(() => {
        const allTasksColumn = document.querySelector('.all-tasks-column');
        const otherColumns = document.querySelectorAll('.column:not(.all-tasks-column)');

        new Sortable(allTasksColumn, {
            group: {
                name: 'shared',
                put: [...otherColumns].map((column) => column.getAttribute('data-column-id'))
            },
            animation: 150,
            ghostClass: 'blue-background-class'
        });

        otherColumns.forEach((column) => {
            new Sortable(column, {
                group: {
                    name: 'shared',
                    pull: 'clone',
                    put: allTasksColumn
                },
                animation: 150,
                ghostClass: 'blue-background-class',
                sort: false
            });
        });
    }, []);

    const handleTaskSubmit = (event) => {
        event.preventDefault();

        if (newTaskTitle.trim() !== '') {
            const newTask = {
                title: newTaskTitle,
                description: newTaskDescription
            };

            setTasks((prevTasks) => [...prevTasks, newTask]);
            setNewTaskTitle('');
            setNewTaskDescription('');
        }
    };

    return (
        <div className="container">
            <div className="column all-tasks-column" data-column-id="all-tasks">
                <h1>All Tasks</h1>
                <div className="list-group">
                    {tasks.map((task, index) => (
                        <div className="list-group-item" key={index} draggable="true">
                            <strong>{task.title}</strong>
                            <p>{task.description}</p>
                        </div>
                    ))}
                </div>
                <form onSubmit={handleTaskSubmit}>
                    <input
                        type="text"
                        placeholder="Task title"
                        value={newTaskTitle}
                        onChange={(e) => setNewTaskTitle(e.target.value)}
                    />
                    <textarea
                        placeholder="Task description"
                        value={newTaskDescription}
                        onChange={(e) => setNewTaskDescription(e.target.value)}
                    />
                    <button type="submit">Add Task</button>
                </form>
            </div>
            <div className="column" data-column-id="doing">
                <h1>Doing</h1>
                <div className="list-group">
                    {/* Tasks in "Doing" column */}
                </div>
            </div>
            <div className="column" data-column-id="done">
                <h1>Done</h1>
                <div className="list-group">
                    {/* Completed tasks in "Done" column */}
                </div>
            </div>
        </div>
    );
};

export default Todo;
