import { Metadata } from "next";
import Content from "./content";
import { useSession } from "@/hooks/session";
import { redirect } from "next/navigation";

export default async function Home() {

  const session = await useSession()

  if (session.status == "authenticated") {
    redirect("/panel")
  }

  return (
    <Content />
  )
}

export const metadata: Metadata = {
  title: "Cadastro"
}