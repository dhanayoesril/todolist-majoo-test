import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Modal, Form, Dropdown, DropdownButton } from 'react-bootstrap';
import { addTodoList, closeModal, updateTodoList, deleteTodoList } from '../../redux/actions/todoListAction';

const TodoModal = (props) => {

  const dispatch = useDispatch()
  const { detailForm, indexDetail } = useSelector((state) => state.TodoListReducer)
  const [time, setTime] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('');
  const [index, setIndex] = useState('')
  const [id, setId] = useState(6)
  const [loading, setLoading] = useState(true)

  useEffect(()=> {
    if(detailForm) {
      setTime(detailForm.createdAt)
      setTitle(detailForm.title)
      setDescription(detailForm.description)
      setStatus(Number(detailForm.status))
      setIndex(indexDetail)
    }
  }, [indexDetail])

  const resetState = () => {
    setStatus(0)
    setTitle('')
    setDescription('')
    setTime('')
  }

  useEffect(()=> {
    setStatus(0)
  }, [])

  const onPressButtonSave = (key) => {
    let today = new Date();
    let date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    let time = today.getHours() + ":" + today.getMinutes();
    let dateTime = date+' '+time;

    if(key == 'Save') {
    if(!title && !description) {
        alert('Input Title & Description')
      }
      else if(!title) {
        alert('Input Title')
      }
      else if (!description) {
        alert('Input Description')
      }
      else {
        let data = {
          "id": id,
          "title": title,
          "description": description,
          "status": Number(status),
          "createdAt": dateTime
        }
        dispatch(addTodoList(data))
        resetState()
        setId(id+1)
      }
    }
    else if(key == 'Update') {
      let data = {
        "id": detailForm.id,
        "title": title,
        "description": description,
        "status": Number(status),
        "createdAt": dateTime
      }
      dispatch(updateTodoList(data, index))
      resetState()
      setLoading(true)
    }
  }

  const onPressButtonDelete = () => {
    if(status == 1) {
      alert(`Can't delete Done Todo !`)
    }
    else {
      dispatch(deleteTodoList(detailForm.id))
    }
  }

  const onPressButtonClose = () => {
    resetState()
    dispatch(closeModal())
  }


  return (
    <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        onHide={props.onHide}
      >
        <Modal.Body>
          <div className="d-flex justify-content-center">
             { indexDetail !== '' ? 
               <h4 className="title">Edit ToDo-List</h4> 
              :
              <h4 className="title">Add New ToDo-List</h4>
             } 
          </div>
        <Form>
            <Form.Group className="mb-3" controlId="formGroupEmail">
                <label className="title">Title</label>
                <Form.Control type="text" placeholder="Input title" name="title" value={title} onChange={event => setTitle(event.target.value)}/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formGroupPassword">
                <label className="title">Description</label>
                <Form.Control as="textarea" rows={4} placeholder="Input description" name="description" value={description} onChange={event => setDescription(event.target.value)}/>
            </Form.Group>
            <label>Status</label>
        </Form>
        <div className="row">
            <div className="col">
              <DropdownButton
                  size="sm"
                  variant="outline-success"
                  title={status == 0 ? "To-Do (0)" : "Done (1)"}
              >
                <Dropdown.Item onClick={()=> setStatus(0)}>To-Do (0)</Dropdown.Item>
                <Dropdown.Item onClick={()=> setStatus(1)}>Done (1)</Dropdown.Item>
              </DropdownButton>
            </div>
        </div>
        <div className="d-flex justify-content-end">
        { indexDetail !== '' ?
          <button className="btn btn-sm btn-danger button-style me-2" onClick={onPressButtonDelete}>Delete</button>
           :
            null
          }
            { indexDetail !== '' ?
              <button className="btn btn-sm btn-success me-2" onClick={()=> onPressButtonSave('Update')}>Update</button>
              :
              <button className="btn btn-sm btn-success me-2" onClick={()=> onPressButtonSave('Save')}>Save</button>
           }
           <button className="btn btn-sm btn-danger button-style" onClick={onPressButtonClose}>Exit</button>
        </div>
        </Modal.Body>
      </Modal>
  )
}

export default TodoModal;