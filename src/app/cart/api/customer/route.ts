import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(request: Request) {
    const customers = await prisma.customer.findMany();
    return NextResponse.json(customers); 
}

export async function POST(request: Request) {
    return NextResponse.json({}, { status: 400 });
}