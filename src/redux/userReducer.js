const initValues  = {
    ID: null, 
    username: '',
    balance: null,
    permissions:  []
}

const userReducer = (state = initValues, action) =>{
    switch(action.type){
        case 'SET_USER_ID': {
            state = {...state, ID: action.ID};
            break;
        }
        case 'SET_PERMISSIONS': {
            state =  {...state, permissions: action.permissions};
            break;
        }
        case 'SET_USER_USERNAME': {
            state = {...state, username: action.username}
            break;
        }
        case 'SET_USER_BALANCE': {
            state = {...state, balance: action.balance}
            break;
        }
        default : break; 
    }
    return state;
}

export default userReducer;