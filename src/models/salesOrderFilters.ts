export class SalesOrderFilters {
    orderDate: Date = new Date('9999');
    itemName: string = "";
}

export class OrderStatus {
    orderCreated: boolean = true;
    procured: boolean = false;
    inTransit: boolean = false;
    delivered: boolean= false;
    cashCollected: boolean= false;
}