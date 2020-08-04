import {createStore, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import reducer from './reducers';

import {getMenuStorage, getUserSessionStorage, setMenuStore, signInSessionStorage} from './sessionStorage';

const storeState = {
    ...getUserSessionStorage(),
    ...getMenuStorage()
}


export const store = createStore(
    reducer,
    storeState,
    compose(applyMiddleware(thunk),
    typeof window === "object" && typeof window.__REDUX_DEVTOOLS_EXTENSION__ !== 'undefined'?
     window.__REDUX_DEVTOOLS_EXTENSION__() : f => f
    ),

);

store.subscribe(()=> {
    setMenuStore(store.getState().resources);
    signInSessionStorage(store.getState().user.data);
});