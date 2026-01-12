export interface LoginUser {
    id: string,
    name: string,
    email: string,
    pass: string
}

export const seedUser: LoginUser[] = [{
    id: "1",
    name: "test",
    email: "test@example.com",
    pass: "test"
}]
