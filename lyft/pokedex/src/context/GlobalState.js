import React, {createContext, useContext, useReducer} from 'react'
import AppReducer from './AppReducer'
//Initial State

const initialState = {
    favorites: [],
    pokemons: [],
    page: 0,
    total: 0,
    reload: 0,
}

// Create context
export const GlobalContext = createContext(initialState);

// Provider Component
export const GlobalProvider = ({children}) => {
    const [state, dispatch] = useReducer(AppReducer, initialState);

    function deleteFavorite(id){
        dispatch({
            type: 'DELETE',
            id
        })
    } 
    
    function addFavorite(id){
        dispatch({
            type: 'ADD',
            id
        })
    }

    function setPokemons(pokemons) {
        dispatch({
            type: 'SET_POKEMONS',
            pokemons
        })
    }

    function setPage(page) {
        dispatch({
            type: 'SET_PAGE',
            page
        })
    }

    function setTotal(total) {
        dispatch({
            type: 'SET_TOTAL',
            total
        })
    }

    function onReload() {
        dispatch({
            type: 'RELOAD',
        })
    }


    return(<GlobalContext.Provider value={{
        favorites: state.favorites,
        pokemons: state.pokemons,
        page: state.page,
        total: state.total,
        reload: state.reload,
        state: state,
        deleteFavorite,
        addFavorite,
        setPokemons,
        setPage,
        setTotal,
        onReload
    }}>
        {children}
    </GlobalContext.Provider>)
}