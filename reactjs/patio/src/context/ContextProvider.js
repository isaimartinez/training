import React,{useContext, useState, createContext, useReducer  } from "react";
import { initialCajones } from "../data/data";

const StateContext = createContext();

const reducer = (cajones, action) => {
  switch (action.type) {
    case "SET_STATUS": {
      cajones.data[action.i].status = action.status
      return{
        ...cajones
      }
    }
      default:
          return cajones;
  }
};

export const ContextProvider = ({children}) => {
  const [activeMenu, setActiveMenu] = useState(true)
  const currentColor = "black"

  const [screenSize, setScreenSize] = useState(undefined)

  const [currentMode, setCurrentMode] = useState('Light')
  const [themeSettings, setThemeSettings] = useState(false);
  
  const setMode = (e) => {
    setCurrentMode(e.target.value)
    localStorage.setItem("themeMode", e.target.value)
    setThemeSettings(false)
  }

  // ====== Handle Modal ========
  const [activeModal, setActiveModal] = useState(false)
  const [cajones, dispatchCajones] = useReducer(reducer,initialCajones)
  const [id, setId] = useState("")
  const [scanned, setScanned] = useState(false)


  return (
    <StateContext.Provider
      value={{
        activeMenu,setActiveMenu,
        currentColor, currentMode, setMode,
        themeSettings, setThemeSettings,
        screenSize, setScreenSize,
        activeModal, setActiveModal,
        scanned, setScanned,
        id, setId,
        cajones, dispatchCajones
      }}
    >
      {children}
    </StateContext.Provider>
  )
}

export const useStateContext = () => useContext(StateContext)
