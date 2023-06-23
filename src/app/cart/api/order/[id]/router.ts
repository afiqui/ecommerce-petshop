import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(request: Request) {
    const url = request.url.split("/")

    const customerId = url[url.length - 1];
    if (!customerId) {
        return NextResponse.json({ message: "Cliente não informado" }, { status: 400 });
    }
    try {
        const client = await prisma.customer.findFirstOrThrow({
            where: {
                id: customerId,
            },
        })
        const orders = await prisma.order.findMany({
            where: {
                customerId: client.id
            }
        })
        return NextResponse.json(orders);
    }
    catch (error) {
        return NextResponse.json({ message: "Cliente não encontrado" }, { status: 404 });
    }
}