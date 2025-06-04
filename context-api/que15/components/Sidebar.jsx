import { Box, Text } from '@chakra-ui/react';
import { useAuth } from '../context/AuthContext';
import { useThemeCtx } from '../context/ThemeContext';

export default function Sidebar() {
  const { isLoggedIn } = useAuth();
  const { theme } = useThemeCtx();

  return (
    <Box
      w={{ base: '100%', md: '250px' }}
      bg={theme === 'light' ? 'gray.100' : 'gray.700'}
      p={4}
      display={{ base: 'none', md: 'block' }}
      minH="100vh"
    >
      <Text fontSize="lg" fontWeight="bold">Sidebar</Text>
      {isLoggedIn && <Text mt={4}>Welcome back, user!</Text>}
    </Box>
  );
}