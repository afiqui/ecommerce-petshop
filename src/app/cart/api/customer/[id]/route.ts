import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(request: Request) {
    const url = request.url.split("/")

    const id = url[url.length - 1];
    if (!id) {
        return NextResponse.json({ message: "Usuário não informado" }, { status: 400 });
    }
    try {
        const customer = await prisma.customer.findFirstOrThrow({
            where: {
                id: id,
            },
        })
        return NextResponse.json(customer);
    } catch (error) {
        return NextResponse.json({ message: "Usuário não encontrado" }, { status: 404 });
    }
}

export async function POST(request: Request) {
    return NextResponse.json({}, { status: 400 });
}