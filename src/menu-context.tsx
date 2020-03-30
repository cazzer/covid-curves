import React, { createContext, useState } from 'react'

type scale = 'fit' | 'even'
interface ContextType {
  scale: scale
  toggleScale: Function
}

export const MenuContext = createContext({} as ContextType)

export const Provider = props => {
  const [ scale, setScale ] = useState('fit' as scale)

  function toggleScale() {
    setScale(scale === 'fit' ? 'even' : 'fit')
  }

  return (
    <MenuContext.Provider value={{
      scale,
      toggleScale
    }}>
      {props.children}
    </MenuContext.Provider>
  )
}
