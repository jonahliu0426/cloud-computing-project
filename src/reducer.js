function userReducer(state, action) {
    switch (action.type) {
        case "SIGN_IN": {
            return {
                ...state,
                user: action.payload.user
            }
        }
        case "SIGN_UP": {
            return {
                ...state,
                user: action.payload.user
            }
        }
        case "SIGN_OUT": {
            return {
                ...state,
                user: action.payload.user
            }
        }
        default:
            return state
    }
}

export default userReducer;