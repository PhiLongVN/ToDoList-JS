import React from 'react'
import { styled } from 'styled-components'
import PropTypes from 'prop-types'
import TaskItem from './TaskItem'

// style/////////////////////////////////
const TaskListWrapper = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: center;
  flex-direction: column;

  margin: 2rem 0;
  width: 100%;

  .listTitle {
    font-size: 2rem;
  }

  .listBox {
    width: 100%;
  }
`
// PropsTypes///////////////////////////
TaskList.propTypes = {
  taskList: PropTypes.arrayOf(
    PropTypes.shape({
      taskName: PropTypes.string.isRequired,
      done: PropTypes.bool.isRequired,
      id: PropTypes.number.isRequired,
    })
  ),
}

function TaskList(props) {
  const { taskList } = props

  return (
    <TaskListWrapper>
      <h2 className="listTitle">Task List</h2>

      <div className="listBox">
        {taskList.map((item) => {
          return (
            <TaskItem
              item={item}
              key={item.id}
            />
          )
        })}
      </div>
    </TaskListWrapper>
  )
}

export default TaskList
