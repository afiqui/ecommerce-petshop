'use client'

import { Session } from "@/hooks/session"
import { Flex, SimpleGrid, Heading, Button, Spacer, Text } from "@chakra-ui/react"
import axios from "axios"
import Link from "next/link"
import { useRouter } from "next/navigation"

const url = [
  { name: "Início", url: "/" },
  // { name: "Quem Somos", url: "/about" },
  // { name: "Serviços", url: "/services" },
  // { name: "Doações", url: "/donates" },
  // { name: "Contato", url: "/resources" },
]

export default function Layout({
  children,
  session
}: {
  children: React.ReactNode,
  session: Session
}) {

  const route = useRouter()

  return (
    <Flex flex={1} bgColor="white" color="gray.800" justify="center" h="fit-content">
      <Flex direction="column" w="full" maxW="container.xl" px={{ base: 8, xl: 0 }}>

        <SimpleGrid h={16} w="full" alignContent="center" columns={3}>
          <Flex></Flex>
          <Heading fontSize="3xl" textAlign="center">CRENVI</Heading>
          <Flex justify="right" gap={4}>
            {session.status === "unauthenticated" &&
              <>
                <Link href="/">
                  <Button colorScheme="blackAlpha">Entrar</Button>
                </Link>
                <Link href="/register">
                  <Button colorScheme="blackAlpha">Registrar</Button>
                </Link>
              </>
            }

            {session.status === "authenticated" && <Flex direction="column" gap={2}>
              <Text>{session.data?.user.fullName}</Text>
              <Button size="xs" colorScheme="blackAlpha" onClick={() => {
                axios.get("/api/logout").then(() => {
                  route.replace("/")
                  route.refresh()
                })
              }}>Sair</Button>
            </Flex>}
          </Flex>
        </SimpleGrid>

        <Spacer h={1} borderTop="1px" borderColor="white" w="full" />

        <Flex h={12} w="full" justify="space-between" align="center">
          {url.map((item, index) => (<Flex key={index}>
            <Link href={item.url}>{item.name}</Link>
          </Flex>))}
        </Flex>

        <Flex direction="column" w="full" bgColor="white" border="1px">
          {children}
        </Flex>
      </Flex>
    </Flex>
  )
}
