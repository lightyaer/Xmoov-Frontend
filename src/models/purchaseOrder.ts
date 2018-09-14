import { Product } from "./product";


export class PurchaseOrder {
    _id: string;
    tax: number = 0;
    discount: number = 0;
    total: number = 0;
    _author: string;
    _salesOrder: string;

    remarks: string;
    __v: number;
    productObjects: Product[];
    grandTotal: number = 0;

}


