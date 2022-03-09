import * as types from '../../actions/actionType';

const initialState = {
    data: [],
    loading: false,
    showModal: false,
    detailForm: {},
    indexDetail: '',
    dataTodo: [],
    dataDone: []
}

const todoList = (state = initialState, action) => {
    switch(action.type) {
        case types.OPEN_MODAL:
            return {
                ...state,
                showModal: action.payload
            }
        case types.CLOSE_MODAL:
            return {
                ...state,
                showModal: action.payload,
                detailForm: {},
                indexDetail: ''
            }
        case types.GET_TODO_LIST:
            let data = action.payload
            let todo = data.filter(a => a.status == 0)
            let sortTodo = todo.sort((a, b) => (new Date(b.createdAt).getTime()) - (new Date(a.createdAt).getTime()));
            let done = data.filter(a => a.status == 1)
            let sortDone = done.sort((a, b) => (new Date(a.createdAt).getTime()) - (new Date(b.createdAt).getTime()));
            return {
                ...state,
                data: action.payload,
                dataTodo: sortTodo,
                dataDone: sortDone
            }
        case types.ADD_TODO_LIST:
            let newData = [...state.data, action.payload]
            let dataAdd = newData
            let todoAdd = dataAdd.filter(a => a.status == 0)
            let sortTodoAdd = todoAdd.sort((a, b) => (new Date(b.createdAt).getTime()) - (new Date(a.createdAt).getTime()));
            let doneAdd = dataAdd.filter(a => a.status == 1)
            let sortDoneAdd = doneAdd.sort((a, b) => (new Date(a.createdAt).getTime()) - (new Date(b.createdAt).getTime()));
            return {
                ...state,
                data: newData,
                showModal: false,
                dataTodo: sortTodoAdd,
                dataDone: sortDoneAdd
            }
        case types.DETAIL_TODO_LIST:
            return {
                ...state,
                detailForm: action.payload.data,
                indexDetail: action.payload.index,
                showModal: true
            }
        case types.UPDATE_TODO_LIST:
            const dataFind = (a) => a.id == action.payload.data.id;
            let index = state.data.findIndex(dataFind)

            let updateData = state.data
            updateData[index].title = action.payload.data.title
            updateData[index].description = action.payload.data.description
            updateData[index].status = action.payload.data.status
            updateData[index].createdAt = action.payload.data.createdAt
            
            let dataUpdate = updateData
            let todoUpdate = dataUpdate.filter(a => a.status == 0)
            let sortTodoUpdate = todoUpdate.sort((a, b) => (new Date(b.createdAt).getTime()) - (new Date(a.createdAt).getTime()));
           
            let doneUpdate = dataUpdate.filter(a => a.status == 1)
            let sortDoneUpdate = doneUpdate.sort((a, b) => (new Date(a.createdAt).getTime()) - (new Date(b.createdAt).getTime()));
            return {
                ...state,
                data: updateData,
                showModal: false,
                detailForm: {},
                indexDetail: '',
                dataTodo: sortTodoUpdate,
                dataDone: sortDoneUpdate

            }
        case types.DELETE_TODO_LIST:
            let deleteData = state.data.filter(a => a.id !== action.payload)

            let dataDelete = deleteData
            let todoDelete = dataDelete.filter(a => a.status == 0)
            let sortTodoDelete = todoDelete.sort((a, b) => (new Date(b.createdAt).getTime()) - (new Date(a.createdAt).getTime()));
           
            let doneDelete = dataDelete.filter(a => a.status == 1)
            let sortDoneDelete = doneDelete.sort((a, b) => (new Date(a.createdAt).getTime()) - (new Date(b.createdAt).getTime()));
              return {
                ...state.data,
                data: deleteData,
                showModal: false,
                detailForm: {},
                indexDetail: '',
                dataTodo: sortTodoDelete,
                dataDone: sortDoneDelete 
            }
        default:
            return state;
    }
}

export default todoList;