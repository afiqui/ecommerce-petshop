'use client'

import { Button, Checkbox, CheckboxGroup, Divider, Flex, FormControl, FormErrorMessage, FormLabel, Heading, Input, Select, Table, TableCaption, TableContainer, Tbody, Td, Tfoot, Th, Thead, Tr } from "@chakra-ui/react";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { Tasks, User, UserTasks } from "@prisma/client";
import { useParams, useRouter } from "next/navigation";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { UserTasksFormInput } from "./validation/userTask-form";
import { UserFormInput } from "./validation/user-form";

type IUserTasks = User & {
  userTasks: (Pick<UserTasks, "id" | "status" | "endAt"> & {
    tasks: Pick<Tasks, "id">
  })[]
}

export default function Content() {
  const path = useParams() as { id: string }

  const route = useRouter()

  const fetch = useMutation<IUserTasks, any, string>((id: string) => axios.get(`/admin/user/${id}/api`).then(res => res.data))

  const fetchTasks = useMutation<Tasks[], any, string>((id: string) => axios.get(`/admin/user/${id}/api/tasks`).then(res => res.data))

  const execute = useMutation<IUserTasks, any, { id: string, data: UserFormInput }>((data) => axios.post(`/admin/user/${data.id}/api`, data.data).then(res => res.data))

  const userForm = useForm<UserFormInput>({
    defaultValues: {
      fullName: "",
      isAdmin: false,
    },
  });

  const userTaskForm = useForm<UserTasksFormInput>({
    defaultValues: {}
  })

  const userTaskExecute = useMutation<any, any, { id: string, data: UserTasksFormInput }>((data) => axios.post(`/admin/user/${data.id}/api/usertask`, data.data).then(res => res.data))

  useEffect(() => {
    if (path.id) {
      fetch.mutate(path.id)
      fetchTasks.mutate(path.id)
    }
  }, [path.id])

  useEffect(() => {
    if (fetch.data) {
      userForm.setValue("fullName", fetch.data.fullName)
      userForm.setValue("isAdmin", fetch.data.isAdmin)
    }
  }, [fetch.data])

  return (
    <>
      <Flex w="full" maxW="container.md" direction="column" gap={4} as="form" onSubmit={userForm.handleSubmit(data => {
        execute.mutateAsync({ id: path.id, data }).then((response) => {
          fetch.mutate(path.id)
        }).catch((error) => {
          if (error.response.data) Object.entries(error.response.data).forEach(([key, value]) => {
            // @ts-ignore
            userForm.setError(key, { message: value })
          })
        })
      })} >

        <FormControl isInvalid={!!userForm.formState.errors.fullName?.message}>
          <FormLabel>Nome</FormLabel>
          <Input placeholder="Nome" {...userForm.register("fullName")} />
          <FormErrorMessage>{userForm.formState.errors.fullName?.message}</FormErrorMessage>
        </FormControl>
        <FormControl>
          <FormLabel>Email</FormLabel>
          <Input placeholder="Email" disabled value={fetch.data?.email} />
        </FormControl>

        {fetch.data &&
          <FormControl isInvalid={!!userForm.formState.errors.isAdmin?.message}>
            <FormLabel>É um administrador?</FormLabel>
            <CheckboxGroup onChange={(value) => {
              userForm.setValue("isAdmin", value.includes("isAdmin"))
            }} defaultValue={fetch.data?.isAdmin ? ["isAdmin"] : []}>
              <Checkbox value="isAdmin" />
            </CheckboxGroup>
            <FormErrorMessage>{userForm.formState.errors.isAdmin?.message}</FormErrorMessage>
          </FormControl>
        }

        <Button type="submit">Salvar</Button>
      </Flex>
      <TableContainer w="full" maxW="container.md" >
        <Table variant='simple'>
          <Thead>
            <Tr>
              <Th>Tarefa</Th>
              <Th>Status</Th>
              <Th>Finalizar até</Th>
              <Th>Ações</Th>
            </Tr>
          </Thead>
          <Tbody>
            {fetch.data?.userTasks.map((userTask) => {

              const taks = fetchTasks.data?.find(task => task.id === userTask.tasks.id)

              return <Tr key={userTask.id}>
                <Td>{taks?.title}</Td>
                <Td>{userTask.status}</Td>
                <Td>{new Date(userTask.endAt).toLocaleString("pt-BR")}</Td>
                <Td>
                  <Button onClick={() => {
                    axios.delete(`/admin/user/${path.id}/api/usertask/${userTask.id}`).then(() => {
                      fetch.mutate(path.id)
                    })
                  }}>Deletar</Button>
                </Td>
              </Tr>
            })}

          </Tbody>
          <TableCaption>
            <Heading size="md">Adicionar tarefa</Heading>
            <Flex direction="column" gap={4} as="form" p={4} onSubmit={userTaskForm.handleSubmit(data => {
              userTaskExecute.mutateAsync({ id: path.id, data }).then((response) => {
                fetch.mutate(path.id)
              }).catch((error) => {
                if (error.response.data) Object.entries(error.response.data).forEach(([key, value]) => {
                  // @ts-ignore
                  userForm.setError(key, { message: value })
                })
              })
            })}>
              <Flex gap={4}>
                <Select onChange={(event) => {
                  userTaskForm.setValue("tasksId", +event.target.value)
                }} >
                  <option>Selectione uma tarefa</option>
                  {fetchTasks.data?.map((task) => <option key={task.id} value={task.id}>{task.title}</option>)}
                </Select>
                <Input type="date" {...userTaskForm.register("endAt", { valueAsDate: true })} />
              </Flex>
              <Button type="submit">Adicionar</Button>
            </Flex>
          </TableCaption>
        </Table>
      </TableContainer>
    </>
  )
}