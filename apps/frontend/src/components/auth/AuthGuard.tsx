"use client";

import { useAuth } from "@/store/useAuth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useUserStore } from "@/store/userStore";
import ProfileOnboardingModal from "../ui/ProfileOnboardingModal";

type Props = { children: React.ReactNode };

export function AuthGuard({ children }: Props) {
  const { userId, hydrate, loading } = useAuth();
  const { currentUser } = useUserStore();
  const router = useRouter();

  useEffect(() => { hydrate(); }, [hydrate]);
  useEffect(() => {
    if (!loading && !userId) router.replace("/login");
  }, [loading, userId, router]);

  const needsProfile =
    !!userId && (!!currentUser && (!currentUser.baseLocation || !currentUser.residenceTerm));

  if (loading || !userId) return null;
  return (
    <>
      <ProfileOnboardingModal open={needsProfile} />
      {children}
    </>
  );
}
