const cartReducer=(state,action)=>{
    switch(action.type){
        case "SET_LOADING":
        return {
            ...state
        }
        default:
            return {
                ...state
            }
    }
}

export default cartReducer;