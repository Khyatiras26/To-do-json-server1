import React from 'react'
import './todoList.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { faEdit } from '@fortawesome/free-solid-svg-icons'


const TodoList = (props) => {
  return (
    <div className='outer'>
        <ul>
        
        {props.todos.map(todo => (
            
          <li key={todo.id} className='list-todo'>
            {props.editingId === todo.id ? (
              <div>
                <input
                  type="text"
                  value={todo.title}
                  onChange={(e) => props.setTodos(props.todos.map(t => t.id === todo.id ? {...t, title: e.target.value} : t))}
                />
                <button onClick={() => props.handleUpdate(todo.id, todo.title)}>Save</button>
                
              </div>
            ) : (
              <div><div className='outer-1'>
              <div className='outer-check'><input
              className="check-input"
              placeholder='.form-control-sm'
              type="checkbox"
              checked={todo.completed}
              onChange={() => props.toggleComplete(todo.id, todo.completed)}
            /></div>
            <div className='outer-title'><span style={{ textDecoration: todo.completed ? 'line-through' : 'none'  }}>{todo.title}</span></div>
            <div className='outer-icon'>
            <FontAwesomeIcon icon={faTrash} onClick={() => props.deleteTodo(todo.id)} className='icon-trash'/>
            <FontAwesomeIcon icon={faEdit} onClick={() => props.handleEdit(todo.id)} className='icon-edit'/>  
            </div> </div>  
             <div className='outer-date'><span style = {{color : 'black'}}>Date of Creation: </span>{new Date(todo.createdAt).toLocaleDateString()}</div>
             
            </div>
            )}
          </li>
        ))}
        
      </ul>
    </div>
  )
}

export default TodoList
