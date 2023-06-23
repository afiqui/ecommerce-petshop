'use client'

import { Button, Table, TableCaption, TableContainer, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react";
import { useMutation, } from "@tanstack/react-query";
import axios from "axios";
import { Link } from "@chakra-ui/next-js";
import { User } from "@prisma/client";
import { useEffect } from "react";

export default function Content() {

  const fetchUser = useMutation<User[]>(() => fetch("/admin/user/api", { cache: 'no-store' }).then(res => res.json()))


  useEffect(() => {
    fetchUser.mutate()
  }, [])

  return (

    <TableContainer>
      <Table variant='simple'>
        <TableCaption>Lista de pacientes</TableCaption>
        <Thead>
          <Tr>
            <Th>Email</Th>
            <Th>Nome</Th>
            <Th>Administrador?</Th>
            <Th>Ações</Th>
          </Tr>
        </Thead>
        <Tbody>
          {fetchUser.data?.map((user) => <Tr key={user.id}>
            <Td>{user.email}</Td>
            <Td>{user.fullName}</Td>
            <Td>{user.isAdmin ? "Sim" : "Não"}</Td>
            <Td>
              <Link href={`/admin/user/${user.id}`}>
                <Button>Editar</Button>
              </Link>
            </Td>
          </Tr>)}

        </Tbody>
      </Table>
    </TableContainer>
  )
}