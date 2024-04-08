import { ItemDto } from "./itemDto";

export class OrderDto {
    id: number = 0;
    userId: number = 0;
    isPlaced : boolean = false;
    orderDate!: Date;
    totalPrice : number = 0.0;
    items: ItemDto[] = [];

}
