import { Box, Image, Text } from '@chakra-ui/react';
import { Product } from "@prisma/client";

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <Box border="1px" borderColor="gray.200" p={4} rounded="md">
      <Image src={product.image ?? ""} alt={product.name} />
      <Text>{product.name}</Text>
      <Text>{product.description}</Text>
      <Text>Nota: {product.rating}</Text>
    </Box>
  );
}

export default ProductCard;
