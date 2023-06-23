"use client"
import { Box, Button, Flex, Heading, Input, Text } from '@chakra-ui/react';
import { ChangeEvent, useState } from 'react';
import Navbar from './components/Navbar';
import ProductCard from './components/ProductCard';
import Footer from './components/Footer';
import { Product } from '@prisma/client';

const Home: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const products: Product[] = [
    // Fetch products data from your API
  ];

  const sortedProducts: {[key: string]: Product[]} = {
    // Create sorted products object, with categories as keys and sorted product arrays as values
  };

  return (
    <Flex direction="column" minH="100vh">
      <Navbar />
      <Heading>Título</Heading>
      <Input
        value={searchQuery}
        onChange={(e: ChangeEvent<HTMLInputElement>) => setSearchQuery(e.target.value)}
        placeholder="Pesquisar"
      />

      {/* Insert your sorting controls here. */}
      {/* You might want to create a dedicated component for them. */}
      <Box>
        Filtro por Preço (maior menor), Preço (menor maior) e Nome
      </Box>

      {Object.entries(sortedProducts).map(([category, products]) => (
        <Box key={category}>
          <Heading size="md">{category}</Heading>
          {products.map((product: Product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </Box>
      ))}

      <Footer />
    </Flex>
  );
}

export default Home;