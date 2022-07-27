import React, {useState, useEffect, useContext} from 'react';
import './App.css';
import {Navbar} from './components/Navbar'
import {SearchBar} from './components/SearchBar'
import {Pokedex} from './components/Pokedex'
import { getPokemons, getPokemonData } from './js/Api'
import { GlobalContext} from './context/GlobalState'

function App() {
  const {pokemons, setPokemons, page, setPage, reload, total, setTotal} = useContext(GlobalContext)
  // const {pokemons, setPokemons, page, setPage, reload} = useContext(GlobalContext)
  // const [total, setTotal] = useState(0)
  const [loading, setLoading] = useState(true)

  const fetchPokemons = async() =>{
    setLoading(true)
    const data = await getPokemons(27, 27*page)
    const promises = data.results.map(async (poke) => {
      return await getPokemonData(poke.url)
    })

    const results = await Promise.all(promises)

    setPokemons(results)
    setLoading(false)
    setTotal(Math.ceil(data.count / 27))
  }

  useEffect( () => {
    fetchPokemons()
  },[page, reload])

  return (
    <>
      <Navbar/>
      <div className="App">
        <SearchBar/>
        <Pokedex pokemons={pokemons}
          page={page}
          setPage={setPage}
          total={total}
          loading={loading}
        />
      </div>
    </>
  );
}

export default App;
