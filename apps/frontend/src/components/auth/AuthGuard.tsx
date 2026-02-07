"use client"

import { useAuth } from "@/store/useAuth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

type Props = { children: React.ReactNode };

export function AuthGuard({ children }: Props) {
  const { userId, hydrate, loading } = useAuth();
  const router = useRouter();

  useEffect(() => { hydrate(); }, [hydrate]);
  useEffect(() => {
    if (!loading && !userId) router.replace("/login");
  }, [loading, userId, router]);

  if (loading || !userId) return null;
  return <>{children}</>;
}
