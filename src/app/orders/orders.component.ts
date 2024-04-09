import { Component, ElementRef, ViewChild } from '@angular/core';
import { OrdersService } from '../Services/orders.service';
import { OrderDto } from '../Models/orderDto';
import { AccountService } from '../Services/account.service';
import { UserStoreService } from '../Services/user-store.service';

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
  currentUserId : string ="";
  constructor(private orderService:OrdersService , private accountService: AccountService, private userStore: UserStoreService ){}
  ngOnInit(): void { 
   
    this.userStore.getIdFromStore()
    .subscribe(val=>{
      const id = this.accountService.getIdFromToken();
      this.currentUserId = val || id
    });
    this.getUserAllOrders(this.currentUserId);
  }
  getUserAllOrders(userId : string){
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
