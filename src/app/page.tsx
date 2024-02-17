// import styles from "./page.module.css";
import { authOptions } from "./api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth";

export default async function Home() {
  const session = await getServerSession(authOptions);

  return (
    <main>
      <h1>This is a Landing Page</h1>
      {session ? (
        <h3> After Sign-In</h3>
      ) : (
        <h3> Before Sign-In</h3>
      )}
    </main>
  );
}
