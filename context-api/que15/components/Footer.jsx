import { Box, Text } from '@chakra-ui/react';
import { useThemeCtx } from '../context/ThemeContext';

export default function Footer() {
  const { theme } = useThemeCtx();

  return (
    <Box bg={theme === 'light' ? 'gray.300' : 'gray.800'} p={4} textAlign="center">
      <Text>© 2025 Your Dashboard. All rights reserved.</Text>
    </Box>
  );
}