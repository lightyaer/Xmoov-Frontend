export class PurchaseOrder {
    _id: string;
    _author: string;
    _salesorder: string;
    itemCode: number;
    itemType: string;
    itemSubType: string;
    itemName: string;
    remarks: string;
    quantity: number;
    unitPrice: number;
    tax: number;
    discount: number;
    total: number;
}