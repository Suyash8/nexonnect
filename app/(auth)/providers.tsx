"use client";

import { SessionProvider, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <Validator />
      {children}
    </SessionProvider>
  );
}

function Validator() {
  const { data: session, status } = useSession();
  const router = useRouter();
  useEffect(() => {
    if (status !== "authenticated") {
      router.push("/");
    }
  }, [session, status]);
  return <></>;
}

export default Providers;
