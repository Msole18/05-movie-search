import { useState, useEffect, useRef } from 'react'

export function useSearch() {
  const [search, updateSearch] = useState('')
  const [error, setError] = useState(null)
  const isFirstInput = useRef(true)

  useEffect(() => {
    if (isFirstInput.current) {
      isFirstInput.current = search === ''
      return
    }
    if (search === '') {
      setError('No movies were found for this search')
      return
    }
    if (search.match(/^\d+$/)) {
      setError('You can not search for a movie with numbers ')
      return
    }
    if (search.length < 3) {
      setError('Search must be at least 3 characters long ')
      return
    }

    setError(null)

  }, [search])

  return { search, updateSearch, error }
}