const initialState = {
    items: [
        { id: 1, Name: 'Inicio' },
        { id: 2, Name: 'Sugerencias' },
        { id: 3, Name: 'Denuncias' },
    ],
    itemSelected: { id: 1, Name: 'Inicio' },
};

export default function (state = initialState, action) {
    switch (action.type) {
        case 'SELECTION_RESOURSE':
            return {
                ...state,
                itemSelected: action.payload
            };
        default:
            return state;
    }
}

