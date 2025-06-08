import { useSelector } from 'react-redux';
import Loading from '../../components/Loading';
import Error from '../../components/Error';

export default function MovieList() {
  const { movies, loading, error } = useSelector(state => state.movies);

  if (loading) return <Loading />;
  if (error) return <Error message={error} />;
  if (!movies.length) return <p>No results found.</p>;

  return (
    <div className="grid">
      {movies.map(movie => (
        <div key={movie.imdbID}>
          <img src={movie.Poster} alt={movie.Title} />
          <h4>{movie.Title} ({movie.Year})</h4>
        </div>
      ))}
    </div>
  );
}
