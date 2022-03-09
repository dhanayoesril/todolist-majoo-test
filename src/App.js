import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { getTodoList, openModal, closeModal, detailTodoList } from './redux/actions/todoListAction';
import './App.css';
import TodoCard from './components/TodoCard';
import axios from 'axios';
import TodoModal from './components/TodoModal';
import { DropdownButton, Dropdown } from 'react-bootstrap';

const App = () => {

  const { data, showModal, dataTodo, dataDone } = useSelector((state) => state.TodoListReducer)
  const dispatch = useDispatch()
  const [filter, setFilter] = useState('To-Do (0)')
  const [filterState, setFilterState] = useState(0)

  const getData = async() => {
    try {
      const res = await axios.get(`https://virtserver.swaggerhub.com/hanabyan/todo/1.0.0/to-do-list`)
      let data = res.data
      dispatch(getTodoList(data))
    }
    catch(err) {
      alert(err.message.data)
    }

  }

  const handleClickFilter = (action) => {
    if(action == 'todo') {
      setFilter('To-Do (0)')
      setFilterState(0)
    }
    else if(action == 'done') {
      setFilter('Done (1)')
      setFilterState(1)
    }
  }
  useEffect(() => {
    getData()
  }, [])

  return (
    <div className="App">
      <div className="d-flex justify-content-center">
        <h2 className="title">ToDo-List</h2>
      </div>
      <div className="d-flex justify-content-center mb-3">
        <button className="btn btn-sm btn-success" onClick={()=>dispatch(openModal())}>
          + ADD TO-DO LIST
        </button>
      </div>
      <div className="d-flex justify-content-center mb-3">
        <DropdownButton
          variant="outline-success"
          align={{ lg: 'end' }}
          title={filter}
          id="dropdown-menu-align-responsive-1"
        >
          <Dropdown.Item onClick={()=> handleClickFilter('todo')}>To-Do (0)</Dropdown.Item>
          <Dropdown.Item onClick={()=> handleClickFilter('done')}>Done (1)</Dropdown.Item>
        </DropdownButton>
      </div>
      {filterState == 0 ?
       dataTodo.map((data, index) => (
        <TodoCard
          key={index}
          time={data.createdAt}
          title={data.title}
          description={data.description}
          onClickCard={()=> dispatch(detailTodoList(data, index))}
        />
      ))
        :
        dataDone.map((data, index) => (
          <TodoCard
            key={index}
            time={data.createdAt}
            title={data.title}
            description={data.description}
            onClickCard={()=> dispatch(detailTodoList(data, index))}
          />
        ))
}
      <TodoModal
        show={showModal}
        onHide={()=>dispatch(closeModal())}
      />
    </div>
  )
}

export default App