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
          <Link href="/"><Heading fontSize="3xl" textAlign="center">PET SHOP</Heading></Link>
        </SimpleGrid>

        <Flex direction="column" w="full" bgColor="white" border="1px">
          {children}
        </Flex>
      </Flex>
    </Flex>
  )
}
