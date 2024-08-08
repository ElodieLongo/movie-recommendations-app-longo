import { useState, useEffect } from 'react';
import { Box, Heading, Container, Text, Grid, Stack, Checkbox, Button } from '@chakra-ui/react';
import SuggestFilm from "./suggestions";
const movieKey = process.env.NEXT_PUBLIC_MOVIE_API_KEY;

export default function CallToActionWithAnnotation(props) {
  const [genres, setGenres] = useState([]);
  const [selectedGenres, setSelectedGenres] = useState('');
  const [userPreferredGenres, setUserPreferredGenres] = useState([]);

  useEffect(() => {
    const fetchGenres = async () => {
      const options = { method: 'GET', headers: { accept: 'application/json' } };

      try {
        const response = await fetch(`https://api.themoviedb.org/3/genre/movie/list?language=en&api_key=${movieKey}`, options);
        const data = await response.json();
        setGenres(data.genres);
      } catch (err) {
        console.error(err);
      }
    };

    fetchGenres();
  }, []);


  useEffect(() => {
    const fetchUserPreferredGenres = async () => {
      try {
        const res = await fetch(`/api/user/getPreferredGenres?username=${props.user.user.username}`, {
          method: "GET",
          headers: {
            "content-type": "application/json",
          },
        });
  
        const preferredGenres = await res.json();
        setUserPreferredGenres(preferredGenres);
        console.log(preferredGenres)
      } catch (err) {
        console.error(err);
      }
    };
  
    fetchUserPreferredGenres();
  }, [props.user.user.username]);

  const handleGenreSelect = (genreId) => {
    setSelectedGenres((prevSelected) => {
      if (prevSelected.includes(genreId)) {
        return prevSelected.filter((g) => g !== genreId);
      } else if (prevSelected.length < 3) {
        return [...prevSelected, genreId];
      } else {
        return prevSelected;
      }
    });
  };

  const saveFavoriteGenres = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("/api/user/setPreferredGenres", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({ username: props.user.user.username, genres: selectedGenres}),
      });

      if (res.status === 200) {
        setUserPreferredGenres(selectedGenres);
      } 
      const { error: message } = await res.json();
      console.error(message)
    } catch (err) {
      console.log(err);
    }
  };


  return (
    <>

    {userPreferredGenres.length > 0 &&
    <>
    <SuggestFilm userPreferredGenres={userPreferredGenres} />
      <Button 
      onClick={() => setUserPreferredGenres([])} 
      colorScheme="teal" 
      size="lg" 
      mt={6}
      maxWidth="300px" 
      whiteSpace="normal" 
      wordBreak="break-word" 
      mx="auto">
      Reset Favourite Genres
    </Button>
    </>
    }

    {userPreferredGenres.length === 0 &&
      <Container maxW={'3xl'}>
      <Stack
        as={Box}
        textAlign={'center'}
        spacing={{ base: 8, md: 14 }}
        py={{ base: 20, md: 36 }}>
        <Heading
          fontWeight={600}
          fontSize={{ base: '2xl', sm: '4xl', md: '6xl' }}
          lineHeight={'110%'}>
          Give me your favourite movie and <br />
          <Text as={'span'} color={'green.400'}>
            we will get you infinite hours of thrill
          </Text>
        </Heading>


        {selectedGenres.length !== 3 &&
        <>
          <Text color={'gray.500'}>
            Please select up to three favorite genres:
          </Text>
          <Grid templateColumns='repeat(5, 1fr)' gap={6}>
          {genres.map((genre, i) => (
              <Checkbox isDisabled={selectedGenres.length === 3} isChecked={selectedGenres.includes(genre.id)}
              onChange={() => handleGenreSelect(genre.id)} key={genre.name} id={genre.name + i} w='100%' h='300'>
                {genre.name}
                <img key={i} src={`https://picsum.photos/id/${i + 20}/200/300`} alt="Random Lorem Picsum image" />
              </Checkbox>
            ))}
          </Grid>
        </>
        }


        {selectedGenres.length === 3 &&
        <>
              <Text color={'gray.500'}>
                Your favorite genres:
              </Text>
                <Grid templateColumns='repeat(3, 1fr)' gap={6}>
                  {selectedGenres.map((genre, i) => (
                        <img key={i} src={`https://picsum.photos/id/${i + 20}/200/300`} alt="Random Lorem Picsum image" />
                    ))}
                </Grid>


                <Button 
                 onClick={saveFavoriteGenres} 
                 colorScheme="teal" 
                 size="lg" 
                 mt={6}
                 maxWidth="300px" 
                 whiteSpace="normal" 
                 wordBreak="break-word" 
                 mx="auto">
                 Save Favorite Genres
               </Button>

               <Button 
                 onClick={() => setSelectedGenres([])} 
                 colorScheme="teal" 
                 size="lg" 
                 mt={6}
                 maxWidth="300px" 
                 whiteSpace="normal" 
                 wordBreak="break-word" 
                 mx="auto">
                 Reset Favourite Genres
               </Button>
        </>
        }




      </Stack>
    </Container>
    }

    

    </>
  );
}