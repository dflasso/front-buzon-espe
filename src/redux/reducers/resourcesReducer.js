const initialState = {
    items: [],
    itemSelected: { idResource: 5, name: 'Inicio', description: 'Administración Buzón' },
};

export default function (state = initialState, action) {
    switch (action.type) {
        case 'SELECTION_RESOURSE':
            return {
                ...state,
                itemSelected: action.payload
            };

        case 'ADD_RESOURSE':
            return {
                items: action.payload,
                itemSelected: { idResource: 5, name: 'Inicio', description: 'Administración Buzón' },
            };
        default:
            return state;
    }
}

