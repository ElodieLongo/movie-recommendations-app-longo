
import { useState, useEffect } from 'react';
import { Box, Heading, Container, Text, Grid, GridItem, Checkbox, Button } from '@chakra-ui/react';
const movieKey = process.env.NEXT_PUBLIC_MOVIE_API_KEY;

export default function SuggestFilm(props) {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const getMovies = async () => {
      const options = { method: 'GET', headers: { accept: 'application/json' } };

      try {
        const response = await fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${movieKey}&with_genres=${props.userPreferredGenres}`, options);
        const data = await response.json();
        setMovies(data.results);
        console.warn(movies, data.results)
      } catch (err) {
        console.error(err);
      }
    };

    getMovies();
  }, []);


    // FETCH FILM DA FAVORITI
 

  return (
    <>

<Text color={'gray.500'}>
    Your favorite genres:
  </Text>
  
<div className="movie-grid">
{movies && movies.map((movie, i) => (
      <div className="movie" key={'movie' + i} id={'movie' + i} w='100%'>
        <Text color={'gray.500'}>
          {movie.title}
        </Text>
        
        <img  src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} alt="movie title" />

        <Text color={'gray.500'}>
          Overview: {movie.overview}
        </Text>

        <Text color={'gray.800'}>
          Average Vote: {movie.vote_average}
        </Text>

        <Text color={'gray.800'}>
          Vote Count: {movie.vote_count}
        </Text>
      </div>
    ))}
</div>


    </>
  );
}