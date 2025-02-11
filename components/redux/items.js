import * as ActionTypes from './ActionTypes';

export const items = (state = {
    isLoading: true,
    errMess: null,
    items: []
}, action) => {
    switch (action.type) {
        case ActionTypes.ADD_ITEMS:
            return {
                ...state,
                isLoading: false,
                errMess: null,
                items: action.payload
            };
        
        case ActionTypes.ITEMS_FAILED:
            return{
                ...state,
                isLoading: false,
                errMess: action.payload,
                items:[]
            };

        case ActionTypes.ITEMS_LOADING:
            return{
                ...state, 
                isLoading: true,
                errMess: null,
                items:[]
            };
            
        default:
         return state;
    }
}