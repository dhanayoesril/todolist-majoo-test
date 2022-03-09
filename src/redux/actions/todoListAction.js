import * as types from './actionType';

export const openModal = () => {
    return(dispatch) => {
        dispatch({
            type: types.OPEN_MODAL,
            payload: true
        })
    }
}

export const closeModal = () => {
    return(dispatch) => {
        dispatch({
            type: types.CLOSE_MODAL,
            payload: false
        })
    }
}

export const getTodoList = (data) => {
    return(dispatch) => {
        dispatch({
            type: types.GET_TODO_LIST,
            payload: data
        })
    }
}

export const addTodoList = (data) => {
    return(dispatch) => {
        dispatch({
            type: types.ADD_TODO_LIST,
            payload: data
        })
    }
}

export const detailTodoList = (data, index) => {
    return(dispatch) => {
        dispatch({
            type: types.DETAIL_TODO_LIST,
            payload: {
                data: data,
                index: index
            }
        })
    }
}

export const updateTodoList = (data, index) => {
    return(dispatch) => {
        dispatch({
            type: types.UPDATE_TODO_LIST,
            payload: {
                data: data,
                index: index
            }
        })
    }
}

export const deleteTodoList = (index) => {
    return(dispatch) => {
        dispatch({
            type: types.DELETE_TODO_LIST,
            payload: index
        })
    }
}

