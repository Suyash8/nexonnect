"use client";

import Image from "next/image";
import React from "react";
import Img from "@/public/google.svg";
import { Button } from "@/components/ui/button";
import { SessionProvider, signIn, useSession } from "next-auth/react";
import Link from "next/link";
import { HiMiniRocketLaunch } from "react-icons/hi2";

function GoogleAuthButton() {
  return (
    <SessionProvider>
      <ChooseButton />
    </SessionProvider>
  );
}

function ChooseButton() {
  const { status } = useSession();
  return status === "authenticated" ? <LaunchApp /> : <Google />;
}

function Google() {
  return (
    <div className="flex items-center justify-center dark:bg-gray-800">
      <Button variant={"outline"} onClick={() => signIn("google")}>
        <Image src={Img} alt="google logo" className="w-6 h-6" />
        <span className="text-slate-800 hover:text-slate-900 dark:text-slate-100 dark:hover:text-slate-50 ">
          Login with Google
        </span>
      </Button>
    </div>
  );
}

function LaunchApp() {
  return (
    <div className="flex items-center justify-center dark:bg-gray-800">
      <Link href="/app">
        <Button variant={"outline"}>
          <HiMiniRocketLaunch className="w-6 h-6" />
          <span className="text-slate-800 hover:text-slate-900 dark:text-slate-100 dark:hover:text-slate-50 ">
            Launch App
          </span>
        </Button>
      </Link>
    </div>
  );
}

export default GoogleAuthButton;
