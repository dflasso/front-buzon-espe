const initialState = {
    data: null,
    auth: false
 };


export default function (state = initialState, action) {
    switch (action.type) {
        case 'SIGNIN_USER':
            return { 
                data: action.payload,
                auth: true };
        default:
            return state;
    }
}