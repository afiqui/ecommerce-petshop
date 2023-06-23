import { NextPage } from "next"
import { Box, Button, Flex, Heading, Input, Text, Select } from '@chakra-ui/react';
import { ChangeEvent, useState, useEffect } from 'react';
import Navbar from './../../components/Navbar';
import ProductCard from './../../components/ProductCard';
import Footer from './../../components/Footer';
import { PrismaClient, Product } from '@prisma/client';
import { useForm } from 'react-hook-form';
import { HomeContent } from "./content";
import { usePathname, redirect } from "next/navigation"

const prisma = new PrismaClient();

const Home = async ({ params }: { params: { id: string } }) => {

  try {
    const product = await prisma.product.findFirstOrThrow({
      include:{
        Comment:true,
        Category:true
      },
      where: {
        id: params.id
      }
    })
    
    return (
      <HomeContent product={product as any} />
    )

  } catch (e) {
    redirect("/");
  }
  
}

export default Home;