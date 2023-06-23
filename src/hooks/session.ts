import { cookies } from "next/headers";
import * as jwt from "jsonwebtoken";
import { PrismaClient, Customer } from "@prisma/client";

const prisma = new PrismaClient();

export type Session = {
  status: "authenticated" | "unauthenticated";
  data?: {
    token: string;
    user: Customer;
  };
};

export const useSession = async (): Promise<Session> => {
  const getAuth = cookies().get("session") as { name: string; value: string };

  if (!getAuth) return { status: "unauthenticated" };

  const token = getAuth.value;

  if (typeof token !== "string") return { status: "unauthenticated" };

  try {
    const decoded = jwt.verify(token, String(process.env.JWT_SECRET)) as {
      id: string;
    };

    const user = await prisma.customer.findFirst({
      where: {
        id: decoded.id,
      },
    });

    if (!user) {
      destroySession();
      throw new Error("User not found");
    }

    return { status: "authenticated", data: { token, user } };
  } catch (e) {
    return { status: "unauthenticated" };
  }
};

export const createSession = (data: { id: string }) => {
  try {
    const token = jwt.sign(data as any, String(process.env.JWT_SECRET), {
      expiresIn: "30d",
    });

    // @ts-ignore
    cookies().set({
      name: "session",
      value: token,
      httpOnly: true,
      path: "/",
    });
  } catch (e) {
    throw new Error("Error creating session");
  }
};

export const destroySession = () => {
  // @ts-ignore
  cookies().set({
    name: "session",
    value: "",
    httpOnly: true,
    path: "/",
  });
};
