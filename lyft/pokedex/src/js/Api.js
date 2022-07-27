export const searchPokemon = async (pokemon) => {
    try {
        let url = "https://pokeapi.co/api/v2/pokemon/"+pokemon
        const response = await fetch(url)
        const data = await response.json()
        return data
    } catch (e) {
        console.log("Error Search Pokeomn", e)
    }
}

export const getPokemons = async (limit=10, offset=0) => {
    try{
        let url = "https://pokeapi.co/api/v2/pokemon?limit="+limit+"&offset="+offset
        const response = await fetch(url)
        const data = await response.json()
        return data
    }catch (e) {
        console.log("Error Get Pokemons", e)
    }
}

export const getPokemonData = async (url) => {
    try{
        const response = await fetch(url)
        const data = await response.json()
        return data
    }catch (e) {
        console.log("Error Get Pokemon Data", e)
    }
}