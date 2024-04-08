import { Injectable, Input } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment.development';
import { ItemDto } from '../Models/itemDto';
import { Observable } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class ItemsService {
  baseUrl : string  = `${environment.BaseUrl}`
  itemsList : ItemDto[]=[];



  constructor(private http : HttpClient) { }

  GetItems(page: number): Observable<ItemDto[]> {
    return this.http.get<ItemDto[]>(`${this.baseUrl}/Item/GetAllItems?pageNumber=${page}&pageSize=12`);
  }
  
  CreateOrUpdateItem(item: ItemDto): Observable<any> {
    debugger;
    if (item.id) {
      return this.http.post<ItemDto>(`${this.baseUrl}/Item/CreateOrUpdateItem`, item);
    } else {
      return this.http.post<ItemDto>(`${this.baseUrl}/Item/CreateOrUpdateItem`, item);
    }
  }
  DeleteItem(id: any): Observable<ItemDto> {
    const params = new HttpParams().set('id', id);

    return this.http.delete<ItemDto>(`${this.baseUrl}/Item/DeleteItem`, { params });
  }
  getCategories(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/Item/GetCategories`);
  }
}