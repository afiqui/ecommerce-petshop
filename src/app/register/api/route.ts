import { NextResponse } from "next/server";
import { RegisterFormInput } from "../validation/register-form";
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

    if (user) {
      return NextResponse.json({ email: "Email já cadastrado" }, { status: 400 });
    }

    const createdUser = await prisma.customer.create({
      data: {
        fullName: body.nome,
        email: body.email,
        password: body.senha,
        profilePicture: body.foto ?? "",
        address: body.endereco,
        phone: body.telefone,
        cpf: body.cpf,
        creditCardNumber: body.cardNumber,
        creditCardName: body.cardName,
        creditCardCVC: body.cardcvc,
        
      },
    });

    createSession({ id: createdUser.id });

    return NextResponse.json({ message: "Usuário criado com sucesso" });
  }
