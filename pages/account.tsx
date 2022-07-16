import React from "react";
import { signOut, getSession } from "next-auth/react";

export const getServerSideProps = async (ctx) => {
  const session = await getSession(ctx);

  if (!session) {
    console.log("redirecting to login");
    return {
      props: {},
      redirect: {
        destination: "/login",
      },
    };
  } else {
    return {
      props: {
        session,
      },
    };
  }
};

const Account = ({ session }) => {
  return (
    <div>
      <p>Welcome {session?.user?.name}</p>
      <button onClick={() => signOut()}>Logout</button>
    </div>
  );
};

export default Account;
