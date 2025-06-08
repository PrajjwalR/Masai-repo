import { useDispatch } from 'react-redux';
import { fetchMoviesBySearch } from '../features/movies/moviesSlice';
import { useState } from 'react';

export default function SearchBar() {
  const [search, setSearch] = useState('');
  const dispatch = useDispatch();

  const handleSearch = e => {
    e.preventDefault();
    if (search.trim() !== '') dispatch(fetchMoviesBySearch(search));
  };

  return (
    <form onSubmit={handleSearch}>
      <input
        type="text"
        placeholder="Search movies..."
        value={search}
        onChange={e => setSearch(e.target.value)}
      />
      <button type="submit">Search</button>
    </form>
  );
}
