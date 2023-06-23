import { useSession } from "@/hooks/session";
import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(request: Request) {
    const orders = await prisma.order.findMany();
    return NextResponse.json(orders);
}

export async function POST(request: Request) {
    const session = await useSession()

    if (session.status == "unauthenticated") {
        return NextResponse.json({ message: "Usuário não autenticado" }, { status: 401 });
    }

    const body = await request.json();
    const order = await prisma.order.create({
        data: body,
    });
    return NextResponse.json(order);
}