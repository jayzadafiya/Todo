import { useEffect, useState } from "react";
import axios from "axios"
import "./App.css"
import TodoList from "./component/TodoList/TodoList";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


function App() {
  const [todoToUpdate, setTodoToUpdate] = useState(null);
  const [group, setGroup] = useState([]);
  axios.defaults.withCredentials  = true;
  const fetchTodos = async () => {
    try {
      const response = await axios.get('http://localhost:4000/');
      const todos = response?.data;
      const addedTodos = todos.filter(todo => todo?.type === 'Todo');
      const processTodos = todos.filter(todo => todo?.type === 'Doing');
      const doneTodos = todos.filter(todo => todo?.type === 'Done');
      const groupedTodos = [
        { title: "Todo", items: addedTodos },
        { title: "Doing", items: processTodos },
        { title: "Done", items: doneTodos }
      ];
      setGroup(groupedTodos);

    } catch (error) {
      console.error('Error fetching todos:', error);
      toast.error("An error occurred while fatching todo.");
    }
  }

  useEffect(() => {
    fetchTodos();
  }, []);

  const addTodo = async (todo) => {
    try {
      await axios.post('http://localhost:4000/create', todo);
      fetchTodos();
      toast.success("Todo added successfully.");

    } catch (error) {
      console.error('Error adding todo:', error);
      toast.error("An error occurred while adding todo.");
    }
  };

  const deleteTodo = async (id) => {
    try {
      await axios.delete(`http://localhost:4000/delete/${id}`);
      fetchTodos();
      toast.info("Todo deleted successfully.");
    } catch (err) {
      console.error('Error deleting todo:', err);
      toast.error("An error occurred while deleting todo.");
    }
  };

  const resetTodoToupdate = () => {
    setTodoToUpdate(null);
  };

  const updateTodo = async (todo) => {
    try {
      const { id, ...updatedData } = todo;
      await axios.put(`http://localhost:4000/edit/${id}`, updatedData);
      fetchTodos();
      toast.success("Todo updated successfully.");
    } catch (err) {
      console.error('Error updating todo:', err);
      toast.error("An error occurred while updating todo.");
    }
  };

  const updateTodoList = async (todo) => {
    try {
      await axios.put("http://localhost:4000/update", todo);
      toast.success("Todo updated successfully.");
    } catch(error) {
      console.error('Error updating todo:', error);
      toast.error("An error occurred while updating todo.");
    } 
  }

  return (
    <div className="app">
      <ToastContainer position="top-right" />
      <TodoList
        addTodo={addTodo}
        todoToUpdate={todoToUpdate}
        updateTodo={updateTodo}
        resetTodoToupdate={resetTodoToupdate}
        group={group}
        deleteTodo={deleteTodo}
        changeTodoToUpdate={setTodoToUpdate}
        updateTodoList={updateTodoList}
      />
    </div>
  );
}

export default App;
