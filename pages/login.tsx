import React from "react";
import { useSession, signIn, signOut } from "next-auth/react";

const Login = () => {
  const { data: session } = useSession();
  if (session) {
    return (
      <>
        <p>welcome {session?.user?.email}</p>
        <button onClick={() => signOut()}>Logout</button>
      </>
    );
  } else {
    return (
      <>
        <p>you are not logged in</p>
        <button onClick={() => signIn()}>Login</button>
      </>
    );
  }
};

export default Login;
