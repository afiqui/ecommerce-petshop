import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { UserFormInput } from "../validation/user-form";
import { reduceErrors } from "@/utils/zod";

const prisma = new PrismaClient();

export async function GET(request: Request) {

  const url = request.url.split("/")

  const id = Number(url[url.length - 2] || 0);

  const user = await prisma.user.findFirst({
    select: {
      id: true,
      email: true,
      fullName: true,
      isAdmin: true,
      createdAt: true,
      userTasks: {
        select: {
          id: true,
          status: true,
          endAt: true,
          tasks: {
            select: {
              id: true,
            }
          }
        },
        orderBy: {
          createdAt: "desc"
        }
      }
    },
    where: {
      id
    }
  })

  return NextResponse.json(user);
}

export async function POST(request: Request) {
  const url = request.url.split("/")
  const id = Number(url[url.length - 2] || 0);

  const body = await request.json();

  const validated = UserFormInput.safeParse(body);

  if (!validated.success) {
    return NextResponse.json(reduceErrors(validated.error.errors), {
      status: 400,
    });
  }

  const user = await prisma.user.update({
    data: {
      fullName: validated.data.fullName,
      isAdmin: validated.data.isAdmin,
    },
    where: {
      id
    }
  })

  return NextResponse.json({ message: "Usuário atualizado com sucesso" });
}