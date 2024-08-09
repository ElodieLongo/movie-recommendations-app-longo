
import { useState, useEffect } from 'react';
import { Box, Heading, Container, Text, Grid, GridItem, Checkbox, Button, Flex } from '@chakra-ui/react';
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



  return (
    <>

<Text color={'gray.500'} fontSize="2xl" mb={8}>
  We recommend these movies for you:
</Text>
  
  <Grid templateColumns="repeat(2, 1fr)" gap={8}>
        {movies && movies.map((movie, i) => (
          <GridItem
            key={'movie' + i}
            bg="gray.50"
            p={4}
            borderRadius="md"
            boxShadow="md"
          >
            <Flex direction="row" justify="space-between">
              {/* Image Section */}
              <Box flex="1" mr={4}>
                <img 
                  src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} 
                  alt={movie.title} 
                  style={{
                    borderRadius: '8px',
                    objectFit: 'cover',
                    width: '100%',
                    height: '100%',
                  }}
                />
              </Box>

              {/* Text Content Section */}
              <Box flex="2">
                <Text fontWeight="bold" fontSize="lg" mb={2} color="gray.700">
                  {movie.title}
                </Text>

                <Text fontSize="sm" color="gray.600" mb={2}>
                  Release date: {movie.release_date}
                </Text>

                <Text fontSize="sm" color="gray.600" mb={2} noOfLines={6}>
                  Overview: {movie.overview}
                </Text>

                <Text fontSize="sm" color="gray.800" mb={2}>
                  Average Vote: {movie.vote_average}
                </Text>

                <Text fontSize="sm" color="gray.800">
                  Vote Count: {movie.vote_count}
                </Text>
              </Box>
            </Flex>
          </GridItem>
        ))}
      </Grid>
    </>
  );
}