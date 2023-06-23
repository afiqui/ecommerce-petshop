"use client"
import { NextPage } from "next"
import { Box, Button, Flex, Heading, Input, Text, Select, SimpleGrid, Divider, Image, Link } from '@chakra-ui/react';
import { ChangeEvent, useState, useEffect } from 'react';
import Navbar from './../../components/Navbar';
import ProductCard from './../../components/ProductCard';
import Footer from './../../components/Footer';
import { Category, Product, Comment } from '@prisma/client';
import { useForm } from 'react-hook-form';
import api from "@/utils/axios";
import { getStorage, delStorage, addStorage,setStorage } from "../../../hooks/storage"
import { Session } from "@/hooks/session";

export const HomeContent: NextPage<{ session: Session }> = ({ session }) => {

  const [lista, setLista] = useState<Product[]>([]);

  useEffect(() => {
    setLista(getStorage())
  }, [])


  return (
    <Flex direction="column" minH="100vh">
      <Navbar />

      <Heading m={10}>Carrinho</Heading>

      <SimpleGrid columns={5} p={10}>
        {lista.map(product => <Flex key={product.id} direction="column" gap={2} align="center" justify="center">
          <Heading size="md">{product.name}</Heading>
          <Image src={product.image || ""} />
          <Text>R$ {product.price.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}</Text>
        </Flex>)}
      </SimpleGrid>

      <Flex w="full" justify="center">
        {session.status === "authenticated" ? <Link href="/checkout"><Button onClick={()=>{
          // setStorage([])
        }}>Finalizar Compra</Button></Link> : <Link href="/signin"><Button>É necessário estar logado pra finalizar a compra.</Button></Link>}
      </Flex>

      <Footer />
    </Flex>
  );
}