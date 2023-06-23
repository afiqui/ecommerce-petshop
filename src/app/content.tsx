'use client'

import { Button, Flex, FormControl, FormErrorMessage, FormLabel, Heading, Input, SimpleGrid } from "@chakra-ui/react";
import { useRegisterForm } from "./signin/hooks/register-form";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "next/navigation";
import { SigninFormInput } from "./signin/validation/register-form";

export default function Content() {

  const route = useRouter()

  const form = useRegisterForm()

  const execute = useMutation((data: SigninFormInput) => {
    return axios.post("/signin/api", data)
  })

  return (
    <>
      <Flex flex={1} direction="column" align="center" >

        <Heading w="full" textAlign="center" h={24} bgColor="green" fontSize="6xl" color="white"> Entrar</Heading>

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
            <Button type="submit">Entrar</Button>
          </SimpleGrid>
        </Flex>
      </Flex>
    </>
  )
}