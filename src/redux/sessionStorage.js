export const signInSessionStorage = (user) => {
    if (typeof (Storage) !== 'undefined') {
        sessionStorage.setItem('user',JSON.stringify(user));
    }
}

export const getUserSessionStorage = ( )=> {
    const user = sessionStorage.getItem('user');

    if (user === null) {
        return {user: {data: null, auth: false}};
    }
    return {user : { data: JSON.parse(user),  auth: true }};
}

export const setMenuStore = resources => {
    sessionStorage.setItem('menu', JSON.stringify(resources));
}

export const getMenuStorage = () => {
    const menuStorage = sessionStorage.getItem('menu');
    if (menuStorage === null) {
        return undefined;
    }
    return {resources :  JSON.parse(menuStorage)};
}
