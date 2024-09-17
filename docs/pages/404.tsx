import React from 'react'
import { useNavigate } from 'react-router-dom'

function Component404() {
  const navigate = useNavigate()

  return (
    <div>
      <h1>404</h1>
      <p>Page not found</p>
      <button
        type='button'
        onClick={() =>
          navigate('/', {
            replace: true,
          })}
      >
        Home
      </button>
    </div>
  )
}

export default Component404
