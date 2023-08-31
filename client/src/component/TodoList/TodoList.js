import styles from "./TodoList.module.css";
import GroupTodo from "../GroupTodo/GroupTodo";
import React, { useState, useRef, useEffect } from 'react'
import TodoForm from "../TodoForm/TodoForm";
const TodoList = ({
    group,
    deleteTodo,
    changeTodoToUpdate,
    updateTodoList,
    addTodo,
    todoToUpdate,
    updateTodo,
    resetTodoToupdate
}) => {
    const [list, setList] = useState();
    const [dragging, setDragging] = useState(false);
    const [isAdd, setIsAdd] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const [clickedGroupIndex, setClickedGroupIndex] = useState(null);

    useEffect(() => {
        setList(group);
    }, [group]);
    const dragItem = useRef();
    const dragItemNode = useRef();

    const handletDragStart = (e, params) => {

        dragItemNode.current = e.target;
        dragItemNode.current.addEventListener('dragend', handleDragEnd)
        dragItem.current = params;
        setTimeout(() => {
            setDragging(true);
        }, 0)
    }

    const handleDragEnter = (e, targetItem) => {
        if (dragItemNode.current !== e.target) {

            setList(oldList => {
                try {
                    const newList = [...oldList];
                    const draggedItem = newList[dragItem.current.grpI].items.splice(dragItem.current.itemI, 1)[0];
                    draggedItem.type = targetItem.grp.title;
                    newList[targetItem.grpI].items.splice(targetItem.itemI, 0, draggedItem);
                    dragItem.current = targetItem;
                    return newList;
                } catch (error) {
                    console.error("Error updating list:", error);
                    return oldList;
                }
            });
        }
    }

    const handleDragEnd = (e) => {
        setDragging(false);
        dragItem.current = null;
        dragItemNode.current.removeEventListener('dragend', handleDragEnd)
        dragItemNode.current = null;
        updateTodoList(list);
    }

    const getStyles = (item) => {
        if (dragItem.current.grpI === item.grpI && dragItem.current.itemI === item.itemI) {
            return (styles.dndItem, styles.current)
        }
        return styles.dndItem
    }
    const handleAdd = (e, grpI) => {
        setClickedGroupIndex(grpI);
        setIsAdd(true);
    }
    return (
        <>
            <div className={styles.navTitle}>
                <img alt="todo" className={styles.navImg} src="https://cdn-icons-png.flaticon.com/128/9741/9741134.png"/>
                <span className={styles.navTitleText}>Kanban Board Task Management</span>
            </div>
            <div className={styles.drag_n_drop}>

                {list?.map((grp, grpI) => (
                    <div key={grp.title}
                        className={styles.dndDroup}
                        onDragEnter={dragging && !grp.items.length ? (e) => handleDragEnter(e, { grp, grpI, itemI: 0 }) : null}
                    >
                        <div className={styles.groupTitle}>{grp.title}</div>
                        {grp.items.map((item, itemI) => (
                            <>
                                <div draggable key={item.id}
                                    className={dragging ? getStyles({ grpI, itemI }) : styles.dndItem}
                                    onDragStart={(e) => handletDragStart(e, { grpI, itemI, item })}
                                    onDragEnter={dragging ? (e) => { handleDragEnter(e, { grp, grpI, itemI }) } : null}
                                >
                                    <GroupTodo
                                        index={itemI}
                                        key={item.id}
                                        todo={item}
                                        deleteTodo={deleteTodo}
                                        changeTodoToUpdate={changeTodoToUpdate}
                                        setIsEdit={setIsEdit}
                                    />
                                </div>
                            </>

                        ))}

                        {isEdit && (
                            <div className={styles.editBackground}>
                                <div className={styles.editFormContainer}>
                                    <TodoForm
                                        addTodo={addTodo}
                                        todoToUpdate={todoToUpdate}
                                        updateTodo={updateTodo}
                                        resetTodoToupdate={resetTodoToupdate}
                                        resetTodoToEdit={() => setIsEdit(false)}
                                        setIsEdit={setIsEdit}
                                    />
                                </div>
                            </div>
                        )}
                        {(clickedGroupIndex === grpI && isAdd) ? <TodoForm
                            groupType={grp.title}
                            addTodo={addTodo}
                            todoToUpdate={todoToUpdate}
                            updateTodo={updateTodo}
                            resetTodoToupdate={resetTodoToupdate}
                            setIsAdd={setIsAdd}
                        /> : null}
                        <div className={styles.addText} onClick={(e) => handleAdd(e, grpI)}>
                            <img alt="plus" src="https://cdn-icons-png.flaticon.com/128/1828/1828925.png"/>
                            <span >Add a task</span>
                            </div>
                    </div>
                ))}
            </div>
        </>
    )
};

export default TodoList;
