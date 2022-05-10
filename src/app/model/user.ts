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
    id!: number;
    firstName!: string;
    lastName!: string;
    email!: string;
    msisdn!: string;
    password!: string;
    balance!: Balance;
    profil!: number;
    Transactions!: Transaction[];
}