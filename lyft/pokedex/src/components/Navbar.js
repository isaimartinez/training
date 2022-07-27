import React,{useContext} from 'react'
import { GlobalContext } from '../context/GlobalState'
export const Navbar = () => {
    const imgUrl = "https://raw.githubusercontent.com/PokeAPI/media/master/logo/pokeapi_256.png"
    const {favorites} = useContext(GlobalContext)
    return (
    <nav>
        <div></div>
        <div>
            <img src={imgUrl} alt="Poke Api Logo" className='navbar-image'/>
        </div>
        <div>
        &#10084;&#65039; {favorites.length}
        </div>
    </nav>
  )
}
