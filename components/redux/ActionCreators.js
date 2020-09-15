import * as ActionTypes from './ActionTypes';
import {baseUrl} from '../../shared/baseUrl';

export const fetchComments = () => (dispatch) => {
    return fetch(baseUrl + 'comments')
        .then(response => {
            if(response.ok){
                return response
            }
            else{
               var error = new Error('Error ' + response.status+ ': ' + response.statusText)
               error.response = response;
               throw error; 
            }
        },
        error => {
            var errMess = new Error(error.message)
            throw errMess;
        })   
        .then(response => response.json())   
        .then(comments => dispatch(addComments(comments)))
        .catch(error => dispatch(commentsFailed(error.message)));
}
export const commentsFailed = (errMess) => ({
    type: ActionTypes.COMMENTS_FAILED,
    payload: errMess
});
export const addComments = (comments) => ({
    type: ActionTypes.ADD_COMMENTS,
    payload: comments
});
export const postComment = (dishId, rating, author, comment) => (dispatch) =>{
    const newComment = {
        dishId: dishId,
        rating: rating,
        author: author,
        comment: comment,
    }
    newComment.id=+1
    newComment.date = new Date().toISOString();
    setTimeout(() => {dispatch(addComment(newComment))}, 2000);
}
export const addComment=(comment)=>({
    type: ActionTypes.ADD_COMMENT,
    payload: comment
});
export const deleteFavorite=(itemId)=>({
    type:ActionTypes.DELETE_FAVORITE,
    payload:itemId
});



export const fetchItems = () => (dispatch) => {
    dispatch(itemsLoading());

    return fetch(baseUrl + 'items')
        .then(response => {
            if(response.ok){
                return response
            }
            else{
                error = new Error('Error ' + response.status + ': ' + response.statusText)
                error.response = response;
                throw error;
            }
        }, error => {
            var errMess = new Error(error.message);
            throw errMess;
        })
        .then(response => response.json())
        .then(items => dispatch(addItems(items)))
        .catch(error => dispatch(itemsFailed(error.message)))
}
export const itemsLoading = () => ({
    type: ActionTypes.ITEMS_LOADING
});
export const itemsFailed = (errmess) => ({
    type: ActionTypes.ITEMS_FAILED,
    payload: errmess
});
export const addItems = (items) => ({
    type: ActionTypes.ADD_ITEMS,
    payload: items
});


export const fetchPromos = () => (dispatch) => {

    dispatch(promosLoading());

    return fetch(baseUrl + 'promotions')
        .then(response => {
            if (response.ok) {
                return response;
            } else {
                var error = new Error('Error ' + response.status + ': ' + response.statusText);
                error.response = response;
                throw error;
            }
        },
            error => {
                var errmess = new Error(error.message);
                throw errmess;
            })
        .then(response => response.json())
        .then(promos => dispatch(addPromos(promos)))
        .catch(error => dispatch(promosFailed(error.message)));
}
export const promosFailed = (errMess) => ({
    type: ActionTypes.PROMOS_FAILED,
    payload: errMess
});
export const promosLoading = () => ({
    type: ActionTypes.PROMOS_LOADING
});
export const addPromos = (promos) => ({
    type: ActionTypes.ADD_PROMOS,
    payload: promos
});


export const fetchLeaders = () => (dispatch) => {
    dispatch(leadersLoading());

    return fetch(baseUrl + 'leaders')
        .then(response => {
            if (response.ok) {
                return response
            }
            else {
                var error = new Error('Error ' + response.status + ': ' + response.statusText);
                error.response = response;
                throw error;
            }

        },
            error => {
                var errmess = new Error(error.message);
                throw errmess;
            })
        .then(response => response.json())
        .then(leaders => dispatch(addLeaders(leaders)))
        .catch(error => dispatch(leadersFailed(error)));
}
export const leadersFailed = (errMess) => ({
    type: ActionTypes.LEADERS_FAILED,
    payload: errMess
});
export const leadersLoading = () => ({
    type: ActionTypes.LEADERS_LOADING
});
export const addLeaders = (leaders) => ({
    type: ActionTypes.ADD_LEADERS,
    payload: leaders
});

export const postFavorite = (itemId) => (dispatch) =>{
    setTimeout(() => {
        dispatch(addFavorite(itemId));
    }, 500);
}

export const addFavorite = (itemId) => ({
    type: ActionTypes.ADD_FAVORITE,
    payload: itemId
});