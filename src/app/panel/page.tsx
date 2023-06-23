import { Metadata } from "next";
import Content from "./content";

export default function Home() {

  return (
    <Content />
  )
}

export const metadata: Metadata = {
  title: "Painel"
}