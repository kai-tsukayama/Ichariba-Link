export class User {
    constructor(
        public readonly id: string,
        public readonly email: string,
        public readonly name: string,
        public readonly password: string,
        public readonly profileImage: string | null,
        public readonly career: string | null,
        public readonly intro: string | null,
        public readonly baseLocation: string | null,
        public readonly residenceTerm: string | null,
        public readonly createAt: Date,
        public readonly updateAt: Date,
    ){}
}
