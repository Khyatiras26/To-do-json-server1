import React from 'react'
import './todoForm.css'

const TodoForm = (props) => {
  return (
    <div className='container'>
      <input className='input-box'
        type="text"
        value={props.inputValue}
        onChange={(e) => props.setInputValue(e.target.value)}
        placeholder="What needs to be done?"
      />
      <button onClick={props.addTodo} className='btn-submit'>Add Task</button>
    </div>
  )
}

export default TodoForm
