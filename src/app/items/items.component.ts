import { AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { ItemsService } from '../Services/items.service';
import { Category, ItemDto } from '../Models/itemDto';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { OrdersService } from '../Services/orders.service';
import { AccountService } from '../Services/account.service';
import { UserStoreService } from '../Services/user-store.service';



@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styles: ``
})
export class ItemsComponent  implements OnInit ,AfterViewInit{  
  @Input() item: ItemDto = new ItemDto();
  selectedItemId: number =0;
  showModal: boolean = true;
  modalTitle: string = '';
  submitButtonText: string = '';
  itemsList : ItemDto[]=[];
  currentPage: number = 1;
  totalItems: number = 0;
  @ViewChild('myModal', {static : true}) modal!:ElementRef;
  @ViewChild('DeleteModal', {static : true}) DeleteModal!:ElementRef;
  @ViewChild('successModal', {static : true}) successModal!:ElementRef;

  categoriesMap: { [key: number]: string } = {}; 
  selectedCategoryId: number =0; 
  categoriesList: Category[] = []; 
  filteredItems: any[] = [];
  searchText: string = '';
  currentUserRole : string ="";
  currentUserId : string ="";

 constructor(private itemsService : ItemsService,private orderService: OrdersService,private modalService: NgbModal ,
   private accountService: AccountService, private userStore: UserStoreService){

 }
 ngOnInit(): void { 
  this.getCategories();
  this.loadItems();

  this.userStore.getIdFromStore()
  .subscribe(val=>{
    const id = this.accountService.getIdFromToken();
    this.currentUserId = val || id
  });

  this.userStore.getRoleFromStore()
  .subscribe(val=>{
    const roleFromToken = this.accountService.getRoleFromToken();
    this.currentUserRole = val || roleFromToken;
  })


}


loadItems() {
  this.itemsService.GetItems(this.currentPage).subscribe((items: ItemDto[]) => {
    this.itemsList = items;
    this.filteredItems=items

    this.totalItems = items.length;
  });
}

getCategories(): void {
  this.itemsService.getCategories().subscribe(categories => {
    this.categoriesList = categories;
    categories.forEach(category => {
      this.categoriesMap[category.id] = category.name;
    });
  });
}
  onPageChange(pageNumber: number) {
    this.currentPage = pageNumber;
  }
  ngAfterViewInit() {
    console.log(this.modal);

  }
 addToCart(item : ItemDto , userId : string ="022b44cb-0e15-42a4-aace-0b792915e1c1"){
  debugger;
   this.orderService.addToCart(item,userId).subscribe(() => {
    this.openSuccessModal();

  });
 }

  openModal(item? : any) {
    if(item)
      this.item=item;
    else
    item = new ItemDto();
    debugger;
    const modalElement = this.modal.nativeElement;
    modalElement.style.display='block';
    this.modalTitle = this.item.id ? 'Edit Item' : 'Add New Item';
    this.submitButtonText = this.item.id ? 'Update Item' : 'Add Item';
    this.showModal = true;
  }

  closeModal() {
    const modalElement = this.modal.nativeElement;
    modalElement.style.display='none';
    }
  
  submitForm() {
    debugger;
      this.itemsService.CreateOrUpdateItem(this.item).subscribe(() => {
        this.closeModal();
        this.openSuccessModal();

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
  }
  
  deleteItem() {
    this.itemsService.DeleteItem(this.item.id).subscribe(
      () => {
        this.closeDeleteModal();
        this.openSuccessModal();
      },
      error => {
        console.error('Error deleting item:', error);
      }
    );
  }

  openDeleteModal(id : any){
    const modalElement=this.DeleteModal.nativeElement;
    modalElement.style.display='block';
    this.item.id=id;
  }

  closeDeleteModal(){
    const modalElement=this.DeleteModal.nativeElement;
    modalElement.style.display='none';
  }
  filterItemsByCategory() {
    debugger;
    if (this.selectedCategoryId !== null) {
      this.filteredItems = this.itemsList.filter(item => item.categoryId.toString() === this.selectedCategoryId.toString());
    } else {
      this.filteredItems = this.itemsList; 
    }
  }
  applySearch() {
    if (this.searchText.trim() === '') {
      this.filteredItems = this.itemsList;
    } else {
      this.filteredItems = this.itemsList.filter(item => item.name.toLowerCase().includes(this.searchText.toLowerCase()));
    }
  }
  
}
