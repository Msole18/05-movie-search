import './App.css'
import { useMovies } from './hooks/useMovies'
import { useSearch } from './hooks/useSearch'
import { Movies } from './components/Movies'
// import { useState, useEffect, useRef } from 'react'




function App() {
  const { search, updateSearch, error } = useSearch()
  const { movies, getMovies }  = useMovies({search})

   
  const handleSumit = (event) => {
    // uncotrolled
      // event.preventDefault()
      // const { search } = Object.fromEntries(new window.FormData(event.target))
      // console.log(search)
    event.preventDefault()
    getMovies({ search })
  }

  const handleChange = (event) => {
    updateSearch(event.target.value)
  }

  return (
    <div className='page'>

      <header>
        <h1>React Movie Search</h1>
        <form className='form' onSubmit={handleSumit}>
          <input
            style={{
              border: '2px solid transparent', 
              borderColor: error ? 'red' : 'transparent' 
            }}
            onChange={handleChange} 
            value={search}
            name='query'
            placeholder='Avengers, Gladiator, Harry Potter...' 
          />
          <button type='submit'>Search</button>
        </form>
        {error && <p style={{color: 'red' }}>{error}</p>}
      </header>

      <main>
          <Movies movies={movies} />
      </main>

    </div>
  )
}

export default App
