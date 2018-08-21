import { OrderStatus } from "./salesOrderFilters";

export class SalesOrder {
    _id: string;
    _retailer: string;
    orderDate: string;
    itemCode: number;
    itemType: string;
    itemSubType: string;
    itemName: string;
    quantity: number;
    unitPrice: number;
    tax: number;
    handling: number;
    commission: number;
    discount: number;
    total: number;
    grandTotal: number;
    orderStatus: OrderStatus;
    remarks: string;
}