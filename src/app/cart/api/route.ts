import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET() {

    return NextResponse.json({});

}

export async function POST(request: Request) {
    const body = await request.json();

    const products = await prisma.product.findMany({
        include: {
            Comment: true
        },
        where: {
            id: {
                in: body
            }
        }
    })

    return NextResponse.json({ products });

}