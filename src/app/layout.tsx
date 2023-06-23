import RootProviders from "./providers"
import Layout from "./components/layout"
import { useSession } from "@/hooks/session"

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  const session = await useSession()

  return (
    <html lang="en">
      <body>
        <RootProviders>
          <Layout session={session}>

            {children}

          </Layout >
        </RootProviders>
      </body>
    </html>
  )
}
