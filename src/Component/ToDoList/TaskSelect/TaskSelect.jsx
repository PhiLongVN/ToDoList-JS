import { React, useState } from 'react'
import { styled } from 'styled-components'
import PropTypes from 'prop-types'

const TaskSelectWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 0.5rem;
  border-top: 1px solid black;
  padding-top: 1rem;
`
const SelectBox = styled.div`
  padding: 1rem;
  background-color: aquamarine;
  border-radius: 10px;
  cursor: pointer;
  transition: 0.3s all ease;

  &:hover {
    opacity: 0.8;
    transform: scale(0.8);
  }

  &.active {
    background-color: yellow;
  }
`

function TaskSelect(props) {
  const [checkDoneTask, setCheckDoneTask] = useState(false)
  const [checkNotDoneTask, setCheckNotDoneTask] = useState(false)

  const { filterDoneTask, deleteAll } = props

  const handleDone = () => {
    const checkDoneTaskClone = !checkDoneTask
    setCheckDoneTask(checkDoneTaskClone)
    setCheckNotDoneTask(false)
    filterDoneTask(checkDoneTaskClone, false)
  }

  const handleNotDone = () => {
    const checkNotDoneTaskClone = !checkNotDoneTask
    setCheckNotDoneTask(checkNotDoneTaskClone)
    setCheckDoneTask(false)
    filterDoneTask(false, checkNotDoneTaskClone)
  }
  const handleDeleteAll = () => {
    deleteAll()
  }

  return (
    <TaskSelectWrapper>
      {/* filterDone */}
      <SelectBox
        onClick={handleDone}
        className={`done ${checkDoneTask ? 'active' : ''}`}
      >
        done
      </SelectBox>

      {/* filterNotDone */}
      <SelectBox
        onClick={handleNotDone}
        className={`notDone ${checkNotDoneTask ? 'active' : ''}`}
      >
        notDone
      </SelectBox>

      {/* deleteAll */}
      <SelectBox
        onClick={handleDeleteAll}
        className="deleteAll"
      >
        deleteAll
      </SelectBox>
    </TaskSelectWrapper>
  )
}

TaskSelect.propsTypes = {
  filterDoneTask: PropTypes.func,
  filterNotDoneTask: PropTypes.func,
  deleteAll: PropTypes.func,
}
export default TaskSelect
