export class SalesOrderFilters {
    orderDate: string = new Date('9999').toISOString();
    productName: string = "";
}

export class OrderStatus {
    orderCreated: boolean = true;
    procured: boolean = false;
    inTransit: boolean = false;
    delivered: boolean = false;
    cashCollected: boolean = false;
}