import React, { useState } from "react";
import styles from "./GroupTodo.module.css";
import EditImage from "../../images/edit.png";
import DeleteImage from "../../images/trash-bin.png";

const GroupTodo = ({
    todo,
    changeTodoToUpdate,
    deleteTodo,
    index,
    setIsEdit
}) => {
    const [currentHoverIndex, setCurrentHoverIndex] = useState(null);

    const handleEdit =(e,todo)=>{
        changeTodoToUpdate(todo);
        setIsEdit(true);
    }
    return (
        <li
            key={todo.id}
            className={styles.todo}
            onMouseOver={() => { setCurrentHoverIndex(index); }}
            onMouseLeave={() => { setCurrentHoverIndex(null); }}
            draggable
        >
            <div className={styles.todoDetails}>
                <span> {todo.title}</span>
                <ul>
                    <li>
                        {todo.description}
                    </li>

                </ul>
            </div>
            <div className={styles.todoOptions}>
                <div className={`${styles.btnContainer} ${currentHoverIndex === index && styles.active}`}>
                    <div
                        className={styles.edit}
                        onClick={(e) => { handleEdit(e,todo); }}
                    >
                        <img src={EditImage} height="100%" alt="Edit" />
                    </div>
                    <div
                        className={styles.delete}
                        onClick={() => deleteTodo(todo.id)}
                    >
                        <img src={DeleteImage} height="100%" alt="Delete" />
                    </div>
                </div>
            </div>
        </li>
    );
};

export default GroupTodo;
