import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(request: Request) {
    const url = request.url.split("/")
    const id = url[url.length - 1];
    if (!id) {
        return NextResponse.json({ message: "Produto não informado" }, { status: 400 });
    }
    try {
        const product = await prisma.product.findFirstOrThrow({
            where: {
                id: id,
            },
        })
        return NextResponse.json(product);
    }
    catch (error) {
        return NextResponse.json({ message: "Produto não encontrado" }, { status: 404 });
    }
}

export async function PUT(request: Request) {
    const url = request.url.split("/")
    const id = url[url.length - 1];
    if (!id) {
        return NextResponse.json({ message: "Produto não informado" }, { status: 400 });
    }
    const body = await request.json();
    try {
        const product = await prisma.product.update({
            where: {
                id: id,
            },
            data: body,
        })
        return NextResponse.json(product);
    }
    catch (error) {
        return NextResponse.json({ message: "Produto não encontrado" }, { status: 404 });
    }
}