import { NextResponse } from "next/server";
import { SigninFormInput } from "../validation/register-form";
import { reduceErrors } from "@/utils/zod";
import { PrismaClient } from "@prisma/client";
import { createSession } from "@/hooks/session";

const prisma = new PrismaClient();

export async function POST(request: Request) {
  const body = await request.json();

  const validated = SigninFormInput.safeParse(body);

  if (!validated.success) {
    return NextResponse.json(reduceErrors(validated.error.errors), {
      status: 400,
    });
  }

  const user = await prisma.user.findFirst({
    where: {
      email: validated.data.email,
    },
  });

  if (!user) {
    return NextResponse.json({ email: "Conta inválida" }, { status: 400 });
  }

  if (user.password !== validated.data.password) {
    return NextResponse.json({ password: "Senha incorreta" }, { status: 400 });
  }

  createSession({ id: user.id });

  return NextResponse.json({ message: "Logado com sucesso" });
}
