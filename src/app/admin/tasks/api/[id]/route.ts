import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function DELETE(request: Request) {

  const url = request.url.split("/")

  const id = Number(url[url.length - 1] || 0);

  const task = await prisma.tasks.delete({
    where: {
      id
    }
  })

  return NextResponse.json(task);
}