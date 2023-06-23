"use client"
import { NextPage } from "next"
import { Box, Button, Flex, Heading, Input, Text, Select, SimpleGrid, Divider, Image, Link } from '@chakra-ui/react';
import { ChangeEvent, useState, useEffect } from 'react';
import Navbar from './../components/Navbar';
import ProductCard from './../components/ProductCard';
import Footer from './../components/Footer';
import { Category, Product, Comment } from '@prisma/client';
import { useForm } from 'react-hook-form';

type Products = (Product & { Comment: Comment[] })[]

export const HomeContent: NextPage<{ products: Products, categories: Category[] }> = ({ products, categories }) => {
  

  const [lista, setLista] = useState<Products>([]);

  const form = useForm({
    defaultValues: {
      search: "",
      orderBy: "name", // nome, price_asc, price_desc
    },
  });

  const search = form.watch("search");
  const orderBy = form.watch("orderBy");

  useEffect(() => {
    setLista(
      products
        .filter(
          (v) =>
            !search.length ||
            v.name.toLowerCase().includes(search.toLowerCase())
        )
        .sort((a, b) => {
          if (orderBy === "price_asc") return a.price - b.price;
          if (orderBy === "price_desc") return b.price - a.price;
          return a.name.localeCompare(b.name);
        })
    );
  }, [search, orderBy]);

  return (
    <Flex direction="column" minH="100vh">
      <Navbar />

      <Heading m={10}>Título</Heading>

      <Flex
        gap={4}
        my={4}
        p={4}
        border="1px"
        borderColor="blackAlpha.400"
        w="full"
      >
        <Flex flex={3}>
          <Input placeholder="Pesquisar" {...form.register("search")} />
        </Flex>
        <Flex flex={1}>
          <Select placeholder="Ordenar por"  {...form.register("orderBy")}>
            <option value="price_asc">Menor preço</option>
            <option value="price_desc">Maior preço</option>
            <option value="name">Nome</option>
          </Select>
        </Flex>
      </Flex>

      {categories.map((category) => <Flex key={category.id} direction="column" gap={4} p={4}>
        <Heading>{category.name}</Heading>
        <SimpleGrid columns={5}>
          {lista.filter(v => v.categoryId === category.id).map(product => <Link key={product.id} href={`/product/${product.id}`}>
            <Flex direction="column" gap={2} align="center" justify="center">
              <Heading size="md">{product.name}</Heading>
              <Image src={product.image || ""} />
              <Text>Nota: {product.Comment.reduce((lista, value) => {
                return (lista || 0) + value.rating
              }, 0)}</Text>
              <Text>R$ {product.price.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}</Text>
            </Flex>
          </Link>)}
        </SimpleGrid>
        <Divider h={2} borderTop={1} borderColor="black" />
      </Flex>)}

      <Footer />
    </Flex>
  );
}