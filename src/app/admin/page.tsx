import { Metadata } from "next";
import { redirect } from "next/navigation"

export default async function Home() {

  redirect("/admin/user")
}

export const metadata: Metadata = {
  title: "Administração"
}