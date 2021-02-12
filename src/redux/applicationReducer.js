const initValues  = {
    sports: [],
    leagues:[]
}

const applicationReducer = (state = initValues, action) =>{
    switch(action.type){
        case 'SET_SPORTS': {
            state = {...state, sports: action.sports};
            break;
        }
        case 'SET_LEAGUES': {
            state = {...state, leagues: action.leagues};
            break;
        }
        default : break; 
    }
    return state;
}

export default applicationReducer;