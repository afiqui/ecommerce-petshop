import { NextPage } from "next"
import { Box, Button, Flex, Heading, Input, Text, Select } from '@chakra-ui/react';
import { ChangeEvent, useState, useEffect } from 'react';
import Navbar from './../../components/Navbar';
import ProductCard from './../../components/ProductCard';
import Footer from './../../components/Footer';
import { PrismaClient, Product } from '@prisma/client';
import { useForm } from 'react-hook-form';
import { HomeContent } from "./content";
import api from "@/utils/axios";
import { useSession } from "@/hooks/session";

const prisma = new PrismaClient();

const Home = async () => {

  const session = await useSession();

  return (
    <HomeContent session={session} />
  )
}

export default Home;