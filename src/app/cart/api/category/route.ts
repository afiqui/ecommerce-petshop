import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(request: Request) {
    const categories = await prisma.category.findMany();
    return NextResponse.json(categories);
}

export async function POST(request: Request) {
    const body = await request.json();
    const category = await prisma.category.create({
        data: body,
    });
    return NextResponse.json(category);
}