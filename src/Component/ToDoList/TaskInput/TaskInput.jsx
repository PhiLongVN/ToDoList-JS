import React from 'react'
import { styled } from 'styled-components'
import { Button } from '../../Button/ButtonStyle'
import { useState } from 'react'
import PropTypes from 'prop-types'

// Style//////////////////////////
const TaksInput = styled.div`
  text-align: center;

  h1 {
    font-size: 2rem;
    font-weight: 500;
    margin-bottom: 1rem;
  }

  form {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 0.5rem;

    input {
      border-radius: 8px;
      outline: none;
      padding: 0.5rem;
      border: solid 1px black;
      width: 100%;
    }
  }
`
// PropsTypes/////////////////////
TaksInput.propTypes = {
  addToDo: PropTypes.func,
  edittingTask: PropTypes.func,
  saveEdit: PropTypes.PropTypes.func,
  editItem: PropTypes.shape({
    taskName: PropTypes.string.isRequired,
    done: PropTypes.bool.isRequired,
    id: PropTypes.number.isRequired,
  }),
}

function TaskInput(props) {
  const [taskInput, setTaskInput] = useState('')

  const { addToDo, editItem, edittingTask, saveEdit } = props

  const handleOnChange = (e) => {
    const value = e.target.value
    if (editItem) {
      edittingTask(value)
    } else {
      setTaskInput(value)
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (editItem && editItem.taskName !== '') {
      saveEdit()
    } else if (taskInput) {
      addToDo(taskInput)
    }
    setTaskInput('')
  }

  return (
    <TaksInput>
      <h1> ToDoList JavaScript</h1>
      <form onSubmit={handleSubmit}>
        <input
          value={editItem ? editItem.taskName : taskInput}
          onChange={handleOnChange}
          type="text"
          placeholder="Enter your Task"
        />
        <Button>{editItem ? '✔' : '➕'}</Button>
      </form>
    </TaksInput>
  )
}

export default TaskInput
