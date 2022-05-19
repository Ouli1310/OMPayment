export class Balance {
    id!: number;
    value!: number;
    unit!: string;
}

export class Profil {
    id!: number;
    name!: string;
}

export class Transaction {
    id!: number;
    requestId!: number;
    description!: string;
    customerId!: number;
    partnerId!: number;
}

export class LoginRequest {
    email!: string;
    password!: string;
}

export class User {
    firstName!: string;
    lastName!: string;
    email!: string;
    msisdn!: number;
    password!: string;
    profil!: number;
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