import React,{useContext, useState, useEffect} from 'react'
import { GlobalContext } from '../context/GlobalState';

export const Pokemon = ({pokemon}) => {
    const {favorites, deleteFavorite, addFavorite} = useContext(GlobalContext)
    const [isFav, setFav] = useState(false)
    const blackHeart = "🖤"
    const redHeart = "❤️"

    useEffect(() => {
        let favs = favorites.filter((p,i) => p.id == pokemon.id)
        let flag = favs.length > 0
        setFav(flag)
    },[favorites])

    const modifyFavorite = () => {
        if(isFav){
            deleteFavorite(pokemon.id)
        } else {
            addFavorite(pokemon.id)
        }
    }
  return (
    <div className='pokemon-card'>
        <div className='pokemon-img-container'>
            <img src={pokemon.sprites.front_default} className='pokemon-img' alt={pokemon.name} />
        </div>
        <div className='card-body'>
            <div className='card-top'>
                <h3>{pokemon.name}</h3>
                <div>
                    #{pokemon.id}
                </div>
            </div>
            <div className='card-bottom'>
                <div className='pokemon-type'>
                    {pokemon.types.map((type,i) => {
                        return(
                            <div key={i} className='pokemon-type-text'>
                                {type.type.name}
                            </div>
                        )
                    })}
                </div>
                <button onClick={modifyFavorite}>
                    <div className="pokemon-favorite">
                        {isFav ? redHeart : blackHeart} 
                    </div>
                </button>
            </div>
        </div>
    </div>
  )
}
