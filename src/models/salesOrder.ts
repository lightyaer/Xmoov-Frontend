import { OrderStatus } from "./salesOrderFilters";
import { Product } from "./product";
import { Quantities } from './common'
export class SalesOrder {
    _id: string;
    products: Product[];
    _orderProducts: Quantities[]
    orderDate: string = new Date().toISOString();
    orderStatus: OrderStatus;
    handling: number = 0;
    discount: number = 0;
    tax: number = 0;
    total: number = 0;
    commission: number = 0;
    grandTotal: number = 0;
    _author: string;
    _retailer: string;
    remarks: string;
}


