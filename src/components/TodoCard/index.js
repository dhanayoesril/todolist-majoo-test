import React from 'react';
import './TodoCard.css';

const TodoCard = (props) => { 
  return (
    <div className="d-flex justify-content-center">
        <div className="card mb-2 todo-card" onClick={props.onClickCard}>
            <div className="row">
                <div className="col-md-10 col-sm-10 col-xs-10">
                    <p className="text-todo pt-2">{props.time}</p>
                    <label className="label-text">Title</label>
                    <div className="text-style">
                        <p className="text-todo">{props.title}</p>
                    </div>
                    <label className="label-text">Description</label>
                    <div className="text-style"> 
                        <p className="text-todo">{props.description}</p>
                    </div>
                </div>
                <div className="col-md-2 col-sm-2 col-xs-2 card-right">
                    
                </div>
            </div>
        </div>
    </div>
  )
}

export default TodoCard;