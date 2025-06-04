import { Box, Grid, GridItem } from '@chakra-ui/react';
import { useThemeCtx } from '../context/ThemeContext';

export default function MainContent() {
  const { theme } = useThemeCtx();

  const products = ['Product 1', 'Product 2', 'Product 3', 'Product 4', 'Product 5'];

  return (
    <Box flex="1" p={4} bg={theme === 'light' ? 'white' : 'gray.900'}>
      <Grid templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)', lg: 'repeat(3, 1fr)' }} gap={6}>
        {products.map((product, idx) => (
          <GridItem
            key={idx}
            p={6}
            bg={theme === 'light' ? 'gray.200' : 'gray.600'}
            borderRadius="md"
            shadow="md"
          >
            {product}
          </GridItem>
        ))}
      </Grid>
    </Box>
  );
}
