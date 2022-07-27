import React from 'react'
import { Pokemon } from './Pokemon'
import { Pagination } from './Pagination'

export const Pokedex = ({pokemons, page, setPage, total, loading}) => {
    const lastPage = () => {
        const nextPage = Math.max(page - 1, 0);
        setPage(nextPage);
      };
    
      const nextPage = () => {
        const nextPage = Math.min(page + 1, total - 1);
        setPage(nextPage);
      };
    
  return (
    <div>
        <div className='header'>
            <h1>Pokedex</h1>
            <Pagination
                page={page}
                totalPages={total}
                onLeftClick={lastPage}
                onRightClick={nextPage}
            />
        </div>
        {!loading ? 
            <div className='pokedex-grid'>
                {pokemons.map((poke, i) => {
                    return(
                        <Pokemon pokemon={poke} key={poke.name}/>
                    )
                })}
            </div> 
            : 
            <div>
            Loading...
          </div>}
    </div>
  )
}
