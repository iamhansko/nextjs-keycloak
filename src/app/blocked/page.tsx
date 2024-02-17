import Link from "next/link";

export default function Blocked() {
  return (
    <main>
      <div>
        <h1>Access Denied</h1>
        <Link href="/">Return to Landing Page</Link>  
      </div>
    </main>
  )
}