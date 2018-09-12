import { Product } from "./product";


export class PurchaseOrder {
    _id: string;
    tax: number = 0;
    discount: number = 0;
    total: number = 0;
    _author: string;
    _salesOrder: string;
    productObjects: OrderProduct[];
    remarks: string;
    __v: number;
    products: Product[];
    grandTotal: number = 0;

}

export class OrderProduct {
    _id: string;
    _product: string;
    quantity: number;
}

