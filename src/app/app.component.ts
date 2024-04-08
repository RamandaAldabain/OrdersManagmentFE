import { Component } from '@angular/core';
import { AccountService } from './Services/account.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styles: []
})
export class AppComponent {
  title = 'OrdersManagement';

  constructor(private accountService : AccountService){

  }
  signout(){
    this.accountService.signOut();
  }
}
