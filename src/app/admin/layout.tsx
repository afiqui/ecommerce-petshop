'use client'
import { Link } from "@chakra-ui/next-js"
import { Button, Flex, Heading } from "@chakra-ui/react"
import { usePathname } from "next/navigation"

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  const pathname = usePathname()

  return (
    <Flex flex={1} direction="column" align="center" gap={4} >

      <Heading w="full" textAlign="center" h={24} bgColor="green" fontSize="6xl" color="white">Administração</Heading>

      <Flex gap={4}>
        <Link href="/admin/user">
          <Button colorScheme={pathname.startsWith("/admin/user") ? "red" : "blackAlpha"}>Pacientes</Button>
        </Link>
        <Link href="/admin/tasks">
          <Button colorScheme={pathname.startsWith("/admin/tasks") ? "red" : "blackAlpha"}>Tarefas</Button>
        </Link>
      </Flex>

      {children}
    </Flex>
  )
}
