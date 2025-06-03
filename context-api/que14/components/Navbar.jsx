import React, { useContext } from 'react';
import { Flex, Button } from '@chakra-ui/react';
import { AuthContext } from '../context/AuthContext';
import { ThemeContext } from '../context/ThemeContext';

const Navbar = () => {
  const { isLoggedIn, toggleAuth } = useContext(AuthContext);
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <Flex
      as="nav"
      p="4"
      bg={theme === 'light' ? 'gray.100' : 'gray.700'}
      justifyContent="space-between"
      alignItems="center"
    >
      <Button onClick={toggleAuth}>
        {isLoggedIn ? 'Log Out' : 'Log In'}
      </Button>
      <Button onClick={toggleTheme}>
        Toggle to {theme === 'light' ? 'Dark' : 'Light'} Theme
      </Button>
    </Flex>
  );
};

export default Navbar;
