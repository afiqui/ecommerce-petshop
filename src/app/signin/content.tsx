'use client'

import { Button, Checkbox, Flex, FormControl, FormErrorMessage, FormLabel, Heading, Input, SimpleGrid, RadioGroup, Radio } from "@chakra-ui/react";
import { useRegisterForm } from "./hooks/register-form";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import Navbar from './../components/Navbar';
import Footer from './../components/Footer';
import api from "@/utils/axios";

export default function Content() {

  const form = useForm({
    defaultValues: {
      email: "",
      senha: ""
    },
  });

  return (
    <>
      <Flex direction="column" minH="100vh">
        <Navbar />

        <Flex
          w="full"
          align="center"
          direction="column"
          as="form"
          onSubmit={form.handleSubmit((data) => {
            api.post("signin/api", data).then(() => {
              alert("Logado com sucesso!");
            });
          })}
          m={10}
          gap={10}
        >

          <Heading fontSize="xl">Login</Heading>
          <SimpleGrid w="container.md" columns={2} gap={4}>
            <Input type="email" {...form.register("email")} placeholder="Email" />
            <Input type="password" {...form.register("senha")} placeholder="Senha" />
          </SimpleGrid>
          <Flex justify="center" w="full">
            <Button type="submit" colorScheme="blue">
              Entrar
            </Button>
          </Flex>
        </Flex>
        
        <Footer />
      </Flex>

    </>
  )
}