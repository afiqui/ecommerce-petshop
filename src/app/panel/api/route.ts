import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { useSession } from "@/hooks/session";

const prisma = new PrismaClient();

export async function GET(request: Request) {

  const session = await useSession()

  if (session.status === "unauthenticated") return NextResponse.json({ message: "Você precisa estar logado" }, { status: 401 })

  const tasks = await prisma.userTasks.findMany({
    select: {
      id: true,
      status: true,
      endAt: true,
      tasks: {
        select: {
          title: true,
          description: true
        }
      }
    },
    orderBy: {
      endAt: 'desc'
    },
    where: {
      userId: session?.data?.user.id
    }
  })

  return NextResponse.json({ tasks });
}

export async function PATCH(request: Request) {

  const session = await useSession()

  if (session.status === "unauthenticated") return NextResponse.json({ message: "Você precisa estar logado" }, { status: 401 })

  const body = await request.json() as { id: number, status: string }

  if (body.id === undefined || body.status === undefined) return NextResponse.json({ message: "Dados inválidos" }, { status: 400 })

  const tasks = await prisma.userTasks.updateMany({
    data: {
      status: body.status
    },
    where: {
      id: body.id,
      userId: session?.data?.user.id
    }
  })

  return NextResponse.json({ message: "Tarefa atualizada!" });
}

