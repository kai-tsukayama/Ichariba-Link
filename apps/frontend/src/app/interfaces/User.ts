export interface User {
    id: string;
    name: string;
    email: string;
    profileImage?: string;
    career?: string | null;
    intro?: string | null;
    baseLocation?: string | null;
    residenceTerm?: "CONSIDERING" | "LT_1M" | "LT_1Y" | "Y1_3" | "GTE_3Y" | null;
    badgeKey?: string | null;
    pass?: string; // Optional as it might not always be needed in frontend state
}
