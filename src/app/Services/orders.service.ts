import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { OrderDto } from '../Models/orderDto';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';
import { ItemDto } from '../Models/itemDto';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {
  baseUrl : string  = `${environment.BaseUrl}`;


  constructor(private http : HttpClient) { }

  addToCart(item : ItemDto , userId : string): Observable<OrderDto> {
    return this.http.post<OrderDto>(`${this.baseUrl}/Order/AddToCart?userId=${userId}`,item);
  }
  getAllUserOrders(userId: string): Observable<OrderDto[]> {
    return this.http.get<OrderDto[]>(`${this.baseUrl}/Order/GetUserAllOrders?userId=${userId}`);
  }
  placeOrder(orderId: number): Observable<OrderDto> {
    return this.http.post<OrderDto>(`${this.baseUrl}/Order/PlaceOrder?orderId=${orderId}`,null);
  }
}
