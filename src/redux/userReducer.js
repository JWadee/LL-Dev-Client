const initValues  = {
    ID: null, 
    username: '',
    balance: null,
    permissions:  [],
    openBets: [],    
    settledBets: [],
    contests: []
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
        case 'SET_OPEN_BETS': {
            state =  {...state, openBets: action.bets};
            break;
        }
        case 'SET_SETTLED_BETS': {
            state =  {...state, settledBets: action.bets};
            break;
        }        
        case 'SET_CONTESTS': {
            state =  {...state, contests: action.contests};
            break;
        }
        default : break;
    }
    return state;
}

export default userReducer;