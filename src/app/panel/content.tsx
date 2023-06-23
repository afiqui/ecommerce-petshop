'use client'

import { Button, Flex, Table, TableContainer, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Tasks, UserTasks } from "@prisma/client";
import { useEffect, useState } from "react";

type IUserTask = {
  tasks: (Pick<UserTasks, "id" | "status" | "endAt"> & {
    tasks: Pick<Tasks, "id" | "title" | "description">
  })[]
}

export default function Content() {

  const [taskList, setTaskList] = useState<IUserTask["tasks"]>([])

  const fetchTask = useMutation<IUserTask>(() => fetch(`/panel/api`, { cache: 'no-store' }).then(res => res.json()))

  const executeUpdateTask = useMutation<any, any, Pick<UserTasks, "id" | "status">>((data) => axios.patch(`/panel/api`, data).then(res => res.data))

  useEffect(() => {
    if (fetchTask.data) {
      const waiting = fetchTask.data.tasks.filter((task) => task.status === "todo" && new Date(task.endAt) > new Date())
      const others = fetchTask.data.tasks.filter((task) => task.status !== "todo" || new Date(task.endAt) < new Date())

      setTaskList([...waiting, ...others])
    }
  }, [fetchTask.data])


  useEffect(() => {
    fetchTask.mutate()
  }, [])

  return (
    <>
      <TableContainer w="full" maxW="container.md" >
        <Table variant='simple'>
          <Thead>
            <Tr>
              <Th>Nome</Th>
              <Th>Situação</Th>
              <Th>Expira em</Th>
              <Th>Ações</Th>
            </Tr>
          </Thead>
          <Tbody>
            {taskList.map((task, taskIndex) => {

              const expirado = (new Date(task.endAt) < new Date())

              return <Tr key={task.id}>
                <Td>{task.tasks.title}</Td>
                <Td>
                  {task.status === "done"
                    ? "Concluído"
                    : expirado
                      ? "Não realizado"
                      : "Em andamento"}
                </Td>
                <Td>{new Date(task.endAt).toLocaleString("pt-BR")}</Td>
                <Td>
                  <Flex gap={2}>
                    {!expirado &&
                      <Button size="sm" colorScheme={task.status == "done" ? "red" : "green"} onClick={() => {

                        executeUpdateTask.mutateAsync({ id: task.id, status: task.status == "done" ? "todo" : "done" }).then(() => {
                          fetchTask.mutate()
                        })
                      }}>{task.status == "done" ? "Marcar como não concluido" : "Marcar como concluido"}</Button>
                    }
                  </Flex>
                </Td>
              </Tr>
            })}

          </Tbody>
        </Table>
      </TableContainer>
    </>
  )
}