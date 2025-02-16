"use server";

import { redirect } from "next/navigation";
import { ReactNode } from "react";
import { getServerSession } from "next-auth";
import { authOptions } from "@/utils/auth";

export default async function Layout({ children }: { children: ReactNode }) {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/signup");
  }

  return <div>{children}</div>;
}