import React, { createContext, useState } from 'react'

type scale = 'fit' | 'even'
interface ContextType {
  query: string
  setQuery: Function
  scale: scale
  toggleScale: Function
}

export const MenuContext = createContext({} as ContextType)

export const Provider = props => {
  const [ query, setQuery ] = useState('')
  const [ scale, setScale ] = useState('fit' as scale)

  function toggleScale() {
    setScale(scale === 'fit' ? 'even' : 'fit')
  }

  return (
    <MenuContext.Provider value={{
      query,
      setQuery,
      scale,
      toggleScale
    }}>
      {props.children}
    </MenuContext.Provider>
  )
}
