import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function DELETE(request: Request) {
  const url = request.url.split("/")
  const id = Number(url[url.length - 1] || 0);

  await prisma.userTasks.delete({
    where: {
      id
    }
  })

  return NextResponse.json({ message: "Usuário atualizado com sucesso" });
}
