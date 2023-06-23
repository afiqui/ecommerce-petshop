import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(request: Request) {

  const users = await prisma.user.findMany()

  console.log({ users })

  return NextResponse.json(users);
}

export async function POST(request: Request) {

  return NextResponse.json({});
}