import { Button, Flex, Link } from '@chakra-ui/react';

const Navbar: React.FC = () => {
  return (
    <Flex justify="space-between" p={4} shadow="md" bg="white">
      <Link href="/cart"><Button variant="outline">Carrinho</Button></Link>
      <Link href="/register"><Button variant="outline">Cadastrar</Button></Link>
      <Link href="/signin"><Button variant="outline">Logar</Button></Link>
    </Flex>
  );
}

export default Navbar;