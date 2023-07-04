import { Injectable } from '@angular/core';
import { of } from 'rxjs/internal/observable/of';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor() { }

    addUser(data: any)
    {
      return of (sessionStorage.setItem('userData', JSON.stringify(data)));
    }

    getUser()
    {
      // debugger
      return of (sessionStorage.getItem('userData'));
    }

}
