import React, {useContext, useState} from 'react'
import { searchPokemon } from '../js/Api'
import { GlobalContext } from '../context/GlobalState'
export const SearchBar = () => {
    const {pokemons, setPokemons, onReload} = useContext(GlobalContext)
    const [search,setSearch] = useState("")
    const [data, setData] = useState()

    const onInputChange = (e) => {
        let str = e.target.value.toLowerCase()
        setSearch(str)
        if(str.length == 0) {
            onReload()
        }
    }

    const onSearch = async () => {
        if(search.length == 0) {
            return false
        } else {
            let data = await searchPokemon(search)
            setData(data)
            setPokemons([data])
        }
    }

  return (
    <div className='searchbar-container'>
        <div className='searchbar'>
            <input onChange={onInputChange} value={search} type="text" placeholder='Buscar Pokemon'/>
        </div>
        <div className='searchbar-btn'>
            <button onClick={onSearch}>Search</button>
        </div>
    </div>
  )
}
