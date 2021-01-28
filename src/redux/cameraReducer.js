const SET_CAMERA = 'SET_CAMERA';
const RESET_CAMERA = 'RESET_CAMERA'

const initialState = {
    cameraImage: null
}

const cameraReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_CAMERA:
            return {
                ...state,
                cameraImage: action.cameraImage
            }
        case RESET_CAMERA:
            return {
                ...state,
                cameraImage: null
            }
        default:
            return state;
    }
}

export const setCameraImage = (cameraImage) => ({
    type: SET_CAMERA,
    cameraImage
})

export const resetCameraImage = () => ({
    type: RESET_CAMERA,
})

export default cameraReducer;