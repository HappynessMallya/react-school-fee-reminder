// src/components/SessionProviderWrapper.tsx
"use client"; // Make sure this is a client component

import { getSession, SessionProvider } from "next-auth/react";
export function getServerSideProps(context: any) {
  const session = getSession(context);
  return {
    props: {
      session,
    },
  };
}
const SessionProviderWrapper = ({ children }) => {
  return <SessionProvider>{children}</SessionProvider>;
};

export default SessionProviderWrapper;
