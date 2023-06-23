'use client'

import { Button, Flex, Heading, Input, Table, TableCaption, TableContainer, Tbody, Td, Textarea, Th, Thead, Tr } from "@chakra-ui/react";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { Tasks } from "@prisma/client";
import { useEffect } from "react";
import { useFieldArray, useForm } from "react-hook-form";

type IUserTasks = { tasks: Pick<Tasks, "id" | "title" | "description">[] }

export default function Content() {

  const fetchTask = useMutation<IUserTasks>(() => fetch(`/admin/tasks/api`).then(res => res.json()))

  const executeCreateTask = useMutation<any, any, Pick<Tasks, "title" | "description">>((data) => axios.post(`/admin/tasks/api`, data).then(res => res.data))

  const executeUpdateTask = useMutation<any, any, Pick<Tasks, "id" | "title" | "description">>((data) => axios.patch(`/admin/tasks/api`, data).then(res => res.data))

  const executeDeleteTask = useMutation<any, any, Pick<Tasks, "id">>((data) => axios.delete(`/admin/tasks/api/${data.id}`).then(res => res.data))

  const taskForm = useForm<Tasks>({
    defaultValues: {}
  })

  const tasksForm = useForm<IUserTasks>({
    defaultValues: {
      tasks: []
    }
  })

  const tasksFetchArray = useFieldArray({
    name: "tasks",
    keyName: "customId",
    control: tasksForm.control
  })

  useEffect(() => {
    fetchTask.mutate()
  }, [])

  useEffect(() => {
    if (fetchTask.data) {
      tasksForm.reset()
      fetchTask.data?.tasks.forEach((task) => {
        tasksFetchArray.append(task)
      })
    }
  }, [fetchTask.data])

  return (
    <>
      <TableContainer w="full" maxW="container.md" >
        <Table variant='simple'>
          <Thead>
            <Tr>
              <Th>Nome</Th>
              <Th>Descrição</Th>
              <Th>Ações</Th>
            </Tr>
          </Thead>
          <Tbody>
            {tasksFetchArray.fields?.map((task, taskIndex) => {
              return <Tr key={task.customId}>
                <Td><Input {...tasksForm.register(`tasks.${taskIndex}.title`)} /> </Td>
                <Td>
                  <Textarea
                    {...tasksForm.register(`tasks.${taskIndex}.description`)}
                  />
                </Td>
                <Td>
                  <Flex gap={2}>
                    <Button size="sm" colorScheme="green" onClick={() => {
                      const data = tasksForm.getValues().tasks.find(v => v.id == task.id)

                      if (data) executeUpdateTask.mutateAsync(data).then(() => {
                        fetchTask.mutate()
                      })
                    }}>Salvar</Button>
                    <Button size="sm" colorScheme="red" onClick={() => {
                      executeDeleteTask.mutateAsync({ id: task.id }).then(() => {
                        fetchTask.mutate()
                      })
                    }}>Deletar</Button>
                  </Flex>
                </Td>
              </Tr>
            })}

          </Tbody>
          <TableCaption>
            <Heading size="md">Adicionar tarefa</Heading>
            <Flex direction="column" gap={4} p={4} as="form" onSubmit={taskForm.handleSubmit(data => {
              executeCreateTask.mutateAsync(data).then((data) => {
                tasksFetchArray.append(data)
              })

              taskForm.reset()
            })}>
              <Flex gap={4}>
                <Input placeholder="Nome" {...taskForm.register(`title`)} />
                <Textarea placeholder="Descrição" {...taskForm.register(`description`)} />
              </Flex>
              <Button type="submit">Adicionar</Button>
            </Flex>
          </TableCaption>
        </Table>
      </TableContainer>
    </>
  )
}