const initValues  = {
    contest: {}, 
    openBets: [],    
    settledBets: [],
    entryID: null,
    bankroll: null,
    available: null,
    leagues: [],
    upcomingFixts:[],
    inplayFixts:[]
}

const contestReducer = (state = initValues, action) =>{
    switch(action.type){
        case 'SET_CONTEST': {
            state = {...state, contest: action.contest};
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
        case 'SET_ENTRY_ID': {
            state =  {...state, entryID: action.bets};
            break;
        }
        case 'SET_BANKROLL': {
            state =  {...state, bankroll: action.bankroll};
            break;
        }
        case 'SET_AVAILABLE': {
            state =  {...state, available: action.available};
            break;
        }
        case 'SET_LEAGUES': {
            state = {...state, leagues: action.leagues}
        }
        case 'SET_UPCOMING': {
            state = {...state, upcomingFixts: action.upcoming}
        }
        case 'SET_INPLAY': {
            state = {...state, inplayFixts: action.inplay}
        }
        default : break; 
    }
    return state;
}

export default contestReducer;