'use client'

import { Button, Checkbox, Flex, FormControl, FormErrorMessage, FormLabel, Heading, Input, SimpleGrid } from "@chakra-ui/react";
import { useRegisterForm } from "./hooks/register-form";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { RegisterFormInput } from "./validation/register-form";
import { useRouter } from "next/navigation";

export default function Content() {

  const route = useRouter()

  const form = useRegisterForm()

  const execute = useMutation((data: RegisterFormInput) => {
    return axios.post("/register/api", data)
  })

  return (
    <>
      <Flex flex={1} direction="column" align="center" >

        <Heading w="full" textAlign="center" h={24} bgColor="green" fontSize="6xl" color="white"> Registro</Heading>

        <Flex flex={1} align="center" justify="center" p={10} as="form" onSubmit={form.handleSubmit(data => {
          execute.mutateAsync(data).then((response) => {
            route.replace("/")
            route.refresh()
          }).catch((error) => {
            if (error.response.data) Object.entries(error.response.data).forEach(([key, value]) => {
              // @ts-ignore
              form.setError(key, { message: value })
            })
          })
        })}>

          <SimpleGrid gap={4}>
            <FormControl isInvalid={!!form.formState.errors.fullName?.message}>
              <FormLabel>Nome Completo</FormLabel>
              <Input placeholder="Nome Completo" {...form.register("fullName")} />
              <FormErrorMessage>{form.formState.errors.fullName?.message}</FormErrorMessage>
            </FormControl>
            <FormControl isInvalid={!!form.formState.errors.email?.message}>
              <FormLabel>Email</FormLabel>
              <Input placeholder="Email"  {...form.register("email")} />
              <FormErrorMessage>{form.formState.errors.email?.message}</FormErrorMessage>
            </FormControl>
            <FormControl isInvalid={!!form.formState.errors.password?.message}>
              <FormLabel>Senha</FormLabel>
              <Input type="password" placeholder="Senha"  {...form.register("password")} />
              <FormErrorMessage>{form.formState.errors.password?.message}</FormErrorMessage>
            </FormControl>
            <FormControl isInvalid={!!form.formState.errors.confirmPassword?.message}>
              <FormLabel>Confirmar Senha</FormLabel>
              <Input type="password" placeholder="Confirmar Senha" {...form.register("confirmPassword")} />
              <FormErrorMessage>{form.formState.errors.confirmPassword?.message}</FormErrorMessage>
            </FormControl>
            <FormControl isInvalid={!!form.formState.errors.acceptTerms?.message}>
              <FormLabel>Li e aceito os termos.</FormLabel>
              <Checkbox {...form.register("acceptTerms")} />
              <FormErrorMessage>{form.formState.errors.acceptTerms?.message}</FormErrorMessage>
            </FormControl>
            <Button type="submit">Cadastrar</Button>
          </SimpleGrid>
        </Flex>
      </Flex>
    </>
  )
}