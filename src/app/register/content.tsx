'use client'

import { Button, Checkbox, Flex, FormControl, FormErrorMessage, FormLabel, Heading, Input, SimpleGrid, RadioGroup, Radio } from "@chakra-ui/react";
import { useRegisterForm } from "./hooks/register-form";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { RegisterFormInput } from "./validation/register-form";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import Navbar from './../components/Navbar';
import Footer from './../components/Footer';
import api from "@/utils/axios";

export default function Content() {

  const form = useForm({
    defaultValues: {
      email: "",
      senha: "",
      nome: "",
      telefone: "",
      endereco: "",
      foto:"",
      cpf:"",
      cardNumber: "",
      cardName: "",
      cardcvc: "",
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
            api.post("register/api", data).then(() => {
              alert("Cadastro realizado com sucesso!");
            });
          })}
          m={10}
           gap={10}
        >

        <Heading>Cadastro</Heading>
          <SimpleGrid w="container.md" columns={2} gap={4}>
            <Flex direction="column" gap={4} align="center">
              <Heading fontSize="xl">Dados do usuário</Heading>
              <Input {...form.register("nome")} placeholder="Nome completo" />
              <Input {...form.register("telefone")} placeholder="Telefone" />
              <Input {...form.register("endereco")} placeholder="Endereço" />
              <Input {...form.register("foto")} placeholder="Url avatar" />
            </Flex>
            <Flex direction="column" gap={4} align="center">
              <Heading fontSize="xl">Dados do cartão</Heading>
              <Input {...form.register("cardName")} placeholder="Nome impresso" />
              <Input {...form.register("cardNumber")} placeholder="Número" />
              <Input {...form.register("cardcvc")} placeholder="CVC" />
              <Input {...form.register("cpf")} placeholder="CPF" />
            </Flex>
          </SimpleGrid>
          
        <Heading fontSize="xl">Dados de acesso</Heading>
          <SimpleGrid w="container.md" columns={2} gap={4}>
              <Input type="email" {...form.register("email")} placeholder="Email" />
              <Input type="password" {...form.register("senha")} placeholder="Senha" />
          </SimpleGrid>
          <Flex justify="center" w="full">
            <Button type="submit" colorScheme="blue">
              Cadastrar
            </Button>
          </Flex>
        </Flex>
        
      <Footer />
      </Flex>

    </>
  )
}