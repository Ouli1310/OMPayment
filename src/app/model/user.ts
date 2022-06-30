export class Balance {
    id!: number;
    value!: number;
    unit!: string;
}

export class Profil {
    id!: number;
    name!: string;
}

export class LoginRequest {
    email!: string;
    password!: string;
}

export class User {
    id!: number;
    firstName!: string;
    lastName!: string;
    email!: string;
    msisdn!: string;
    code!: string;
    password!: string;
    profil!: number;
    balance!: Balance;
}

export class UserMe {
    username: string | undefined;
    password: string | undefined;
    status: string | undefined;
    email: string | undefined;
    role: string | undefined;
    token?: string;
    refreshToken?: string;
}