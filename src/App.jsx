import './App.css'
import { useMovies } from './hooks/useMovies'
import { Movies } from './components/Movies'



function App() {
  const { movies }  = useMovies()

  return (
    <div className='page'>

      <header>
        <h1>React Movie Search</h1>
        <form className='form'>
          <input placeholder='Avengers, Gladiator, Harry Potter...' />
          <button type='submit'>Search</button>
        </form>
      </header>

      <main>
        {
          <Movies movies={movies} />
        }
      </main>

    </div>
  )
}

export default App
