
const { gql } = require('apollo-server-lambda');

const graphQlPurchaseSchema = `
    type Transaction {
        _id: ID!
        id: String
        intent: String
        create_time: String
        update_time: String
        status: String
        links: [Link]
        payer: Payer
        purchase_units: [PurchasedUnit]
        purchasedBy: User
        purchase_id: String
    }
    
    input TransactionInput {
        _id: ID
        id: String
        intent: String
        create_time: String
        update_time: String
        status: String
        links: [LinkInput]
        payer: PayerInput
        purchase_units: [PurchasedUnitInput]
        purchasedBy: ID
        purchase_id: String
    }

    type Link {
        href: String
        method: String
        rel: String
        title: String
    }

    input LinkInput {
        href: String
        method: String
        rel: String
        title: String
    }

    type Payer {
        address: Address
        email_address: String
        name: Name
        payer_id: String
    }

    input PayerInput {
        address: AddressInput
        email_address: String
        name: NameInput
        payer_id: String
    }

    type Name {
        given_name: String
        surname: String
        full_name: String
    }

    input NameInput {
        given_name: String
        surname: String
        full_name: String
    }

    type PurchasedUnit {
        description: String
        soft_descriptor: String
        amount: Amount
        payee: Payee
        shipping: Shipping
        payments: Payment
        purchasedBy: User
        transaction_id: Transaction
        reference_id: Product
    }

    input PurchasedUnitInput {
        description: String
        soft_descriptor: String
        amount: AmountInput
        payee: PayeeInput
        shipping: ShippingInput
        payments: PaymentInput
        purchasedBy: ID
        transaction_id: ID
        reference_id: ID
    }

    type Amount {
        value: String
        currency_code: String
    }

    input AmountInput {
        value: String
        currency_code: String
    }

    type Payee {
        email_address: String
        merchant_id: String 
    }

    input PayeeInput {
        email_address: String
        merchant_id: String
    }

    type Shipping {
        name: Name
        address: Address
    }

    input ShippingInput {
        name: NameInput
        address: AddressInput
    }

    type Address {
        address_line_1: String
        address_line_2: String
        admin_area_2: String
        admin_area_1: String
        postal_code: String
        country_code: String
    }

    input AddressInput {
        address_line_1: String
        address_line_2: String
        admin_area_2: String
        admin_area_1: String
        postal_code: String
        country_code: String
    }

    type Payment {
        captures: [Capture]
    }

    input PaymentInput {
        captures: [CaptureInput]
    }

    type Capture {
        status: String
        id: String
        final_capture: Boolean
        create_time: String
        update_time: String
        amount: Amount
        seller_protection: SellerProtection
        links: [Link]
    }

    input CaptureInput {
        status: String
        id: String
        final_capture: Boolean
        create_time: String
        update_time: String
        amount: AmountInput
        seller_protection: SellerProtectionInput
        links: [LinkInput]
    }

    type SellerProtection {
        status: String
        dispute_categories: [String]
    }

    input SellerProtectionInput {
        status: String
        dispute_categories: [String]
    }

    extend type Query {
        getPurchasedUnitsByUserId(userId: String): [PurchasedUnit]
    }


    extend type Mutation {
        addTransaction(transaction: TransactionInput): [PurchasedUnit]
    }
`

module.exports = gql(graphQlPurchaseSchema);

