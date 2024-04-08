import { Component, ElementRef, ViewChild } from '@angular/core';
import { OrdersService } from '../Services/orders.service';
import { OrderDto } from '../Models/orderDto';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styles: ``
})

export class OrdersComponent {
  ordersList : OrderDto[]=[];
  currentPage: number = 1;
  totalItems: number = 0;
  @ViewChild('successModal', {static : true}) successModal!:ElementRef;

  constructor(private orderService:OrdersService ){}
  ngOnInit(): void { 
    this.getUserAllOrders();
  }
  getUserAllOrders(userId : string="022b44cb-0e15-42a4-aace-0b792915e1c1"){
    return this.orderService.getAllUserOrders(userId).subscribe((orders: OrderDto[]) => {
      this.ordersList = orders;
  
    });
  }
  openSuccessModal(){
    debugger;
    const modalElement=this.successModal.nativeElement;
    modalElement.style.display='block';
  }
  closeSuccessModal(){
    const modalElement=this.successModal.nativeElement;
    modalElement.style.display='none';
    window.location.reload();


  }
  placeOrder(orderId : number){
    debugger;
    return this.orderService.placeOrder(orderId).subscribe(options => {
      this.openSuccessModal();

  
    });
  }
  onPageChange(pageNumber: number) {
    this.currentPage = pageNumber;
  }
}
