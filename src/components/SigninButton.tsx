"use client";

import { signIn, signOut } from "next-auth/react";

const keycloakSignin = async () => {
  try {
    await signIn("keycloak")
  } catch (error) {
    console.error(error);
  }
}

const keycloakSignout = async () => {
  try {
    await fetch('/api/auth/keycloak/signout', { method: "GET" });
    await signOut({ callbackUrl: "/" });
  } catch (error) {
    console.error(error);
  }
}

export default function SigninButton() {
  return (
    <>
      <li><button onClick={keycloakSignin}>Sign In</button></li>
      <li><button onClick={keycloakSignout}>Sign Out</button></li>
    </>
  )
}