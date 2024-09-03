import './App.css';
import { useMovies } from './hooks/useMovies';
import { useSearch } from './hooks/useSearch';
import { Movies } from './components/Movies';
import { useCallback, useState } from 'react';
import debounce from 'just-debounce-it';

function App() {
  const [sort, setSort] = useState(false);
  const { search, updateSearch, error } = useSearch();
  const { movies, getMovies, loading } = useMovies({ search, sort });

const debouncedGetMovies = useCallback(
  debounce((search) => {
    console.log('search', search);
    getMovies({ search });
  }, 300),
  [getMovies]
);

  const handleSumit = (event) => {
    // uncontrolled
    // event.preventDefault()
    // const { search } = Object.fromEntries(new window.FormData(event.target))
    // console.log(search)
    // controlled
    event.preventDefault();
    getMovies({ search });
  };
  const handleSort = () => {
    setSort(!sort);
  };
  const handleChange = (event) => {
    const newSearch = event.target.value;
    updateSearch(newSearch);
    debouncedGetMovies(newSearch);
  };

  return (
    <div className='page'>
      <header>
        <h1>React Movie Search</h1>
        <form
          className='form'
          onSubmit={handleSumit}
        >
          <input
            style={{
              border: '2px solid transparent',
              borderColor: error ? 'red' : 'transparent',
            }}
            onChange={handleChange}
            value={search}
            name='query'
            placeholder='Avengers, Gladiator, Harry Potter...'
          />
          <input
            type='checkbox'
            onChange={handleSort}
            checked={sort}
          />
          <button type='submit'>Search</button>
        </form>
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </header>

      <main>{loading ? <p>Cargando...</p> : <Movies movies={movies} />}</main>
    </div>
  );
}

export default App;
