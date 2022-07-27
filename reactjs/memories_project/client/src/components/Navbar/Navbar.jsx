import React,{useState, useEffect} from 'react'
import {Link} from 'react-router-dom' 
import {AppBar, Typography, Toolbar, Avatar, Button} from '@material-ui/core'
import jwt_decode from "jwt-decode";
import { useDispatch } from 'react-redux'
import { useHistory, useLocation } from 'react-router-dom';
import memoriesLogo from '../../images/memories-Logo.png'
import memoriesText from '../../images/memories-Text.png'
import useStyles from './styles'

const Navbar = () => {
  const dispatch = useDispatch()
  const history = useHistory()
  const classes = useStyles()
  const location = useLocation()

  const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')))

  useEffect(() => {
    const token = user?.token;

    if(token){
      const decodedToken = jwt_decode(token)

      if(decodedToken.exp * 1000 < new Date().getTime()){
        logout()
      }
    }

    setUser(JSON.parse(localStorage.getItem('profile')))
  }, [location])
  

  const logout = () => {
    dispatch({type:'LOGOUT'})
    history.push('/')
    setUser(null)
  }

  return (
    <AppBar className={classes.appBar} position='static' color="inherit">
      <Link to="/" className={classes.brandContainer}>
        <img src={memoriesText} alt="icon" height="45px"/>
        <img className={classes.image} src={memoriesLogo} alt="memories" height="40px"/>
      </Link>
      <Toolbar className={classes.toolbar}>
        {
          user ? (
            <div className={classes.profile}>
              <Avatar className={classes.purple} alt={user.result.name} src={user.result.picture}>
                {user.result.name.charAt(0)}
              </Avatar>
              <Typography className={classes.userName} variant="h6">
                {user.result.name}
              </Typography>
              <Button onClick={logout} variant="contained" className={classes.logout} color="secondary">
                Logout
              </Button>
            </div>
          ) : (
            <Button component={Link} to="/auth" variant="contained" color="primary">
              Sign In
            </Button>
          )
        }
      </Toolbar>
    </AppBar>
  )
}

export default Navbar