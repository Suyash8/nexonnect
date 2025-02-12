"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function SignedInPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "authenticated" && session?.user?.email) {
      fetch(`/api/auth/getNewUser?email=${session.user.email}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.isNewUser) {
            router.push("/welcome");
          } else {
            router.push("/app");
          }
        });
    }
  }, [session, status]);
}
