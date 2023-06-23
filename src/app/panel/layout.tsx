'use client'
import { Flex, Heading } from "@chakra-ui/react"

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  return (
    <Flex flex={1} direction="column" align="center" gap={4} >

      <Heading w="full" textAlign="center" h={24} bgColor="green" fontSize="6xl" color="white">Meu Progresso</Heading>

      {children}
    </Flex>
  )
}
