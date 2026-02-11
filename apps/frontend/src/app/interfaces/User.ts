export interface User {
    id: string;
    name: string;
    email: string;
    profileImage?: string;
    career?: string | null;
    intro?: string | null;
    pass?: string; // Optional as it might not always be needed in frontend state
}
