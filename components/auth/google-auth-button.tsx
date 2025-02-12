"use client";

import Image from "next/image";
import React from "react";
import Img from "@/public/google.svg";
import { Button } from "@/components/ui/button";
import { signIn } from "next-auth/react";

function GoogleAuthButton() {
  return (
    <div className="flex items-center justify-center h-screen dark:bg-gray-800">
      <Button variant={"outline"} onClick={() => signIn("google")}>
        <Image src={Img} alt="google logo" className="w-6 h-6" />
        <span className="text-slate-800 hover:text-slate-900 dark:text-slate-100 dark:hover:text-slate-50 ">
          Login with Google
        </span>
      </Button>
    </div>
  );
}

export default GoogleAuthButton;
