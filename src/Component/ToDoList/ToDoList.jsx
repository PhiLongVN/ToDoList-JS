import { React } from 'react'
import { useState, createContext, useEffect } from 'react'
import { styled } from 'styled-components'

import TaskInput from './TaskInput'
import TaskList from './TaskList'
import TaskSelect from './TaskSelect'

// styled.............................
const ToDoListWrapper = styled.div`
  background-color: #decfce;
  padding: 2rem;
  border-radius: 10px;
  margin: auto;
  margin-top: 3rem;
  max-width: 500px;
  width: 280px;

  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  flex-direction: column;
`
// Context////////////////////////////
export const UserContext = createContext()

function ToDoList() {
  const [taskList, setTaskList] = useState([])
  const [taskListBackUp, setTaskListbBackUp] = useState([])
  const [editItem, setEditItem] = useState(null)

  useEffect(() => {
    const getData = JSON.parse(localStorage.getItem('list')) || []
    setTaskList(getData)
    setTaskListbBackUp(getData)
  }, [])

  const addToDo = (data) => {
    const toDoItem = {
      taskName: data,
      id: Date.now(),
      done: false,
    }

    const list = [...taskList, toDoItem]
    setTaskList(list)
    setTaskListbBackUp(list)

    const stringifyData = JSON.stringify(list)
    localStorage.setItem('list', stringifyData)
  }

  const checkToDo = (id) => {
    taskList.forEach((item) => {
      if (item.id === id) {
        item.done = !item.done
      }
    })

    setTaskList([...taskList])
    const stringifyData = JSON.stringify(taskList)
    localStorage.setItem('list', stringifyData)
  }
  const filterDoneTask = (done, notDone) => {

    if (done || notDone) {
      if (done) {
        const doneList = taskListBackUp.filter((item) => item.done === true)
        setTaskList([...doneList])
        return
      } else if (notDone) {
        const notDoneList = taskListBackUp.filter((item) => item.done === false)
        setTaskList([...notDoneList])
        return
      }
    }

    setTaskList([...taskListBackUp])
  }

  const deleteAll = () => {
    setTaskList([])
    setTaskListbBackUp([])
    setEditItem(null)
    const stringifyData = JSON.stringify(taskList)
    localStorage.setItem('list', stringifyData)
  }

  const deleteItem = (id) => {
    const taskListClone = taskList
    const itemIndex = taskListClone.findIndex((item) => item.id === id)

    if (itemIndex > -1) {
      taskListClone.splice(itemIndex, 1)
    }

    setTaskList([...taskListClone])
    setTaskListbBackUp([...taskListClone])
    setEditItem(null)
    const stringifyData = JSON.stringify(taskList)
    localStorage.setItem('list', stringifyData)
  }

  const editTask = (id) => {
    const editTask = taskList.find((item) => item.id === id)

    setEditItem({ ...editTask })
  }

  const edittingTask = (value) => {
    const editItemClone = editItem
    if (editItemClone) {
      editItemClone.taskName = value
      setEditItem({ ...editItemClone })
    }
  }

  const saveEdit = () => {
    const listToDoClone = [...taskList]

    listToDoClone.forEach((item, index) => {
      if (item.id === editItem.id) {
        listToDoClone[index] = editItem
      }
    })
    setTaskList(listToDoClone)
    setTaskListbBackUp(listToDoClone)
    setEditItem(null)

    const stringifyData = JSON.stringify(taskList)
    localStorage.setItem('list', stringifyData)
  }

  return (
    <ToDoListWrapper>
      <TaskInput
        editItem={editItem}
        addToDo={addToDo}
        saveEdit={saveEdit}
        edittingTask={edittingTask}
      />

      <UserContext.Provider value={{ checkToDo, deleteItem, editTask, edittingTask }}>
        <TaskList taskList={taskList} />
      </UserContext.Provider>

      <TaskSelect
        filterDoneTask={filterDoneTask}
        deleteAll={deleteAll}
      />
    </ToDoListWrapper>
  )
}

export default ToDoList
