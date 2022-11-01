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
    methode!: string
    transactionId!: string;
    requestId!: string;
    description!: string;
    customerId!: string;
    partnerId!: string;
    status!: string;
    value!: number;
    date!: Date;
    reference!: string;
}

export class Method {
    id!: number;
    name!: string;
}

export class IdType {
    id!: number;
    name!: string;
}
