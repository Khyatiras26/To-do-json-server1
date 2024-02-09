import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TodoForm from './todoForm';
import TodoList from './todoList';
import './App.css'

const App = () => {
  const [inputValue, setInputValue] = useState('');
  const [todos, setTodos] = useState([]);
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const response = await axios.get('http://localhost:3031/todos');
      setTodos(response.data);
    } catch (error) {
      console.error('Error fetching todos:', error);
    }
  };

  const addTodo = async () => {
    try {
      const response = await axios.post('http://localhost:3031/todos', {
        title: inputValue,
        completed: false,
        createdAt: new Date().toISOString()
      });
      setTodos([...todos, response.data]);
      setInputValue('');
    } catch (error) {
      console.error('Error adding todo:', error);
    }
  };

  const deleteTodo = async (id) => {
    try {
      await axios.delete(`http://localhost:3031/todos/${id}`);
      setTodos(todos.filter(todo => todo.id !== id));
    } catch (error) {
      console.error('Error deleting todo:', error);
    }
  };

  const toggleComplete = async (id, completed) => {
    try {
      await axios.patch(`http://localhost:3031/todos/${id}`, { completed: !completed });
      fetchTodos();
    } catch (error) {
      console.error('Error toggling todo completion:', error);
    }
  };

  const handleEdit = (id) => {
    setEditingId(id);
  };

  const handleUpdate = async (id, title) => {
    try {
      await axios.patch(`http://localhost:3031/todos/${id}`, { title });
      setEditingId(null);
      fetchTodos();
    } catch (error) {
      console.error('Error updating todo:', error);
    }
  };

  return (
    <div>
      
      <div className='outer-div'>
        <div className='inner-div'>
        <h2>To-Do List <img src='images/todo-list.jpg' alt='' height='30px' width='30px'/></h2>
          <TodoForm inputValue = {inputValue}
            setInputValue = {setInputValue} addTodo = {addTodo}
          />
        
          <TodoList todos = {todos} setTodos ={setTodos} editingId = {editingId} setEditingId = {setEditingId} 
            deleteTodo = {deleteTodo} handleEdit ={handleEdit} handleUpdate = {handleUpdate} toggleComplete = {toggleComplete}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
