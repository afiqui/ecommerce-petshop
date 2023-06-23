import { Button, Flex } from '@chakra-ui/react';

const Navbar: React.FC = () => {
  return (
    <Flex justify="space-between" p={4} shadow="md" bg="white">
      <Button variant="outline">Carrinho</Button>
      <Button variant="outline">Cadastrar</Button>
      <Button variant="outline">Logar</Button>
    </Flex>
  );
}

export default Navbar;