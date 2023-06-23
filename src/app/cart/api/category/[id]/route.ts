import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(request: Request) {
    const url = request.url.split("/")
    const id = url[url.length - 1];
    if (!id) {
        return NextResponse.json({ message: "Categoria não informada" }, { status: 400 });
    }
    try {
        const category = await prisma.category.findFirstOrThrow({
            where: {
                id: id,
            },
        })
        return NextResponse.json(category);
    }
    catch (error) {
        return NextResponse.json({ message: "Categoria não encontrada" }, { status: 404 });
    }
}

export async function PUT(request: Request) {
    const url = request.url.split("/")
    const id = url[url.length - 1];
    if (!id) {
        return NextResponse.json({ message: "Categoria não informada" }, { status: 400 });
    }
    const body = await request.json();
    try {
        const category = await prisma.category.update({
            where: {
                id: id,
            },
            data: body,
        })
        return NextResponse.json(category);
    }
    catch (error) {
        return NextResponse.json({ message: "Categoria não encontrada" }, { status: 404 });
    }
}