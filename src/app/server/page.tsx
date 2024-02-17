// import styles from "./page.module.css";
import { authOptions } from "../api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import type { User } from "next-auth"

export default async function Server() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect('/api/auth/signin?callbackUrl=/server');
  }

  return (
    <main>
      <h1>Hello {(session.user as User)?.name}, This is a Server Component</h1>
    </main>
  );
}
