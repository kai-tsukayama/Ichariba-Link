export class User {
    constructor(
        public readonly id: string,
        public readonly email: string,
        public readonly name: string,
        public readonly password: string,
        public readonly profileImage: string | null,
        public readonly createAt: Date,
        public readonly updateAt: Date,
    ){}
}
