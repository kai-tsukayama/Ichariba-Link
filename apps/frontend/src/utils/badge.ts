type BadgeKey = "considering" | "newcomer_1m" | "newcomer_1y" | "settling_in" | "veteran_member";

export const badgeMeta: Record<BadgeKey, { label: string; icon: string }> = {
  considering: { label: "検討中", icon: "/badges/considering.svg" },
  newcomer_1m: { label: "移住1か月未満", icon: "/badges/newcomer_1m.svg" },
  newcomer_1y: { label: "1年未満", icon: "/badges/newcomer_1y.svg" },
  settling_in: { label: "1〜3年", icon: "/badges/settling_in.svg" },
  veteran_member: { label: "3年以上", icon: "/badges/veteran_member.svg" },
};

export const resolveBadge = (badgeKey?: string | null) => {
  if (!badgeKey) return null;
  return badgeMeta[badgeKey as BadgeKey] ?? null;
};
