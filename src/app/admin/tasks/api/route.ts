import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(request: Request) {

  const tasks = await prisma.tasks.findMany({
    select: {
      id: true,
      title: true,
      description: true,
      type: true
    }
  })

  return NextResponse.json({ tasks });
}

export async function POST(request: Request) {

  const { title, description } = await request.json();

  const task = await prisma.tasks.create({
    data: {
      title,
      description
    }
  })

  return NextResponse.json(task);
}

export async function PATCH(request: Request) {

  const { id, title, description } = await request.json();

  const task = await prisma.tasks.update({
    data: {
      title,
      description
    },
    where: {
      id
    }
  })

  return NextResponse.json(task);
}