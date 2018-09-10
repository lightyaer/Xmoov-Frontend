import { Product } from "./product";


export class PurchaseOrder {
    _id: string;
    unitPrice: number;
    tax: number;
    discount: number;
    total: number;
    _author: string;
    _salesOrder: string;
    _orderProduct: OrderProduct;
    remarks: string;
    __v: number;
    product: Product;
}

export class OrderProduct {
    _id: string;
    _product: string;
    quantity: number;
}

