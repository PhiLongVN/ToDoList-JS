import PropTypes from 'prop-types'
import { styled } from 'styled-components'
import { Button } from '../../Button/ButtonStyle'
import { useContext } from 'react'
import { UserContext } from '../ToDoList'

// style///////////////////////////
const TaskItemWrapper = styled.div`
  padding: 1rem;
  width: 100%;

  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-grow: 1;
  gap: 0.75rem;

  span {
    flex: 1;
    max-width: 200px;

    text-overflow: ellipsis;
    overflow: hidden;

    &.active {
      text-decoration: line-through;
      opacity: 0.5;
    }
  }

  .actionBtn {
    display: flex;
    gap: 0.75rem;
  }
`
const EditBtn = styled(Button)`
  background-color: aqua;
`
const DeleteBtn = styled(Button)`
  background-color: pink;
`
// PropTypes//////////////////////
TaskItem.propTypes = {
  item: PropTypes.shape({
    taskName: PropTypes.string.isRequired,
    done: PropTypes.bool.isRequired,
    id: PropTypes.number.isRequired,
  }),
  checkToDo: PropTypes.func,
  deleteItem: PropTypes.func,
  editTask: PropTypes.func,
}

function TaskItem(props) {
  const { item } = props
  const { checkToDo, deleteItem, editTask } = useContext(UserContext)

  const handleCheck = (id) => {
    checkToDo(id)
  }
  const handleDelete = (id) => {
    deleteItem(id)
  }

  const handleEdit = (id) => {
    editTask(id)
  }
  return (
    <TaskItemWrapper className="taskItem">
      <input
        type="checkbox"
        checked={item.done}
        onChange={() => handleCheck(item.id)}
      />
      <span
        onClick={() => handleEdit(item.id)}
        className={item.done ? 'active' : ''}
      >
        {item.taskName}
      </span>

      <div className="actionBtn">
        <EditBtn onClick={() => handleEdit(item.id)}>✏</EditBtn>
        <DeleteBtn onClick={() => handleDelete(item.id)}>😒</DeleteBtn>
      </div>
    </TaskItemWrapper>
  )
}

export default TaskItem
