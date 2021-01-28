const LOGIN = 'LOGIN';
const LOGOUT = 'LOGOUT'
const SELECT_IMAGE = 'SELECT_IMAGE'
const RESET_IMAGE = 'RESET_IMAGE'


const initialState = {
    user: null,
    selectedImage: null
}

const appReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOGIN:
            return {
                ...state,
                user: action.payload
            }
        case LOGOUT:
            return {
                ...state,
                user: null
            }
        case SELECT_IMAGE:
            return {
                ...state,
                selectedImage: action.payload
            }
        case RESET_IMAGE:
            return {
                ...state,
                selectedImage: null
            }
        default:
            return state;
    }
}

export const login = (payload) => ({
    type: LOGIN,
    payload
})

export const logout = () => ({
    type: LOGOUT,

})

export const selectImage = (payload) => ({
    type: SELECT_IMAGE,
    payload
})

export const resetImage = () => ({
    type: RESET_IMAGE
})


export default appReducer;