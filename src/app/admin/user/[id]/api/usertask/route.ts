import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { UserTasksFormInput } from "../../validation/userTask-form";
import { reduceErrors } from "@/utils/zod";

const prisma = new PrismaClient();

export async function POST(request: Request) {
  const url = request.url.split("/")
  const userId = Number(url[url.length - 3] || 0);

  const body = await request.json();

  const validated = UserTasksFormInput.safeParse(body);

  if (!validated.success) {
    return NextResponse.json(reduceErrors(validated.error.errors), {
      status: 400,
    });
  }

  await prisma.userTasks.create({
    data: {
      status: "todo",
      endAt: validated.data.endAt,
      tasksId: validated.data.tasksId,
      userId: userId,
    }
  })

  return NextResponse.json({ message: "Tarefa adicionada com sucesso" });
}
