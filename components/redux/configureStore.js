import {createStore, combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import {items} from './items';
import {promotions} from './promos';
import {leaders} from './leaders';
import {comments} from './comments';
import {favorites} from './favorites';
import {persistStore, persistCombineReducers} from 'redux-persist';
import storage from 'redux-persist/es/persistStore';
import AsyncStorage from '@react-native-community/async-storage';


export const ConfigureStore = () => {

    const config = {
        key: 'root',
        storage: AsyncStorage,
        debug: true
    }

    const persistedReducer = persistCombineReducers(config, {
        items,
        comments,
        promotions,
        leaders,
        favorites
    })

    const store = createStore(persistedReducer,applyMiddleware(thunk, logger))
    const persistor = persistStore(store)

    return {store, persistor}



    /* const store = createStore(
        persistCombineReducers(config, {
            items,
            comments,
            promotions,
            leaders,
            favorites

        }),
        applyMiddleware(thunk,logger)
    );
    const persistor = persistStore(store);
    return { persistor, store}; */
}