import React, { useEffect, useRef } from "react";
import styles from "./TodoForm.module.css";

const TodoForm = ({
    addTodo,
    todoToUpdate,
    updateTodo,
    resetTodoToupdate,
    setIsAdd,
    setIsEdit,
    groupType,
}) => {
    const todoTitle = useRef();
    const todoDes = useRef();

    useEffect(() => {
        if (!todoToUpdate) return;
        todoTitle.current.value = todoToUpdate?.title;
        todoDes.current.value = todoToUpdate?.description;
    }, [todoToUpdate]);

    const onSubmitHandler = async (e) => {
        e.preventDefault();
        const todoTitleText = todoTitle?.current.value;
        const todoDescription = todoDes?.current.value;
        if (!todoToUpdate) {
            const todo = {
                title: todoTitleText,
                description: todoDescription,
                type:groupType
            };
            await addTodo(todo);
            setIsAdd(false);
            clearInput();
            return;
        }

        const todo = {
            title: todoTitleText,
            description: todoDescription,
            id: todoToUpdate.id,
            type:groupType
        };

        const result = await updateTodo(todo);
        setIsEdit(false);
        clearInput();
        resetTodoToupdate();
        if (!result) return;
    };

    const clearInput = () => {
        todoDes.current.value = "";
        todoTitle.current.value = "";
    };

    return (
        <form onSubmit={onSubmitHandler}>
            <div>
                {todoToUpdate ? (<><h3>Edit Form</h3><hr /></>):null}
            </div>
            <div className={styles.form}>
                {todoToUpdate ? <label>Title: </label> : null}

                <input
                    id="todoText"
                    className={styles.input}
                    type="text"
                    placeholder="Title"
                    ref={todoTitle}
                    required
                />
                {todoToUpdate ? <label>Description: </label> : null}

                <textarea
                    className={styles.input}
                    id="todoAmount"
                    type="text"
                    placeholder="&#9679; Description"
                    ref={todoDes}
                    required
                />
            </div>

            <button className={styles.submitBtn} >
                {todoToUpdate ? "Edit " : "Add "} Todo
            </button>
        </form >
    );
};

export default TodoForm;
