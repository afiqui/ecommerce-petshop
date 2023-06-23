"use client"
import { NextPage } from "next"
import { Box, Button, Flex, Heading, Input, Text, Select, SimpleGrid, Divider, Image, Link, Spinner } from '@chakra-ui/react';
import { ChangeEvent, useState, useEffect } from 'react';
import Navbar from './../../components/Navbar';
import ProductCard from './../../components/ProductCard';
import Footer from './../../components/Footer';
import { Category, Product, Comment } from '@prisma/client';
import { useForm } from 'react-hook-form';

type Products = (Product & { Comment: Comment[], Category:Category })

export const HomeContent: NextPage<{ product: Products }> = ({ product }) => {

  return (
    <Flex direction="column" minH="100vh">
      <Navbar />

      <Flex mt={10} w="full" justify="center">
        <SimpleGrid w="container.xl" columns={2}>
          <Flex flex={1} justify="center">
            <Image
              h={400}
              src={product.image||""}
            />
          </Flex>
          <Flex direction="column" flex={2}>
            <Heading>{product.name}</Heading>

            <Text>{product.description}</Text>
            <Text>{product.Category.name}</Text>
            <Text>Nota: {product.Comment.reduce((lista, value) => {
                return (lista || 0) + value.rating
              }, 0)}</Text>
              

            <a href={`/cart/${product.id}`}>
              <Button colorScheme="blue">
                Adicionar ao Carrinho
              </Button>
            </a>

          </Flex>
        </SimpleGrid>
      </Flex>

      <Footer />
    </Flex>
  );
}