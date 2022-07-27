export default (state, action) => {
    switch (action.type) {
        case 'DELETE':
            return {
                ...state,
                favorites: state.favorites.filter(fav => fav.id !== action.id)
            }
        case 'ADD':
            return {
                ...state,
                favorites: [
                    ...state.favorites,
                    {id: action.id}
                ]
            }
        case 'SET_POKEMONS':
            let total
            if(action.pokemons.length == 1){
                total = 1
            } else {
                total = state.total
            }
            return {
                ...state,
                pokemons: action.pokemons,
                total
            }
        case 'SET_PAGE':
            return {
                ...state,
                page: action.page
            }
        case 'SET_TOTAL':
            return {
                ...state,
                total: action.total
            }
        case 'RELOAD':
            return {
                ...state,
                reload: state.reload++
            }
        default:
            return state;
    }
}