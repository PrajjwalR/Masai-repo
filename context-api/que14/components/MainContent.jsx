import React, { useContext } from 'react';
import { Grid, Box, Text } from '@chakra-ui/react';
import { AuthContext } from '../context/AuthContext';
import { ThemeContext } from '../context/ThemeContext';

const Main = () => {
  const { isLoggedIn } = useContext(AuthContext);
  const { theme } = useContext(ThemeContext);

  const bgColor = theme === 'light' ? 'gray.200' : 'gray.600';
  const textColor = theme === 'light' ? 'black' : 'white';

  return (
    <Box p="4" minH="300px" bg={theme === 'light' ? 'gray.50' : 'gray.800'}>
      <Text mb="4" fontSize="xl" color={textColor}>
        {isLoggedIn ? 'Welcome back, user!' : 'Please log in to continue.'}
      </Text>
      <Grid
        templateColumns={['1fr', 'repeat(2, 1fr)', 'repeat(3, 1fr)']}
        gap={4}
      >
        {['Card 1', 'Card 2', 'Card 3'].map((card) => (
          <Box
            key={card}
            p="6"
            bg={bgColor}
            shadow="md"
            borderRadius="md"
            color={textColor}
          >
            {card}
          </Box>
        ))}
      </Grid>
    </Box>
  );
};

export default Main;
