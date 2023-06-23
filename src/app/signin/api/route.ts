import { NextResponse } from "next/server";
import { SigninFormInput } from "../validation/register-form";
import { reduceErrors } from "@/utils/zod";
import { PrismaClient } from "@prisma/client";
import { createSession } from "@/hooks/session";

const prisma = new PrismaClient();

export async function POST(request: Request) {
  const body = await request.json();

  const user = await prisma.customer.findFirst({
    where: {
      email: body.email,
    },
  });

  if (!user) {
    return NextResponse.json({ email: "Conta inválida" }, { status: 400 });
  }

  if (user.password !== body.senha) {
    return NextResponse.json({ password: "Senha incorreta" }, { status: 400 });
  }

  createSession({ id: user.id });

  return NextResponse.json({ message: "Logado com sucesso" });
}
