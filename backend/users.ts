export class User {
    constructor(
        public email: string,
        public name: string,
        public password: string
    ) { }

    matches(another: User): boolean {
        return another !== undefined && another.email === this.email && another.password === this.password
    }
}

export const users: {[key: string]: User} = {
    "altamir@gmail.com": new User('altamir@gmail.com', 'Altamir', 'Senha@123')
}