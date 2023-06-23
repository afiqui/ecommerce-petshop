import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET() {

    const products = await prisma.product.findMany({
        include: {
        Comment:true
        }
    })
    const categories = await prisma.category.findMany()

    return NextResponse.json({products, categories});

}

export async function POST(request: Request) {
    return NextResponse.json({});
}
