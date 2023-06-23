import { NextResponse } from "next/server";
import { RegisterFormInput } from "../validation/register-form";
import { reduceErrors } from "@/utils/zod";
import { PrismaClient } from "@prisma/client";
import { createSession } from "@/hooks/session";

const prisma = new PrismaClient();

export async function POST(request: Request) {
  const body = await request.json();

  const validated = RegisterFormInput.safeParse(body);


    if (!validated.success) {
      return NextResponse.json(reduceErrors(validated.error.errors), {
        status: 400,
      });
    }

    const user = await prisma.customer.findFirst({
      where: {
        email: validated.data.email,
      },
    });

    if (user) {
      return NextResponse.json({ email: "Email já cadastrado" }, { status: 400 });
    }

    const createdUser = await prisma.customer.create({
      data: {
        fullName: validated.data.fullName,
        email: validated.data.email,
        password: validated.data.password,
        profilePicture: validated.data.profilePicture,
        address: validated.data.address,
        phone: validated.data.phone,
        cpf: validated.data.cpf,
        creditCardNumber: validated.data.creditCardNumber,
        creditCardName: validated.data.creditCardName,
        creditCardCVC: validated.data.creditCardCVC,
        
      },
    });

    createSession({ id: createdUser.id });

    return NextResponse.json({ message: "Usuário criado com sucesso" });
  }
