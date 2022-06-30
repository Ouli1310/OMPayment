export class Partner {
    encryptedPinCode!: string;
    idType!: string;
    id!: string;
}

export class Customer {
    idType!: String;
    id!: string;
    otp!: string;
}

export class Money {
    unit!: string;
    value!: number;
}

export class TransactionRequest {
    method!: string;
    partner!: Partner;
    customer!: Customer;
    amount!: Money;
    reference!: string;
    receiveNotification!: boolean;
}

export class OneStepRequest {
    partner!: Partner;
    customer!: Customer;
    amount!: Money;
    reference!: string;
}

export class Transaction {
    transactionId!: number;
    requestId!: number;
    description!: string;
    customerId!: number;
    partnerId!: number;
    status!: string;
}

export class Method {
    id!: number;
    name!: string;
}

export class IdType {
    id!: number;
    name!: string;
}
