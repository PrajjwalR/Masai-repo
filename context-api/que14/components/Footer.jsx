import React, { useContext } from 'react';
import { Box, Text } from '@chakra-ui/react';
import { AuthContext } from '../context/AuthContext';
import { ThemeContext } from '../context/ThemeContext';

const Footer = () => {
  const { isLoggedIn } = useContext(AuthContext);
  const { theme } = useContext(ThemeContext);

  return (
    <Box
      as="footer"
      p="4"
      textAlign="center"
      bg={theme === 'light' ? 'gray.300' : 'gray.900'}
      color={theme === 'light' ? 'black' : 'white'}
    >
      <Text>
        {isLoggedIn ? 'Welcome, User' : 'Please log in'}
      </Text>
    </Box>
  );
};

export default Footer;
