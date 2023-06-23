import { Button, Flex, Link, Badge } from '@chakra-ui/react';
import { useState, useEffect } from 'react'
import { getStorage, delStorage, addStorage } from "../../hooks/storage"

const Navbar: React.FC = () => {
  const [cartCount, setCartCount] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCartCount(getStorage().length)
    }, 100)

    return () => clearInterval(interval)
  }, [])

  return (
    <Flex justify="space-between" p={4} shadow="md" bg="white">
      <Link href="/register"><Button variant="outline">Cadastrar</Button></Link>
      <Link href="/signin"><Button variant="outline">Logar</Button></Link>
      <Link href="/cart"><Button variant="outline">Carrinho <Badge>{cartCount}</Badge></Button></Link>
    </Flex>
  );
}

export default Navbar;