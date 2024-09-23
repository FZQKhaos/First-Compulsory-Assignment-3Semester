interface Customers {
    id: number;
    name: string;
    address: string;
    phone: string;
    email: string;
}
interface Orders {
    id: number;
    order_date: Date;
    delivery_date: Date;
    status: string;
    total_amount: number;
    customer_id: number;
}
interface OrderEntries {
    id: number;
    quantity: number;
    product_id: number;
    order_id: number;
}
interface Paper {
    id: number;
    name: string;
    discontinued: boolean;
    stock: number;
    price: number;
}
interface PaperProperties {
    paper_id: number;
    property_id: number;
}
interface Properties {
    id: number;
    property_name: string;
}